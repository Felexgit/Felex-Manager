import React, { useState } from 'react';
import { Play, Eye, Heart, MessageCircle, Calendar, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';

const YouTubeVideos = ({ videos }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // grid, list

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const handleVideoAction = (action, video) => {
        console.log(`${action} video:`, video);
        // Implementar ações específicas
    };

    if (viewMode === 'grid') {
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Vídeos Recentes</h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map(video => (
                        <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                            {/* Thumbnail */}
                            <div className="relative">
                                <img 
                                    src={video.thumbnail} 
                                    alt={video.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <button className="bg-red-600 text-white p-3 rounded-full hover:bg-red-500 transition-colors">
                                        <Play size={20} />
                                    </button>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                                    {video.title}
                                </h3>
                                
                                {/* Stats */}
                                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <Eye size={14} className="mr-1" />
                                            {formatNumber(video.views)}
                                        </div>
                                        <div className="flex items-center">
                                            <Heart size={14} className="mr-1" />
                                            {formatNumber(video.likes)}
                                        </div>
                                        <div className="flex items-center">
                                            <MessageCircle size={14} className="mr-1" />
                                            {formatNumber(video.comments)}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={14} className="mr-1" />
                                        {formatDate(video.publishedAt)}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                    <button 
                                        onClick={() => handleVideoAction('view', video)}
                                        className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm"
                                    >
                                        <ExternalLink size={14} className="mr-1" />
                                        Ver no YouTube
                                    </button>
                                    <div className="flex items-center space-x-1">
                                        <button 
                                            onClick={() => handleVideoAction('edit', video)}
                                            className="p-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleVideoAction('delete', video)}
                                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // List View
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Vídeos Recentes</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* List View */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Vídeo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Visualizações
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Likes
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Comentários
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Data
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {videos.map(video => (
                                <tr key={video.id} className="hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img 
                                                src={video.thumbnail} 
                                                alt={video.title}
                                                className="w-16 h-12 object-cover rounded mr-4"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-white line-clamp-2">
                                                    {video.title}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {video.duration}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {formatNumber(video.views)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {formatNumber(video.likes)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {formatNumber(video.comments)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {formatDate(video.publishedAt)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        <div className="flex items-center space-x-2">
                                            <button 
                                                onClick={() => handleVideoAction('view', video)}
                                                className="text-indigo-400 hover:text-indigo-300"
                                            >
                                                <ExternalLink size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleVideoAction('edit', video)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleVideoAction('delete', video)}
                                                className="text-gray-400 hover:text-red-400"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default YouTubeVideos; 