import React from 'react';
import { YOUTUBE_CONFIG, YOUTUBE_API_KEYS } from '../config/youtube';

const YouTubeDebug: React.FC = () => {
  const debugInfo = {
    environment: process.env.NODE_ENV,
    clientId: YOUTUBE_CONFIG.CLIENT_ID,
    clientSecret: YOUTUBE_CONFIG.CLIENT_SECRET ? '***CONFIGURED***' : '❌ NOT CONFIGURED',
    redirectUri: YOUTUBE_CONFIG.REDIRECT_URI,
    apiKey1: YOUTUBE_API_KEYS.PRIMARY,
    apiKey2: YOUTUBE_API_KEYS.SECONDARY,
    envVars: {
      REACT_APP_YOUTUBE_CLIENT_ID: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
      REACT_APP_YOUTUBE_CLIENT_SECRET: process.env.REACT_APP_YOUTUBE_CLIENT_SECRET,
      REACT_APP_YOUTUBE_API_KEY_1: process.env.REACT_APP_YOUTUBE_API_KEY_1,
      REACT_APP_YOUTUBE_API_KEY_2: process.env.REACT_APP_YOUTUBE_API_KEY_2,
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px',
      margin: '20px',
      fontFamily: 'monospace'
    }}>
      <h3>🔧 Debug da Configuração do YouTube</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Ambiente:</strong> {debugInfo.environment}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Client ID:</strong> {debugInfo.clientId}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Client Secret:</strong> {debugInfo.clientSecret}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Redirect URI:</strong> {debugInfo.redirectUri}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>API Key 1:</strong> {debugInfo.apiKey1}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>API Key 2:</strong> {debugInfo.apiKey2}
      </div>
      
      <h4>Variáveis de Ambiente:</h4>
      <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
        {Object.entries(debugInfo.envVars).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '5px' }}>
            <strong>{key}:</strong> {value ? '✅ CONFIGURADA' : '❌ NÃO CONFIGURADA'}
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: debugInfo.clientId.includes('YOUR_') ? '#ffebee' : '#e8f5e8',
        borderRadius: '4px',
        border: `2px solid ${debugInfo.clientId.includes('YOUR_') ? '#f44336' : '#4caf50'}`
      }}>
        <strong>Status:</strong> {
          debugInfo.clientId.includes('YOUR_') 
            ? '❌ CREDENCIAIS NÃO CONFIGURADAS' 
            : '✅ CREDENCIAIS CONFIGURADAS'
        }
      </div>
    </div>
  );
};

export default YouTubeDebug; 