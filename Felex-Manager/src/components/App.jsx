import React, { useState } from 'react';
import { Home, MessageSquare, LayoutTemplate, BarChart2, Settings, LogOut } from 'lucide-react';
import Sidebar from './ui/Sidebar';
import Header from './ui/Header';
import { SectionPlaceholder } from './ui/CommonComponents';
import AiStudioSection from './sections/AiStudioSection';
import CalendarSection from './sections/CalendarSection';
import ContentSection from './sections/ContentSection';
import { initialAgents, initialRules } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from './auth/LoginPage';

// --- CONTEÚDO PRINCIPAL ---
const MainContent = ({ section, agents, setAgents, rules, setRules }) => {
    const sections = {
        inicio: {
            title: 'Início',
            component: <SectionPlaceholder
                title="Bem-vindo ao seu Dashboard"
                description="Aqui você verá um resumo do desempenho das suas contas, posts agendados e as últimas atividades."
                icon={<Home size={64} className="text-indigo-400"/>}
            />
        },
        inbox: {
            title: 'Caixa de Entrada Unificada',
            component: <SectionPlaceholder
                title="Caixa de Entrada"
                description="Gerencie todos os seus comentários e mensagens diretas do Instagram, Facebook e TikTok em um só lugar."
                icon={<MessageSquare size={64} className="text-indigo-400"/>}
            />
        },
        conteudo: {
            title: 'Gerenciador de Conteúdo',
            component: <ContentSection />
        },
        calendario: {
            title: 'Calendário de Publicações',
            component: <CalendarSection />
        },
        automacao: {
            title: 'AI Studio',
            component: <AiStudioSection agents={agents} setAgents={setAgents} rules={rules} setRules={setRules} />
        },
        analises: {
            title: 'Análises de Desempenho',
            component: <SectionPlaceholder
                title="Análises"
                description="Mergulhe nos dados. Entenda seu alcance, engajamento e crescimento de seguidores em todas as plataformas."
                icon={<BarChart2 size={64} className="text-indigo-400"/>}
            />
        },
        configuracoes: {
            title: 'Configurações',
            component: <SectionPlaceholder
                title="Configurações da Conta"
                description="Gerencie suas contas conectadas, preferências de notificação, assinatura e membros da equipe."
                icon={<Settings size={64} className="text-indigo-400"/>}
            />
        },
    };

    const currentSection = sections[section] || sections.inicio;

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
    const [agents, setAgents] = useState(initialAgents);
    const [rules, setRules] = useState(initialRules);
    const { user, loading, isAuthenticated, error } = useAuth();

    // Show loading screen while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Carregando...</p>
                </div>
            </div>
        );
    }

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return <LoginPage />;
    }

    // Show main app if authenticated
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