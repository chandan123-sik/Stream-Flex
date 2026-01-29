const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  poster: {
    type: String,
    required: [true, 'Poster image is required']
  },
  backdrop: {
    type: String,
    required: [true, 'Backdrop image is required']
  },
  trailer: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['movie', 'series'],
    required: [true, 'Content type is required']
  },
  genre: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  year: {
    type: Number,
    required: [true, 'Release year is required'],
    min: 1900,
    max: new Date().getFullYear() + 5
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    default: 'English'
  },
  duration: {
    type: String, // For movies (e.g., "2h 30m")
    required: function() {
      return this.type === 'movie';
    }
  },
  seasons: {
    type: Number, // For series
    required: function() {
      return this.type === 'series';
    }
  },
  episodes: {
    type: Number, // For series
    required: function() {
      return this.type === 'series';
    }
  },
  cast: [{
    type: String,
    required: true
  }],
  director: {
    type: String, // For movies
    required: function() {
      return this.type === 'movie';
    }
  },
  creator: {
    type: String, // For series
    required: function() {
      return this.type === 'series';
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  popular: {
    type: Boolean,
    default: false
  },
  newRelease: {
    type: Boolean,
    default: false
  },
  topRated: {
    type: Boolean,
    default: false
  },
  recommended: {
    type: Boolean,
    default: false
  },
  subscriptionRequired: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium'],
    default: 'Basic'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
contentSchema.index({ title: 'text', description: 'text', genre: 'text' });
contentSchema.index({ type: 1, genre: 1, year: 1 });
contentSchema.index({ featured: 1, trending: 1, popular: 1 });

module.exports = mongoose.model('Content', contentSchema);