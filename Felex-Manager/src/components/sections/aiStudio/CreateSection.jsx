import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { aiImagePrompts } from '../../../data/mockData';

const CreateSection = () => {
    return (
        <div className="p-8">
            <div className="bg-gray-800/80 rounded-xl p-6 mb-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-2">Gerador de Conteúdo com IA</h3>
                <p className="text-gray-400 mb-6">Descreva a imagem ou vídeo que você quer criar. Seja detalhado para melhores resultados.</p>
                <div className="relative">
                    <textarea
                        rows="4"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        placeholder="Ex: Um astronauta surfando em uma onda cósmica, com nebulosas ao fundo, estilo synthwave, 8k..."
                    ></textarea>
                    <button className="absolute bottom-4 right-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-all duration-200 disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center">
                        Gerar
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Inspiração de Prompts</h4>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {aiImagePrompts.map(category => (
                            <div key={category.category}>
                                <h5 className="font-bold text-indigo-400 mb-2">{category.category}</h5>
                                <ul className="space-y-2">
                                    {category.prompts.map((p, index) => (
                                        <li key={index} className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded-md hover:bg-gray-700 cursor-pointer transition-colors">
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Resultado</h4>
                    <div className="w-full aspect-square bg-gray-800 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600">
                        <ImageIcon size={64} className="text-gray-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSection; 