import React from 'react';
import { FacebookPage, FacebookUser } from '../facebookApi';
import SmartConnections from './SmartConnections';

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
  const handleConnect = (platform: string) => {
    connectAccount(platform);
  };

  const handleDisconnect = (platform: string) => {
    console.log(`Desconectando ${platform}`);
    // Implementar lógica de desconexão
  };

  const handleRefresh = (platform: string) => {
    console.log(`Atualizando ${platform}`);
    // Implementar lógica de atualização
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
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, minWidth: 280, maxWidth: 340, flex: 1, borderTop: '4px solid #E4405F', boxShadow: '0 2px 12px #0004', position: 'relative' }}>
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
          {/* Botão de conectar Instagram */}
          <button
            style={{
              marginTop: 18,
              width: '100%',
              background: 'linear-gradient(90deg, #E4405F 60%, #fd1d1d 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #0003',
              letterSpacing: 1
            }}
            onClick={() => {
              const clientId = '1572473227491051';
              const redirectUri = encodeURIComponent('https://felex-manager.vercel.app/instagram-callback');
              const scope = 'instagram_basic,instagram_manage_insights,pages_show_list';
              const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=ig_connect`;
              window.location.href = authUrl;
            }}
          >
            Conectar Instagram
          </button>
        </div>
        {/* WhatsApp */}
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24, minWidth: 280, maxWidth: 340, flex: 1, borderTop: '4px solid #25D366', boxShadow: '0 2px 12px #0004', position: 'relative' }}>
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
          {/* Botão de conectar WhatsApp */}
          <button
            style={{
              marginTop: 18,
              width: '100%',
              background: 'linear-gradient(90deg, #25D366 60%, #128C7E 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #0003',
              letterSpacing: 1
            }}
            onClick={() => {
              const clientId = '3131820566980255';
              const redirectUri = encodeURIComponent('https://felex-manager.vercel.app/whatsapp-callback');
              const scope = 'whatsapp_business_management,whatsapp_business_messaging,pages_show_list';
              const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=wa_connect`;
              window.location.href = authUrl;
            }}
          >
            Conectar WhatsApp
          </button>
        </div>
      </div>

      {/* Seção de Conexões Inteligentes */}
      <SmartConnections 
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onRefresh={handleRefresh}
      />
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