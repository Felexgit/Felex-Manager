import React from 'react';
import { FacebookPage, FacebookUser } from '../facebookApi';

interface HomeSectionProps {
  facebookUser: FacebookUser | null;
  facebookPages: FacebookPage[];
  selectedPages: string[];
  isConnectingFacebook: boolean;
  setIsConnectingFacebook: (loading: boolean) => void;
  setFacebookUser: (user: FacebookUser | null) => void;
  setFacebookPages: (pages: FacebookPage[]) => void;
  setSelectedPages: (pages: string[]) => void;
  connectFacebookAccount: () => void;
  togglePageSelection: (pageId: string) => void;
  connectAccount: (platform: string) => void;
}

export default function HomeSection({
  facebookUser,
  facebookPages,
  selectedPages,
  isConnectingFacebook,
  connectFacebookAccount,
  togglePageSelection,
  connectAccount
}: HomeSectionProps) {
  const socialPlatforms = [
    { name: 'Facebook', icon: '📘', color: '#1877F2' },
    { name: 'Instagram', icon: '📷', color: '#E4405F' },
    { name: 'YouTube', icon: '📺', color: '#FF0000' },
    { name: 'TikTok', icon: '🎵', color: '#000000' }
  ];

  const connectedAccounts = {
    facebook: facebookUser !== null,
    instagram: false,
    youtube: false,
    tiktok: false
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header da Home */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e4e6eb', marginBottom: 8 }}>
          Bem-vindo ao AutoUpload Suite! 🚀
        </h1>
        <p style={{ fontSize: 18, color: '#b0b3b8', margin: 0 }}>
          Gerencie todas as suas redes sociais em um só lugar
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 32 }}>
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, borderLeft: '4px solid #1877F2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>📊</span>
            <h3 style={{ margin: 0, color: '#e4e6eb' }}>Total de Publicações</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1877F2' }}>24</div>
          <div style={{ fontSize: 14, color: '#b0b3b8' }}>+12% este mês</div>
        </div>

        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, borderLeft: '4px solid #E4405F' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>👥</span>
            <h3 style={{ margin: 0, color: '#e4e6eb' }}>Alcance Total</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#E4405F' }}>15.2K</div>
          <div style={{ fontSize: 14, color: '#b0b3b8' }}>+8% esta semana</div>
        </div>

        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, borderLeft: '4px solid #FF0000' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>❤️</span>
            <h3 style={{ margin: 0, color: '#e4e6eb' }}>Engajamento</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#FF0000' }}>2.8K</div>
          <div style={{ fontSize: 14, color: '#b0b3b8' }}>+15% hoje</div>
        </div>

        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, borderLeft: '4px solid #00f2ea' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>📅</span>
            <h3 style={{ margin: 0, color: '#e4e6eb' }}>Agendados</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#00f2ea' }}>7</div>
          <div style={{ fontSize: 14, color: '#b0b3b8' }}>Próximos 7 dias</div>
        </div>
      </div>

      {/* Seção de Conexão de Contas */}
      <div style={{ background: '#23272f', borderRadius: 16, padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#e4e6eb', marginBottom: 24, textAlign: 'center' }}>
          🔗 Conecte suas Redes Sociais
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {socialPlatforms.map(platform => (
            <div key={platform.name} style={{ 
              background: connectedAccounts[platform.name.toLowerCase() as keyof typeof connectedAccounts] ? '#222e3c' : '#18191a',
              borderRadius: 12,
              padding: 24,
              border: `2px solid ${connectedAccounts[platform.name.toLowerCase() as keyof typeof connectedAccounts] ? platform.color : '#23272f'}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => !connectedAccounts[platform.name.toLowerCase() as keyof typeof connectedAccounts] && connectAccount(platform.name)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{platform.icon}</span>
                <div>
                  <h3 style={{ margin: 0, color: '#e4e6eb', fontSize: 18, fontWeight: 600 }}>{platform.name}</h3>
                  <div style={{ fontSize: 14, color: connectedAccounts[platform.name.toLowerCase() as keyof typeof connectedAccounts] ? '#4CAF50' : '#b0b3b8' }}>
                    {connectedAccounts[platform.name.toLowerCase() as keyof typeof connectedAccounts] ? '✅ Conectado' : '🔌 Conectar conta'}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: '#b0b3b8', lineHeight: 1.5 }}>
                {connectedAccounts[platform.name.toLowerCase() as keyof typeof connectedAccounts] 
                  ? `Sua conta do ${platform.name} está conectada e pronta para publicações automáticas!`
                  : `Clique para conectar sua conta do ${platform.name} e começar a publicar automaticamente.`
                }
              </div>
              {platform.name === 'Facebook' && connectedAccounts.facebook && facebookPages.length > 0 && (
                <div style={{ marginTop: 16, padding: 12, background: '#18191a', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#e4e6eb', fontSize: 14 }}>Suas Páginas:</h4>
                  {facebookPages.map(page => (
                    <div key={page.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(page.id)}
                        onChange={() => togglePageSelection(page.id)}
                        style={{ accentColor: '#1877F2' }}
                      />
                      <span style={{ color: '#e4e6eb', fontSize: 14 }}>{page.name}</span>
                      <span style={{ color: '#b0b3b8', fontSize: 12 }}>({page.category})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 