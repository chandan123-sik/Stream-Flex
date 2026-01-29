const express = require('express');
const User = require('../models/User');
const Content = require('../models/Content');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Add to favorites
router.post('/favorites/:contentId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const content = await Content.findById(req.params.contentId);

    if (!content || !content.isActive) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const isFavorite = user.favorites.includes(req.params.contentId);
    
    if (isFavorite) {
      user.favorites = user.favorites.filter(id => id.toString() !== req.params.contentId);
      await user.save();
      res.json({ message: 'Removed from favorites', isFavorite: false });
    } else {
      user.favorites.push(req.params.contentId);
      await user.save();
      res.json({ message: 'Added to favorites', isFavorite: true });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user favorites
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.json(user.favorites.filter(content => content.isActive));
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to watch history
router.post('/watch-history/:contentId', auth, async (req, res) => {
  try {
    const { progress = 0 } = req.body;
    const user = await User.findById(req.userId);
    const content = await Content.findById(req.params.contentId);

    if (!content || !content.isActive) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Remove existing entry if exists
    user.watchHistory = user.watchHistory.filter(
      item => item.contentId.toString() !== req.params.contentId
    );

    // Add new entry at the beginning
    user.watchHistory.unshift({
      contentId: req.params.contentId,
      progress,
      watchedAt: new Date()
    });

    // Keep only last 50 items
    user.watchHistory = user.watchHistory.slice(0, 50);

    await user.save();
    res.json({ message: 'Added to watch history' });
  } catch (error) {
    console.error('Add to watch history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get watch history
router.get('/watch-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('watchHistory.contentId');
    const watchHistory = user.watchHistory
      .filter(item => item.contentId && item.contentId.isActive)
      .map(item => ({
        ...item.contentId.toObject(),
        progress: item.progress,
        watchedAt: item.watchedAt
      }));
    
    res.json(watchHistory);
  } catch (error) {
    console.error('Get watch history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get continue watching (items with progress > 5% and < 95%)
router.get('/continue-watching', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('watchHistory.contentId');
    const continueWatching = user.watchHistory
      .filter(item => 
        item.contentId && 
        item.contentId.isActive && 
        item.progress > 5 && 
        item.progress < 95
      )
      .slice(0, 10)
      .map(item => ({
        ...item.contentId.toObject(),
        progress: item.progress,
        watchedAt: item.watchedAt
      }));
    
    res.json(continueWatching);
  } catch (error) {
    console.error('Get continue watching error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update subscription
router.put('/subscription', auth, async (req, res) => {
  try {
    const { subscription } = req.body;
    
    if (!['Basic', 'Standard', 'Premium'].includes(subscription)) {
      return res.status(400).json({ message: 'Invalid subscription plan' });
    }

    const user = await User.findById(req.userId);
    user.subscription = subscription;
    user.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    await user.save();

    res.json({
      message: 'Subscription updated successfully',
      subscription: user.subscription,
      subscriptionExpiry: user.subscriptionExpiry
    });
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    const stats = {
      watchedCount: user.watchHistory.length,
      favoritesCount: user.favorites.length,
      continueWatchingCount: user.watchHistory.filter(item => 
        item.progress > 5 && item.progress < 95
      ).length,
      subscription: user.subscription,
      subscriptionExpiry: user.subscriptionExpiry,
      memberSince: user.createdAt
    };

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all users
router.get('/', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update user
router.put('/:userId', adminAuth, async (req, res) => {
  try {
    const { subscription, role, isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { subscription, role, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;