#!/bin/bash

echo "🚀 Setting up Hemani Shah's Portfolio Website"
echo "============================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "📦 Please install Node.js first:"
    echo ""
    echo "Option 1 - Using Homebrew (recommended):"
    echo "  brew install node"
    echo ""
    echo "Option 2 - Download from official website:"
    echo "  https://nodejs.org/en/download/"
    echo ""
    echo "Option 3 - Using Node Version Manager (nvm):"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "  nvm install node"
    echo ""
    echo "After installing Node.js, run this script again."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo "✅ npm is available: $(npm --version)"

echo ""
echo "📦 Installing backend dependencies..."
npm install

echo ""
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "This will start:"
echo "   - Backend server on http://localhost:5000"
echo "   - Frontend React app on http://localhost:3000"
echo ""
echo "📝 Open http://localhost:3000 in your browser to view the portfolio!"

# Make the script executable
chmod +x setup.sh 