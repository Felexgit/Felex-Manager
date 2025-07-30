import React, { useState, useMemo } from 'react';
import { Home, MessageSquare, LayoutTemplate, Calendar, Bot, BarChart2, Settings, Image as ImageIcon, Video, ChevronDown, Search, Bell, ChevronLeft, ChevronRight, Plus, X, Clock, UploadCloud, Youtube, Cpu, Puzzle, BrainCircuit, Webhook, FileText, Trash2, Edit, MoreVertical, Power, Sparkles, Wand, BookOpen, Save, UserPlus, ArrowLeft } from 'lucide-react';
import './App.css';

// --- ÍCONES E DADOS MOCK ---

const InstagramIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const TikTokIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.33.39-1.76 1.42-3.37 2.73-4.5.9-.79 1.86-1.4 2.8-1.9.12-2.18.01-4.36-.01-6.54.01-1.22.31-2.42.86-3.52.91-1.8 2.84-2.93 4.88-3.01.01-.01.01-.01.02-.01z"></path></svg>
);

const aiImagePrompts = [
    { category: "E-commerce & Products", prompts: ["A minimalist photo of a luxury watch on a marble surface, with soft morning light, hyper-realistic, 8k.","Lifestyle shot of a person wearing our new sneaker, walking through a vibrant city street, motion blur, candid style.","Flat lay of organic skincare products surrounded by fresh green leaves and water droplets, top-down view, clean aesthetic."]},
    { category: "Food & Restaurant", prompts: ["Overhead shot of a rustic wooden table filled with a vibrant mediterranean feast, natural light, appetizing.","Action shot of a chef garnishing a gourmet pasta dish with fresh basil, steam rising, shallow depth of field.","A colorful stack of pancakes dripping with maple syrup and topped with fresh berries, bright and cheerful."]},
    { category: "Travel & Lifestyle", prompts: ["Breathtaking landscape painting of a serene mountain lake at sunrise, with misty forests, style of Albert Bierstadt.","A person with a backpack looking out over a dramatic cliffside view, golden hour, sense of adventure.","Illustration of a vintage camper van parked on a beach at sunset, pastel colors, retro vibe."]},
];

const mockPosts = [
    { id: 1, date: '2025-07-05T10:00:00', platform: 'instagram', title: 'Lançamento nova coleção de verão!', mediaType: 'image' },
    { id: 2, date: '2025-07-08T18:30:00', platform: 'tiktok', title: 'Challenge da semana #SummerVibes', mediaType: 'video' },
    { id: 3, date: '2025-07-12T15:00:00', platform: 'youtube', title: 'VLOG: Bastidores do nosso ensaio fotográfico', mediaType: 'video' },
];

const platformDetails = {
    youtube: { icon: <Youtube size={14}/>, color: 'bg-red-500', name: 'YouTube' },
    instagram: { icon: <InstagramIcon className="w-3.5 h-3.5"/>, color: 'bg-pink-500', name: 'Instagram' },
    tiktok: { icon: <TikTokIcon className="w-3.5 h-3.5 text-white"/>, color: 'bg-sky-500', name: 'TikTok' },
};

const mockAiModels = [
    { id: 'openai_dalle3', name: 'OpenAI DALL-E 3', status: 'Conectado' },
    { id: 'midjourney_v6', name: 'Midjourney v6', status: 'Ação Necessária' },
];

// --- COMPONENTES AUXILIARES ---
const Icon = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={`text-gray-400 ${className}`}>{children}</div>;

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) => (
    <li onClick={onClick} className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
        active ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}>
        {icon}
        <span className="ml-4 font-medium">{label}</span>
    </li>
);

