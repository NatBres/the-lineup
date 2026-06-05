# The Lineup — MLB All-Time Draft Game

## Deploy to Vercel in 5 minutes

### Step 1 — Install tools (once)
```bash
npm install
npm install -g vercel
```

### Step 2 — Create a GitHub repo
1. Go to github.com → New repository → name it `the-lineup`
2. In your project folder:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/the-lineup.git
git push -u origin main
```

### Step 3 — Deploy on Vercel
1. Go to vercel.com → Sign up with your GitHub account
2. Click "Add New Project"
3. Select your `the-lineup` repository
4. Click "Deploy" — that's it!

Your game will be live at: `https://the-lineup.vercel.app`

### Step 4 — Enable Analytics (free)
1. In your Vercel dashboard → your project → Analytics tab
2. Click "Enable Analytics"
3. Done — stats appear automatically (the script is already in index.html)

### Step 5 — Custom domain (optional, ~€10/year)
1. Buy a domain on Namecheap or Cloudflare
2. In Vercel dashboard → Domains → Add domain
3. Follow the DNS instructions

## Local development
```bash
npm run dev        # starts on http://localhost:5173
npm run build      # builds for production
npm run preview    # preview the production build
```

## Analytics included
- Vercel Analytics (free, built-in): page views, unique visitors, countries
- To add Google Analytics: paste the GA4 tag in index.html
