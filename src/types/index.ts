// --- TIPOS E INTERFACES ---
export interface Rule {
    id: number;
    name: string;
    content: string;
}

export interface Agent {
    id: number;
    name: string;
    description: string;
    model: string;
    rules: number[];
}

export interface AiModel {
    id: string;
    name: string;
    status: string;
}

export interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export interface TabItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export interface AiImagePrompt {
    category: string;
    prompts: string[];
}

export interface MockPost {
    id: number;
    date: string;
    platform: string;
    title: string;
    mediaType: string;
}

export interface PlatformDetail {
    icon: React.ReactNode;
    color: string;
    name: string;
} 