import { useState, useEffect, useCallback } from 'react';

export interface SocialConnection {
  platform: string;
  connected: boolean;
  accessToken?: string;
  userId?: string;
  lastSync?: string;
  error?: string;
  metadata?: {
    name?: string;
    email?: string;
    picture?: string;
  };
}

export interface SocialMetrics {
  platform: string;
  posts: number;
  reach: number;
  engagement: number;
  scheduled: number;
  followers?: number;
  views?: number;
}

export const useSocialConnections = () => {
  const [connections, setConnections] = useState<SocialConnection[]>([
    { platform: 'facebook', connected: false },
    { platform: 'instagram', connected: false },
    { platform: 'whatsapp', connected: false }
  ]);

  const [metrics, setMetrics] = useState<SocialMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar conexões salvas do localStorage
  useEffect(() => {
    const savedConnections = localStorage.getItem('socialConnections');
    if (savedConnections) {
      try {
        const parsed = JSON.parse(savedConnections);
        setConnections(parsed);
      } catch (error) {
        console.error('Erro ao carregar conexões:', error);
      }
    }
  }, []);

  // Salvar conexões no localStorage
  const saveConnections = useCallback((newConnections: SocialConnection[]) => {
    localStorage.setItem('socialConnections', JSON.stringify(newConnections));
  }, []);

  // Conectar rede social
  const connectPlatform = useCallback(async (platform: string, accessToken: string, metadata?: any) => {
    setIsLoading(true);
    try {
      const updatedConnections = connections.map(conn =>
        conn.platform === platform
          ? {
              ...conn,
              connected: true,
              accessToken,
              lastSync: new Date().toISOString(),
              metadata,
              error: undefined
            }
          : conn
      );

      setConnections(updatedConnections);
      saveConnections(updatedConnections);

      // Buscar métricas iniciais
      await fetchMetrics(platform, accessToken);

      return true;
    } catch (error) {
      console.error(`Erro ao conectar ${platform}:`, error);
      
      const updatedConnections = connections.map(conn =>
        conn.platform === platform
          ? { ...conn, error: 'Erro na conexão' }
          : conn
      );
      
      setConnections(updatedConnections);
      saveConnections(updatedConnections);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connections, saveConnections]);

  // Desconectar rede social
  const disconnectPlatform = useCallback((platform: string) => {
    const updatedConnections = connections.map(conn =>
      conn.platform === platform
        ? {
            ...conn,
            connected: false,
            accessToken: undefined,
            userId: undefined,
            lastSync: undefined,
            error: undefined,
            metadata: undefined
          }
        : conn
    );

    setConnections(updatedConnections);
    saveConnections(updatedConnections);

    // Remover métricas da plataforma
    setMetrics(prev => prev.filter(m => m.platform !== platform));
  }, [connections, saveConnections]);

  // Buscar métricas de uma plataforma
  const fetchMetrics = useCallback(async (platform: string, accessToken: string) => {
    try {
      let platformMetrics: SocialMetrics;

      switch (platform) {
        case 'facebook':
          platformMetrics = await fetchFacebookMetrics(accessToken);
          break;
        case 'instagram':
          platformMetrics = await fetchInstagramMetrics(accessToken);
          break;
        case 'whatsapp':
          platformMetrics = await fetchWhatsAppMetrics(accessToken);
          break;
        default:
          throw new Error(`Plataforma não suportada: ${platform}`);
      }

      setMetrics(prev => {
        const filtered = prev.filter(m => m.platform !== platform);
        return [...filtered, platformMetrics];
      });

      return platformMetrics;
    } catch (error) {
      console.error(`Erro ao buscar métricas do ${platform}:`, error);
      throw error;
    }
  }, []);

  // Atualizar métricas de todas as plataformas conectadas
  const refreshAllMetrics = useCallback(async () => {
    setIsLoading(true);
    try {
      const connectedPlatforms = connections.filter(conn => conn.connected && conn.accessToken);
      
      const metricsPromises = connectedPlatforms.map(conn =>
        fetchMetrics(conn.platform, conn.accessToken!)
      );

      const newMetrics = await Promise.all(metricsPromises);
      setMetrics(newMetrics);

      // Atualizar lastSync
      const updatedConnections = connections.map(conn =>
        conn.connected
          ? { ...conn, lastSync: new Date().toISOString() }
          : conn
      );
      
      setConnections(updatedConnections);
      saveConnections(updatedConnections);

    } catch (error) {
      console.error('Erro ao atualizar métricas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [connections, fetchMetrics, saveConnections]);

  // Buscar métricas do Facebook
  const fetchFacebookMetrics = async (accessToken: string): Promise<SocialMetrics> => {
    try {
      // Simular chamada à API do Facebook
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        platform: 'facebook',
        posts: Math.floor(Math.random() * 50) + 10,
        reach: Math.floor(Math.random() * 10000) + 1000,
        engagement: Math.floor(Math.random() * 2000) + 200,
        scheduled: Math.floor(Math.random() * 10) + 1,
        followers: Math.floor(Math.random() * 5000) + 500
      };
    } catch (error) {
      throw new Error('Erro ao buscar métricas do Facebook');
    }
  };

  // Buscar métricas do Instagram
  const fetchInstagramMetrics = async (accessToken: string): Promise<SocialMetrics> => {
    try {
      // Simular chamada à API do Instagram
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        platform: 'instagram',
        posts: Math.floor(Math.random() * 30) + 5,
        reach: Math.floor(Math.random() * 8000) + 500,
        engagement: Math.floor(Math.random() * 1500) + 100,
        scheduled: Math.floor(Math.random() * 5) + 1,
        followers: Math.floor(Math.random() * 3000) + 300
      };
    } catch (error) {
      throw new Error('Erro ao buscar métricas do Instagram');
    }
  };

  // Buscar métricas do WhatsApp
  const fetchWhatsAppMetrics = async (accessToken: string): Promise<SocialMetrics> => {
    try {
      // Simular chamada à API do WhatsApp
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        platform: 'whatsapp',
        posts: Math.floor(Math.random() * 20) + 3,
        reach: Math.floor(Math.random() * 5000) + 200,
        engagement: Math.floor(Math.random() * 1000) + 50,
        scheduled: Math.floor(Math.random() * 3) + 1,
        views: Math.floor(Math.random() * 2000) + 100
      };
    } catch (error) {
      throw new Error('Erro ao buscar métricas do WhatsApp');
    }
  };

  // Verificar se uma plataforma está conectada
  const isConnected = useCallback((platform: string) => {
    return connections.find(conn => conn.platform === platform)?.connected || false;
  }, [connections]);

  // Obter métricas de uma plataforma
  const getMetrics = useCallback((platform: string) => {
    return metrics.find(m => m.platform === platform);
  }, [metrics]);

  // Obter todas as métricas
  const getAllMetrics = useCallback(() => {
    return metrics;
  }, [metrics]);

  return {
    connections,
    metrics,
    isLoading,
    connectPlatform,
    disconnectPlatform,
    refreshAllMetrics,
    isConnected,
    getMetrics,
    getAllMetrics
  };
}; 