import React from 'react';

interface IconProps {
    children: React.ReactNode;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ children, className }) => (
    <div className={`text-gray-400 ${className}`}>
        {children}
    </div>
); 