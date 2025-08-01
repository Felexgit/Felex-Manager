import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from '../ui/Icons';

const platformDetails = {
    youtube: { icon: <Youtube size={14}/>, color: 'bg-red-500', name: 'YouTube' },
    instagram: { icon: <InstagramIcon className="w-3.5 h-3.5"/>, color: 'bg-pink-500', name: 'Instagram' },
    tiktok: { icon: <TikTokIcon className="w-3.5 h-3.5 text-white"/>, color: 'bg-sky-500', name: 'TikTok' },
};

const CreatePostModal = ({ isOpen, onClose, date }) => {
    if (!isOpen) return null;

    const [platforms, setPlatforms] = useState([]);

    const togglePlatform = (p) => {
        setPlatforms(current => 
            current.includes(p) ? current.filter(i => i !== p) : [...current, p]
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">Criar Nova Publicação</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24}/>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Plataformas</label>
                        <div className="flex space-x-3">
                            {Object.entries(platformDetails).map(([key, {icon, name}]) => (
                                <button
                                    key={key}
                                    onClick={() => togglePlatform(key)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                                        platforms.includes(key)
                                            ? 'border-indigo-500 bg-indigo-900/50 text-white'
                                            : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                                    }`}
                                >
                                    {icon}
                                    <span>{name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Conteúdo</label>
                        <textarea
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="5"
                            placeholder="Escreva sua legenda aqui..."
                        ></textarea>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Mídia</label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center text-center text-gray-400 hover:border-indigo-500 hover:bg-gray-700/50 cursor-pointer">
                            <UploadCloud size={32} className="mb-2"/>
                            <p className="font-semibold">Arraste e solte arquivos ou clique para carregar</p>
                            <p className="text-xs">Vídeos em MP4 ou imagens em JPG, PNG</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Agendamento</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="date"
                                defaultValue={date}
                                className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="time"
                                defaultValue="12:00"
                                className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center p-6 bg-gray-900/50 border-t border-gray-700 rounded-b-xl">
                    <button onClick={onClose} className="text-gray-300 font-bold py-2 px-5 rounded-lg hover:bg-gray-700 mr-4">
                        Cancelar
                    </button>
                    <button className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-500 transition-all">
                        Agendar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal; 