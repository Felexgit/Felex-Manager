import React, { useState } from 'react';
import { UserPlus, Cpu, BookOpen, Power, MoreVertical, Plus, Save, ArrowLeft, X } from 'lucide-react';
import { mockAiModels } from '../../../data/mockData';

// --- COMPONENTE EDITOR DE REGRAS ---
const RuleEditor = ({ onSave, onBack }) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    return (
        <div className="p-6 flex flex-col h-full">
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4">
                <ArrowLeft size={16} className="mr-2"/> Voltar para criação do agente
            </button>
            <h4 className="text-lg font-bold text-white mb-1">Criar Nova Regra</h4>
            <p className="text-sm text-gray-400 mb-6">Defina um conjunto de comportamentos para o seu agente.</p>
            <div className="space-y-4 flex-grow">
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Nome da Regra</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ex: Tom de Voz: Amigável e Jovem"
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Comportamento e Instruções</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Descreva as instruções. Ex: Use uma linguagem informal, emojis e gírias. Mantenha as respostas curtas e diretas."
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white h-48 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                </div>
            </div>
            <button
                onClick={() => onSave({ id: Date.now(), name, content })}
                className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-all flex items-center justify-center"
            >
                <Save size={18} className="mr-2"/>Salvar Regra
            </button>
        </div>
    );
};

// --- COMPONENTE CRIADOR DE AGENTE ---
const AgentCreator = ({ onClose, onSaveAgent, rules, setRules }) => {
    const [isEditingRule, setIsEditingRule] = useState(false);
    const [agentName, setAgentName] = useState('');
    const [agentDesc, setAgentDesc] = useState('');
    const [selectedModel, setSelectedModel] = useState(mockAiModels[0].id);
    const [selectedRules, setSelectedRules] = useState([]);

    const handleSaveRule = (newRule) => {
        setRules(prev => [...prev, newRule]);
        setSelectedRules(prev => [...prev, newRule.id]);
        setIsEditingRule(false);
    };
    
    const toggleRuleSelection = (ruleId) => {
        setSelectedRules(current => 
            current.includes(ruleId) ? current.filter(id => id !== ruleId) : [...current, ruleId]
        );
    };

    if (isEditingRule) {
        return <RuleEditor onBack={() => setIsEditingRule(false)} onSave={handleSaveRule} />;
    }

    return (
        <div className="p-6 flex flex-col h-full bg-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Criar Novo Agente</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={24}/>
                </button>
            </div>
            <div className="space-y-6 flex-grow overflow-y-auto pr-2">
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Nome do Agente</label>
                    <input
                        type="text"
                        value={agentName}
                        onChange={e => setAgentName(e.target.value)}
                        placeholder="Ex: Agente de Conteúdo"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Função</label>
                    <input
                        type="text"
                        value={agentDesc}
                        onChange={e => setAgentDesc(e.target.value)}
                        placeholder="Ex: Cria posts para Instagram e TikTok"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Modelo de IA</label>
                    <select
                        value={selectedModel}
                        onChange={e => setSelectedModel(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {mockAiModels.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-gray-300">Regras e Comportamentos</label>
                        <button
                            onClick={() => setIsEditingRule(true)}
                            className="text-sm text-indigo-400 font-semibold hover:text-indigo-300 flex items-center"
                        >
                            <Plus size={16} className="mr-1"/>Criar Nova
                        </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                        {rules.map(rule => (
                            <div key={rule.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`rule-${rule.id}`}
                                    checked={selectedRules.includes(rule.id)}
                                    onChange={() => toggleRuleSelection(rule.id)}
                                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor={`rule-${rule.id}`} className="ml-3 text-sm text-white">
                                    {rule.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                onClick={() => onSaveAgent({
                    id: Date.now(),
                    name: agentName,
                    description: agentDesc,
                    model: selectedModel,
                    rules: selectedRules
                })}
                className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-all flex items-center justify-center"
            >
                <Save size={18} className="mr-2"/>Salvar Agente
            </button>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL DA SEÇÃO DE AGENTES ---
const AgentsSection = ({ agents, setAgents, rules, setRules }) => {
    const [isCreating, setIsCreating] = useState(false);

    const handleSaveAgent = (newAgent) => {
        setAgents(prev => [...prev, newAgent]);
        setIsCreating(false);
    };
    
    return (
        <div className="p-8 h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Seus Agentes de IA</h3>
                    <p className="text-gray-400">Crie e gerencie agentes autônomos para suas tarefas.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all"
                >
                    <UserPlus size={20} className="mr-2"/>
                    Criar Agente
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2">
                {agents.map(agent => {
                    const model = mockAiModels.find(m => m.id === agent.model);
                    return (
                        <div key={agent.id} className="bg-gray-800/80 p-6 rounded-lg border border-gray-700 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{agent.name}</h4>
                                    <p className="text-sm text-gray-400">{agent.description}</p>
                                </div>
                                <button className="text-gray-400 hover:text-white">
                                    <MoreVertical size={20}/>
                                </button>
                            </div>
                            <div className="mb-4">
                                <h5 className="text-xs text-gray-500 font-semibold uppercase mb-2">Modelo</h5>
                                <div className="flex items-center text-sm">
                                    <Cpu size={16} className="mr-2 text-indigo-400"/>
                                    <span className="text-white">{model?.name || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="mb-4 flex-grow">
                                <h5 className="text-xs text-gray-500 font-semibold uppercase mb-2">Regras Ativas</h5>
                                <div className="space-y-2">
                                    {agent.rules.map(ruleId => {
                                        const rule = rules.find(r => r.id === ruleId);
                                        return rule ? (
                                            <div key={rule.id} className="flex items-center text-sm bg-gray-700/50 px-2 py-1 rounded">
                                                <BookOpen size={14} className="mr-2 text-indigo-400"/>
                                                <span className="text-gray-300">{rule.name}</span>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                            <button className="w-full mt-auto bg-gray-700 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition-all flex items-center justify-center">
                                <Power size={16} className="mr-2"/>Ativar Agente
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Painel de Criação de Agente */}
            <div className={`absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-gray-800 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                isCreating ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {isCreating && <AgentCreator onClose={() => setIsCreating(false)} onSaveAgent={handleSaveAgent} rules={rules} setRules={setRules} />}
            </div>
        </div>
    );
};

export default AgentsSection; 