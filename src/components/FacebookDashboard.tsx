import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface FacebookDashboardProps {
  facebookUser: any;
  setFacebookUser: (user: any) => void;
  isConnecting: boolean;
  setIsConnecting: (loading: boolean) => void;
  connectFacebook: () => void;
}

interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  likes: number;
  comments: number;
  shares: number;
  type: 'text' | 'image' | 'video';
  media_url?: string;
}

interface FacebookMessage {
  id: string;
  from: { name: string; id: string };
  message: string;
  created_time: string;
  read: boolean;
}

export default function FacebookDashboard({
  facebookUser,
  setFacebookUser,
  isConnecting,
  setIsConnecting,
  connectFacebook
}: FacebookDashboardProps) {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [messages, setMessages] = useState<FacebookMessage[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'messages' | 'create'>('overview');
  const [newPost, setNewPost] = useState({ message: '', type: 'text' as 'text' | 'image' | 'video', media: null as File | null });
  const [creatingPost, setCreatingPost] = useState(false);

  // Verificar callback do Facebook OAuth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state === 'fb_connect') {
      handleFacebookCallback(code);
      // Limpar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleFacebookCallback = async (code: string) => {
    try {
      // Simular troca de código por token (em produção, isso seria feito no backend)
      const mockUser = {
        id: 'user_123',
        name: 'Usuário Facebook',
        email: 'user@facebook.com',
        access_token: 'mock_access_token_' + Math.random().toString(36).substr(2, 9),
        picture: `https://graph.facebook.com/user_123/picture?type=large`
      };
      
      setFacebookUser(mockUser);
      
      // Salvar no Supabase
      const { error } = await supabase
        .from('facebook_connections')
        .upsert({
          user_id: mockUser.id,
          access_token: mockUser.access_token,
          user_data: mockUser
        });
      
      if (error) console.error('Erro ao salvar conexão:', error);
      
      // Carregar dados iniciais
      loadUserData();
    } catch (error) {
      console.error('Erro no callback:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const loadUserData = async () => {
    if (!facebookUser) return;
    
    setLoadingPosts(true);
    setLoadingMessages(true);
    
    try {
      // Simular carregamento de posts reais
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockPosts: FacebookPost[] = [
        {
          id: 'post_1',
          message: 'Acabei de lançar meu novo produto! 🚀 Estou muito animado com essa novidade.',
          created_time: new Date().toISOString(),
          likes: 45,
          comments: 12,
          shares: 8,
          type: 'text'
        },
        {
          id: 'post_2',
          message: 'Dica do dia: Como aumentar sua produtividade em 300% 📈',
          created_time: new Date(Date.now() - 86400000).toISOString(),
          likes: 89,
          comments: 23,
          shares: 15,
          type: 'image',
          media_url: 'https://via.placeholder.com/400x300/1877f2/ffffff?text=Produtividade'
        },
        {
          id: 'post_3',
          message: 'Vídeo tutorial: Como configurar seu ambiente de trabalho ideal',
          created_time: new Date(Date.now() - 172800000).toISOString(),
          likes: 156,
          comments: 34,
          shares: 28,
          type: 'video',
          media_url: 'https://via.placeholder.com/400x300/25d366/ffffff?text=Vídeo+Tutorial'
        }
      ];
      
      const mockMessages: FacebookMessage[] = [
        {
          id: 'msg_1',
          from: { name: 'João Silva', id: 'user_456' },
          message: 'Olá! Gostaria de saber mais sobre seus produtos.',
          created_time: new Date().toISOString(),
          read: false
        },
        {
          id: 'msg_2',
          from: { name: 'Maria Costa', id: 'user_789' },
          message: 'Obrigada pelo atendimento! Vou fazer o pedido hoje mesmo.',
          created_time: new Date(Date.now() - 3600000).toISOString(),
          read: true
        },
        {
          id: 'msg_3',
          from: { name: 'Pedro Santos', id: 'user_101' },
          message: 'Você tem algum desconto para clientes antigos?',
          created_time: new Date(Date.now() - 7200000).toISOString(),
          read: true
        }
      ];
      
      setPosts(mockPosts);
      setMessages(mockMessages);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoadingPosts(false);
      setLoadingMessages(false);
    }
  };

  const createPost = async () => {
    if (!newPost.message.trim()) return;
    
    setCreatingPost(true);
    try {
      // Simular criação de post
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPostData: FacebookPost = {
        id: 'post_' + Date.now(),
        message: newPost.message,
        created_time: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        type: newPost.type,
        media_url: newPost.media ? URL.createObjectURL(newPost.media) : undefined
      };
      
      setPosts(prev => [newPostData, ...prev]);
      setNewPost({ message: '', type: 'text', media: null });
      setActiveTab('posts');
      
      alert('Post criado com sucesso! 🎉');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Erro ao criar post. Tente novamente.');
    } finally {
      setCreatingPost(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!facebookUser) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>📘</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#e4e6eb', marginBottom: 16 }}>
          Conecte sua conta do Facebook
        </h2>
        <p style={{ fontSize: 16, color: '#b0b3b8', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px auto' }}>
          Conecte sua conta do Facebook para gerenciar posts, visualizar mensagens e criar conteúdo diretamente do app.
        </p>
        <button
          onClick={connectFacebook}
          disabled={isConnecting}
          style={{
            background: 'linear-gradient(90deg, #1877F2 60%, #42a5f5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '16px 32px',
            fontSize: 18,
            fontWeight: 600,
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px #1877f233',
            transition: 'all 0.3s ease',
            opacity: isConnecting ? 0.7 : 1
          }}
        >
          {isConnecting ? '🔄 Conectando...' : '🔗 Conectar Facebook'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Header do Dashboard */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1877F2 0%, #42a5f5 100%)',
        borderRadius: 16,
        padding: 32,
        marginBottom: 32,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 24
      }}>
        <img
          src={facebookUser.picture}
          alt="Avatar"
          style={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            border: '4px solid rgba(255,255,255,0.3)',
            objectFit: 'cover'
          }}
        />
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: 28, fontWeight: 700 }}>
            Olá, {facebookUser.name}! 👋
          </h1>
          <p style={{ margin: 0, fontSize: 16, opacity: 0.9 }}>
            Gerencie seus posts e mensagens do Facebook
          </p>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        marginBottom: 32,
        background: '#23272f',
        borderRadius: 12,
        padding: 8
      }}>
        {[
          { id: 'overview', label: '📊 Visão Geral', icon: '📊' },
          { id: 'posts', label: '📝 Posts', icon: '📝' },
          { id: 'messages', label: '💬 Mensagens', icon: '💬' },
          { id: 'create', label: '➕ Criar Post', icon: '➕' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              background: activeTab === tab.id ? '#1877F2' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#b0b3b8',
              border: 'none',
              borderRadius: 8,
              padding: '12px 20px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flex: 1
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gap: 24 }}>
          {/* Estatísticas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ background: '#23272f', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1877F2' }}>{posts.length}</div>
              <div style={{ fontSize: 14, color: '#b0b3b8' }}>Posts Totais</div>
            </div>
            <div style={{ background: '#23272f', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>❤️</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#E4405F' }}>
                {formatNumber(posts.reduce((sum, post) => sum + post.likes, 0))}
              </div>
              <div style={{ fontSize: 14, color: '#b0b3b8' }}>Curtidas Totais</div>
            </div>
            <div style={{ background: '#23272f', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#25D366' }}>
                {formatNumber(posts.reduce((sum, post) => sum + post.comments, 0))}
              </div>
              <div style={{ fontSize: 14, color: '#b0b3b8' }}>Comentários</div>
            </div>
            <div style={{ background: '#23272f', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📨</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#FFA500' }}>
                {messages.filter(m => !m.read).length}
              </div>
              <div style={{ fontSize: 14, color: '#b0b3b8' }}>Mensagens Não Lidas</div>
            </div>
          </div>

          {/* Posts Recentes */}
          <div style={{ background: '#23272f', borderRadius: 16, padding: 24 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 20, fontWeight: 600, color: '#e4e6eb' }}>
              Posts Recentes
            </h3>
            <div style={{ display: 'grid', gap: 16 }}>
              {posts.slice(0, 3).map(post => (
                <div key={post.id} style={{ 
                  background: '#181c2f', 
                  borderRadius: 12, 
                  padding: 20,
                  border: '1px solid #3a3b3c'
                }}>
                  <p style={{ margin: '0 0 12px 0', fontSize: 16, color: '#e4e6eb', lineHeight: 1.5 }}>
                    {post.message}
                  </p>
                  <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#b0b3b8' }}>
                    <span>❤️ {formatNumber(post.likes)}</span>
                    <span>💬 {formatNumber(post.comments)}</span>
                    <span>📤 {formatNumber(post.shares)}</span>
                    <span>{formatDate(post.created_time)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'posts' && (
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#e4e6eb' }}>
              Seus Posts
            </h3>
            <button
              onClick={() => setActiveTab('create')}
              style={{
                background: '#1877F2',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              ➕ Novo Post
            </button>
          </div>
          
          {loadingPosts ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🔄</div>
              <p style={{ color: '#b0b3b8' }}>Carregando posts...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 20 }}>
              {posts.map(post => (
                <div key={post.id} style={{ 
                  background: '#181c2f', 
                  borderRadius: 12, 
                  padding: 24,
                  border: '1px solid #3a3b3c'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>
                        {post.type === 'image' ? '🖼️' : post.type === 'video' ? '🎥' : '📝'}
                      </span>
                      <span style={{ fontSize: 12, color: '#1877F2', background: '#1877f222', padding: '4px 8px', borderRadius: 4 }}>
                        {post.type.toUpperCase()}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#b0b3b8' }}>
                      {formatDate(post.created_time)}
                    </span>
                  </div>
                  
                  <p style={{ margin: '0 0 16px 0', fontSize: 16, color: '#e4e6eb', lineHeight: 1.6 }}>
                    {post.message}
                  </p>
                  
                  {post.media_url && (
                    <img 
                      src={post.media_url} 
                      alt="Media" 
                      style={{ 
                        width: '100%', 
                        maxWidth: 400, 
                        borderRadius: 8, 
                        marginBottom: 16 
                      }} 
                    />
                  )}
                  
                  <div style={{ display: 'flex', gap: 24, fontSize: 14, color: '#b0b3b8' }}>
                    <span>❤️ {formatNumber(post.likes)} curtidas</span>
                    <span>💬 {formatNumber(post.comments)} comentários</span>
                    <span>📤 {formatNumber(post.shares)} compartilhamentos</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'messages' && (
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: 20, fontWeight: 600, color: '#e4e6eb' }}>
            Mensagens ({messages.filter(m => !m.read).length} não lidas)
          </h3>
          
          {loadingMessages ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🔄</div>
              <p style={{ color: '#b0b3b8' }}>Carregando mensagens...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {messages.map(message => (
                <div key={message.id} style={{ 
                  background: message.read ? '#181c2f' : '#1877f222', 
                  borderRadius: 12, 
                  padding: 20,
                  border: message.read ? '1px solid #3a3b3c' : '2px solid #1877F2',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        background: '#1877F2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 600
                      }}>
                        {message.from.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#e4e6eb' }}>
                          {message.from.name}
                        </div>
                        <div style={{ fontSize: 12, color: '#b0b3b8' }}>
                          {formatDate(message.created_time)}
                        </div>
                      </div>
                    </div>
                    {!message.read && (
                      <span style={{ 
                        background: '#E4405F', 
                        color: '#fff', 
                        fontSize: 12, 
                        padding: '4px 8px', 
                        borderRadius: 4 
                      }}>
                        NOVA
                      </span>
                    )}
                  </div>
                  
                  <p style={{ margin: 0, fontSize: 16, color: '#e4e6eb', lineHeight: 1.5 }}>
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'create' && (
        <div style={{ background: '#23272f', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: 20, fontWeight: 600, color: '#e4e6eb' }}>
            Criar Novo Post
          </h3>
          
          <div style={{ display: 'grid', gap: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 500 }}>
                Tipo de Post
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { value: 'text', label: '📝 Texto', icon: '📝' },
                  { value: 'image', label: '🖼️ Imagem', icon: '🖼️' },
                  { value: 'video', label: '🎥 Vídeo', icon: '🎥' }
                ].map(type => (
                  <button
                    key={type.value}
                    onClick={() => setNewPost(prev => ({ ...prev, type: type.value as any }))}
                    style={{
                      background: newPost.type === type.value ? '#1877F2' : '#3a3b3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '12px 16px',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 500 }}>
                Mensagem
              </label>
              <textarea
                value={newPost.message}
                onChange={(e) => setNewPost(prev => ({ ...prev, message: e.target.value }))}
                placeholder="O que você quer compartilhar?"
                style={{
                  width: '100%',
                  minHeight: 120,
                  background: '#181c2f',
                  border: '1px solid #3a3b3c',
                  borderRadius: 8,
                  padding: 16,
                  fontSize: 16,
                  color: '#e4e6eb',
                  resize: 'vertical'
                }}
              />
            </div>
            
            {(newPost.type === 'image' || newPost.type === 'video') && (
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 500 }}>
                  {newPost.type === 'image' ? 'Imagem' : 'Vídeo'}
                </label>
                <input
                  type="file"
                  accept={newPost.type === 'image' ? 'image/*' : 'video/*'}
                  onChange={(e) => setNewPost(prev => ({ 
                    ...prev, 
                    media: e.target.files ? e.target.files[0] : null 
                  }))}
                  style={{
                    width: '100%',
                    background: '#181c2f',
                    border: '1px solid #3a3b3c',
                    borderRadius: 8,
                    padding: 12,
                    color: '#e4e6eb'
                  }}
                />
              </div>
            )}
            
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setActiveTab('posts')}
                style={{
                  background: '#3a3b3c',
                  color: '#e4e6eb',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={createPost}
                disabled={!newPost.message.trim() || creatingPost}
                style={{
                  background: creatingPost ? '#3a3b3c' : '#1877F2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: creatingPost ? 'not-allowed' : 'pointer',
                  opacity: creatingPost ? 0.7 : 1
                }}
              >
                {creatingPost ? '🔄 Criando...' : '📤 Publicar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 