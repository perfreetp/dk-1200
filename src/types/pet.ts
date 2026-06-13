export interface Pet {
  id: string;
  name: string;
  avatar: string;
  type: PetType;
  breed: string;
  birthday: string;
  age: string;
  gender: 'male' | 'female';
  color: string;
  weight?: string;
  description?: string;
  photoCount: number;
  albums: number;
  owner: string;
  familyMembers: string[];
}

export type PetType = 'cat' | 'dog' | 'bird' | 'fish' | 'rabbit' | 'other';

export interface PetTimeline {
  id: string;
  petId: string;
  date: string;
  title: string;
  description: string;
  photos: string[];
  type: TimelineType;
}

export type TimelineType = 'birthday' | 'bath' | 'travel' | 'daily' | 'play' | 'health';

export const petTypeLabels: Record<PetType, string> = {
  cat: '猫咪',
  dog: '狗狗',
  bird: '鸟类',
  fish: '鱼类',
  rabbit: '兔子',
  other: '其他'
};

export const timelineLabels: Record<TimelineType, string> = {
  birthday: '生日',
  bath: '洗澡',
  travel: '出游',
  daily: '日常',
  play: '玩耍',
  health: '健康'
};