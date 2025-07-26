import React, { useState, useEffect } from 'react';

interface ConnectionStatus {
  platform: string;
  connected: boolean;
  lastSync?: string;
  metrics?: {
    posts: number;
    reach: number;
    engagement: number;
    scheduled: number;
  };
  error?: string;
}

interface SmartConnectionsProps {
  onConnect: (platform: string) => void;
  onDisconnect: (platform: string) => void;
  onRefresh: (platform: string) => void;
}

export default function SmartConnections({ onConnect, onDisconnect, onRefresh }: SmartConnectionsProps) {
  const [connections, setConnections] = useState<ConnectionStatus[]>([
    {
      platform: 'facebook',
      connected: false,
      metrics: { posts: 0, reach: 0, engagement: 0, scheduled: 0 }
    },
    {
      platform: 'instagram',
      connected: false,
      metrics: { posts: 0, reach: 0, engagement: 0, scheduled: 0 }
    },
    {
      platform: 'whatsapp',
      connected: false,
      metrics: { posts: 0, reach: 0, engagement: 0, scheduled: 0 }
    }
  ]);

  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const platformConfig = {
    facebook: {
      name: 'Facebook',
      icon: '📘',
      color: '#1877F2',
      gradient: 'linear-gradient(135deg, #1877F2 0%, #42a5f5 100%)',
      description: 'Gerencie páginas, posts e engajamento'
    },
    instagram: {
      name: 'Instagram',
      icon: '📷',
      color: '#E4405F',
      gradient: 'linear-gradient(135deg, #E4405F 0%, #fd1d1d 100%)',
      description: 'Stories, posts e insights de negócio'
    },
    whatsapp: {
      name: 'WhatsApp Business',
      icon: '💬',
      color: '#25D366',
      gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
      description: 'Mensagens, campanhas e automação'
    }
  };

  const handleConnect = async (platform: string) => {
    setIsConnecting(platform);
    try {
      // Simular processo de conexão
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar status da conexão
      setConnections(prev => prev.map(conn => 
        conn.platform === platform 
          ? { 
              ...conn, 
              connected: true, 
              lastSync: new Date().toISOString(),
              metrics: {
                posts: Math.floor(Math.random() * 50) + 10,
                reach: Math.floor(Math.random() * 10000) + 1000,
                engagement: Math.floor(Math.random() * 2000) + 200,
                scheduled: Math.floor(Math.random() * 10) + 1
              }
            }
          : conn
      ));
      
      onConnect(platform);
    } catch (error) {
      setConnections(prev => prev.map(conn => 
        conn.platform === platform 
          ? { ...conn, error: 'Erro na conexão' }
          : conn
      ));
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = (platform: string) => {
    setConnections(prev => prev.map(conn => 
      conn.platform === platform 
        ? { ...conn, connected: false, lastSync: undefined, metrics: undefined }
        : conn
    ));
    onDisconnect(platform);
  };

  const handleRefresh = async (platform: string) => {
    const connection = connections.find(c => c.platform === platform);
    if (!connection?.connected) return;

    // Simular atualização de métricas
    setConnections(prev => prev.map(conn => 
      conn.platform === platform 
        ? { 
            ...conn, 
            lastSync: new Date().toISOString(),
            metrics: {
              posts: Math.floor(Math.random() * 50) + 10,
              reach: Math.floor(Math.random() * 10000) + 1000,
              engagement: Math.floor(Math.random() * 2000) + 200,
              scheduled: Math.floor(Math.random() * 10) + 1
            }
          }
        : conn
    ));
    
    onRefresh(platform);
  };

  const getConnectionStatus = (platform: string) => {
    const connection = connections.find(c => c.platform === platform);
    return connection;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header Inteligente */}
      <div style={{ 
        background: 'linear-gradient(135deg, #181c2f 0%, #23272f 100%)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        border: '1px solid #3a3b3c'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#e4e6eb' }}>
              🚀 Conexões Inteligentes
            </h2>
            <p style={{ margin: '4px 0 0 0', color: '#b0b3b8', fontSize: 14 }}>
              Gerencie todas as suas redes sociais de forma eficiente
            </p>
          </div>
          <button
            style={{
              background: showAnalytics ? '#1877F2' : '#3a3b3c',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            {showAnalytics ? '📊 Ocultar Analytics' : '📊 Ver Analytics'}
          </button>
        </div>

        {/* Status Geral */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
          {connections.map(conn => {
            const config = platformConfig[conn.platform as keyof typeof platformConfig];
            return (
              <div key={conn.platform} style={{
                background: conn.connected ? config.gradient : '#3a3b3c',
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{config.icon}</div>
                <div style={{ 
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: conn.connected ? '#fff' : '#b0b3b8'
                }}>
                  {conn.connected ? 'Conectado' : 'Desconectado'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cards de Conexão */}
      <div style={{ display: 'grid', gap: 20 }}>
        {Object.entries(platformConfig).map(([platform, config]) => {
          const connection = getConnectionStatus(platform);
          const isConnecting = isConnecting === platform;

          return (
            <div key={platform} style={{
              background: '#23272f',
              borderRadius: 16,
              padding: 24,
              border: `2px solid ${connection?.connected ? config.color : '#3a3b3c'}`,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background Gradient */}
              {connection?.connected && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: config.gradient
                }} />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    background: connection?.connected ? config.gradient : '#3a3b3c',
                    borderRadius: '50%',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    transition: 'all 0.3s ease'
                  }}>
                    {isConnecting ? '🔄' : config.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 600, color: '#e4e6eb' }}>
                      {config.name}
                    </h3>
                    <p style={{ margin: 0, color: '#b0b3b8', fontSize: 14 }}>
                      {config.description}
                    </p>
                    {connection?.lastSync && (
                      <p style={{ margin: '4px 0 0 0', color: '#1877F2', fontSize: 12 }}>
                        Última sincronização: {new Date(connection.lastSync).toLocaleString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  {connection?.connected ? (
                    <>
                      <button
                        style={{
                          background: '#3a3b3c',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 12px',
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onClick={() => handleRefresh(platform)}
                      >
                        🔄 Atualizar
                      </button>
                      <button
                        style={{
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 12px',
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onClick={() => handleDisconnect(platform)}
                      >
                        ❌ Desconectar
                      </button>
                    </>
                  ) : (
                    <button
                      style={{
                        background: config.gradient,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '12px 24px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: isConnecting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        opacity: isConnecting ? 0.7 : 1
                      }}
                      onClick={() => !isConnecting && handleConnect(platform)}
                      disabled={isConnecting}
                    >
                      {isConnecting ? 'Conectando...' : '🔗 Conectar'}
                    </button>
                  )}
                </div>
              </div>

              {/* Analytics */}
              {showAnalytics && connection?.connected && connection.metrics && (
                <div style={{
                  background: '#181c2f',
                  borderRadius: 12,
                  padding: 20,
                  marginTop: 16
                }}>
                  <h4 style={{ margin: '0 0 16px 0', color: '#e4e6eb', fontSize: 16 }}>
                    📊 Métricas em Tempo Real
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: config.color }}>
                        {formatNumber(connection.metrics.posts)}
                      </div>
                      <div style={{ fontSize: 12, color: '#b0b3b8' }}>Publicações</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: config.color }}>
                        {formatNumber(connection.metrics.reach)}
                      </div>
                      <div style={{ fontSize: 12, color: '#b0b3b8' }}>Alcance</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: config.color }}>
                        {formatNumber(connection.metrics.engagement)}
                      </div>
                      <div style={{ fontSize: 12, color: '#b0b3b8' }}>Engajamento</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: config.color }}>
                        {connection.metrics.scheduled}
                      </div>
                      <div style={{ fontSize: 12, color: '#b0b3b8' }}>Agendados</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status de Erro */}
              {connection?.error && (
                <div style={{
                  background: '#dc3545',
                  color: '#fff',
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 16,
                  fontSize: 14
                }}>
                  ⚠️ {connection.error}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dicas Inteligentes */}
      <div style={{
        background: 'linear-gradient(135deg, #1877F2 0%, #42a5f5 100%)',
        borderRadius: 16,
        padding: 20,
        marginTop: 24,
        color: '#fff'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600 }}>
          💡 Dicas Inteligentes
        </h4>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6 }}>
          <li>Conecte todas as redes para sincronização automática</li>
          <li>Use o modo Analytics para acompanhar métricas em tempo real</li>
          <li>Atualize regularmente para dados sempre precisos</li>
        </ul>
      </div>
    </div>
  );
} 