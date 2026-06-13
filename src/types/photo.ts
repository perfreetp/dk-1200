export interface Photo {
  id: string;
  imageUrl: string;
  filter?: FilterType;
  cropArea?: CropArea;
  petId: string;
  petName: string;
  petAvatar: string;
  date: string;
  location?: string;
  mood: MoodType;
  tags: string[];
  likes: number;
  isLiked: boolean;
  isFavorite: boolean;
  comments: number;
  visibility: VisibilityType;
  albumId?: string;
  description?: string;
  createdAt: string;
}

export type MoodType = 'happy' | 'sleepy' | 'playful' | 'curious' | 'hungry' | 'cute';

export type VisibilityType = 'public' | 'family' | 'private';

export type FilterType = 'original' | 'warm' | 'cool' | 'vintage' | 'bright';

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PhotoFilter {
  petId?: string;
  mood?: MoodType;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

export const moodLabels: Record<MoodType, string> = {
  happy: '开心',
  sleepy: '困倦',
  playful: '玩耍',
  curious: '好奇',
  hungry: '饿了',
  cute: '萌萌'
};

export const moodColors: Record<MoodType, string> = {
  happy: '#FF6B6B',
  sleepy: '#74B9FF',
  playful: '#00B894',
  curious: '#FDCB6E',
  hungry: '#E17055',
  cute: '#A29BFE'
};

export const filterLabels: Record<FilterType, string> = {
  original: '原图',
  warm: '暖色',
  cool: '冷色',
  vintage: '复古',
  bright: '明亮'
};