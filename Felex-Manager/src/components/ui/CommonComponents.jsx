import React from 'react';

export const Icon = ({ children, className }) => (
    <div className={`text-gray-400 ${className}`}>{children}</div>
);

export const NavItem = ({ icon, label, active, onClick }) => (
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

export const SectionPlaceholder = ({ title, description, icon }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
        <div className="bg-gray-800 p-6 rounded-full mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-300 mb-2">{title}</h3>
        <p className="max-w-md">{description}</p>
    </div>
); 