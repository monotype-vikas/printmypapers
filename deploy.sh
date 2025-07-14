#!/bin/bash

echo "🚀 PrintMyPapers Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Test the build locally
echo "🧪 Testing build locally..."
npx serve -s build -l 3001 &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check if server is running
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Local test successful"
else
    echo "❌ Local test failed"
    kill $SERVER_PID
    exit 1
fi

# Stop the test server
kill $SERVER_PID

echo ""
echo "🎉 Your project is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Create a GitHub repository"
echo "2. Push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/printmypapers.git"
echo "   git push -u origin main"
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Sign up with GitHub"
echo "   - Import your repository"
echo "   - Deploy!"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions" 