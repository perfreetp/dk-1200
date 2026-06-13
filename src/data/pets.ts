import { Pet, PetTimeline } from '@/types/pet';

export const mockPets: Pet[] = [
  {
    id: 'p1',
    name: '小橘',
    avatar: 'https://picsum.photos/id/237/200/200',
    type: 'cat',
    breed: '橘猫',
    birthday: '2022-03-15',
    age: '2岁',
    gender: 'male',
    color: '橘色',
    weight: '5kg',
    description: '一只活泼可爱的橘猫，喜欢在客厅跑来跑去',
    photoCount: 156,
    albums: 5,
    owner: '主人',
    familyMembers: ['妈妈', '爸爸', '妹妹']
  },
  {
    id: 'p2',
    name: '豆豆',
    avatar: 'https://picsum.photos/id/659/200/200',
    type: 'dog',
    breed: '金毛',
    birthday: '2021-06-20',
    age: '3岁',
    gender: 'male',
    color: '金色',
    weight: '28kg',
    description: '温顺的金毛，最喜欢出去玩',
    photoCount: 234,
    albums: 8,
    owner: '主人',
    familyMembers: ['妈妈', '爸爸']
  },
  {
    id: 'p3',
    name: '花花',
    avatar: 'https://picsum.photos/id/783/200/200',
    type: 'cat',
    breed: '英短',
    birthday: '2023-01-10',
    age: '1岁',
    gender: 'female',
    color: '蓝灰色',
    weight: '4kg',
    description: '安静的英短，喜欢在阳台晒太阳',
    photoCount: 89,
    albums: 3,
    owner: '妹妹',
    familyMembers: ['妈妈', '爸爸', '主人']
  }
];

export const mockTimelines: PetTimeline[] = [
  {
    id: 't1',
    petId: 'p1',
    date: '2024-01-15',
    title: '日常玩耍',
    description: '小橘今天特别开心',
    photos: ['https://picsum.photos/id/237/400/500'],
    type: 'daily'
  },
  {
    id: 't2',
    petId: 'p1',
    date: '2024-01-13',
    title: '公园出游',
    description: '带小橘去公园玩',
    photos: ['https://picsum.photos/id/718/400/600'],
    type: 'travel'
  },
  {
    id: 't3',
    petId: 'p2',
    date: '2024-01-11',
    title: '生日派对',
    description: '豆豆3岁生日',
    photos: ['https://picsum.photos/id/1025/400/400'],
    type: 'birthday'
  },
  {
    id: 't4',
    petId: 'p2',
    date: '2024-01-10',
    title: '海边度假',
    description: '豆豆第一次看海',
    photos: ['https://picsum.photos/id/1025/400/500'],
    type: 'travel'
  },
  {
    id: 't5',
    petId: 'p1',
    date: '2024-01-10',
    title: '洗澡日',
    description: '小橘洗澡',
    photos: ['https://picsum.photos/id/237/400/280'],
    type: 'bath'
  },
  {
    id: 't6',
    petId: 'p3',
    date: '2024-01-08',
    title: '阳台午睡',
    description: '花花晒太阳',
    photos: ['https://picsum.photos/id/718/400/320'],
    type: 'daily'
  }
];

export const getPetById = (id: string): Pet | undefined => {
  return mockPets.find(pet => pet.id === id);
};

export const getTimelinesByPet = (petId: string): PetTimeline[] => {
  return mockTimelines.filter(timeline => timeline.petId === petId);
};