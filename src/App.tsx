import React, { useState, useEffect } from 'react';
import { Home, MessageSquare, LayoutTemplate, Calendar, Bot, BarChart2, Settings, Image as ImageIcon, Video, ChevronDown, Search, Bell, ChevronLeft, ChevronRight, Plus, X, Clock, UploadCloud, Youtube, Cpu, Puzzle, BrainCircuit, Webhook, FileText, Trash2, Edit, MoreVertical, Power, Sparkles, Wand, BookOpen, Save, UserPlus, ArrowLeft, LogOut, User, Shield, Zap, TrendingUp, Users, Globe, Database } from 'lucide-react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import './App.css';

// --- IMPORTS ORGANIZADOS ---
import { Rule, Agent, AiModel, MenuItem, TabItem } from './types';
import { aiImagePrompts, mockPosts, getPlatformDetails, mockAiModels } from './data/mockData';
import { Icon } from './components/ui/Icon';
import { NavItem } from './components/ui/NavItem';

// ========================================
// 🎨 COMPONENTES DE AUTENTICAÇÃO MODERNOS
// ========================================

const LoginScreen = ({ onAuth }: { onAuth: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
    
    <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-2xl">
            <Bot size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            AutoPost AI
          </h1>
          <p className="text-purple-200 mt-2">Gerencie suas redes sociais com IA</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <Auth onAuth={onAuth} />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-xs text-purple-200">IA Avançada</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xs text-purple-200">Seguro</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xs text-purple-200">Resultados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ========================================
// 🎯 COMPONENTES PRINCIPAIS MODERNOS
// ========================================

const ModernSidebar = ({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) => {
  const menuItems = [
    { id: 'inicio', label: 'Início', icon: <Home size={22} />, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'inbox', label: 'Caixa de Entrada', icon: <MessageSquare size={22} />, gradient: 'from-green-500 to-emerald-500' },
    { id: 'conteudo', label: 'Conteúdo', icon: <LayoutTemplate size={22} />, gradient: 'from-purple-500 to-pink-500' },
    { id: 'calendario', label: 'Calendário', icon: <Calendar size={22} />, gradient: 'from-orange-500 to-red-500' },
    { id: 'automacao', label: 'AI Studio', icon: <Bot size={22} />, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'analises', label: 'Análises', icon: <BarChart2 size={22} />, gradient: 'from-teal-500 to-blue-500' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl text-white flex flex-col p-6 border-r border-white/10 shrink-0 shadow-2xl">
      <div className="flex items-center mb-10 p-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl border border-white/10">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
          <Bot size={28} className="text-white" />
        </div>
        <div className="ml-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            AutoPost AI
          </h1>
          <p className="text-xs text-purple-300">Studio</p>
        </div>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 group ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-white/20' : 'bg-gray-700/50 group-hover:bg-gray-600/50'}`}>
                  {item.icon}
                </div>
                <span className="ml-4 font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-white/10">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Usuário</p>
              <p className="text-xs text-gray-400">Premium</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition-all duration-300"
          >
            <LogOut size={16} className="mr-2" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

const ModernHeader = ({ title }: { title: string }) => (
  <header className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20 shadow-lg">
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-gray-400 text-sm mt-1">Bem-vindo ao seu dashboard</p>
    </div>
    
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64 transition-all duration-300"
        />
      </div>
      
      <button className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 relative">
        <Bell size={20} className="text-gray-300" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      </button>
      
      <div className="flex items-center space-x-3 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300">
        <img
          src={`https://placehold.co/40x40/7c3aed/ffffff?text=U`}
          alt="User Avatar"
          className="w-8 h-8 rounded-full border-2 border-purple-500"
        />
        <div className="text-white">
          <span className="font-semibold text-sm">Usuário</span>
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </div>
    </div>
  </header>
);

const ModernSectionPlaceholder = ({ title, description, icon, gradient = "from-indigo-500 to-purple-600" }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  gradient?: string;
}) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className={`bg-gradient-to-r ${gradient} p-8 rounded-3xl mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300`}>
      {icon}
    </div>
    <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
      {title}
    </h3>
    <p className="text-gray-400 max-w-md text-lg leading-relaxed">
      {description}
    </p>
  </div>
);

// ========================================
// 🤖 SEÇÃO AI STUDIO MODERNA
// ========================================

const ModernAiStudioSubNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'create', label: 'Criar', icon: <Sparkles size={18} />, gradient: 'from-purple-500 to-pink-500' },
    { id: 'agents', label: 'Agentes', icon: <UserPlus size={18} />, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'models', label: 'Modelos', icon: <Cpu size={18} />, gradient: 'from-green-500 to-emerald-500' },
    { id: 'tools', label: 'Ferramentas', icon: <Puzzle size={18} />, gradient: 'from-orange-500 to-red-500' },
    { id: 'memory', label: 'Memória', icon: <BrainCircuit size={18} />, gradient: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="px-8 py-6 border-b border-white/10 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm">
      <nav className="flex space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 font-semibold text-sm transition-all duration-300 rounded-xl border-2 ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.gradient} text-white border-transparent shadow-lg`
                : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
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

const ModernCreateSection = () => (
  <div className="p-8">
    <div className="glass-dark rounded-3xl p-8 mb-8 border border-white/10 shadow-2xl">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-3">
        Gerador de Conteúdo com IA
      </h3>
      <p className="text-gray-400 mb-6 text-lg">
        Descreva a imagem ou vídeo que você quer criar. Seja detalhado para melhores resultados.
      </p>
      
      <div className="relative">
        <textarea
          rows={4}
          className="w-full glass border border-white/20 rounded-2xl p-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-lg"
          placeholder="Ex: Um astronauta surfando em uma onda cósmica, com nebulosas ao fundo, estilo synthwave, 8k..."
        />
        <button className="absolute bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
          <Sparkles size={20} />
          <span>Gerar</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xl font-bold text-white mb-6">Inspiração de Prompts</h4>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {aiImagePrompts.map(category => (
            <div key={category.category} className="glass-dark rounded-2xl p-6 border border-white/10">
              <h5 className="font-bold text-purple-400 mb-3 text-lg">{category.category}</h5>
              <ul className="space-y-3">
                {category.prompts.map((p, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-300 bg-white/5 p-4 rounded-xl hover:bg-white/10 cursor-pointer transition-all duration-300 border border-white/5"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-xl font-bold text-white mb-6">Resultado</h4>
        <div className="w-full aspect-square glass-dark rounded-3xl flex items-center justify-center border-2 border-dashed border-white/20 hover:border-purple-500 transition-all duration-300">
          <ImageIcon size={80} className="text-gray-600" />
        </div>
      </div>
    </div>
  </div>
);

// ========================================
// 📊 CONTEÚDO PRINCIPAL MODERNO
// ========================================

const ModernMainContent = ({ section, agents, setAgents, rules, setRules }: { 
  section: string; 
  agents: Agent[]; 
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>; 
  rules: Rule[]; 
  setRules: React.Dispatch<React.SetStateAction<Rule[]>> 
}) => {
  const sections = {
    inicio: {
      title: 'Dashboard',
      component: (
        <ModernSectionPlaceholder
          title="Bem-vindo ao seu Dashboard"
          description="Aqui você verá um resumo do desempenho das suas contas, posts agendados e as últimas atividades."
          icon={<Home size={80} className="text-white" />}
          gradient="from-blue-500 to-cyan-500"
        />
      )
    },
    inbox: {
      title: 'Caixa de Entrada Unificada',
      component: (
        <ModernSectionPlaceholder
          title="Caixa de Entrada"
          description="Gerencie todos os seus comentários e mensagens diretas do Instagram, Facebook e TikTok em um só lugar."
          icon={<MessageSquare size={80} className="text-white" />}
          gradient="from-green-500 to-emerald-500"
        />
      )
    },
    conteudo: {
      title: 'Gerenciador de Conteúdo',
      component: (
        <ModernSectionPlaceholder
          title="Conteúdo"
          description="Visualize, edite e organize todas as suas publicações passadas, presentes e futuras."
          icon={<LayoutTemplate size={80} className="text-white" />}
          gradient="from-purple-500 to-pink-500"
        />
      )
    },
    calendario: {
      title: 'Calendário de Publicações',
      component: (
        <ModernSectionPlaceholder
          title="Calendário"
          description="A visualização do calendário de publicações estará disponível aqui."
          icon={<Calendar size={80} className="text-white" />}
          gradient="from-orange-500 to-red-500"
        />
      )
    },
    automacao: {
      title: 'AI Studio',
      component: (
        <div className="h-full flex flex-col">
          <ModernAiStudioSubNav activeTab="create" setActiveTab={() => {}} />
          <div className="flex-grow overflow-y-auto">
            <ModernCreateSection />
          </div>
        </div>
      )
    },
    analises: {
      title: 'Análises de Desempenho',
      component: (
        <ModernSectionPlaceholder
          title="Análises"
          description="Mergulhe nos dados. Entenda seu alcance, engajamento e crescimento de seguidores em todas as plataformas."
          icon={<BarChart2 size={80} className="text-white" />}
          gradient="from-teal-500 to-blue-500"
        />
      )
    },
    configuracoes: {
      title: 'Configurações',
      component: (
        <ModernSectionPlaceholder
          title="Configurações da Conta"
          description="Gerencie suas contas conectadas, preferências de notificação, assinatura e membros da equipe."
          icon={<Settings size={80} className="text-white" />}
          gradient="from-gray-500 to-gray-700"
        />
      )
    },
  };

  const currentSection = sections[section as keyof typeof sections] || sections.inicio;

  return (
    <main className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto flex flex-col">
      <ModernHeader title={currentSection.title} />
      <div className="flex-grow h-0 p-6">
        {currentSection.component}
      </div>
    </main>
  );
};

// ========================================
// 🚀 COMPONENTE APP PRINCIPAL
// ========================================

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('automacao');

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: 'Agente de Conteúdo',
      description: 'Cria posts para Instagram e TikTok',
      model: 'openai_dalle3',
      rules: [1, 2]
    },
    {
      id: 2,
      name: 'Agente de Respostas',
      description: 'Responde comentários e DMs',
      model: 'openai_dalle3',
      rules: [1, 3]
    },
  ]);

  const [rules, setRules] = useState<Rule[]>([
    {
      id: 1,
      name: 'Tom de Voz: Amigável e Jovem',
      content: 'Use uma linguagem informal, emojis e gírias populares. Mantenha as respostas curtas e diretas.'
    },
    {
      id: 2,
      name: 'Comportamento: Foco em E-commerce',
      content: 'Sempre que possível, relacione o conteúdo com produtos da loja. Destaque promoções e novidades. Use CTAs para compra.'
    },
    {
      id: 3,
      name: 'Comportamento: Suporte ao Cliente',
      content: 'Seja empático e solícito. Se não souber a resposta, encaminhe para o suporte humano. Nunca prometa o que não pode cumprir.'
    },
  ]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onAuth={() => setUser({ id: 'temp' })} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sans overflow-hidden">
      <ModernSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <ModernMainContent
        section={activeSection}
        agents={agents}
        setAgents={setAgents}
        rules={rules}
        setRules={setRules}
      />
    </div>
  );
}
