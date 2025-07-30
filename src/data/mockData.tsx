import { Youtube } from 'lucide-react';
import { AiImagePrompt, AiModel, MockPost, PlatformDetail } from '../types';
import { InstagramIcon, TikTokIcon } from '../components/icons/CustomIcons';

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

// Funções que retornam os ícones para evitar JSX em arquivo .ts
export const getPlatformDetails = (): Record<string, PlatformDetail> => ({
    youtube: { icon: <Youtube size={14}/>, color: 'bg-red-500', name: 'YouTube' },
    instagram: { icon: <InstagramIcon className="w-3.5 h-3.5"/>, color: 'bg-pink-500', name: 'Instagram' },
    tiktok: { icon: <TikTokIcon className="w-3.5 h-3.5 text-white"/>, color: 'bg-sky-500', name: 'TikTok' },
});

export const mockAiModels: AiModel[] = [
    { id: 'openai_dalle3', name: 'OpenAI DALL-E 3', status: 'Conectado' },
    { id: 'midjourney_v6', name: 'Midjourney v6', status: 'Ação Necessária' },
]; 