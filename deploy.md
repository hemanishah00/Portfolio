# Deployment Instructions for Render

## Prerequisites
- GitHub repository with your code
- Render account (free)

## Steps to Deploy

### 1. Push your code to GitHub
```bash
git add .
git commit -m "Streamlined codebase for Render deployment"
git push origin main
```

### 2. Connect to Render
1. Go to [render.com](https://render.com)
2. Sign up/login with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### 3. Configure Render Settings
- **Name**: `hemani-portfolio`
- **Environment**: `Node`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Plan**: Free (or paid for custom domain)

### 4. Environment Variables
Add this environment variable in Render dashboard:
- `NODE_ENV` = `production`

### 5. Deploy
Click "Create Web Service" and wait for deployment to complete.

## Local Development
```bash
# Install dependencies
npm install
npm run install-client

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

## Project Structure (After Cleanup)
```
├── server.js              # Express server (root level)
├── package.json           # Server dependencies & scripts
├── render.yaml           # Render deployment config
├── client/               # React frontend
│   ├── package.json     # Client dependencies
│   ├── src/             # React source code
│   └── public/          # Static assets
├── Images/              # Image assets served by backend
└── README.md
``` 