const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Content = require('../models/Content');

// Load environment variables
dotenv.config();

const sampleContent = [
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "movie",
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    year: 2008,
    language: "English",
    duration: "2h 32m",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
    featured: true,
    trending: true,
    popular: true,
    topRated: true,
    likes: 1250,
    subscriptionRequired: "Basic"
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    type: "movie",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    year: 2010,
    language: "English",
    duration: "2h 28m",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    director: "Christopher Nolan",
    featured: true,
    popular: true,
    recommended: true,
    likes: 980,
    subscriptionRequired: "Standard"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: "movie",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    year: 2014,
    language: "English",
    duration: "2h 49m",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan",
    newRelease: true,
    topRated: true,
    recommended: true,
    likes: 1100,
    subscriptionRequired: "Premium"
  },
  {
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    type: "movie",
    genre: ["Action", "Adventure", "Drama"],
    rating: 8.4,
    year: 2019,
    language: "English",
    duration: "3h 1m",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    director: "Anthony Russo, Joe Russo",
    popular: true,
    recommended: true,
    likes: 2100,
    subscriptionRequired: "Standard"
  },
  {
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    type: "series",
    genre: ["Drama", "Fantasy", "Horror"],
    rating: 8.7,
    year: 2016,
    language: "English",
    seasons: 4,
    episodes: 34,
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
    creator: "The Duffer Brothers",
    featured: true,
    trending: true,
    popular: true,
    likes: 1500,
    subscriptionRequired: "Basic"
  },
  {
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    poster: "https://image.tmdb.org/t/p/w500/1M876KQUEYvZ78GeZbpcTpyHtak.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg",
    trailer: "https://www.youtube.com/watch?v=JWtnJjn6ng0",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    type: "series",
    genre: ["Biography", "Drama", "History"],
    rating: 8.6,
    year: 2016,
    language: "English",
    seasons: 6,
    episodes: 60,
    cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    creator: "Peter Morgan",
    popular: true,
    topRated: true,
    recommended: true,
    likes: 920,
    subscriptionRequired: "Standard"
  },
  {
    title: "Money Heist",
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/xGexTKCJJVcKWJybYmghNnQfjKl.jpg",
    trailer: "https://www.youtube.com/watch?v=_InqQJRqGW4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    type: "series",
    genre: ["Action", "Crime", "Mystery"],
    rating: 8.3,
    year: 2017,
    language: "Spanish",
    seasons: 5,
    episodes: 41,
    cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"],
    creator: "Álex Pina",
    newRelease: true,
    trending: true,
    recommended: true,
    likes: 1300,
    subscriptionRequired: "Premium"
  },
  {
    title: "Breaking Bad",
    description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student.",
    poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    trailer: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    type: "series",
    genre: ["Crime", "Drama", "Thriller"],
    rating: 9.5,
    year: 2008,
    language: "English",
    seasons: 5,
    episodes: 62,
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    creator: "Vince Gilligan",
    topRated: true,
    recommended: true,
    likes: 2200,
    subscriptionRequired: "Premium"
  }
];

const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@streamflix.com",
    password: "admin123",
    role: "admin",
    subscription: "Premium"
  },
  {
    name: "Demo User",
    email: "demo@streamflix.com",
    password: "demo123",
    role: "user",
    subscription: "Standard"
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    subscription: "Premium"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
    subscription: "Basic"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/streamflix');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Content.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = new User({
        ...userData,
        password: hashedPassword,
        avatar: `https://via.placeholder.com/100x100/333/fff?text=${userData.name.charAt(0)}`
      });
      
      users.push(user);
    }
    
    await User.insertMany(users);
    console.log(`Created ${users.length} users`);

    // Create content
    await Content.insertMany(sampleContent);
    console.log(`Created ${sampleContent.length} content items`);

    console.log('Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Admin: admin@streamflix.com / admin123');
    console.log('Demo User: demo@streamflix.com / demo123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();