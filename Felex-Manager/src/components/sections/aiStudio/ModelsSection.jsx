import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { mockAiModels } from '../../../data/mockData';

const ModelsSection = () => {
    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Modelos de IA Conectados</h3>
                        <p className="text-gray-400">Gerencie suas chaves de API para os modelos de geração.</p>
                    </div>
                    <button className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all">
                        <Plus size={20} className="mr-2"/>Adicionar Modelo
                    </button>
                </div>
                <div className="space-y-4">
                    {mockAiModels.map(model => (
                        <div key={model.id} className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                            <div className="flex items-center">
                                <img src={`https://placehold.co/40x40/${model.id.includes('openai') ? '000000/FFFFFF?text=OAI' : 'FFFFFF/000000?text=MJ'}`} alt="Model Logo" className="rounded-md mr-4"/>
                                <div>
                                    <h4 className="font-bold text-white">{model.name}</h4>
                                    <p className="text-sm text-gray-400">{model.status === 'Conectado' ? 'Conectado e pronto para uso' : 'Requer configuração'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`${model.status === 'Conectado' ? 'text-green-400 bg-green-900/50' : 'text-yellow-400 bg-yellow-900/50'} px-3 py-1 rounded-full text-xs font-semibold`}>
                                    {model.status}
                                </span>
                                <button className="text-gray-400 hover:text-white">
                                    <MoreVertical size={20}/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-gray-800/80 p-4 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 hover:border-indigo-500 hover:text-indigo-400 cursor-pointer transition-colors">
                        <p>Adicionar novo modelo de IA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelsSection; 