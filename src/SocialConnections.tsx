import React, { useState } from 'react';

export default function SocialConnections() {
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);

  // Simulação de conexão OAuth
  function connectInstagram() {
    // Aqui entraria o fluxo OAuth real
    setInstagramConnected(true);
    alert('Conta do Instagram conectada (simulação)!');
  }
  function connectYouTube() {
    // Aqui entraria o fluxo OAuth real
    setYoutubeConnected(true);
    alert('Conta do YouTube conectada (simulação)!');
  }

  return (
    <div style={{ background: '#222', padding: 16, borderRadius: 8, marginBottom: 24 }}>
      <h3>Conexões de Redes Sociais</h3>
      <div style={{ marginBottom: 12 }}>
        <span>Instagram: </span>
        {instagramConnected ? (
          <span style={{ color: 'lime' }}>Conectado</span>
        ) : (
          <button onClick={connectInstagram}>Conectar</button>
        )}
      </div>
      <div>
        <span>YouTube: </span>
        {youtubeConnected ? (
          <span style={{ color: 'lime' }}>Conectado</span>
        ) : (
          <button onClick={connectYouTube}>Conectar</button>
        )}
      </div>
    </div>
  );
} 