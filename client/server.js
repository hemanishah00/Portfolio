const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from Images folder
app.use('/images', express.static(path.join(__dirname, 'Images')));

// Serve static files from React app build folder in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// API routes
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Hemani Shah',
    designation: 'GenAI Developer',
    location: 'Valsad, Gujarat',
    specializations: ['Natural Language Processing', 'Computer Vision'],
    image: '/images/hemani.jpeg'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 