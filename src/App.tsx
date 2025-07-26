import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';
import Auth from './Auth';
import FacebookDashboard from './components/FacebookDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import UserDataDeletion from './pages/UserDataDeletion';
import InstagramCallback from './pages/InstagramCallback';
import WhatsAppCallback from './pages/WhatsAppCallback';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [facebookUser, setFacebookUser] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.onAuthStateChange((event, session) => setUser(session?.user ?? null));
  }, []);

  // Renderização de páginas legais conforme o path
  const legalPath = window.location.pathname;
  if (legalPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }
  if (legalPath === '/terms-of-service') {
    return <TermsOfService />;
  }
  if (legalPath === '/user-data-deletion') {
    return <UserDataDeletion />;
  }
  if (legalPath === '/instagram-callback') {
    return <InstagramCallback />;
  }
  if (legalPath === '/whatsapp-callback') {
    return <WhatsAppCallback />;
  }

  // Só exibir Auth se não for uma página legal
  if (!user) return <Auth onAuth={() => supabase.auth.getUser().then(({ data }) => setUser(data.user))} />;

  const connectFacebook = async () => {
    setIsConnecting(true);
    try {
      const clientId = '3131820566980255';
      const redirectUri = encodeURIComponent('https://felex-manager.vercel.app/');
      const scope = 'pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_metadata,user_posts';
      const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=fb_connect`;
      window.location.href = authUrl;
    } catch (error) {
      console.error('Erro ao conectar Facebook:', error);
      setIsConnecting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1d29 100%)',
      color: '#e4e6eb',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      {/* Header Simples */}
      <header style={{ 
        background: '#23272f', 
        padding: '16px 24px', 
        borderBottom: '1px solid #3a3b3c',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1877f2' }}>
            📘 Felex Manager
          </h1>
          <span style={{ fontSize: 14, color: '#b0b3b8' }}>
            Gerenciador de Facebook
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, color: '#b0b3b8' }}>
            Olá, {user.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: 12,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <FacebookDashboard 
          facebookUser={facebookUser}
          setFacebookUser={setFacebookUser}
          isConnecting={isConnecting}
          setIsConnecting={setIsConnecting}
          connectFacebook={connectFacebook}
        />
      </main>

      {/* Footer */}
      <footer style={{ 
        background: '#23272f', 
        padding: '24px', 
        textAlign: 'center', 
        borderTop: '1px solid #3a3b3c',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 16 }}>
          <a href="/privacy-policy" style={{ color: '#b0b3b8', textDecoration: 'none', fontSize: 14 }}>
            Política de Privacidade
          </a>
          <a href="/terms-of-service" style={{ color: '#b0b3b8', textDecoration: 'none', fontSize: 14 }}>
            Termos de Serviço
          </a>
          <a href="/user-data-deletion" style={{ color: '#b0b3b8', textDecoration: 'none', fontSize: 14 }}>
            Exclusão de Dados
          </a>
        </div>
        <p style={{ margin: 0, color: '#b0b3b8', fontSize: 12 }}>
          © 2024 Felex Manager. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;
