import React, { useState, useEffect } from 'react';
import { Calendar, Bot, Plus, CheckCircle, Clock, Target, TrendingUp, Sparkles, Settings } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

const AIAgentPlanner = ({ agents, selectedAgent, setSelectedAgent, youtubeAccount }) => {
    const [plans, setPlans] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('plans'); // plans, suggestions, automation

    // Planos simulados da IA
    const mockPlans = [
        {
            id: 1,
            title: 'Série: Marketing Digital 2024',
            description: 'Série de 5 vídeos sobre tendências de marketing digital para 2024',
            type: 'series',
            status: 'planned',
            priority: 'high',
            estimatedViews: 25000,
            targetAudience: 'Profissionais de Marketing',
            topics: [
                'Tendências de Marketing Digital',
                'Automação de Marketing',
                'Marketing de Conteúdo',
                'Analytics e Métricas',
                'Futuro do Marketing'
            ],
            schedule: [
                { date: '2024-02-01', topic: 'Tendências de Marketing Digital' },
                { date: '2024-02-08', topic: 'Automação de Marketing' },
                { date: '2024-02-15', topic: 'Marketing de Conteúdo' },
                { date: '2024-02-22', topic: 'Analytics e Métricas' },
                { date: '2024-02-29', topic: 'Futuro do Marketing' }
            ],
            agent: 'Marketing Expert',
            confidence: 0.94,
            tags: ['marketing', 'série', 'tendências']
        },
        {
            id: 2,
            title: 'Tutorial: Edição de Vídeo Avançada',
            description: 'Tutorial completo sobre técnicas avançadas de edição de vídeo',
            type: 'tutorial',
            status: 'in_progress',
            priority: 'medium',
            estimatedViews: 18000,
            targetAudience: 'Criadores de Conteúdo',
            topics: ['Técnicas Avançadas', 'Efeitos Visuais', 'Correção de Cor'],
            schedule: [
                { date: '2024-01-25', topic: 'Técnicas Avançadas' },
                { date: '2024-02-01', topic: 'Efeitos Visuais' },
                { date: '2024-02-08', topic: 'Correção de Cor' }
            ],
            agent: 'Content Creator',
            confidence: 0.87,
            tags: ['tutorial', 'edição', 'técnicas']
        }
    ];

    const mockSuggestions = [
        {
            id: 1,
            title: 'Vídeo sobre SEO para YouTube',
            description: 'Baseado na análise do canal, vídeos sobre SEO têm 30% mais engajamento',
            type: 'topic',
            priority: 'high',
            estimatedViews: 22000,
            reasoning: 'Alto interesse demonstrado nos comentários + tendência crescente',
            agent: 'Analytics Pro',
            confidence: 0.91
        },
        {
            id: 2,
            title: 'Colaboração com Influencer',
            description: 'Sugestão de colaboração com @MarketingGuru para aumentar alcance',
            type: 'collaboration',
            priority: 'medium',
            estimatedViews: 35000,
            reasoning: 'Público similar + potencial de crescimento mútuo',
            agent: 'Growth Specialist',
            confidence: 0.88
        }
    ];

    useEffect(() => {
        loadPlannerData();
    }, [selectedAgent]);

    const loadPlannerData = async () => {
        setIsLoading(true);
        try {
            // Simular carregamento de dados
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPlans(mockPlans);
            setSuggestions(mockSuggestions);
        } catch (error) {
            console.error('Error loading planner data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlanAction = (action, plan) => {
        console.log(`${action} plan:`, plan);
        // Implementar ações específicas
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'planned':
                return 'text-blue-400 bg-blue-500/20';
            case 'in_progress':
                return 'text-yellow-400 bg-yellow-500/20';
            case 'completed':
                return 'text-green-400 bg-green-500/20';
            default:
                return 'text-gray-400 bg-gray-500/20';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-400 bg-red-500/20';
            case 'medium':
                return 'text-yellow-400 bg-yellow-500/20';
            case 'low':
                return 'text-green-400 bg-green-500/20';
            default:
                return 'text-gray-400 bg-gray-500/20';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Planejador de IA</h2>
                <button
                    onClick={loadPlannerData}
                    disabled={isLoading}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                >
                    <Sparkles size={16} className="mr-2" />
                    Gerar Plano
                </button>
            </div>

            {/* Agent Selection */}
            <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Agente de Planejamento</h3>
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
                    { id: 'plans', label: 'Planos', icon: <Calendar size={16} /> },
                    { id: 'suggestions', label: 'Sugestões', icon: <Sparkles size={16} /> },
                    { id: 'automation', label: 'Automação', icon: <Settings size={16} /> }
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

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">Gerando plano de conteúdo...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Plans Tab */}
                    {activeTab === 'plans' && (
                        <div className="space-y-4">
                            {plans.map(plan => (
                                <div key={plan.id} className="bg-gray-800 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                                                    {plan.status === 'planned' ? 'Planejado' : 
                                                     plan.status === 'in_progress' ? 'Em Progresso' : 'Concluído'}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(plan.priority)}`}>
                                                    {plan.priority === 'high' ? 'Alta' : 
                                                     plan.priority === 'medium' ? 'Média' : 'Baixa'}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 mb-3">{plan.description}</p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-300">
                                                <div className="flex items-center">
                                                    <Target size={14} className="mr-1" />
                                                    {plan.targetAudience}
                                                </div>
                                                <div className="flex items-center">
                                                    <TrendingUp size={14} className="mr-1" />
                                                    {plan.estimatedViews.toLocaleString()} visualizações estimadas
                                                </div>
                                                <div className="flex items-center">
                                                    <Bot size={14} className="mr-1" />
                                                    {plan.agent}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                                {Math.round(plan.confidence * 100)}% confiança
                                            </span>
                                        </div>
                                    </div>

                                    {/* Schedule */}
                                    <div className="mb-4">
                                        <h4 className="text-white font-medium mb-2">Cronograma</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                            {plan.schedule.map((item, index) => (
                                                <div key={index} className="bg-gray-700 rounded p-2">
                                                    <div className="text-xs text-gray-400">{formatDate(item.date)}</div>
                                                    <div className="text-sm text-white">{item.topic}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1">
                                            {plan.tags.map(tag => (
                                                <span key={tag} className="text-xs bg-gray-600 px-2 py-1 rounded">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handlePlanAction('edit', plan)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handlePlanAction('execute', plan)}
                                                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-500 transition-colors"
                                            >
                                                Executar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Suggestions Tab */}
                    {activeTab === 'suggestions' && (
                        <div className="space-y-4">
                            {suggestions.map(suggestion => (
                                <div key={suggestion.id} className="bg-gray-800 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-white">{suggestion.title}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                                                    {suggestion.priority === 'high' ? 'Alta' : 
                                                     suggestion.priority === 'medium' ? 'Média' : 'Baixa'}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 mb-3">{suggestion.description}</p>
                                            <div className="bg-gray-700 rounded p-3 mb-3">
                                                <h4 className="text-white font-medium mb-1">Justificativa</h4>
                                                <p className="text-gray-300 text-sm">{suggestion.reasoning}</p>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-300">
                                                <div className="flex items-center">
                                                    <TrendingUp size={14} className="mr-1" />
                                                    {suggestion.estimatedViews.toLocaleString()} visualizações estimadas
                                                </div>
                                                <div className="flex items-center">
                                                    <Bot size={14} className="mr-1" />
                                                    {suggestion.agent}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                                {Math.round(suggestion.confidence * 100)}% confiança
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                            Tipo: {suggestion.type === 'topic' ? 'Tópico' : 'Colaboração'}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handlePlanAction('reject', suggestion)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                Rejeitar
                                            </button>
                                            <button
                                                onClick={() => handlePlanAction('accept', suggestion)}
                                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-500 transition-colors"
                                            >
                                                Aceitar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Automation Tab */}
                    {activeTab === 'automation' && (
                        <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Automação de Conteúdo</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-gray-400 font-medium mb-3">Configurações Ativas</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300">Análise automática de performance</span>
                                                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300">Sugestões de tópicos</span>
                                                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300">Otimização de títulos</span>
                                                <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                                                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 font-medium mb-3">Próximas Automações</h4>
                                        <div className="space-y-3">
                                            <div className="bg-gray-700 rounded p-3">
                                                <div className="text-white font-medium">Resposta automática a comentários</div>
                                                <div className="text-gray-400 text-sm">Em desenvolvimento</div>
                                            </div>
                                            <div className="bg-gray-700 rounded p-3">
                                                <div className="text-white font-medium">Análise de tendências</div>
                                                <div className="text-gray-400 text-sm">Planejado para fevereiro</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AIAgentPlanner; 