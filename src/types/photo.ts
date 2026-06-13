export interface Photo {
  id: string;
  imageUrl: string;
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
}

export type MoodType = 'happy' | 'sleepy' | 'playful' | 'curious' | 'hungry' | 'cute';

export type VisibilityType = 'public' | 'family' | 'private';

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