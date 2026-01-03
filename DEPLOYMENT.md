# Deployment Guide - Sorta

## 🚀 Quick Deployment to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/supunhg/Sorta)

### Manual Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/supunhg/Sorta.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Environment Configuration

The project is configured for Vercel deployment with `vercel.json`:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing handled automatically

### Custom Domain (Optional)

In Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## 🌐 Alternative Deployment Options

### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
# Add to package.json
"homepage": "https://supunhg.github.io/Sorta",

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## ✅ Pre-Deployment Checklist

- [x] Build succeeds: `npm run build`
- [x] No TypeScript errors: `npm run lint`
- [x] SEO meta tags added
- [x] README.md complete
- [x] LICENSE file added
- [x] .gitignore configured
- [x] vercel.json configured
- [x] package.json metadata complete

## 📊 Performance Optimization

The build is optimized for production:
- Code splitting enabled
- CSS minification
- Tree shaking
- Asset compression
- Cache headers configured

## 🔧 Post-Deployment

### Verify Deployment
1. Test all features
2. Check mobile responsiveness
3. Verify all 12 algorithms work
4. Test comparison mode
5. Verify bookmark and timeline features
6. Test benchmark mode

### Monitor Performance
- Use Vercel Analytics
- Check Lighthouse scores
- Monitor Core Web Vitals

### SEO
- Submit sitemap to Google Search Console
- Verify Open Graph tags
- Test social media previews

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Routing Issues
- Ensure `vercel.json` has the rewrite rule
- For other platforms, configure SPA routing

### Performance Issues
- Check bundle size: `npm run build -- --report`
- Optimize images
- Use lazy loading for heavy components

---

## 📝 Deployment Notes

**Live URL**: Update this after deployment
**Build Time**: ~2-3 seconds
**Bundle Size**: ~72 KB (gzipped)
**Framework**: Vite + React + TypeScript

---

Made with ❤️ by [Supun Hewagamage](https://github.com/supunhg)
