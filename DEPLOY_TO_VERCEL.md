# Deploying GhibliVault to Vercel

This guide will help you deploy your GhibliVault website to Vercel in a few simple steps.

## Method 1: Using Vercel CLI (Command Line)

1. **Install Node.js** (if not already installed)
   - Download and install from [nodejs.org](https://nodejs.org/)

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```
   Follow the prompts to authenticate.

4. **Deploy Your Site**
   - Navigate to your project directory in the terminal
   ```bash
   cd path/to/ghiblivault
   vercel
   ```
   - Follow the prompts to configure your project
   - Vercel will automatically detect that this is a static site

5. **Your site is now live!**
   - Vercel will provide you with a URL where your site is deployed

## Method 2: Using Vercel Dashboard (GitHub Integration)

1. **Create a GitHub repository**
   - Push your GhibliVault code to a GitHub repository

2. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com/) and sign up or log in

3. **Import your repository**
   - Click "Add New..." > "Project"
   - Connect to GitHub if not already connected
   - Select your GhibliVault repository

4. **Configure project**
   - Framework Preset: Select "Other"
   - Root Directory: Keep as `.` (default)
   - Build Command: Leave empty
   - Output Directory: Leave empty

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll receive a URL where your site is live

## Troubleshooting

If you encounter issues with image paths, ensure all file paths in your HTML, CSS, and JavaScript files are relative (starting with `./`).

For example:
- `<link rel="stylesheet" href="./styles.css">`
- `<script src="./script.js"></script>`
- Image paths in JavaScript should use `./image.jpg` format

## Custom Domain

To use your own domain name:
1. Go to your project in the Vercel dashboard
2. Click "Settings" > "Domains"
3. Add your domain and follow the verification steps

## Automatic Deployments

When you connect your GitHub repository, Vercel will automatically deploy any changes you push to your repository, making updates simple! 