// --- COMPONENTES PRINCIPAIS ---
const Sidebar = ({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) => {
    const menuItems = [
        { id: 'inicio', label: 'Início', icon: <Home size={22} /> },
        { id: 'inbox', label: 'Caixa de Entrada', icon: <MessageSquare size={22} /> },
        { id: 'conteudo', label: 'Conteúdo', icon: <LayoutTemplate size={22} /> },
        { id: 'calendario', label: 'Calendário', icon: <Calendar size={22} /> },
        { id: 'automacao', label: 'AI Studio', icon: <Bot size={22} /> },
        { id: 'analises', label: 'Análises', icon: <BarChart2 size={22} /> },
    ];
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 border-r border-gray-800 shrink-0">
            <div className="flex items-center mb-10 p-2">
                <div className="bg-indigo-600 p-2 rounded-lg"><Bot size={28} /></div>
                <h1 className="text-2xl font-bold ml-3">AutoPost AI</h1>
            </div>
            <nav className="flex-grow">
                <ul>{menuItems.map(item => (<NavItem key={item.id} icon={item.icon} label={item.label} active={activeSection === item.id} onClick={() => setActiveSection(item.id)}/>))}</ul>
            </nav>
            <div>
                <ul><NavItem icon={<Settings size={22} />} label="Configurações" active={activeSection === 'configuracoes'} onClick={() => setActiveSection('configuracoes')}/></ul>
            </div>
        </aside>
    );
};

const Header = ({ title }: { title: string }) => (
    <header className="flex items-center justify-between p-6 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="flex items-center space-x-6">
            <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Pesquisar..." className="bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64" />
            </div>
            <Icon className="hover:text-white cursor-pointer"><Bell size={24} /></Icon>
            <div className="flex items-center space-x-3 cursor-pointer">
                <img src={`https://placehold.co/40x40/7c3aed/ffffff?text=U`} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
                <div className="text-white"><span className="font-semibold">Usuário</span><ChevronDown size={16} className="inline"/></div>
            </div>
        </div>
    </header>
);

const SectionPlaceholder = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
        <div className="bg-gray-800 p-6 rounded-full mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-300 mb-2">{title}</h3>
        <p className="max-w-md">{description}</p>
    </div>
);

