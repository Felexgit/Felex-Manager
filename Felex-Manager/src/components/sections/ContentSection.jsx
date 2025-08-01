import React, { useState, useEffect } from 'react';
import { Youtube, Play, Users, Eye, Heart, MessageCircle, Calendar, TrendingUp, Settings, Plus, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import YouTubeConnectModal from '../modals/YouTubeConnectModal';
import YouTubeAnalytics from './youtube/YouTubeAnalytics';
import YouTubeVideos from './youtube/YouTubeVideos';
import YouTubePlaylists from './youtube/YouTubePlaylists';
import AIAgentComments from './youtube/AIAgentComments';
import AIAgentPlanner from './youtube/AIAgentPlanner';

const ContentSection = () => {
    const [activeTab, setActiveTab] = useState('videos');
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [youtubeAccount, setYoutubeAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [analytics, setAnalytics] = useState(null);
    const [videos, setVideos] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [aiAgents, setAiAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);

    useEffect(() => {
        loadYouTubeAccount();
        loadAIAgents();
    }, []);

    const loadYouTubeAccount = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: account } = await supabase
                    .from('youtube_accounts')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();
                
                if (account) {
                    setYoutubeAccount(account);
                    await loadYouTubeData(account);
                }
            }
        } catch (error) {
            console.error('Error loading YouTube account:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadAIAgents = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: agents } = await supabase
                    .from('ai_agents')
                    .select('*')
                    .eq('user_id', user.id);
                
                setAiAgents(agents || []);
            }
        } catch (error) {
            console.error('Error loading AI agents:', error);
        }
    };

    const loadYouTubeData = async (account) => {
        // Simular carregamento de dados do YouTube
        // Em produção, isso seria uma chamada para a API do YouTube
        setAnalytics({
            subscribers: 15420,
            totalViews: 2847500,
            totalVideos: 156,
            monthlyViews: 125000,
            engagementRate: 4.2
        });

        setVideos([
            {
                id: '1',
                title: 'Como Criar Conteúdo Viral em 2024',
                thumbnail: 'https://via.placeholder.com/320x180/ff0000/ffffff?text=Video+1',
                views: 125000,
                likes: 3200,
                comments: 450,
                publishedAt: '2024-01-15',
                duration: '12:34'
            },
            {
                id: '2',
                title: 'Tutorial Completo de Edição de Vídeo',
                thumbnail: 'https://via.placeholder.com/320x180/ff0000/ffffff?text=Video+2',
                views: 89000,
                likes: 2100,
                comments: 320,
                publishedAt: '2024-01-10',
                duration: '18:45'
            }
        ]);

        setPlaylists([
            {
                id: '1',
                title: 'Tutoriais de Marketing Digital',
                videoCount: 25,
                thumbnail: 'https://via.placeholder.com/320x180/ff0000/ffffff?text=Playlist+1'
            },
            {
                id: '2',
                title: 'Dicas de Crescimento no YouTube',
                videoCount: 18,
                thumbnail: 'https://via.placeholder.com/320x180/ff0000/ffffff?text=Playlist+2'
            }
        ]);
    };

    const handleConnectSuccess = async (accountData) => {
        setYoutubeAccount(accountData);
        await loadYouTubeData(accountData);
        setIsConnectModalOpen(false);
    };

    const tabs = [
        { id: 'videos', label: 'Vídeos', icon: <Play size={16} /> },
        { id: 'playlists', label: 'Playlists', icon: <Youtube size={16} /> },
        { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={16} /> },
        { id: 'ai-comments', label: 'Comentários IA', icon: <MessageCircle size={16} /> },
        { id: 'ai-planner', label: 'Planejador IA', icon: <Calendar size={16} /> }
    ];

    if (isLoading) {
        return (
            <div className="p-8 h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Carregando conteúdo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 h-full flex flex-col">
            <YouTubeConnectModal 
                isOpen={isConnectModalOpen} 
                onClose={() => setIsConnectModalOpen(false)}
                onSuccess={handleConnectSuccess}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Gerenciador de Conteúdo</h1>
                    <p className="text-gray-400">
                        {youtubeAccount ? `Conectado como: ${youtubeAccount.channel_name}` : 'Conecte sua conta do YouTube para começar'}
                    </p>
                </div>
                
                {youtubeAccount ? (
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => loadYouTubeData(youtubeAccount)}
                            className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <RefreshCw size={16} className="mr-2" />
                            Atualizar
                        </button>
                        <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                            <Settings size={16} className="mr-2" />
                            Configurações
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsConnectModalOpen(true)}
                        className="flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors font-semibold"
                    >
                        <Youtube size={20} className="mr-2" />
                        Conectar YouTube
                    </button>
                )}
            </div>

            {/* Account Stats */}
            {youtubeAccount && analytics && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Inscritos</p>
                                <p className="text-2xl font-bold text-white">{analytics.subscribers.toLocaleString()}</p>
                            </div>
                            <Users className="text-indigo-400" size={24} />
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Visualizações</p>
                                <p className="text-2xl font-bold text-white">{analytics.totalViews.toLocaleString()}</p>
                            </div>
                            <Eye className="text-green-400" size={24} />
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Vídeos</p>
                                <p className="text-2xl font-bold text-white">{analytics.totalVideos}</p>
                            </div>
                            <Play className="text-red-400" size={24} />
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Engajamento</p>
                                <p className="text-2xl font-bold text-white">{analytics.engagementRate}%</p>
                            </div>
                            <Heart className="text-pink-400" size={24} />
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Visualizações/Mês</p>
                                <p className="text-2xl font-bold text-white">{analytics.monthlyViews.toLocaleString()}</p>
                            </div>
                            <TrendingUp className="text-blue-400" size={24} />
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            {youtubeAccount && (
                <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            {tab.icon}
                            <span className="ml-2">{tab.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {!youtubeAccount ? (
                    <div className="text-center py-12">
                        <Youtube size={64} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Conecte sua conta do YouTube</h3>
                        <p className="text-gray-400 mb-6">
                            Conecte sua conta para visualizar vídeos, playlists, analytics e gerenciar conteúdo com IA
                        </p>
                        <button 
                            onClick={() => setIsConnectModalOpen(true)}
                            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-500 transition-colors font-semibold"
                        >
                            Conectar Conta
                        </button>
                    </div>
                ) : (
                    <>
                        {activeTab === 'videos' && <YouTubeVideos videos={videos} />}
                        {activeTab === 'playlists' && <YouTubePlaylists playlists={playlists} />}
                        {activeTab === 'analytics' && <YouTubeAnalytics analytics={analytics} />}
                        {activeTab === 'ai-comments' && (
                            <AIAgentComments 
                                agents={aiAgents}
                                selectedAgent={selectedAgent}
                                setSelectedAgent={setSelectedAgent}
                                youtubeAccount={youtubeAccount}
                            />
                        )}
                        {activeTab === 'ai-planner' && (
                            <AIAgentPlanner 
                                agents={aiAgents}
                                selectedAgent={selectedAgent}
                                setSelectedAgent={setSelectedAgent}
                                youtubeAccount={youtubeAccount}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentSection; 