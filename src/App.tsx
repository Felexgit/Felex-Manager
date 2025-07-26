import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import SocialConnections from './SocialConnections';
import FacebookAPI, { FacebookPage, FacebookUser, FacebookPost, FacebookStory, FacebookNotification } from './facebookApi';
import HomeSection from './components/HomeSection';
import PostsStoriesSection from './components/PostsStoriesSection';
import NotificationsSection from './components/NotificationsSection';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import UserDataDeletion from './pages/UserDataDeletion';
import InstagramCallback from './pages/InstagramCallback';
import WhatsAppCallback from './pages/WhatsAppCallback';

const MENU_ITEMS = [
  { label: 'Home', icon: '🏠' },
  { label: 'Notificações', icon: '🔔' },
  { label: 'Posts & Stories', icon: '📱' },
  { label: 'Planejamento', icon: '📅' },
  { label: 'Ads', icon: '📢' },
  { label: 'Agentes IA', icon: '🤖' },
  { label: 'Configurações', icon: '⚙️' }
];

function SimpleCalendar({ selectedDate, onSelect }: { selectedDate: string, onSelect: (date: string) => void }) {
  // Gera os próximos 30 dias
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
      {days.map(d => {
        const dateStr = d.toISOString().slice(0, 10);
        return (
          <button
            key={dateStr}
            onClick={() => onSelect(dateStr)}
            style={{
              background: selectedDate === dateStr ? '#1877f2' : '#242526',
              color: selectedDate === dateStr ? '#fff' : '#e4e6eb',
              border: selectedDate === dateStr ? '2px solid #42a5f5' : '1px solid #3a3b3c',
              borderRadius: 8,
              padding: '10px 14px',
              fontWeight: 500,
              minWidth: 80,
              cursor: 'pointer',
            }}
          >
            {d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
          </button>
        );
      })}
    </div>
  );
}

