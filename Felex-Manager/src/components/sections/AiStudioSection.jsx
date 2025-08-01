import React, { useState } from 'react';
import { Sparkles, UserPlus, Cpu, Puzzle, BrainCircuit } from 'lucide-react';
import CreateSection from './aiStudio/CreateSection';
import AgentsSection from './aiStudio/AgentsSection';
import ModelsSection from './aiStudio/ModelsSection';
import ToolsSection from './aiStudio/ToolsSection';
import MemorySection from './aiStudio/MemorySection';

const AiStudioSubNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'create', label: 'Criar', icon: <Sparkles size={18} /> },
        { id: 'agents', label: 'Agentes', icon: <UserPlus size={18} /> },
        { id: 'models', label: 'Modelos', icon: <Cpu size={18} /> },
        { id: 'tools', label: 'Ferramentas', icon: <Puzzle size={18} /> },
        { id: 'memory', label: 'Memória', icon: <BrainCircuit size={18} /> },
    ];

    return (
        <div className="px-8 border-b border-gray-700">
            <nav className="flex space-x-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
                            activeTab === tab.id
                                ? 'border-indigo-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                        }`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

const AiStudioSection = ({ agents, setAgents, rules, setRules }) => {
    const [activeTab, setActiveTab] = useState('agents');
    
    const renderContent = () => {
        switch (activeTab) {
            case 'create': return <CreateSection />;
            case 'agents': return <AgentsSection agents={agents} setAgents={setAgents} rules={rules} setRules={setRules} />;
            case 'models': return <ModelsSection />;
            case 'tools': return <ToolsSection />;
            case 'memory': return <MemorySection />;
            default: return <AgentsSection agents={agents} setAgents={setAgents} rules={rules} setRules={setRules} />;
        }
    };

    return (
        <div className="h-full flex flex-col">
            <AiStudioSubNav activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-grow overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default AiStudioSection; 