export const YOUTUBE_CONFIG = {
  CLIENT_ID: process.env.REACT_APP_YOUTUBE_CLIENT_ID || 'YOUR_YOUTUBE_CLIENT_ID',
  CLIENT_SECRET: process.env.REACT_APP_YOUTUBE_CLIENT_SECRET || 'YOUR_YOUTUBE_CLIENT_SECRET',
  REDIRECT_URI: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/' 
    : 'https://felex-manager.vercel.app/',
  SCOPES: [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.force-ssl'
  ]
};

export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// API Keys for YouTube Data API
export const YOUTUBE_API_KEYS = {
  PRIMARY: process.env.REACT_APP_YOUTUBE_API_KEY_1 || 'YOUR_YOUTUBE_API_KEY_1',
  SECONDARY: process.env.REACT_APP_YOUTUBE_API_KEY_2 || 'YOUR_YOUTUBE_API_KEY_2'
}; 