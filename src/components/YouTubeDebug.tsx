import React from 'react';
import { YOUTUBE_CONFIG } from '../config/youtube';

export default function YouTubeDebug() {
  const checkConfiguration = () => {
    const issues = [];
    
    // Verificar Client ID
    if (!YOUTUBE_CONFIG.CLIENT_ID || YOUTUBE_CONFIG.CLIENT_ID === 'YOUR_YOUTUBE_CLIENT_ID') {
      issues.push('❌ Client ID não configurado');
    } else {
      issues.push('✅ Client ID configurado');
    }
    
    // Verificar Client Secret
    if (!YOUTUBE_CONFIG.CLIENT_SECRET || YOUTUBE_CONFIG.CLIENT_SECRET === 'YOUR_YOUTUBE_CLIENT_SECRET') {
      issues.push('❌ Client Secret não configurado');
    } else {
      issues.push('✅ Client Secret configurado');
    }
    
    // Verificar Redirect URI
    if (!YOUTUBE_CONFIG.REDIRECT_URI) {
      issues.push('❌ Redirect URI não configurado');
    } else {
      issues.push(`✅ Redirect URI: ${YOUTUBE_CONFIG.REDIRECT_URI}`);
    }
    
    // Verificar ambiente
    if (process.env.NODE_ENV === 'development') {
      issues.push('🔧 Ambiente de desenvolvimento');
    } else {
      issues.push('🚀 Ambiente de produção');
    }
    
    return issues;
  };

  const issues = checkConfiguration();

  return (
    <div style={{ 
      background: '#1a1d29', 
      borderRadius: 8, 
      padding: '16px', 
      margin: '16px 0',
      border: '1px solid #3a3b3c'
    }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#e4e6eb' }}>🔧 Debug da Configuração do YouTube</h4>
      <div style={{ fontSize: 14 }}>
        {issues.map((issue, index) => (
          <div key={index} style={{ marginBottom: 4, color: '#b0b3b8' }}>
            {issue}
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 16, padding: '12px', background: '#23272f', borderRadius: 4 }}>
        <div style={{ fontSize: 12, color: '#b0b3b8', marginBottom: 8 }}>
          <strong>Configuração Atual:</strong>
        </div>
        <div style={{ fontSize: 11, color: '#6c757d', fontFamily: 'monospace' }}>
          <div>Client ID: {YOUTUBE_CONFIG.CLIENT_ID.substring(0, 20)}...</div>
          <div>Redirect URI: {YOUTUBE_CONFIG.REDIRECT_URI}</div>
          <div>Ambiente: {process.env.NODE_ENV}</div>
        </div>
      </div>
    </div>
  );
} 