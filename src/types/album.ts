export interface Album {
  id: string;
  title: string;
  cover: string;
  type: AlbumType;
  petId: string;
  petName: string;
  photoCount: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  isPublic: boolean;
}

export type AlbumType = 'birthday' | 'bath' | 'travel' | 'daily' | 'play' | 'custom';

export const albumTypeLabels: Record<AlbumType, string> = {
  birthday: '生日',
  bath: '洗澡',
  travel: '出游',
  daily: '日常',
  play: '玩耍',
  custom: '自定义'
};

export const albumTypeColors: Record<AlbumType, string> = {
  birthday: '#FF6B6B',
  bath: '#74B9FF',
  travel: '#00B894',
  daily: '#FDCB6E',
  play: '#A29BFE',
  custom: '#636E72'
};