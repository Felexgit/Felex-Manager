import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { youtubeService } from '../services/youtubeService';
import YouTubeDebug from './YouTubeDebug';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
  duration: string;
  status: 'public' | 'private' | 'unlisted';
}

interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  avatar: string;
}

interface YouTubeDashboardProps {
  youtubeUser: any;
  setYouTubeUser: (user: any) => void;
  isConnecting: boolean;
  setIsConnecting: (loading: boolean) => void;
  connectYouTube: () => void;
}



export default function YouTubeDashboard({
  youtubeUser,
  setYouTubeUser,
  isConnecting,
  setIsConnecting,
  connectYouTube
}: YouTubeDashboardProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [channel, setChannel] = useState<YouTubeChannel | null>(null);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'analytics' | 'upload'>('overview');
  const [newVideo, setNewVideo] = useState({ 
    title: '', 
    description: '', 
    privacy: 'private' as 'public' | 'private' | 'unlisted',
    videoFile: null as File | null,
    thumbnail: null as File | null
  });
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Verificar callback do YouTube OAuth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state === 'yt_connect') {
      handleYouTubeCallback(code);
      // Limpar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleYouTubeCallback = async (code: string) => {
    try {
      // Simular troca de código por token (em produção, isso seria feito no backend)
      const mockUser = {
        id: 'yt_user_123',
        name: 'Canal do YouTube',
        email: 'user@youtube.com',
        access_token: 'mock_yt_access_token_' + Math.random().toString(36).substr(2, 9),
        picture: `https://yt3.googleusercontent.com/avatar_${Math.random().toString(36).substr(2, 9)}`
      };
      
      setYouTubeUser(mockUser);
      
      // Salvar no Supabase
      const { error } = await supabase
        .from('youtube_connections')
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
    if (!youtubeUser) return;
    
    setLoadingVideos(true);
    setLoadingChannel(true);
    
    try {
      // Configurar o token de acesso no serviço
      youtubeService.setAccessToken(youtubeUser.access_token);
      
      // Carregar dados reais do YouTube
      const [channelData, videosData] = await Promise.all([
        youtubeService.getChannelInfo(),
        youtubeService.getVideos()
      ]);
      
      setChannel(channelData);
      setVideos(videosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Fallback para dados mockados em caso de erro
      const mockChannel: YouTubeChannel = {
        id: 'UC123456789',
        title: 'Meu Canal Incrível',
        description: 'Um canal sobre tecnologia, programação e inovação',
        subscriberCount: 15420,
        videoCount: 89,
        viewCount: 1250000,
        avatar: 'https://yt3.googleusercontent.com/avatar_mock'
      };
      
      const mockVideos: YouTubeVideo[] = [
        {
          id: 'video_1',
          title: 'Como Criar uma API REST com Node.js',
          description: 'Tutorial completo sobre criação de APIs REST usando Node.js e Express',
          publishedAt: '2024-01-15T10:30:00Z',
          viewCount: 15420,
          likeCount: 892,
          commentCount: 156,
          thumbnail: 'https://img.youtube.com/vi/mock1/maxresdefault.jpg',
          duration: 'PT15M32S',
          status: 'public'
        },
        {
          id: 'video_2',
          title: 'React Hooks: useState e useEffect',
          description: 'Aprenda a usar os hooks mais importantes do React',
          publishedAt: '2024-01-10T14:20:00Z',
          viewCount: 8920,
          likeCount: 456,
          commentCount: 89,
          thumbnail: 'https://img.youtube.com/vi/mock2/maxresdefault.jpg',
          duration: 'PT12M45S',
          status: 'public'
        },
        {
          id: 'video_3',
          title: 'TypeScript para Iniciantes',
          description: 'Guia completo de TypeScript para desenvolvedores',
          publishedAt: '2024-01-05T09:15:00Z',
          viewCount: 12350,
          likeCount: 678,
          commentCount: 123,
          thumbnail: 'https://img.youtube.com/vi/mock3/maxresdefault.jpg',
          duration: 'PT18M20S',
          status: 'public'
        }
      ];
      
      setChannel(mockChannel);
      setVideos(mockVideos);
    } finally {
      setLoadingVideos(false);
      setLoadingChannel(false);
    }
  };

  const uploadVideo = async () => {
    if (!newVideo.title || !newVideo.videoFile) {
      alert('Por favor, preencha o título e selecione um vídeo');
      return;
    }

    setUploadingVideo(true);
    try {
      // Usar o serviço do YouTube para upload
      const videoId = await youtubeService.uploadVideo(
        newVideo.videoFile,
        newVideo.title,
        newVideo.description,
        newVideo.privacy
      );
      
      const newVideoObj: YouTubeVideo = {
        id: videoId,
        title: newVideo.title,
        description: newVideo.description,
        publishedAt: new Date().toISOString(),
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        thumbnail: newVideo.thumbnail ? URL.createObjectURL(newVideo.thumbnail) : 'https://img.youtube.com/vi/default/maxresdefault.jpg',
        duration: 'PT0M0S',
        status: newVideo.privacy
      };
      
      setVideos(prev => [newVideoObj, ...prev]);
      setNewVideo({ 
        title: '', 
        description: '', 
        privacy: 'private',
        videoFile: null,
        thumbnail: null
      });
      
      alert('Vídeo enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar vídeo:', error);
      alert('Erro ao enviar vídeo');
    } finally {
      setUploadingVideo(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDuration = (duration: string) => {
    // Converter ISO 8601 duration para formato legível
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  if (!youtubeUser) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ 
          background: '#23272f', 
          borderRadius: 12, 
          padding: '40px', 
          maxWidth: 500, 
          margin: '0 auto',
          border: '1px solid #3a3b3c'
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>📺</div>
          <h2 style={{ margin: '0 0 16px 0', color: '#e4e6eb' }}>
            Conecte sua Conta do YouTube
          </h2>
          <p style={{ 
            margin: '0 0 32px 0', 
            color: '#b0b3b8', 
            lineHeight: 1.6 
          }}>
            Gerencie seus vídeos, visualize estatísticas e faça upload de novos conteúdos diretamente do Felex Manager.
          </p>
          <button
            onClick={connectYouTube}
            disabled={isConnecting}
            style={{
              background: '#ff0000',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 600,
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              opacity: isConnecting ? 0.7 : 1,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              margin: '0 auto'
            }}
          >
            {isConnecting ? 'Conectando...' : '🔗 Conectar YouTube'}
          </button>
          
          {/* Debug Component */}
          <YouTubeDebug />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header do Canal */}
      {channel && (
        <div style={{ 
          background: '#23272f', 
          borderRadius: 12, 
          padding: '24px', 
          marginBottom: 24,
          border: '1px solid #3a3b3c'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <img 
              src={channel.avatar} 
              alt={channel.title}
              style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%',
                border: '3px solid #ff0000'
              }}
            />
            <div>
              <h2 style={{ margin: '0 0 8px 0', color: '#e4e6eb' }}>{channel.title}</h2>
              <p style={{ margin: 0, color: '#b0b3b8' }}>{channel.description}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#e4e6eb' }}>
                {formatNumber(channel.subscriberCount)}
              </div>
              <div style={{ fontSize: 14, color: '#b0b3b8' }}>Inscritos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#e4e6eb' }}>
                {formatNumber(channel.videoCount)}
              </div>
              <div style={{ fontSize: 14, color: '#b0b3b8' }}>Vídeos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#e4e6eb' }}>
                {formatNumber(channel.viewCount)}
              </div>
              <div style={{ fontSize: 14, color: '#b0b3b8' }}>Visualizações</div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: 2, 
        background: '#23272f', 
        borderRadius: 8, 
        padding: 4,
        marginBottom: 24
      }}>
        {[
          { id: 'overview', label: 'Visão Geral', icon: '📊' },
          { id: 'videos', label: 'Vídeos', icon: '🎥' },
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          { id: 'upload', label: 'Upload', icon: '⬆️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              background: activeTab === tab.id ? '#ff0000' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#b0b3b8',
              border: 'none',
              borderRadius: 6,
              padding: '12px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'overview' && (
        <div style={{ 
          background: '#23272f', 
          borderRadius: 12, 
          padding: '24px',
          border: '1px solid #3a3b3c'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e4e6eb' }}>📊 Visão Geral</h3>
          
          {loadingChannel ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: 24 }}>⏳</div>
              <p style={{ color: '#b0b3b8' }}>Carregando dados do canal...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
              <div style={{ 
                background: '#1a1d29', 
                borderRadius: 8, 
                padding: '20px',
                border: '1px solid #3a3b3c'
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🎥</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#e4e6eb', marginBottom: 4 }}>
                  {videos.length}
                </div>
                <div style={{ fontSize: 14, color: '#b0b3b8' }}>Vídeos Publicados</div>
              </div>
              
              <div style={{ 
                background: '#1a1d29', 
                borderRadius: 8, 
                padding: '20px',
                border: '1px solid #3a3b3c'
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#e4e6eb', marginBottom: 4 }}>
                  {formatNumber(channel?.subscriberCount || 0)}
                </div>
                <div style={{ fontSize: 14, color: '#b0b3b8' }}>Inscritos</div>
              </div>
              
              <div style={{ 
                background: '#1a1d29', 
                borderRadius: 8, 
                padding: '20px',
                border: '1px solid #3a3b3c'
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>👁️</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#e4e6eb', marginBottom: 4 }}>
                  {formatNumber(channel?.viewCount || 0)}
                </div>
                <div style={{ fontSize: 14, color: '#b0b3b8' }}>Visualizações Totais</div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'videos' && (
        <div style={{ 
          background: '#23272f', 
          borderRadius: 12, 
          padding: '24px',
          border: '1px solid #3a3b3c'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e4e6eb' }}>🎥 Seus Vídeos</h3>
          
          {loadingVideos ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: 24 }}>⏳</div>
              <p style={{ color: '#b0b3b8' }}>Carregando vídeos...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {videos.map(video => (
                <div key={video.id} style={{ 
                  background: '#1a1d29', 
                  borderRadius: 8, 
                  padding: '16px',
                  border: '1px solid #3a3b3c',
                  display: 'flex',
                  gap: 16
                }}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    style={{ 
                      width: 120, 
                      height: 68, 
                      borderRadius: 4,
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#e4e6eb' }}>{video.title}</h4>
                    <p style={{ 
                      margin: '0 0 8px 0', 
                      color: '#b0b3b8', 
                      fontSize: 14,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {video.description}
                    </p>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#b0b3b8' }}>
                      <span>👁️ {formatNumber(video.viewCount)} visualizações</span>
                      <span>👍 {formatNumber(video.likeCount)} curtidas</span>
                      <span>💬 {formatNumber(video.commentCount)} comentários</span>
                      <span>⏱️ {formatDuration(video.duration)}</span>
                      <span>📅 {formatDate(video.publishedAt)}</span>
                      <span style={{ 
                        color: video.status === 'public' ? '#28a745' : 
                               video.status === 'private' ? '#ffc107' : '#6c757d'
                      }}>
                        {video.status === 'public' ? '🌐 Público' : 
                         video.status === 'private' ? '🔒 Privado' : '🔗 Não listado'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={{ 
          background: '#23272f', 
          borderRadius: 12, 
          padding: '24px',
          border: '1px solid #3a3b3c'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e4e6eb' }}>📈 Analytics</h3>
          <div style={{ textAlign: 'center', padding: '40px', color: '#b0b3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
            <p>Análises detalhadas em desenvolvimento...</p>
            <p style={{ fontSize: 14 }}>Em breve você poderá ver estatísticas avançadas dos seus vídeos</p>
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div style={{ 
          background: '#23272f', 
          borderRadius: 12, 
          padding: '24px',
          border: '1px solid #3a3b3c'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e4e6eb' }}>⬆️ Upload de Vídeo</h3>
          
          <div style={{ display: 'grid', gap: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 600 }}>
                Título do Vídeo *
              </label>
              <input
                type="text"
                value={newVideo.title}
                onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Digite o título do vídeo"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #3a3b3c',
                  background: '#1a1d29',
                  color: '#e4e6eb',
                  fontSize: 14
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 600 }}>
                Descrição
              </label>
              <textarea
                value={newVideo.description}
                onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Digite a descrição do vídeo"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #3a3b3c',
                  background: '#1a1d29',
                  color: '#e4e6eb',
                  fontSize: 14,
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 600 }}>
                Arquivo de Vídeo *
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setNewVideo(prev => ({ 
                  ...prev, 
                  videoFile: e.target.files?.[0] || null 
                }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #3a3b3c',
                  background: '#1a1d29',
                  color: '#e4e6eb',
                  fontSize: 14
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 600 }}>
                Thumbnail (opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewVideo(prev => ({ 
                  ...prev, 
                  thumbnail: e.target.files?.[0] || null 
                }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #3a3b3c',
                  background: '#1a1d29',
                  color: '#e4e6eb',
                  fontSize: 14
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#e4e6eb', fontWeight: 600 }}>
                Privacidade
              </label>
              <select
                value={newVideo.privacy}
                onChange={(e) => setNewVideo(prev => ({ 
                  ...prev, 
                  privacy: e.target.value as 'public' | 'private' | 'unlisted' 
                }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #3a3b3c',
                  background: '#1a1d29',
                  color: '#e4e6eb',
                  fontSize: 14
                }}
              >
                <option value="private">🔒 Privado</option>
                <option value="unlisted">🔗 Não listado</option>
                <option value="public">🌐 Público</option>
              </select>
            </div>
            
            <button
              onClick={uploadVideo}
              disabled={uploadingVideo || !newVideo.title || !newVideo.videoFile}
              style={{
                background: uploadingVideo ? '#6c757d' : '#ff0000',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '14px 24px',
                fontSize: 16,
                fontWeight: 600,
                cursor: uploadingVideo || !newVideo.title || !newVideo.videoFile ? 'not-allowed' : 'pointer',
                opacity: uploadingVideo || !newVideo.title || !newVideo.videoFile ? 0.7 : 1,
                transition: 'all 0.2s'
              }}
            >
              {uploadingVideo ? '⏳ Enviando...' : '⬆️ Enviar Vídeo'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 