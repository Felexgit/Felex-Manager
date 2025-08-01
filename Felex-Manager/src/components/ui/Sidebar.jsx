import React from 'react';
import { Home, MessageSquare, LayoutTemplate, Calendar, Bot, BarChart2, Settings } from 'lucide-react';
import { NavItem } from './CommonComponents';

const Sidebar = ({ activeSection, setActiveSection }) => {
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
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <Bot size={28} />
                </div>
                <h1 className="text-2xl font-bold ml-3">AutoPost AI</h1>
            </div>
            <nav className="flex-grow">
                <ul>
                    {menuItems.map(item => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeSection === item.id}
                            onClick={() => setActiveSection(item.id)}
                        />
                    ))}
                </ul>
            </nav>
            <div>
                <ul>
                    <NavItem
                        icon={<Settings size={22} />}
                        label="Configurações"
                        active={activeSection === 'configuracoes'}
                        onClick={() => setActiveSection('configuracoes')}
                    />
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar; 