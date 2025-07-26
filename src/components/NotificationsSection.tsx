import React, { useState } from 'react';
import { FacebookPage, FacebookNotification } from '../facebookApi';

interface NotificationsSectionProps {
  selectedPages: string[];
  facebookPages: FacebookPage[];
  pageNotifications: { [pageId: string]: FacebookNotification[] };
  loadingNotifications: boolean;
  loadPageNotifications: () => void;
}

export default function NotificationsSection({
  selectedPages,
  facebookPages,
  pageNotifications,
  loadingNotifications,
  loadPageNotifications
}: NotificationsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'facebook' | 'instagram' | 'whatsapp'>('all');

  // Simular notificações do Instagram e WhatsApp (em produção, viriam das APIs reais)
  const instagramNotifications = [
    {
      id: 'ig_1',
      title: 'Novo comentário no post',
      message: 'Maria Silva comentou: "Adorei o conteúdo! 👏"',
      created_time: new Date().toISOString(),
      type: 'comment',
      platform: 'instagram',
      icon: '📷',
      from: { name: 'Maria Silva', id: 'user_123' }
    },
    {
      id: 'ig_2',
      title: 'Novo seguidor',
      message: 'João Costa começou a seguir sua conta',
      created_time: new Date(Date.now() - 3600000).toISOString(),
      type: 'follow',
      platform: 'instagram',
      icon: '📷',
      from: { name: 'João Costa', id: 'user_456' }
    }
  ];

  const whatsappNotifications = [
    {
      id: 'wa_1',
      title: 'Nova mensagem',
      message: 'Pedro Santos: "Olá! Gostaria de saber mais sobre seus produtos"',
      created_time: new Date(Date.now() - 1800000).toISOString(),
      type: 'message',
      platform: 'whatsapp',
      icon: '💬',
      from: { name: 'Pedro Santos', id: 'user_789' }
    },
    {
      id: 'wa_2',
      title: 'Mensagem lida',
      message: 'Ana Oliveira leu sua mensagem sobre promoção',
      created_time: new Date(Date.now() - 7200000).toISOString(),
      type: 'read',
      platform: 'whatsapp',
      icon: '💬',
      from: { name: 'Ana Oliveira', id: 'user_101' }
    }
  ];

  // Combinar todas as notificações
  const allNotifications = [
    ...Object.values(pageNotifications).flat().map(n => ({ ...n, platform: 'facebook', icon: '📘' })),
    ...instagramNotifications,
    ...whatsappNotifications
  ].sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());

  // Filtrar notificações
  const filteredNotifications = activeFilter === 'all' 
    ? allNotifications 
    : allNotifications.filter(n => n.platform === activeFilter);

  const getNotificationColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return '#1877F2';
      case 'instagram': return '#E4405F';
      case 'whatsapp': return '#25D366';
      default: return '#1877F2';
    }
  };

  const getNotificationIcon = (type: string, platform: string) => {
    switch (type) {
      case 'comment': return '💬';
      case 'like': return '❤️';
      case 'follow': return '👥';
      case 'message': return '💬';
      case 'read': return '👁️';
      default: return '📢';
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header com filtros */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#e4e6eb' }}>
            🔔 Notificações
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#b0b3b8', fontSize: 16 }}>
            {filteredNotifications.length} notificação{filteredNotifications.length !== 1 ? 'es' : ''} encontrada{filteredNotifications.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button 
            style={{
              background: activeFilter === 'all' ? '#1877F2' : '#3a3b3c',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setActiveFilter('all')}
          >
            Todas
          </button>
          <button 
            style={{
              background: activeFilter === 'facebook' ? '#1877F2' : '#3a3b3c',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setActiveFilter('facebook')}
          >
            📘 Facebook
          </button>
          <button 
            style={{
              background: activeFilter === 'instagram' ? '#E4405F' : '#3a3b3c',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setActiveFilter('instagram')}
          >
            📷 Instagram
          </button>
          <button 
            style={{
              background: activeFilter === 'whatsapp' ? '#25D366' : '#3a3b3c',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setActiveFilter('whatsapp')}
          >
            💬 WhatsApp
          </button>
        </div>
      </div>

      {/* Botão de atualizar */}
      <div style={{ marginBottom: 24 }}>
        <button 
          style={{
            background: 'linear-gradient(90deg, #1877F2 60%, #42a5f5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #1877f222',
            transition: 'background 0.2s'
          }}
          onClick={loadPageNotifications}
          disabled={loadingNotifications}
        >
          {loadingNotifications ? '🔄 Atualizando...' : '🔄 Atualizar Notificações'}
        </button>
      </div>

      {/* Lista de notificações */}
      {filteredNotifications.length === 0 ? (
        <div style={{ 
          background: '#23272f', 
          borderRadius: 16, 
          padding: 40, 
          textAlign: 'center',
          border: '2px dashed #3a3b3c'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔕</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#e4e6eb' }}>
            Nenhuma notificação encontrada
          </h3>
          <p style={{ color: '#b0b3b8', margin: 0 }}>
            {activeFilter === 'all' 
              ? 'Conecte suas redes sociais para ver notificações'
              : `Nenhuma notificação do ${activeFilter} encontrada`
            }
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredNotifications.map(notification => (
            <div key={notification.id} style={{ 
              background: '#23272f',
              borderRadius: 12,
              padding: 20,
              border: `2px solid ${getNotificationColor(notification.platform)}`,
              boxShadow: '0 2px 8px #0002',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0004';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px #0002';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ 
                  background: getNotificationColor(notification.platform),
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0
                }}>
                  {getNotificationIcon(notification.type, notification.platform)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h4 style={{ 
                      margin: 0, 
                      fontSize: 16, 
                      fontWeight: 600, 
                      color: '#e4e6eb',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}>
                      {notification.title}
                      <span style={{ fontSize: 14, color: getNotificationColor(notification.platform) }}>
                        {notification.icon}
                      </span>
                    </h4>
                    <span style={{ 
                      fontSize: 12, 
                      color: '#b0b3b8',
                      background: '#3a3b3c',
                      padding: '4px 8px',
                      borderRadius: 4
                    }}>
                      {new Date(notification.created_time).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: 14, 
                    color: '#e4e6eb',
                    lineHeight: 1.5
                  }}>
                    {notification.message}
                  </p>
                  
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ 
                      background: getNotificationColor(notification.platform),
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 500,
                      textTransform: 'capitalize'
                    }}>
                      {notification.type}
                    </span>
                    {notification.from && (
                      <span style={{ fontSize: 12, color: '#b0b3b8' }}>
                        De: {notification.from.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 