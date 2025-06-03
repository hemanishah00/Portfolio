# Hemani Shah - Portfolio Website

A modern, responsive portfolio website built with React and Node.js showcasing Hemani Shah as a GenAI Developer.

## Features

- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Profile Integration**: Displays profile information including photo, name, designation, and specializations
- **API Integration**: Node.js backend serves profile data via REST API
- **Professional Styling**: Uses Inter font family and modern CSS techniques

## Tech Stack

### Frontend
- React 18.2.0
- Axios for API calls
- CSS3 with modern features (gradients, backdrop-filter, transitions)
- Responsive design with media queries

### Backend
- Node.js with Express.js
- CORS enabled for cross-origin requests
- Static file serving for images
- RESTful API endpoints

## Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── IntroPage.js
│   │   │   └── IntroPage.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── Images/
│   └── hemani.jpeg         # Profile photo
├── server.js               # Node.js server
├── package.json            # Backend dependencies
└── README.md

```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup
1. Install backend dependencies:
   ```bash
   npm install
   ```

### Frontend Setup
1. Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

## Running the Application

### Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- React development server on `http://localhost:3000`

### Individual Services

#### Backend Only
```bash
npm run server
```

#### Frontend Only
```bash
npm run client
```

### Production Build
1. Build the React app:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### GET /api/profile
Returns profile information including:
- Name: Hemani Shah
- Designation: GenAI Developer
- Location: Valsad, Gujarat
- Specializations: Natural Language Processing, Computer Vision
- Profile image path

### Static Files
- `/images/*` - Serves images from the Images folder

## Customization

### Profile Information
Edit the profile data in `server.js` at the `/api/profile` endpoint to update:
- Name
- Designation
- Location
- Specializations
- Profile image

### Styling
- Modify `client/src/components/IntroPage.css` for layout and design changes
- Update `client/src/App.css` for global styles
- Color scheme uses gradient from `#667eea` to `#764ba2`

### Adding New Features
- Add new React components in `client/src/components/`
- Create new API endpoints in `server.js`
- Update routing in `client/src/App.js`

## Design Features

- **Gradient Background**: Purple-blue gradient for modern appeal
- **Glass Morphism**: Semi-transparent card with backdrop blur effect
- **Hover Effects**: Smooth transitions and scale effects on interactive elements
- **Typography**: Inter font for clean, professional look
- **Responsive Grid**: Flexible layout that adapts to different screen sizes
- **Professional Photo Display**: Circular profile image with hover effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project as a template for your own portfolio!

---

**Hemani Shah** - GenAI Developer  
Specializing in Natural Language Processing and Computer Vision 