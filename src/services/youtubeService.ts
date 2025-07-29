import { YOUTUBE_CONFIG, YOUTUBE_API_BASE_URL } from '../config/youtube';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
  duration: string;
  status: 'public' | 'private' | 'unlisted';
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  avatar: string;
}

class YouTubeService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    if (!this.accessToken) {
      throw new Error('Access token não configurado');
    }

    const url = new URL(`${YOUTUBE_API_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na API do YouTube: ${response.statusText}`);
    }

    return response.json();
  }

  async getChannelInfo(): Promise<YouTubeChannel> {
    const data = await this.makeRequest('/channels', {
      part: 'snippet,statistics',
      mine: 'true'
    });

    const channel = data.items[0];
    return {
      id: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      subscriberCount: parseInt(channel.statistics.subscriberCount || '0'),
      videoCount: parseInt(channel.statistics.videoCount || '0'),
      viewCount: parseInt(channel.statistics.viewCount || '0'),
      avatar: channel.snippet.thumbnails.default.url
    };
  }

  async getVideos(maxResults: number = 50): Promise<YouTubeVideo[]> {
    const data = await this.makeRequest('/search', {
      part: 'snippet',
      forMine: 'true',
      type: 'video',
      maxResults: maxResults.toString(),
      order: 'date'
    });

    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    
    if (!videoIds) return [];

    const videoData = await this.makeRequest('/videos', {
      part: 'snippet,statistics,contentDetails',
      id: videoIds
    });

    return videoData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      viewCount: parseInt(video.statistics.viewCount || '0'),
      likeCount: parseInt(video.statistics.likeCount || '0'),
      commentCount: parseInt(video.statistics.commentCount || '0'),
      thumbnail: video.snippet.thumbnails.medium.url,
      duration: video.contentDetails.duration,
      status: video.status.privacyStatus
    }));
  }

  async uploadVideo(
    file: File,
    title: string,
    description: string,
    privacy: 'public' | 'private' | 'unlisted'
  ): Promise<string> {
    // Esta é uma implementação simplificada
    // Em produção, você precisaria de um backend para lidar com o upload
    console.log('Upload de vídeo:', { title, description, privacy, file });
    
    // Simular upload bem-sucedido
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('video_' + Date.now());
      }, 2000);
    });
  }
}

export const youtubeService = new YouTubeService(); 