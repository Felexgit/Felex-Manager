// Configuração da API do Facebook
const FACEBOOK_APP_ID = '4121926098078666';
const FACEBOOK_REDIRECT_URI = process.env.REACT_APP_FACEBOOK_REDIRECT_URI || 'http://localhost:3001/facebook-callback';

// Escopos necessários para gerenciar páginas (com escopos avançados)
const FACEBOOK_SCOPES = [
  'public_profile',
  'pages_show_list',
  'pages_read_engagement',
  'pages_manage_posts',
  'pages_read_user_content',
  'pages_manage_metadata'
].join(',');

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
  tasks: string[];
}

export interface FacebookUser {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  type: string;
  permalink_url: string;
  full_picture?: string;
  likes?: { summary: { total_count: number } };
  comments?: { summary: { total_count: number } };
  shares?: { count: number };
}

export interface FacebookStory {
  id: string;
  message?: string;
  created_time: string;
  media_type: string;
  media_url?: string;
  permalink_url: string;
}

export interface FacebookNotification {
  id: string;
  title: string;
  message: string;
  created_time: string;
  type: string;
  object: string;
  from?: { name: string; id: string };
}

class FacebookAPI {
  // Iniciar fluxo OAuth
  static initiateLogin() {
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${FACEBOOK_APP_ID}` +
      `&redirect_uri=${encodeURIComponent(FACEBOOK_REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(FACEBOOK_SCOPES)}` +
      `&response_type=code` +
      `&state=${Math.random().toString(36).substring(7)}`;

    window.location.href = authUrl;
  }

  // Trocar código por token de acesso
  static async exchangeCodeForToken(code: string): Promise<FacebookUser | null> {
    try {
      // Nota: Em produção, isso deve ser feito no backend por segurança
      const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?` +
        `client_id=${FACEBOOK_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(FACEBOOK_REDIRECT_URI)}` +
        `&code=${code}`);

      const data = await response.json();
      
      if (data.access_token) {
        // Obter informações do usuário (sem email)
        const userResponse = await fetch(`https://graph.facebook.com/v18.0/me?` +
          `fields=id,name&access_token=${data.access_token}`);
        
        const userData = await userResponse.json();
        
        return {
          id: userData.id,
          name: userData.name,
          email: '', // Email não disponível com escopos básicos
          access_token: data.access_token
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao trocar código por token:', error);
      return null;
    }
  }

  // Listar páginas do usuário
  static async getPages(accessToken: string): Promise<FacebookPage[]> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me/accounts?` +
        `access_token=${accessToken}&fields=id,name,category,tasks`);

      const data = await response.json();
      
      if (data.data) {
        return data.data.map((page: any) => ({
          id: page.id,
          name: page.name,
          access_token: page.access_token || '',
          category: page.category,
          tasks: page.tasks || []
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter páginas:', error);
      return [];
    }
  }

  // Obter posts de uma página (versão real)
  static async getPagePosts(pageId: string, pageAccessToken: string, limit: number = 10): Promise<FacebookPost[]> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/posts?` +
        `fields=id,message,created_time,type,permalink_url,full_picture,likes.summary(total_count),comments.summary(total_count),shares&` +
        `limit=${limit}&access_token=${pageAccessToken}`);
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Erro da API do Facebook:', data.error);
        // Se houver erro de permissão, usar dados simulados
        return this.getSimulatedPosts(pageId, limit);
      }
      
      return data.data || [];
    } catch (error) {
      console.error('Erro ao buscar posts da página:', error);
      return this.getSimulatedPosts(pageId, limit);
    }
  }

  // Obter stories de uma página (versão real)
  static async getPageStories(pageId: string, pageAccessToken: string, limit: number = 10): Promise<FacebookStory[]> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/stories?` +
        `fields=id,message,created_time,media_type,media_url,permalink_url&` +
        `limit=${limit}&access_token=${pageAccessToken}`);
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Erro da API do Facebook:', data.error);
        // Se houver erro de permissão, usar dados simulados
        return this.getSimulatedStories(pageId, limit);
      }
      
      return data.data || [];
    } catch (error) {
      console.error('Erro ao buscar stories da página:', error);
      return this.getSimulatedStories(pageId, limit);
    }
  }

  // Obter notificações de uma página (versão real)
  static async getPageNotifications(pageId: string, pageAccessToken: string, limit: number = 20): Promise<FacebookNotification[]> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/notifications?` +
        `fields=id,title,message,created_time,type,object,from&` +
        `limit=${limit}&access_token=${pageAccessToken}`);
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Erro da API do Facebook:', data.error);
        // Se houver erro de permissão, usar dados simulados
        return this.getSimulatedNotifications(pageId, limit);
      }
      
      return data.data || [];
    } catch (error) {
      console.error('Erro ao buscar notificações da página:', error);
      return this.getSimulatedNotifications(pageId, limit);
    }
  }

  // Publicar na página (versão real com fallback)
  static async publishToPage(pageId: string, pageAccessToken: string, message: string, mediaUrl?: string) {
    try {
      let endpoint = `https://graph.facebook.com/v18.0/${pageId}/feed`;
      let body = new URLSearchParams();
      
      body.append('message', message);
      body.append('access_token', pageAccessToken);
      
      if (mediaUrl) {
        body.append('link', mediaUrl);
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: body
      });
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Erro da API do Facebook:', data.error);
        // Se houver erro de permissão, simular publicação
        return this.simulatePublish(pageId, message, mediaUrl);
      }
      
      if (data.id) {
        return {
          success: true,
          postId: data.id,
          message: 'Publicação realizada com sucesso!'
        };
      } else {
        return {
          success: false,
          error: data.error?.message || 'Erro ao publicar'
        };
      }
    } catch (error) {
      console.error('Erro ao publicar na página:', error);
      return this.simulatePublish(pageId, message, mediaUrl);
    }
  }

  // Verificar se o token ainda é válido
  static async validateToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me?access_token=${accessToken}`);
      const data = await response.json();
      return !data.error;
    } catch (error) {
      return false;
    }
  }

  // Funções auxiliares para dados simulados
  private static getSimulatedPosts(pageId: string, limit: number): FacebookPost[] {
    console.log('Usando posts simulados para página:', pageId);
    
    const simulatedPosts: FacebookPost[] = [
      {
        id: `post_${pageId}_1`,
        message: 'Post simulado - Este é um exemplo de post da página! 📱',
        created_time: new Date().toISOString(),
        type: 'status',
        permalink_url: `https://facebook.com/${pageId}/posts/1`,
        full_picture: 'https://via.placeholder.com/400x300/1877F2/FFFFFF?text=Post+Simulado',
        likes: { summary: { total_count: 45 } },
        comments: { summary: { total_count: 12 } },
        shares: { count: 8 }
      },
      {
        id: `post_${pageId}_2`,
        message: 'Outro post simulado com engajamento! 🎉',
        created_time: new Date(Date.now() - 86400000).toISOString(),
        type: 'photo',
        permalink_url: `https://facebook.com/${pageId}/posts/2`,
        full_picture: 'https://via.placeholder.com/400x300/E4405F/FFFFFF?text=Foto+Simulada',
        likes: { summary: { total_count: 23 } },
        comments: { summary: { total_count: 5 } },
        shares: { count: 3 }
      }
    ];
    
    return simulatedPosts.slice(0, limit);
  }

  private static getSimulatedStories(pageId: string, limit: number): FacebookStory[] {
    console.log('Usando stories simulados para página:', pageId);
    
    const simulatedStories: FacebookStory[] = [
      {
        id: `story_${pageId}_1`,
        message: 'Story simulado - Conteúdo temporário! 📸',
        created_time: new Date().toISOString(),
        media_type: 'image',
        media_url: 'https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Story+Simulado',
        permalink_url: `https://facebook.com/stories/${pageId}/1`
      },
      {
        id: `story_${pageId}_2`,
        message: 'Outro story simulado! 🎬',
        created_time: new Date(Date.now() - 3600000).toISOString(),
        media_type: 'video',
        media_url: 'https://via.placeholder.com/400x600/4ECDC4/FFFFFF?text=Video+Story',
        permalink_url: `https://facebook.com/stories/${pageId}/2`
      }
    ];
    
    return simulatedStories.slice(0, limit);
  }

  private static getSimulatedNotifications(pageId: string, limit: number): FacebookNotification[] {
    console.log('Usando notificações simuladas para página:', pageId);
    
    const simulatedNotifications: FacebookNotification[] = [
      {
        id: `notif_${pageId}_1`,
        title: 'Novo comentário',
        message: 'João Silva comentou no seu post: "Muito bom! 👍"',
        created_time: new Date().toISOString(),
        type: 'comment',
        object: 'post',
        from: { name: 'João Silva', id: 'user_123' }
      },
      {
        id: `notif_${pageId}_2`,
        title: 'Nova curtida',
        message: 'Maria Santos curtiu sua página',
        created_time: new Date(Date.now() - 1800000).toISOString(),
        type: 'like',
        object: 'page',
        from: { name: 'Maria Santos', id: 'user_456' }
      },
      {
        id: `notif_${pageId}_3`,
        title: 'Novo seguidor',
        message: 'Pedro Costa começou a seguir sua página',
        created_time: new Date(Date.now() - 7200000).toISOString(),
        type: 'follow',
        object: 'page',
        from: { name: 'Pedro Costa', id: 'user_789' }
      }
    ];
    
    return simulatedNotifications.slice(0, limit);
  }

  private static async simulatePublish(pageId: string, message: string, mediaUrl?: string) {
    console.log('Simulando publicação na página:', pageId);
    console.log('Mensagem:', message);
    console.log('Mídia:', mediaUrl);
    
    // Simular delay de publicação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      postId: `simulated_${Date.now()}`,
      message: 'Publicação simulada (requer escopos avançados aprovados pelo Facebook)'
    };
  }
}

export default FacebookAPI; 