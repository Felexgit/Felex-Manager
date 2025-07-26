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

      {/* Avatar do usuário acima dos containers */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        {facebookUser && (
          <img
            src={`https://graph.facebook.com/${facebookUser.id}/picture?type=large`}
            alt="Avatar"
            style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid #1877f2', background: '#181c2f', objectFit: 'cover', boxShadow: '0 2px 12px #0008' }}
          />
        )}
      </div>

      {/* Containers horizontais para cada rede */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginBottom: 32 }}>
        {/* Facebook */}
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, minWidth: 280, maxWidth: 340, flex: 1, borderTop: '4px solid #1877F2', boxShadow: '0 2px 12px #0004' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>📘</span>
            <h3 style={{ margin: 0, color: '#e4e6eb', fontSize: 20 }}>Facebook</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <KPI label="Total de Publicações" value={24} color="#1877F2" />
            <KPI label="Alcance Total" value="15.2K" color="#42a5f5" />
            <KPI label="Engajamento" value="2.8K" color="#00f2ea" />
            <KPI label="Agendados" value={7} color="#4CAF50" />
          </div>
        </div>
        {/* Instagram */}
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, minWidth: 280, maxWidth: 340, flex: 1, borderTop: '4px solid #E4405F', boxShadow: '0 2px 12px #0004' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>📷</span>
            <h3 style={{ margin: 0, color: '#e4e6eb', fontSize: 20 }}>Instagram</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <KPI label="Total de Publicações" value={12} color="#E4405F" />
            <KPI label="Alcance Total" value="8.1K" color="#f77737" />
            <KPI label="Engajamento" value="1.9K" color="#fd1d1d" />
            <KPI label="Agendados" value={3} color="#4CAF50" />
          </div>
        </div>
        {/* WhatsApp */}
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, minWidth: 280, maxWidth: 340, flex: 1, borderTop: '4px solid #25D366', boxShadow: '0 2px 12px #0004' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>💬</span>
            <h3 style={{ margin: 0, color: '#e4e6eb', fontSize: 20 }}>WhatsApp</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <KPI label="Total de Mensagens" value={58} color="#25D366" />
            <KPI label="Alcance Total" value="2.3K" color="#128C7E" />
            <KPI label="Engajamento" value="1.1K" color="#075E54" />
            <KPI label="Agendados" value={2} color="#4CAF50" />
          </div>
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

// Adicionar componente KPI auxiliar no final do arquivo
function KPI({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{ background: '#181c2f', borderRadius: 10, padding: '16px 10px', textAlign: 'center', boxShadow: '0 1px 6px #0002' }}>
      <div style={{ color, fontWeight: 700, fontSize: 22, marginBottom: 4 }}>{value}</div>
      <div style={{ color: '#b0b3b8', fontSize: 13 }}>{label}</div>
    </div>
  );
} 