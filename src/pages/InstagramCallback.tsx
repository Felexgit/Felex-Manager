import React, { useEffect, useState } from 'react';

const InstagramCallback = () => {
  const [status, setStatus] = useState('Processando...');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
      setStatus('Código de autorização não encontrado.');
      return;
    }
    // Trocar o code por access token (apenas para testes, ideal é backend)
    async function fetchToken() {
      setStatus('Trocando código por access token...');
      try {
        const clientId = '1572473227491051';
        const clientSecret = 'f991560d240d70c10ef16314ed1d655e';
        const redirectUri = 'https://felex-manager.vercel.app/instagram-callback';
        const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${clientSecret}&code=${code}`;
        const res = await fetch(tokenUrl);
        const data = await res.json();
        if (data.access_token) {
          setToken(data.access_token);
          setStatus('Conexão com Instagram realizada com sucesso!');
        } else {
          setStatus('Erro ao obter access token: ' + (data.error?.message || JSON.stringify(data)));
        }
      } catch (err) {
        setStatus('Erro inesperado: ' + err);
      }
    }
    fetchToken();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 32, background: '#181c2f', borderRadius: 16, color: '#e4e6eb', textAlign: 'center' }}>
      <h1 style={{ color: '#E4405F' }}>Instagram Callback</h1>
      <p>{status}</p>
      {token && (
        <div style={{ marginTop: 24, wordBreak: 'break-all' }}>
          <strong>Access Token:</strong>
          <div style={{ background: '#23272f', padding: 12, borderRadius: 8, marginTop: 8, color: '#fff', fontSize: 13 }}>{token}</div>
        </div>
      )}
    </div>
  );
};

export default InstagramCallback; 