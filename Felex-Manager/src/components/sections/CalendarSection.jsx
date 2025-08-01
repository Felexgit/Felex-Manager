import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { mockPosts } from '../../data/mockData';
import { Youtube } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from '../ui/Icons';
import CreatePostModal from '../modals/CreatePostModal';

const platformDetails = {
    youtube: { icon: <Youtube size={14}/>, color: 'bg-red-500', name: 'YouTube' },
    instagram: { icon: <InstagramIcon className="w-3.5 h-3.5"/>, color: 'bg-pink-500', name: 'Instagram' },
    tiktok: { icon: <TikTokIcon className="w-3.5 h-3.5 text-white"/>, color: 'bg-sky-500', name: 'TikTok' },
};

const CalendarSection = () => {
    const [currentDate, setCurrentDate] = useState(new Date('2025-07-30'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const openModalForDate = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
        setIsModalOpen(true);
    };

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        // Blank days
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({ key: `blank-${i}`, isBlank: true });
        }
        // Month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const postsForDay = mockPosts.filter(p => p.date.startsWith(dateStr)).sort((a,b) => new Date(a.date) - new Date(b.date));
            days.push({ key: `day-${day}`, day, posts: postsForDay });
        }
        return days;
    }, [currentDate]);

    const changeMonth = (offset) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    return (
        <div className="p-8 h-full flex flex-col">
            <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} date={selectedDate} />
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-white">
                        {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
                    </span>
                    <div className="flex items-center space-x-1">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white">
                            <ChevronLeft/>
                        </button>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white">
                            <ChevronRight/>
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => openModalForDate(new Date().getDate())}
                    className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all"
                >
                    <Plus size={20} className="mr-2"/>
                    Criar Publicação
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-400 text-sm mb-2">
                {weekdays.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 grid-rows-5 gap-2 flex-grow">
                {calendarGrid.map(item => (
                    item.isBlank ? <div key={item.key} className="bg-gray-800/50 rounded-lg"></div> :
                    <div
                        key={item.key}
                        onClick={() => openModalForDate(item.day)}
                        className="bg-gray-800 rounded-lg p-2 flex flex-col cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <span className="font-bold text-white self-start">{item.day}</span>
                        <div className="mt-1 space-y-1 overflow-y-auto">
                            {item.posts.map(post => (
                                <div
                                    key={post.id}
                                    className={`flex items-center text-left p-1 rounded-md text-white text-xs ${platformDetails[post.platform].color}`}
                                >
                                    <div className="mr-1.5">{platformDetails[post.platform].icon}</div>
                                    <span className="truncate">{post.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarSection; 