import { Youtube } from 'lucide-react';
import { AiImagePrompt, AiModel, MockPost, PlatformDetail } from '../types';

// --- ÍCONES PERSONALIZADOS ---
export const InstagramIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export const TikTokIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.33.39-1.76 1.42-3.37 2.73-4.5.9-.79 1.86-1.4 2.8-1.9.12-2.18.01-4.36-.01-6.54.01-1.22.31-2.42.86-3.52.91-1.8 2.84-2.93 4.88-3.01.01-.01.01-.01.02-.01z"></path>
    </svg>
);

// --- DADOS MOCK ---
export const aiImagePrompts: AiImagePrompt[] = [
    { 
        category: "E-commerce & Products", 
        prompts: [
            "A minimalist photo of a luxury watch on a marble surface, with soft morning light, hyper-realistic, 8k.",
            "Lifestyle shot of a person wearing our new sneaker, walking through a vibrant city street, motion blur, candid style.",
            "Flat lay of organic skincare products surrounded by fresh green leaves and water droplets, top-down view, clean aesthetic."
        ]
    },
    { 
        category: "Food & Restaurant", 
        prompts: [
            "Overhead shot of a rustic wooden table filled with a vibrant mediterranean feast, natural light, appetizing.",
            "Action shot of a chef garnishing a gourmet pasta dish with fresh basil, steam rising, shallow depth of field.",
            "A colorful stack of pancakes dripping with maple syrup and topped with fresh berries, bright and cheerful."
        ]
    },
    { 
        category: "Travel & Lifestyle", 
        prompts: [
            "Breathtaking landscape painting of a serene mountain lake at sunrise, with misty forests, style of Albert Bierstadt.",
            "A person with a backpack looking out over a dramatic cliffside view, golden hour, sense of adventure.",
            "Illustration of a vintage camper van parked on a beach at sunset, pastel colors, retro vibe."
        ]
    },
];

export const mockPosts: MockPost[] = [
    { id: 1, date: '2025-07-05T10:00:00', platform: 'instagram', title: 'Lançamento nova coleção de verão!', mediaType: 'image' },
    { id: 2, date: '2025-07-08T18:30:00', platform: 'tiktok', title: 'Challenge da semana #SummerVibes', mediaType: 'video' },
    { id: 3, date: '2025-07-12T15:00:00', platform: 'youtube', title: 'VLOG: Bastidores do nosso ensaio fotográfico', mediaType: 'video' },
];

export const platformDetails: Record<string, PlatformDetail> = {
    youtube: { icon: <Youtube size={14}/>, color: 'bg-red-500', name: 'YouTube' },
    instagram: { icon: <InstagramIcon className="w-3.5 h-3.5"/>, color: 'bg-pink-500', name: 'Instagram' },
    tiktok: { icon: <TikTokIcon className="w-3.5 h-3.5 text-white"/>, color: 'bg-sky-500', name: 'TikTok' },
};

export const mockAiModels: AiModel[] = [
    { id: 'openai_dalle3', name: 'OpenAI DALL-E 3', status: 'Conectado' },
    { id: 'midjourney_v6', name: 'Midjourney v6', status: 'Ação Necessária' },
]; 