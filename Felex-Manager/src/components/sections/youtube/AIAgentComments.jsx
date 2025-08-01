import React, { useState, useEffect } from 'react';
import { MessageCircle, Bot, Send, ThumbsUp, ThumbsDown, RefreshCw, User, Sparkles } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

const AIAgentComments = ({ agents, selectedAgent, setSelectedAgent, youtubeAccount }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [activeTab, setActiveTab] = useState('suggestions'); // suggestions, analysis, responses

    // Comentários simulados da IA
    const mockComments = [
        {
            id: 1,
            type: 'suggestion',
            content: 'Baseado na análise do seu último vídeo sobre marketing digital, sugiro criar uma série sobre "Tendências de Marketing para 2024". O engajamento foi 15% maior que a média do canal.',
            videoTitle: 'Como Criar Conteúdo Viral em 2024',
            timestamp: '2024-01-15T10:30:00Z',
            agent: 'Marketing Expert',
            confidence: 0.92,
            tags: ['marketing', 'tendências', 'série']
        },
        {
            id: 2,
            type: 'analysis',
            content: 'Análise de performance: O vídeo "Tutorial de Edição" teve 23% mais visualizações nos primeiros 3 dias. Recomendo focar em tutoriais práticos nas próximas semanas.',
            videoTitle: 'Tutorial Completo de Edição de Vídeo',
            timestamp: '2024-01-14T15:45:00Z',
            agent: 'Analytics Pro',
            confidence: 0.88,
            tags: ['performance', 'tutorial', 'edição']
        },
        {
            id: 3,
            type: 'response',
            content: 'Respondi aos comentários mais populares do vídeo sobre SEO. Sugestões de melhorias para o próximo vídeo: incluir mais exemplos práticos e criar uma playlist dedicada.',
            videoTitle: 'SEO para YouTube em 2024',
            timestamp: '2024-01-13T09:15:00Z',
            agent: 'Community Manager',
            confidence: 0.95,
            tags: ['SEO', 'comentários', 'playlist']
        }
    ];

    useEffect(() => {
        loadComments();
    }, [selectedAgent]);

    const loadComments = async () => {
        setIsLoading(true);
        try {
            // Simular carregamento de comentários da IA
            await new Promise(resolve => setTimeout(resolve, 1000));
            setComments(mockComments);
        } catch (error) {
            console.error('Error loading AI comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendComment = async () => {
        if (!newComment.trim() || !selectedAgent) return;

        const comment = {
            id: Date.now(),
            type: 'user',
            content: newComment,
            timestamp: new Date().toISOString(),
            agent: selectedAgent.name,
            user: 'Você'
        };

        setComments(prev => [comment, ...prev]);
        setNewComment('');

        // Simular resposta da IA
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                type: 'ai_response',
                content: `Entendi sua solicitação sobre "${newComment}". Vou analisar os dados do canal e fornecer recomendações específicas baseadas no histórico de performance.`,
                timestamp: new Date().toISOString(),
                agent: selectedAgent.name,
                confidence: 0.89,
                tags: ['análise', 'recomendação']
            };
            setComments(prev => [aiResponse, ...prev]);
        }, 2000);
    };

    const handleAgentAction = (action, comment) => {
        console.log(`${action} comment:`, comment);
        // Implementar ações específicas
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'suggestion':
                return <Sparkles size={16} className="text-yellow-400" />;
            case 'analysis':
                return <RefreshCw size={16} className="text-blue-400" />;
            case 'response':
                return <MessageCircle size={16} className="text-green-400" />;
            default:
                return <Bot size={16} className="text-indigo-400" />;
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'suggestion':
                return 'Sugestão';
            case 'analysis':
                return 'Análise';
            case 'response':
                return 'Resposta';
            default:
                return 'Comentário';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Comentários da IA</h2>
                <button
                    onClick={loadComments}
                    disabled={isLoading}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Atualizar
                </button>
            </div>

            {/* Agent Selection */}
            <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Selecionar Agente</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {agents.map(agent => (
                        <button
                            key={agent.id}
                            onClick={() => setSelectedAgent(agent)}
                            className={`p-3 rounded-lg border-2 transition-colors ${
                                selectedAgent?.id === agent.id
                                    ? 'border-indigo-500 bg-indigo-500/20 text-white'
                                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center">
                                <Bot size={16} className="mr-2" />
                                <div className="text-left">
                                    <div className="font-medium">{agent.name}</div>
                                    <div className="text-xs opacity-75">{agent.role}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
                {[
                    { id: 'suggestions', label: 'Sugestões', icon: <Sparkles size={16} /> },
                    { id: 'analysis', label: 'Análises', icon: <RefreshCw size={16} /> },
                    { id: 'responses', label: 'Respostas', icon: <MessageCircle size={16} /> }
                ].map(tab => (
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

            {/* Chat Interface */}
            <div className="bg-gray-800 rounded-lg h-96 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <RefreshCw className="animate-spin text-indigo-400 mx-auto mb-2" size={24} />
                                <p className="text-gray-400">Carregando comentários...</p>
                            </div>
                        </div>
                    ) : (
                        comments
                            .filter(comment => {
                                if (activeTab === 'suggestions') return comment.type === 'suggestion';
                                if (activeTab === 'analysis') return comment.type === 'analysis';
                                if (activeTab === 'responses') return comment.type === 'response' || comment.type === 'ai_response';
                                return true;
                            })
                            .map(comment => (
                                <div key={comment.id} className={`flex ${comment.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md ${
                                        comment.type === 'user' 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'bg-gray-700 text-gray-200'
                                    } rounded-lg p-3`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                {comment.type === 'user' ? (
                                                    <User size={14} className="mr-2" />
                                                ) : (
                                                    getTypeIcon(comment.type)
                                                )}
                                                <span className="text-xs font-medium">
                                                    {comment.type === 'user' ? 'Você' : comment.agent}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-xs opacity-75">
                                                    {formatTimestamp(comment.timestamp)}
                                                </span>
                                                {comment.confidence && (
                                                    <span className="text-xs bg-green-500/20 text-green-400 px-1 rounded">
                                                        {Math.round(comment.confidence * 100)}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm mb-2">{comment.content}</p>
                                        {comment.videoTitle && (
                                            <div className="text-xs opacity-75 mb-2">
                                                📹 {comment.videoTitle}
                                            </div>
                                        )}
                                        {comment.tags && (
                                            <div className="flex flex-wrap gap-1">
                                                {comment.tags.map(tag => (
                                                    <span key={tag} className="text-xs bg-gray-600 px-2 py-1 rounded">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {comment.type !== 'user' && (
                                            <div className="flex items-center justify-end space-x-2 mt-2">
                                                <button
                                                    onClick={() => handleAgentAction('like', comment)}
                                                    className="text-xs text-gray-400 hover:text-green-400 transition-colors"
                                                >
                                                    <ThumbsUp size={12} />
                                                </button>
                                                <button
                                                    onClick={() => handleAgentAction('dislike', comment)}
                                                    className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                                                >
                                                    <ThumbsDown size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                    )}
                </div>

                {/* Input */}
                <div className="border-t border-gray-700 p-4">
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={selectedAgent ? `Pergunte algo para ${selectedAgent.name}...` : 'Selecione um agente primeiro...'}
                            disabled={!selectedAgent}
                            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                        />
                        <button
                            onClick={handleSendComment}
                            disabled={!selectedAgent || !newComment.trim()}
                            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Agent Capabilities */}
            {selectedAgent && (
                <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Capacidades do {selectedAgent.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="text-gray-400 font-medium mb-2">Análise de Conteúdo</h4>
                            <ul className="space-y-1 text-gray-300">
                                <li>• Análise de performance de vídeos</li>
                                <li>• Identificação de tendências</li>
                                <li>• Sugestões de melhorias</li>
                                <li>• Análise de comentários</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-gray-400 font-medium mb-2">Recomendações</h4>
                            <ul className="space-y-1 text-gray-300">
                                <li>• Ideias para novos vídeos</li>
                                <li>• Otimização de títulos</li>
                                <li>• Estratégias de crescimento</li>
                                <li>• Timing de publicações</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAgentComments; 