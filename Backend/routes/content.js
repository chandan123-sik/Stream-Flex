const express = require('express');
const Content = require('../models/Content');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all content with filters
router.get('/', async (req, res) => {
  try {
    const {
      type,
      genre,
      language,
      year,
      featured,
      trending,
      popular,
      newRelease,
      topRated,
      recommended,
      search,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (type) filter.type = type;
    if (genre) filter.genre = { $in: [genre] };
    if (language) filter.language = language;
    if (year) filter.year = parseInt(year);
    if (featured === 'true') filter.featured = true;
    if (trending === 'true') filter.trending = true;
    if (popular === 'true') filter.popular = true;
    if (newRelease === 'true') filter.newRelease = true;
    if (topRated === 'true') filter.topRated = true;
    if (recommended === 'true') filter.recommended = true;

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const content = await Content.find(filter)
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Content.countDocuments(filter);

    res.json({
      content,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content || !content.isActive) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Increment views
    content.views += 1;
    await content.save();

    res.json(content);
  } catch (error) {
    console.error('Get content by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create content (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    
    res.status(201).json({
      message: 'Content created successfully',
      content
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({
      message: 'Content updated successfully',
      content
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete content (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like content
router.post('/:id/like', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content || !content.isActive) {
      return res.status(404).json({ message: 'Content not found' });
    }

    content.likes += 1;
    await content.save();

    res.json({ message: 'Content liked', likes: content.likes });
  } catch (error) {
    console.error('Like content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get genres
router.get('/meta/genres', async (req, res) => {
  try {
    const genres = await Content.distinct('genre', { isActive: true });
    res.json(genres.sort());
  } catch (error) {
    console.error('Get genres error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get languages
router.get('/meta/languages', async (req, res) => {
  try {
    const languages = await Content.distinct('language', { isActive: true });
    res.json(languages.sort());
  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get years
router.get('/meta/years', async (req, res) => {
  try {
    const years = await Content.distinct('year', { isActive: true });
    res.json(years.sort((a, b) => b - a));
  } catch (error) {
    console.error('Get years error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;