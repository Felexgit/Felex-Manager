// --- DADOS MOCK ---

export const aiImagePrompts = [
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

export const mockPosts = [
    { id: 1, date: '2025-07-05T10:00:00', platform: 'instagram', title: 'Lançamento nova coleção de verão!', mediaType: 'image' },
    { id: 2, date: '2025-07-08T18:30:00', platform: 'tiktok', title: 'Challenge da semana #SummerVibes', mediaType: 'video' },
    { id: 3, date: '2025-07-12T15:00:00', platform: 'youtube', title: 'VLOG: Bastidores do nosso ensaio fotográfico', mediaType: 'video' },
];

export const mockAiModels = [
    { id: 'openai_dalle3', name: 'OpenAI DALL-E 3', status: 'Conectado' },
    { id: 'midjourney_v6', name: 'Midjourney v6', status: 'Ação Necessária' },
];

export const initialAgents = [
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
];

export const initialRules = [
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
]; 