// --- SEÇÃO AI STUDIO ---
const AiStudioSubNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
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
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
                        activeTab === tab.id ? 'border-indigo-500 text-white' : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                    }`}>
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

const CreateSection = () => (
    <div className="p-8">
        <div className="bg-gray-800/80 rounded-xl p-6 mb-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">Gerador de Conteúdo com IA</h3>
            <p className="text-gray-400 mb-6">Descreva a imagem ou vídeo que você quer criar. Seja detalhado para melhores resultados.</p>
            <div className="relative">
                <textarea rows={4} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Ex: Um astronauta surfando em uma onda cósmica, com nebulosas ao fundo, estilo synthwave, 8k..."></textarea>
                <button className="absolute bottom-4 right-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-all duration-200 disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center">Gerar</button>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h4 className="text-lg font-semibold text-white mb-4">Inspiração de Prompts</h4>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">{aiImagePrompts.map(category => (<div key={category.category}><h5 className="font-bold text-indigo-400 mb-2">{category.category}</h5><ul className="space-y-2">{category.prompts.map((p, index) => (<li key={index} className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded-md hover:bg-gray-700 cursor-pointer transition-colors">{p}</li>))}</ul></div>))}</div>
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

const ModelsSection = () => (
    <div className="p-8">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Modelos de IA Conectados</h3>
                    <p className="text-gray-400">Gerencie suas chaves de API para os modelos de geração.</p>
                </div>
                <button className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all"><Plus size={20} className="mr-2"/>Adicionar Modelo</button>
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
                            <span className={`${model.status === 'Conectado' ? 'text-green-400 bg-green-900/50' : 'text-yellow-400 bg-yellow-900/50'} px-3 py-1 rounded-full text-xs font-semibold`}>{model.status}</span>
                            <button className="text-gray-400 hover:text-white"><MoreVertical size={20}/></button>
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

const ToolsSection = () => (
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

const MemorySection = () => (
    <div className="p-8">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Memória dos Agentes</h3>
                    <p className="text-gray-400">Gerencie os ficheiros de conhecimento que seus agentes usam para aprender.</p>
                </div>
                <button className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all"><UploadCloud size={20} className="mr-2"/>Upload de Ficheiro</button>
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
                            <td className="p-4 text-white font-medium flex items-center"><FileText size={18} className="mr-3 text-indigo-400"/><span>knowledge_base_ecommerce.json</span></td>
                            <td className="p-4 text-gray-400">2 dias atrás</td>
                            <td className="p-4 text-gray-400"><span className="bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded text-xs">Supabase</span></td>
                            <td className="p-4 text-right"><button className="text-gray-400 hover:text-white"><Trash2 size={18}/></button></td>
                        </tr>
                        <tr className="border-b border-gray-700 hover:bg-gray-800">
                            <td className="p-4 text-white font-medium flex items-center"><FileText size={18} className="mr-3 text-indigo-400"/><span>brand_voice_guidelines.txt</span></td>
                            <td className="p-4 text-gray-400">5 dias atrás</td>
                            <td className="p-4 text-gray-400"><span className="bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded text-xs">Supabase</span></td>
                            <td className="p-4 text-right"><button className="text-gray-400 hover:text-white"><Trash2 size={18}/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- NOVOS COMPONENTES: EDITOR DE REGRAS E CRIADOR DE AGENTES ---
const RuleEditor = ({ onSave, onBack }: { onSave: (rule: any) => void; onBack: () => void }) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    
    const handleSave = () => {
        if (name.trim() && content.trim()) {
            onSave({ id: Date.now(), name, content });
        }
    };

    return (
        <div className="p-6 flex flex-col h-full bg-gray-800">
            <button onClick={onBack} className="flex items-center text-sm text-gray-400 hover:text-white mb-4 -ml-1">
                <ArrowLeft size={16} className="mr-2"/> Voltar para criação do agente
            </button>
            <h4 className="text-lg font-bold text-white mb-1">Criar Nova Regra</h4>
            <p className="text-sm text-gray-400 mb-6">Defina um conjunto de comportamentos para o seu agente.</p>
            <div className="space-y-4 flex-grow">
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Nome da Regra</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Tom de Voz: Amigável e Jovem" className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Comportamento e Instruções</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Descreva as instruções. Ex: Use uma linguagem informal, emojis e gírias. Mantenha as respostas curtas e diretas." className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white h-48 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
            </div>
            <button onClick={handleSave} className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-all flex items-center justify-center disabled:bg-indigo-800 disabled:cursor-not-allowed" disabled={!name.trim() || !content.trim()}>
                <Save size={18} className="mr-2"/>Salvar Regra
            </button>
        </div>
    );
};

const AgentCreator = ({ onClose, onSaveAgent, rules, setRules }: { onClose: () => void; onSaveAgent: (agent: any) => void; rules: any[]; setRules: (rules: any[]) => void }) => {
    const [isEditingRule, setIsEditingRule] = useState(false);
    const [agentName, setAgentName] = useState('');
    const [agentDesc, setAgentDesc] = useState('');
    const [selectedModel, setSelectedModel] = useState(mockAiModels[0].id);
    const [selectedRules, setSelectedRules] = useState<number[]>([]);

    const handleSaveRule = (newRule: any) => {
        setRules(prev => [...prev, newRule]);
        setSelectedRules(prev => [...prev, newRule.id]);
        setIsEditingRule(false);
    };
    
    const toggleRuleSelection = (ruleId: number) => {
        setSelectedRules(current => 
            current.includes(ruleId) ? current.filter(id => id !== ruleId) : [...current, ruleId]
        );
    };

    const handleSaveAgent = () => {
        if (agentName.trim() && agentDesc.trim()) {
            onSaveAgent({id: Date.now(), name: agentName, description: agentDesc, model: selectedModel, rules: selectedRules});
        }
    };

    if (isEditingRule) {
        return <RuleEditor onBack={() => setIsEditingRule(false)} onSave={handleSaveRule} />;
    }

    return (
        <div className="p-6 flex flex-col h-full bg-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Criar Novo Agente</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24}/></button>
            </div>
            <div className="space-y-6 flex-grow overflow-y-auto pr-2">
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Nome do Agente</label>
                    <input type="text" value={agentName} onChange={e => setAgentName(e.target.value)} placeholder="Ex: Agente de Conteúdo" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Função</label>
                    <input type="text" value={agentDesc} onChange={e => setAgentDesc(e.target.value)} placeholder="Ex: Cria posts para Instagram e TikTok" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Modelo de IA</label>
                    <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-no-repeat bg-right-in-select" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}>
                        {mockAiModels.map(model => <option key={model.id} value={model.id}>{model.name}</option>)}
                    </select>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-gray-300">Regras e Comportamentos</label>
                        <button onClick={() => setIsEditingRule(true)} className="text-sm text-indigo-400 font-semibold hover:text-indigo-300 flex items-center"><Plus size={16} className="mr-1"/>Criar Nova</button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                        {rules.length > 0 ? rules.map(rule => (
                            <div key={rule.id} className="flex items-center">
                                <input type="checkbox" id={`rule-${rule.id}`} checked={selectedRules.includes(rule.id)} onChange={() => toggleRuleSelection(rule.id)} className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-offset-gray-800"/>
                                <label htmlFor={`rule-${rule.id}`} className="ml-3 text-sm text-white cursor-pointer">{rule.name}</label>
                            </div>
                        )) : <p className="text-sm text-gray-500 text-center py-4">Nenhuma regra criada. Clique em "Criar Nova".</p>}
                    </div>
                </div>
            </div>
            <button onClick={handleSaveAgent} className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-all flex items-center justify-center disabled:bg-indigo-800 disabled:cursor-not-allowed" disabled={!agentName.trim() || !agentDesc.trim()}>
                <Save size={18} className="mr-2"/>Salvar Agente
            </button>
        </div>
    );
};

const AgentsSection = ({ agents, setAgents, rules, setRules }: { agents: any[]; setAgents: (agents: any[]) => void; rules: any[]; setRules: (rules: any[]) => void }) => {
    const [isCreating, setIsCreating] = useState(false);

    const handleSaveAgent = (newAgent: any) => {
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
                <button onClick={() => setIsCreating(true)} className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all">
                    <UserPlus size={20} className="mr-2"/>
                    Criar Agente
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 flex-grow">
                {agents.map(agent => {
                    const model = mockAiModels.find(m => m.id === agent.model);
                    return (
                        <div key={agent.id} className="bg-gray-800/80 p-6 rounded-lg border border-gray-700 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{agent.name}</h4>
                                    <p className="text-sm text-gray-400">{agent.description}</p>
                                </div>
                                <button className="text-gray-400 hover:text-white"><MoreVertical size={20}/></button>
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
                                    {agent.rules.map((ruleId: number) => {
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
                            <button className="w-full mt-auto bg-gray-700 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition-all flex items-center justify-center"><Power size={16} className="mr-2"/>Ativar Agente</button>
                        </div>
                    )
                })}
            </div>

            {/* Painel de Criação de Agente */}
            <div className={`absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-gray-800 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${isCreating ? 'translate-x-0' : 'translate-x-full'}`}>
                {isCreating && <AgentCreator onClose={() => setIsCreating(false)} onSaveAgent={handleSaveAgent} rules={rules} setRules={setRules} />}
            </div>
        </div>
    );
};

const AiStudioSection = ({ agents, setAgents, rules, setRules }: { agents: any[]; setAgents: (agents: any[]) => void; rules: any[]; setRules: (rules: any[]) => void }) => {
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

// --- SEÇÃO CALENDÁRIO ---
const CreatePostModal = ({ isOpen, onClose, date }: { isOpen: boolean; onClose: () => void; date: string }) => {
    if(!isOpen) return null;
    return(
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">Criar Nova Publicação</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24}/></button>
                </div>
                <div className="p-6 space-y-6">
                    {/* ... */}
                </div>
                <div className="flex justify-end items-center p-6 bg-gray-900/50 border-t border-gray-700 rounded-b-xl">
                    <button onClick={onClose} className="text-gray-300 font-bold py-2 px-5 rounded-lg hover:bg-gray-700 mr-4">Cancelar</button>
                    <button className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-500 transition-all">Agendar</button>
                </div>
            </div>
        </div>
    );
};

const CalendarSection = () => {
    return(
        <div className="p-8 h-full flex flex-col">
            <SectionPlaceholder title="Calendário em Breve" description="A visualização do calendário de publicações estará disponível aqui." icon={<Calendar size={64} className="text-indigo-400"/>} />
        </div>
    );
};

// --- CONTEÚDO PRINCIPAL ---
const MainContent = ({ section, agents, setAgents, rules, setRules }: { section: string; agents: any[]; setAgents: (agents: any[]) => void; rules: any[]; setRules: (rules: any[]) => void }) => {
    const sections = {
        inicio: { title: 'Início', component: <SectionPlaceholder title="Bem-vindo ao seu Dashboard" description="Aqui você verá um resumo do desempenho das suas contas, posts agendados e as últimas atividades." icon={<Home size={64} className="text-indigo-400"/>} /> },
        inbox: { title: 'Caixa de Entrada Unificada', component: <SectionPlaceholder title="Caixa de Entrada" description="Gerencie todos os seus comentários e mensagens diretas do Instagram, Facebook e TikTok em um só lugar." icon={<MessageSquare size={64} className="text-indigo-400"/>} /> },
        conteudo: { title: 'Gerenciador de Conteúdo', component: <SectionPlaceholder title="Conteúdo" description="Visualize, edite e organize todas as suas publicações passadas, presentes e futuras." icon={<LayoutTemplate size={64} className="text-indigo-400"/>} /> },
        calendario: { title: 'Calendário de Publicações', component: <CalendarSection /> },
        automacao: { title: 'AI Studio', component: <AiStudioSection agents={agents} setAgents={setAgents} rules={rules} setRules={setRules} /> },
        analises: { title: 'Análises de Desempenho', component: <SectionPlaceholder title="Análises" description="Mergulhe nos dados. Entenda seu alcance, engajamento e crescimento de seguidores em todas as plataformas." icon={<BarChart2 size={64} className="text-indigo-400"/>} /> },
        configuracoes: { title: 'Configurações', component: <SectionPlaceholder title="Configurações da Conta" description="Gerencie suas contas conectadas, preferências de notificação, assinatura e membros da equipe." icon={<Settings size={64} className="text-indigo-400"/>} /> },
    };
    const currentSection = sections[section as keyof typeof sections] || sections.inicio;
    return (
        <main className="flex-1 bg-gray-800 overflow-y-auto flex flex-col">
            <Header title={currentSection.title} />
            <div className="flex-grow h-0">
                {currentSection.component}
            </div>
        </main>
    );
};

// --- COMPONENTE APP PRINCIPAL ---
export default function App() {
    const [activeSection, setActiveSection] = useState('automacao');
    
    // Estado para agentes e regras, agora no componente pai correto
    const [agents, setAgents] = useState([
        { id: 1, name: 'Agente de Conteúdo', description: 'Cria posts para Instagram e TikTok', model: 'openai_dalle3', rules: [1, 2] },
        { id: 2, name: 'Agente de Respostas', description: 'Responde comentários e DMs', model: 'openai_dalle3', rules: [1, 3] },
    ]);
    const [rules, setRules] = useState([
        { id: 1, name: 'Tom de Voz: Amigável e Jovem', content: 'Use uma linguagem informal, emojis e gírias populares. Mantenha as respostas curtas e diretas.' },
        { id: 2, name: 'Comportamento: Foco em E-commerce', content: 'Sempre que possível, relacione o conteúdo com produtos da loja. Destaque promoções e novidades. Use CTAs para compra.' },
        { id: 3, name: 'Comportamento: Suporte ao Cliente', content: 'Seja empático e solícito. Se não souber a resposta, encaminhe para o suporte humano. Nunca prometa o que não pode cumprir.' },
    ]);

    return (
        <div className="flex h-screen bg-gray-900 font-sans overflow-hidden">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <MainContent 
                section={activeSection} 
                agents={agents}
                setAgents={setAgents}
                rules={rules}
                setRules={setRules}
            />
        </div>
    );
}
