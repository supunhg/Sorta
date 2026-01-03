#!/bin/bash

# Sorta - Git Setup and GitHub Push Script
# Author: Supun Hewagamage

echo "🚀 Setting up Sorta for GitHub..."

# Initialize git if not already done
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Configure git user (update with your info if needed)
echo "👤 Configuring Git user..."
git config user.name "Supun Hewagamage"
git config user.email "your-email@example.com"  # Update this!

# Add all files
echo "📁 Staging all files..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "feat: complete Sorta algorithm visualizer

- 12 sorting algorithms with visualizations
- Real-time performance benchmarks
- Comparison mode for up to 4 algorithms
- Power user features (bookmarks, timeline, debug panel)
- 5 color themes and 4 bar styles
- Comprehensive documentation and SEO optimization
- Ready for Vercel deployment"

# Rename branch to main
echo "🌿 Setting main branch..."
git branch -M main

# Add remote (you'll need to create the repo on GitHub first)
echo "🔗 Adding GitHub remote..."
echo "⚠️  Make sure you've created the repository 'Sorta' on GitHub first!"
echo "Repository URL: https://github.com/supunhg/Sorta"
read -p "Press enter when you've created the GitHub repository..."

git remote add origin https://github.com/supunhg/Sorta.git

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Your project is now on GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Click Deploy (Vercel will auto-detect Vite settings)"
echo ""
echo "🌐 After deployment, update README.md with your live URL"
echo ""
echo "🎉 Your project is ready to share with the world!"
