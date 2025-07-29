export const YOUTUBE_CONFIG = {
  CLIENT_ID: process.env.REACT_APP_YOUTUBE_CLIENT_ID || '895426659962-bpg8v2vb0i2jvfkulosuohrk3o87k7fg.apps.googleusercontent.com',
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