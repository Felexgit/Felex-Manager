import React from 'react';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
    <li 
        onClick={onClick} 
        className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
            active ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-4 font-medium">{label}</span>
    </li>
); 