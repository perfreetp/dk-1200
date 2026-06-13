import { Album } from '@/types/album';

export const mockAlbums: Album[] = [
  {
    id: 'a1',
    title: '春日出游',
    cover: 'https://picsum.photos/id/718/400/600',
    type: 'travel',
    petId: 'p1',
    petName: '小橘',
    photoCount: 23,
    createdAt: '2024-01-13',
    updatedAt: '2024-01-15',
    description: '带小橘去公园和海边玩的照片',
    isPublic: true
  },
  {
    id: 'a2',
    title: '豆豆生日',
    cover: 'https://picsum.photos/id/1025/400/400',
    type: 'birthday',
    petId: 'p2',
    petName: '豆豆',
    photoCount: 45,
    createdAt: '2024-01-11',
    updatedAt: '2024-01-11',
    description: '豆豆3岁生日派对',
    isPublic: true
  },
  {
    id: 'a3',
    title: '洗澡日记',
    cover: 'https://picsum.photos/id/237/400/280',
    type: 'bath',
    petId: 'p1',
    petName: '小橘',
    photoCount: 12,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    description: '小橘洗澡的照片合集',
    isPublic: false
  },
  {
    id: 'a4',
    title: '日常萌照',
    cover: 'https://picsum.photos/id/659/400/450',
    type: 'daily',
    petId: 'p2',
    petName: '豆豆',
    photoCount: 67,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-09',
    description: '豆豆的日常可爱瞬间',
    isPublic: true
  },
  {
    id: 'a5',
    title: '花花成长',
    cover: 'https://picsum.photos/id/783/400/350',
    type: 'custom',
    petId: 'p3',
    petName: '花花',
    photoCount: 34,
    createdAt: '2023-01-10',
    updatedAt: '2024-01-08',
    description: '花花从出生到现在的成长记录',
    isPublic: true
  },
  {
    id: 'a6',
    title: '玩耍时光',
    cover: 'https://picsum.photos/id/237/400/360',
    type: 'play',
    petId: 'p1',
    petName: '小橘',
    photoCount: 28,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
    description: '小橘玩耍的快乐时光',
    isPublic: true
  }
];

export const getAlbumsByPet = (petId: string): Album[] => {
  return mockAlbums.filter(album => album.petId === petId);
};

export const getAlbumById = (id: string): Album | undefined => {
  return mockAlbums.find(album => album.id === id);
};