function FullCalendar({ selectedDate, onSelect }: { selectedDate: string, onSelect: (date: string) => void }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Dias do mês
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekDay = firstDay.getDay(); // 0 = domingo

  // Gera matriz de semanas
  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = Array(startWeekDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  function handlePrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  }
  function handleNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={handlePrevMonth} style={{ background: 'none', color: '#61dafb', fontSize: 22, border: 'none', cursor: 'pointer' }}>{'<'}</button>
        <span style={{ fontWeight: 600, fontSize: 18 }}>
          {new Date(year, month).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleNextMonth} style={{ background: 'none', color: '#61dafb', fontSize: 22, border: 'none', cursor: 'pointer' }}>{'>'}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4, color: '#aaa', fontWeight: 500, fontSize: 15 }}>
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <div key={d}>{d}</div>)}
      </div>
      {weeks.map((week, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {week.map((date, j) => {
            const dateStr = date ? date.toISOString().slice(0, 10) : '';
            const isToday = date && date.toDateString() === today.toDateString();
            return (
              <button
                key={j}
                disabled={!date}
                onClick={() => date && onSelect(dateStr)}
                style={{
                  background: selectedDate === dateStr ? '#1877f2' : isToday ? '#333c' : '#242526',
                  color: selectedDate === dateStr ? '#fff' : '#e4e6eb',
                  border: selectedDate === dateStr ? '2px solid #42a5f5' : '1px solid #3a3b3c',
                  borderRadius: 8,
                  padding: '10px 0',
                  fontWeight: 500,
                  minWidth: 0,
                  cursor: date ? 'pointer' : 'default',
                  opacity: date ? 1 : 0,
                }}
              >
                {date ? date.getDate() : ''}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}


function CreatePostModal({ open, onClose, onCreate, defaultDate }: { open: boolean, onClose: () => void, onCreate: (post: any) => void, defaultDate?: string }) {
  const [postType, setPostType] = useState<'image' | 'video'>('image');
  const [postFile, setPostFile] = useState<File | null>(null);
  const [postCaption, setPostCaption] = useState('');
  const [postDate, setPostDate] = useState(defaultDate || '');
  const [postTime, setPostTime] = useState('12:00');
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    setPostDate(defaultDate || '');
  }, [defaultDate, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!postFile || !postDate) return;
    setPostLoading(true);
    const ext = postFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const folder = postType === 'image' ? 'images' : 'videos';
    const { error } = await supabase.storage.from(folder).upload(fileName, postFile);
    if (error) {
      alert('Erro ao fazer upload: ' + error.message);
      setPostLoading(false);
      return;
    }
    onCreate({
      date: postDate,
      time: postTime,
      file: fileName,
      type: postType,
      caption: postCaption
    });
    setPostFile(null);
    setPostCaption('');
    setPostDate(defaultDate || '');
    setPostTime('12:00');
    setPostLoading(false);
  }

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 600, maxWidth: '95vw', padding: 32, boxShadow: '0 4px 32px #0002', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h2 style={{ margin: 0, color: '#1877F2' }}>Criar Publicação</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <label>
              <input type="radio" name="postType" value="image" checked={postType === 'image'} onChange={() => setPostType('image')} /> Imagem
            </label>
            <label>
              <input type="radio" name="postType" value="video" checked={postType === 'video'} onChange={() => setPostType('video')} /> Vídeo
            </label>
          </div>
          <input type="file" accept={postType === 'image' ? 'image/*' : 'video/*'} onChange={e => setPostFile(e.target.files ? e.target.files[0] : null)} required disabled={postLoading} />
          <textarea value={postCaption} onChange={e => setPostCaption(e.target.value)} placeholder="Legenda da publicação" style={{ width: '100%', minHeight: 60, background: '#F0F2F5', color: '#050505', border: '1px solid #DADDE1', borderRadius: 6, padding: 10, fontSize: 16, margin: '8px 0' }} required disabled={postLoading} />
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <input type="date" value={postDate} onChange={e => setPostDate(e.target.value)} required style={{ background: '#F0F2F5', color: '#050505', border: '1px solid #DADDE1', borderRadius: 6, padding: 8 }} />
            <input type="time" value={postTime} onChange={e => setPostTime(e.target.value)} required style={{ background: '#F0F2F5', color: '#050505', border: '1px solid #DADDE1', borderRadius: 6, padding: 8 }} />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ background: '#DADDE1', color: '#65676B' }}>Cancelar</button>
            <button type="submit" style={{ background: '#1877F2', color: '#fff' }} disabled={postLoading}>{postLoading ? 'Agendando...' : 'Agendar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [captions, setCaptions] = useState<{ [key: string]: string }>({});
  const [activeMenu, setActiveMenu] = useState('Home');
  const [selectedDate, setSelectedDate] = useState('');
  const [scheduledVideo, setScheduledVideo] = useState('');
  const [scheduledCaption, setScheduledCaption] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [postType, setPostType] = useState<'image' | 'video'>('image');
  const [postFile, setPostFile] = useState<File | null>(null);
  const [postCaption, setPostCaption] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postNow, setPostNow] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultDate, setModalDefaultDate] = useState<string | undefined>(undefined);
  const [facebookUser, setFacebookUser] = useState<FacebookUser | null>(null);
  const [facebookPages, setFacebookPages] = useState<FacebookPage[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [isConnectingFacebook, setIsConnectingFacebook] = useState(false);
  const [pagePosts, setPagePosts] = useState<{ [pageId: string]: FacebookPost[] }>({});
  const [pageStories, setPageStories] = useState<{ [pageId: string]: FacebookStory[] }>({});
  const [pageNotifications, setPageNotifications] = useState<{ [pageId: string]: FacebookNotification[] }>({});
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingStories, setLoadingStories] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (user) fetchVideos();
  }, [user]);

  async function fetchVideos() {
    setLoading(true);
    const { data, error } = await supabase.storage.from('videos').list('', { limit: 100 });
    if (error) {
      setMessage('Erro ao buscar vídeos: ' + error.message);
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!videoFile) return;
    setLoading(true);
    const fileExt = videoFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('videos').upload(fileName, videoFile);
    if (error) {
      setMessage('Erro ao fazer upload: ' + error.message);
    } else {
      setMessage('Upload realizado com sucesso!');
      fetchVideos();
    }
    setLoading(false);
  }

  async function handleUploadInstagram(fileName: string) {
    // Aqui entraria a chamada real da API do Instagram
    alert(`Vídeo '${fileName}' enviado para o Instagram! (simulação)`);
  }
  async function handleUploadYouTube(fileName: string) {
    // Aqui entraria a chamada real da API do YouTube
    alert(`Vídeo '${fileName}' enviado para o YouTube! (simulação)`);
  }

  async function handleSuggestCaption(fileName: string) {
    // Aqui entraria a chamada real à API de IA (ex: OpenAI)
    const fakeCaption = `Legenda sugerida para ${fileName}: Vídeo incrível! #IA #Automação`;
    setCaptions(c => ({ ...c, [fileName]: fakeCaption }));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!postFile) return;
    setPostLoading(true);
    // Upload para Supabase
    const ext = postFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const folder = postType === 'image' ? 'images' : 'videos';
    const { error } = await supabase.storage.from(folder).upload(fileName, postFile);
    if (error) {
      alert('Erro ao fazer upload: ' + error.message);
      setPostLoading(false);
      return;
    }
    if (postNow) {
      alert('Publicação enviada agora! (simulação)');
    } else {
      setScheduledPosts(posts => [
        ...posts,
        { date: postDate, file: fileName, type: postType, caption: postCaption }
      ]);
      alert('Publicação agendada!');
    }
    setPostFile(null);
    setPostCaption('');
    setPostDate('');
    setPostNow(true);
    setPostLoading(false);
  }

  // Funções do Facebook
  async function connectFacebookAccount() {
    setIsConnectingFacebook(true);
    try {
      FacebookAPI.initiateLogin();
    } catch (error) {
      console.error('Erro ao conectar Facebook:', error);
      setIsConnectingFacebook(false);
    }
  }

  async function handleFacebookCallback(code: string) {
    try {
      const user = await FacebookAPI.exchangeCodeForToken(code);
      if (user) {
        setFacebookUser(user);
        const pages = await FacebookAPI.getPages(user.access_token);
        setFacebookPages(pages);
        
        // Salvar no Supabase
        const { error } = await supabase
          .from('facebook_connections')
          .upsert({
            user_id: user.id,
            access_token: user.access_token,
            pages: pages
          });
        
        if (error) console.error('Erro ao salvar conexão:', error);
      }
    } catch (error) {
      console.error('Erro no callback:', error);
    } finally {
      setIsConnectingFacebook(false);
    }
  }

  function togglePageSelection(pageId: string) {
    setSelectedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId]
    );
  }

  function connectAccount(platform: string) {
    if (platform === 'Facebook') {
      connectFacebookAccount();
    } else {
      alert(`Conta do ${platform} conectada com sucesso!`);
    }
  }

  async function loadPagePosts() {
    if (selectedPages.length === 0) return;
    
    setLoadingPosts(true);
    const posts: { [pageId: string]: FacebookPost[] } = {};
    
    for (const pageId of selectedPages) {
      const page = facebookPages.find(p => p.id === pageId);
      if (page) {
        const pagePosts = await FacebookAPI.getPagePosts(pageId, page.access_token, 5);
        posts[pageId] = pagePosts;
      }
    }
    
    setPagePosts(posts);
    setLoadingPosts(false);
  }

  async function loadPageStories() {
    if (selectedPages.length === 0) return;
    
    setLoadingStories(true);
    const stories: { [pageId: string]: FacebookStory[] } = {};
    
    for (const pageId of selectedPages) {
      const page = facebookPages.find(p => p.id === pageId);
      if (page) {
        const pageStories = await FacebookAPI.getPageStories(pageId, page.access_token, 5);
        stories[pageId] = pageStories;
      }
    }
    
    setPageStories(stories);
    setLoadingStories(false);
  }

  async function loadPageNotifications() {
    if (selectedPages.length === 0) return;
    
    setLoadingNotifications(true);
    const notifications: { [pageId: string]: FacebookNotification[] } = {};
    
    for (const pageId of selectedPages) {
      const page = facebookPages.find(p => p.id === pageId);
      if (page) {
        const pageNotifications = await FacebookAPI.getPageNotifications(pageId, page.access_token, 10);
        notifications[pageId] = pageNotifications;
      }
    }
    
    setPageNotifications(notifications);
    setLoadingNotifications(false);
  }

  // Verificar se há código de callback na URL (após OAuth)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      handleFacebookCallback(code);
      // Limpar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Renderização de páginas legais conforme o path
  const legalPath = window.location.pathname;
  if (legalPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }
  if (legalPath === '/terms-of-service') {
    return <TermsOfService />;
  }
  if (legalPath === '/user-data-deletion') {
    return <UserDataDeletion />;
  }
  if (legalPath === '/instagram-callback') {
    return <InstagramCallback />;
  }
  if (legalPath === '/whatsapp-callback') {
    return <WhatsAppCallback />;
  }

  // Só exibir Auth se não for uma página legal
  if (!user) return <Auth onAuth={() => supabase.auth.getUser().then(({ data }) => setUser(data.user))} />;

  // Simulação de foto e nome do usuário
  const userName = user?.email?.split('@')[0] || 'Usuário';
  const userPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1877f2&color=fff&size=128`;

  return (
    <div className="App">
      <aside className="sidebar">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <img src={userPhoto} alt="avatar" style={{ width: 72, height: 72, borderRadius: '50%', marginBottom: 12, border: '3px solid #1877f2' }} />
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>{userName}</div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
          {MENU_ITEMS.map(item => (
            <button
              key={item.label}
              style={{
                background: activeMenu === item.label ? 'linear-gradient(90deg, #1877f2 60%, #42a5f5 100%)' : 'none',
                color: activeMenu === item.label ? '#fff' : '#e4e6eb',
                border: 'none',
                textAlign: 'left',
                fontSize: 17,
                fontWeight: 500,
                padding: '10px 12px',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onClick={() => setActiveMenu(item.label)}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <SocialConnections />
        <button onClick={handleLogout} style={{ marginTop: 'auto', background: '#3a3b3c', color: '#fff' }}>Sair</button>
      </aside>
      <main className="main">
        <div className="header">{activeMenu === 'Planejamento' ? 'Planejamento de Publicações' : activeMenu === 'Home' ? 'Dashboard' : activeMenu === 'Notificações' ? 'Notificações' : activeMenu === 'Posts & Stories' ? 'Posts & Stories' : 'Gerenciador de Vídeos'}</div>
                       {activeMenu === 'Home' ? (
                 <HomeSection 
                   facebookUser={facebookUser}
                   facebookPages={facebookPages}
                   selectedPages={selectedPages}
                   isConnectingFacebook={isConnectingFacebook}
                   setIsConnectingFacebook={setIsConnectingFacebook}
                   setFacebookUser={setFacebookUser}
                   setFacebookPages={setFacebookPages}
                   setSelectedPages={setSelectedPages}
                   connectFacebookAccount={connectFacebookAccount}
                   togglePageSelection={togglePageSelection}
                   connectAccount={connectAccount}
                 />
               ) : activeMenu === 'Notificações' ? (
                 <NotificationsSection 
                   selectedPages={selectedPages}
                   facebookPages={facebookPages}
                   pageNotifications={pageNotifications}
                   loadingNotifications={loadingNotifications}
                   loadPageNotifications={loadPageNotifications}
                 />
               ) : activeMenu === 'Posts & Stories' ? (
                 <PostsStoriesSection 
                   selectedPages={selectedPages}
                   facebookPages={facebookPages}
                   pagePosts={pagePosts}
                   pageStories={pageStories}
                   loadingPosts={loadingPosts}
                   loadingStories={loadingStories}
                   loadPagePosts={loadPagePosts}
                   loadPageStories={loadPageStories}
                 />
        ) : activeMenu === 'Planejamento' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 12 }}>
              <button className="btn-create" style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => { setModalOpen(true); setModalDefaultDate(undefined); }}>
                <span style={{ fontSize: 22, fontWeight: 700 }}>+</span> Criar Publicação
              </button>
            </div>
            <CreatePostModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onCreate={post => setScheduledPosts(posts => [...posts, post])}
              defaultDate={modalDefaultDate}
            />
            <div className="card">
              <h3>Selecione uma data para visualizar/agendar publicações</h3>
              <FullCalendar selectedDate={selectedDate} onSelect={date => { setSelectedDate(date); setModalDefaultDate(date); }} />
              <h4 style={{ marginTop: 24 }}>Publicações agendadas</h4>
              <ul style={{ padding: 0, listStyle: 'none' }}>
                {scheduledPosts.filter(post => post.date === selectedDate).map((post, i) => (
                  <li key={i} style={{ marginBottom: 8, background: '#e7f3ff', borderRadius: 6, padding: 10, borderLeft: '4px solid #1877F2' }}>
                    <b>{post.date} {post.time}</b> — <span style={{ color: '#1877F2' }}>{post.file}</span> <span style={{ color: '#aaa', fontSize: 13 }}>({post.type})</span><br />
                    <span style={{ fontSize: 15 }}>{post.caption}</span>
                  </li>
                ))}
                {scheduledPosts.filter(post => post.date === selectedDate).length === 0 && <li style={{ color: '#aaa' }}>Nenhuma publicação agendada para este dia.</li>}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="card">
              <form onSubmit={handleUpload} style={{ width: '100%' }}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => setVideoFile(e.target.files ? e.target.files[0] : null)}
                  disabled={loading}
                />
                <button type="submit" disabled={loading || !videoFile} style={{ width: '100%', marginTop: 8 }}>
                  {loading ? 'Enviando...' : 'Fazer upload'}
                </button>
              </form>
              {message && <p style={{ color: '#f44336', margin: 0 }}>{message}</p>}
            </div>
            <h2 style={{ margin: '24px 0 12px 0', fontWeight: 600, fontSize: 22 }}>Vídeos armazenados</h2>
            {loading && <p>Carregando...</p>}
            {videos.map((file: any) => (
              <div className="card" key={file.name}>
                <div className="video-title">
                  <a href={supabase.storage.from('videos').getPublicUrl(file.name).data.publicUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb', textDecoration: 'none' }}>
                    {file.name}
                  </a>
                </div>
                <div className="video-actions">
                  <button onClick={() => handleUploadInstagram(file.name)}>
                    Enviar para Instagram
                  </button>
                  <button onClick={() => handleUploadYouTube(file.name)}>
                    Enviar para YouTube
                  </button>
                  <button onClick={() => handleSuggestCaption(file.name)}>
                    Sugerir legenda com IA
                  </button>
                </div>
                {captions[file.name] && (
                  <div style={{ marginTop: 4, color: '#61dafb', fontSize: 14 }}>
                    {captions[file.name]}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </main>
      <footer style={{ marginTop: 40, textAlign: 'center', color: '#aaa', fontSize: 14 }}>
        <a href="/privacy-policy" style={{ color: '#aaa', marginRight: 16 }}>Política de Privacidade</a>
        <a href="/terms-of-service" style={{ color: '#aaa', marginRight: 16 }}>Termos de Serviço</a>
        <a href="/user-data-deletion" style={{ color: '#aaa' }}>Exclusão de Dados</a>
      </footer>
    </div>
  );
}

export default App;
