import React, { useState } from 'react';
import { Search, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { Icon } from './CommonComponents';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ title }) => {
    const { user, signOut } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        setShowUserMenu(false);
    };

    const getUserInitials = (email) => {
        return email ? email.charAt(0).toUpperCase() : 'U';
    };

    return (
        <header className="flex items-center justify-between p-6 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                    />
                </div>
                <Icon className="hover:text-white cursor-pointer">
                    <Bell size={24} />
                </Icon>
                <div className="relative">
                    <div 
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <img
                            src={`https://placehold.co/40x40/7c3aed/ffffff?text=${getUserInitials(user?.email)}`}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border-2 border-indigo-500"
                        />
                        <div className="text-white">
                            <span className="font-semibold">{user?.email || 'Usuário'}</span>
                            <ChevronDown size={16} className="inline"/>
                        </div>
                    </div>
                    
                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                            <div className="py-1">
                                <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                                    {user?.email}
                                </div>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center">
                                    <User size={16} className="mr-2" />
                                    Perfil
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center">
                                    <Settings size={16} className="mr-2" />
                                    Configurações
                                </button>
                                <button 
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Sair
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header; 