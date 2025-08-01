import React from 'react';

const ToolsSection = () => {
    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">Ferramentas e Integrações</h3>
                    <p className="text-gray-400">Conecte seus agentes a ferramentas externas para expandir suas capacidades.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800/80 p-6 rounded-lg border border-gray-700 flex flex-col items-start">
                        <img src="https://placehold.co/48x48/4285F4/FFFFFF?text=G" alt="Google Drive Logo" className="rounded-lg mb-4"/>
                        <h4 className="font-bold text-white mb-1">Google Drive</h4>
                        <p className="text-sm text-gray-400 mb-4 flex-grow">Permita que seus agentes leiam documentos e planilhas.</p>
                        <button className="w-full bg-gray-700 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition-all">Conectar</button>
                    </div>
                    <div className="bg-gray-800/80 p-6 rounded-lg border border-gray-700 flex flex-col items-start">
                        <img src="https://placehold.co/48x48/36C5F0/FFFFFF?text=S" alt="Slack Logo" className="rounded-lg mb-4"/>
                        <h4 className="font-bold text-white mb-1">Slack</h4>
                        <p className="text-sm text-gray-400 mb-4 flex-grow">Envie notificações e relatórios para canais do Slack.</p>
                        <button className="w-full bg-green-600 text-white font-bold py-2 rounded-lg">Conectado</button>
                    </div>
                    <div className="bg-gray-800/80 p-6 rounded-lg border border-gray-700 flex flex-col items-start">
                        <img src="https://placehold.co/48x48/000000/FFFFFF?text=N" alt="Notion Logo" className="rounded-lg mb-4"/>
                        <h4 className="font-bold text-white mb-1">Notion</h4>
                        <p className="text-sm text-gray-400 mb-4 flex-grow">Crie e atualize páginas no Notion com base em eventos.</p>
                        <button className="w-full bg-gray-700 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition-all">Conectar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolsSection; 