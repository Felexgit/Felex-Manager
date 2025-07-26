import React from 'react';
import { FacebookPage, FacebookPost, FacebookStory } from '../facebookApi';

interface PostsStoriesSectionProps {
  selectedPages: string[];
  facebookPages: FacebookPage[];
  pagePosts: { [pageId: string]: FacebookPost[] };
  pageStories: { [pageId: string]: FacebookStory[] };
  loadingPosts: boolean;
  loadingStories: boolean;
  loadPagePosts: () => void;
  loadPageStories: () => void;
}

export default function PostsStoriesSection({
  selectedPages,
  facebookPages,
  pagePosts,
  pageStories,
  loadingPosts,
  loadingStories,
  loadPagePosts,
  loadPageStories
}: PostsStoriesSectionProps) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Posts & Stories</h2>
        <button 
          className="btn-primary" 
          onClick={() => { loadPagePosts(); loadPageStories(); }}
          disabled={selectedPages.length === 0 || loadingPosts || loadingStories}
        >
          {loadingPosts || loadingStories ? 'Carregando...' : 'Atualizar'}
        </button>
      </div>

      {selectedPages.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <h3>Nenhuma página selecionada</h3>
          <p>Selecione páginas na seção Home para ver posts e stories</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 20 }}>
          {selectedPages.map(pageId => {
            const page = facebookPages.find(p => p.id === pageId);
            const posts = pagePosts[pageId] || [];
            const stories = pageStories[pageId] || [];
            
            return (
              <div key={pageId} className="card">
                <h3 style={{ margin: '0 0 16px 0', color: '#1877F2' }}>{page?.name}</h3>
                
                {/* Posts */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Posts Recentes</h4>
                  {posts.length > 0 ? (
                    <div style={{ display: 'grid', gap: 12 }}>
                      {posts.map(post => (
                        <div key={post.id} style={{ 
                          border: '1px solid #3a3b3c', 
                          borderRadius: 8, 
                          padding: 12,
                          background: '#242526'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <span style={{ fontSize: 12, color: '#b0b3b8' }}>
                              {new Date(post.created_time).toLocaleDateString('pt-BR')}
                            </span>
                            <span style={{ fontSize: 12, color: '#1877F2' }}>{post.type}</span>
                          </div>
                          {post.message && (
                            <p style={{ margin: '0 0 8px 0', fontSize: 14 }}>{post.message}</p>
                          )}
                          {post.full_picture && (
                            <img 
                              src={post.full_picture} 
                              alt="Post" 
                              style={{ width: '100%', maxWidth: 300, borderRadius: 4, marginBottom: 8 }}
                            />
                          )}
                          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#b0b3b8' }}>
                            <span>👍 {post.likes?.summary?.total_count || 0}</span>
                            <span>💬 {post.comments?.summary?.total_count || 0}</span>
                            <span>📤 {post.shares?.count || 0}</span>
                          </div>
                          <a 
                            href={post.permalink_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#1877F2', textDecoration: 'none', fontSize: 12 }}
                          >
                            Ver no Facebook →
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#b0b3b8', fontStyle: 'italic' }}>Nenhum post encontrado</p>
                  )}
                </div>

                {/* Stories */}
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Stories Recentes</h4>
                  {stories.length > 0 ? (
                    <div style={{ display: 'grid', gap: 12 }}>
                      {stories.map(story => (
                        <div key={story.id} style={{ 
                          border: '1px solid #3a3b3c', 
                          borderRadius: 8, 
                          padding: 12,
                          background: '#242526'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <span style={{ fontSize: 12, color: '#b0b3b8' }}>
                              {new Date(story.created_time).toLocaleDateString('pt-BR')}
                            </span>
                            <span style={{ fontSize: 12, color: '#e91e63' }}>Story</span>
                          </div>
                          {story.message && (
                            <p style={{ margin: '0 0 8px 0', fontSize: 14 }}>{story.message}</p>
                          )}
                          {story.media_url && (
                            <img 
                              src={story.media_url} 
                              alt="Story" 
                              style={{ width: '100%', maxWidth: 200, borderRadius: 4, marginBottom: 8 }}
                            />
                          )}
                          <a 
                            href={story.permalink_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#1877F2', textDecoration: 'none', fontSize: 12 }}
                          >
                            Ver Story →
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#b0b3b8', fontStyle: 'italic' }}>Nenhum story encontrado</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 