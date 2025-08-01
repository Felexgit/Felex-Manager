import React from 'react';
import { UploadCloud, FileText, Trash2 } from 'lucide-react';

const MemorySection = () => {
    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Memória dos Agentes</h3>
                        <p className="text-gray-400">Gerencie os ficheiros de conhecimento que seus agentes usam para aprender.</p>
                    </div>
                    <button className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all">
                        <UploadCloud size={20} className="mr-2"/>Upload de Ficheiro
                    </button>
                </div>
                <div className="bg-gray-800/80 rounded-lg border border-gray-700">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-300">Nome do Ficheiro</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Última Modificação</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Armazenamento</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-700 hover:bg-gray-800">
                                <td className="p-4 text-white font-medium flex items-center">
                                    <FileText size={18} className="mr-3 text-indigo-400"/>
                                    <span>knowledge_base_ecommerce.json</span>
                                </td>
                                <td className="p-4 text-gray-400">2 dias atrás</td>
                                <td className="p-4 text-gray-400">
                                    <span className="bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded text-xs">Supabase</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-white">
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-800">
                                <td className="p-4 text-white font-medium flex items-center">
                                    <FileText size={18} className="mr-3 text-indigo-400"/>
                                    <span>brand_voice_guidelines.txt</span>
                                </td>
                                <td className="p-4 text-gray-400">5 dias atrás</td>
                                <td className="p-4 text-gray-400">
                                    <span className="bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded text-xs">Supabase</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-white">
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MemorySection; 