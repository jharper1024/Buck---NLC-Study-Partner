# Buck - NLC Study Partner Chat

A simple chat interface to interact with an AI study assistant powered by OpenAI's API.

## Setup Instructions

### 1. Get Your OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy and save it securely

### 2. Deploy to Netlify
1. Push this code to GitHub
2. Go to https://netlify.com and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Deploy settings:
   - Build command: (leave blank)
   - Publish directory: `.` (just a period)
6. Click "Deploy site"

### 3. Add Your API Key to Netlify
1. In your Netlify site dashboard, go to "Site configuration" → "Environment variables"
2. Click "Add a variable"
3. Key: `OPENAI_API_KEY`
4. Value: Paste your OpenAI API key
5. Click "Save"
6. Go to "Deploys" and click "Trigger deploy" → "Deploy site"

### 4. Your Site is Live!
Your chat interface will be available at the URL Netlify provides.

## Important Notes
- Never commit your API key directly in the code
- The API key is stored securely in Netlify's environment variables
- Each message sent costs a small amount based on OpenAI's pricing
- Using gpt-4o-mini model for cost efficiency

## Customization
- Edit `index.html` to change the title and header
- Edit `style.css` to change colors and styling
- Edit the system message in `script.js` to customize Buck's personality
