const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from Images folder
app.use('/images', express.static(path.join(__dirname, 'Images')));

// Serve static files from React app build folder
app.use(express.static(path.join(__dirname, 'client/build')));

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

// Handle React routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 