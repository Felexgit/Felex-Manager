import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, Users, Heart, MessageCircle, Calendar, BarChart3 } from 'lucide-react';

const YouTubeAnalytics = ({ analytics }) => {
    const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d, 1y

    const timeRanges = [
        { value: '7d', label: '7 dias' },
        { value: '30d', label: '30 dias' },
        { value: '90d', label: '90 dias' },
        { value: '1y', label: '1 ano' }
    ];

    // Dados simulados para gráficos
    const viewsData = [
        { date: '2024-01-01', views: 12000 },
        { date: '2024-01-02', views: 15000 },
        { date: '2024-01-03', views: 18000 },
        { date: '2024-01-04', views: 14000 },
        { date: '2024-01-05', views: 22000 },
        { date: '2024-01-06', views: 25000 },
        { date: '2024-01-07', views: 28000 },
    ];

    const subscribersData = [
        { date: '2024-01-01', subscribers: 15000 },
        { date: '2024-01-02', subscribers: 15100 },
        { date: '2024-01-03', subscribers: 15250 },
        { date: '2024-01-04', subscribers: 15300 },
        { date: '2024-01-05', subscribers: 15400 },
        { date: '2024-01-06', subscribers: 15450 },
        { date: '2024-01-07', subscribers: 15420 },
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const getGrowthRate = (current, previous) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous * 100).toFixed(1);
    };

    const renderSimpleChart = (data, color = 'indigo') => {
        const maxValue = Math.max(...data.map(d => d.views || d.subscribers));
        const minValue = Math.min(...data.map(d => d.views || d.subscribers));
        const range = maxValue - minValue;

        return (
            <div className="flex items-end justify-between h-32 space-x-1">
                {data.map((point, index) => {
                    const value = point.views || point.subscribers;
                    const height = range > 0 ? ((value - minValue) / range) * 100 : 50;
                    
                    return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                                className={`w-full bg-${color}-500 rounded-t transition-all duration-300 hover:bg-${color}-400`}
                                style={{ height: `${height}%` }}
                            />
                            <span className="text-xs text-gray-400 mt-1">
                                {new Date(point.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Analytics</h2>
                <div className="flex items-center space-x-2">
                    {timeRanges.map(range => (
                        <button
                            key={range.value}
                            onClick={() => setTimeRange(range.value)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                timeRange === range.value
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600'
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <Users className="text-indigo-400" size={20} />
                        </div>
                        <TrendingUp className="text-green-400" size={16} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {formatNumber(analytics.subscribers)}
                    </h3>
                    <p className="text-gray-400 text-sm">Inscritos</p>
                    <p className="text-green-400 text-xs mt-1">+2.1% este mês</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Eye className="text-green-400" size={20} />
                        </div>
                        <TrendingUp className="text-green-400" size={16} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {formatNumber(analytics.totalViews)}
                    </h3>
                    <p className="text-gray-400 text-sm">Visualizações Totais</p>
                    <p className="text-green-400 text-xs mt-1">+5.3% este mês</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                            <BarChart3 className="text-red-400" size={20} />
                        </div>
                        <TrendingUp className="text-green-400" size={16} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {analytics.totalVideos}
                    </h3>
                    <p className="text-gray-400 text-sm">Vídeos Publicados</p>
                    <p className="text-green-400 text-xs mt-1">+3 novos este mês</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-pink-500/20 rounded-lg">
                            <Heart className="text-pink-400" size={20} />
                        </div>
                        <TrendingUp className="text-green-400" size={16} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {analytics.engagementRate}%
                    </h3>
                    <p className="text-gray-400 text-sm">Taxa de Engajamento</p>
                    <p className="text-green-400 text-xs mt-1">+0.8% este mês</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Views Chart */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Visualizações</h3>
                        <div className="flex items-center text-green-400 text-sm">
                            <TrendingUp size={14} className="mr-1" />
                            +12.5%
                        </div>
                    </div>
                    {renderSimpleChart(viewsData, 'green')}
                    <div className="mt-4 text-center">
                        <p className="text-gray-400 text-sm">
                            Média diária: {formatNumber(Math.round(viewsData.reduce((sum, d) => sum + d.views, 0) / viewsData.length))} visualizações
                        </p>
                    </div>
                </div>

                {/* Subscribers Chart */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Inscritos</h3>
                        <div className="flex items-center text-green-400 text-sm">
                            <TrendingUp size={14} className="mr-1" />
                            +2.1%
                        </div>
                    </div>
                    {renderSimpleChart(subscribersData, 'indigo')}
                    <div className="mt-4 text-center">
                        <p className="text-gray-400 text-sm">
                            Crescimento: +{subscribersData[subscribersData.length - 1].subscribers - subscribersData[0].subscribers} inscritos
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Metrics */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Métricas Detalhadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-3">Performance por Vídeo</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Visualizações médias</span>
                                <span className="text-white font-medium">15.2K</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Likes médios</span>
                                <span className="text-white font-medium">1.2K</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Comentários médios</span>
                                <span className="text-white font-medium">180</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-3">Engajamento</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Taxa de like</span>
                                <span className="text-white font-medium">7.9%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Taxa de comentário</span>
                                <span className="text-white font-medium">1.2%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Taxa de compartilhamento</span>
                                <span className="text-white font-medium">0.8%</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-3">Crescimento</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Inscritos/mês</span>
                                <span className="text-white font-medium">+420</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Visualizações/mês</span>
                                <span className="text-white font-medium">+125K</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Vídeos/mês</span>
                                <span className="text-white font-medium">+3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouTubeAnalytics; 