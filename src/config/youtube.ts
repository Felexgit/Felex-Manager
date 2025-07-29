export const YOUTUBE_CONFIG = {
  CLIENT_ID: process.env.REACT_APP_YOUTUBE_CLIENT_ID || '895426659962-m3hthn9787ahqa82b1n3aqdi9hq7hp5q.apps.googleusercontent.com',
  CLIENT_SECRET: process.env.REACT_APP_YOUTUBE_CLIENT_SECRET || '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',
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
  PRIMARY: process.env.REACT_APP_YOUTUBE_API_KEY_1 || 'AIzaSyAzy2pVC5SGFqotgHKWBNL8zY9BcFr7lGw',
  SECONDARY: process.env.REACT_APP_YOUTUBE_API_KEY_2 || 'AIzaSyBkGjZ2L1A3YPHpapY9fz8pkDURJxrbLrk'
}; 