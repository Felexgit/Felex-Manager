import React from 'react';
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
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Notificações</h2>
        <button 
          className="btn-primary" 
          onClick={loadPageNotifications}
          disabled={selectedPages.length === 0 || loadingNotifications}
        >
          {loadingNotifications ? 'Carregando...' : 'Atualizar'}
        </button>
      </div>

      {selectedPages.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <h3>Nenhuma página selecionada</h3>
          <p>Selecione páginas na seção Home para ver notificações</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 20 }}>
          {selectedPages.map(pageId => {
            const page = facebookPages.find(p => p.id === pageId);
            const notifications = pageNotifications[pageId] || [];
            
            return (
              <div key={pageId} className="card">
                <h3 style={{ margin: '0 0 16px 0', color: '#1877F2' }}>{page?.name}</h3>
                
                {notifications.length > 0 ? (
                  <div style={{ display: 'grid', gap: 12 }}>
                    {notifications.map(notification => (
                      <div key={notification.id} style={{ 
                        border: '1px solid #3a3b3c', 
                        borderRadius: 8, 
                        padding: 16,
                        background: '#242526',
                        borderLeft: '4px solid #1877F2'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{notification.title}</h4>
                          <span style={{ fontSize: 12, color: '#b0b3b8' }}>
                            {new Date(notification.created_time).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 8px 0', fontSize: 14, color: '#e4e6eb' }}>
                          {notification.message}
                        </p>
                        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#b0b3b8' }}>
                          <span style={{ 
                            background: '#3a3b3c', 
                            padding: '2px 8px', 
                            borderRadius: 4 
                          }}>
                            {notification.type}
                          </span>
                          {notification.from && (
                            <span>De: {notification.from.name}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#b0b3b8', fontStyle: 'italic' }}>Nenhuma notificação encontrada</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 