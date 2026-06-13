import { Photo, MoodType } from '@/types/photo';

const moods: MoodType[] = ['happy', 'sleepy', 'playful', 'curious', 'hungry', 'cute'];
const tags = ['生日', '洗澡', '出游', '日常', '玩耍', '萌照', '睡姿', '吃饭'];

export const mockPhotos: Photo[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/237/400/500',
    filter: 'original',
    petId: 'p1',
    petName: '小橘',
    petAvatar: 'https://picsum.photos/id/237/200/200',
    date: '2024-01-15',
    location: '客厅',
    mood: 'happy',
    tags: ['日常', '萌照'],
    likes: 128,
    isLiked: false,
    isFavorite: false,
    comments: [
      { id: 'c1-1', userId: 'f1', userName: '妈妈', userAvatar: 'https://picsum.photos/id/91/200/200', content: '小橘真可爱！', createdAt: '2024-01-15 11:30' },
      { id: 'c1-2', userId: 'f2', userName: '爸爸', userAvatar: 'https://picsum.photos/id/177/200/200', content: '好萌啊', createdAt: '2024-01-15 12:00' }
    ],
    commentsCount: 2,
    visibility: 'public',
    description: '今天小橘特别开心，一直在客厅跑来跑去',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/659/400/300',
    filter: 'warm',
    petId: 'p2',
    petName: '豆豆',
    petAvatar: 'https://picsum.photos/id/659/200/200',
    date: '2024-01-14',
    mood: 'sleepy',
    tags: ['睡姿'],
    likes: 256,
    isLiked: true,
    isFavorite: true,
    comments: [
      { id: 'c2-1', userId: 'f1', userName: '妈妈', userAvatar: 'https://picsum.photos/id/91/200/200', content: '睡得好香', createdAt: '2024-01-14 08:30' }
    ],
    commentsCount: 1,
    visibility: 'family',
    description: '豆豆睡得好香',
    createdAt: '2024-01-14T08:00:00Z'
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/id/718/400/600',
    filter: 'original',
    petId: 'p1',
    petName: '小橘',
    petAvatar: 'https://picsum.photos/id/237/200/200',
    date: '2024-01-13',
    location: '公园',
    mood: 'playful',
    tags: ['出游', '玩耍'],
    likes: 89,
    isLiked: false,
    isFavorite: false,
    comments: [],
    commentsCount: 0,
    visibility: 'public',
    createdAt: '2024-01-13T14:00:00Z'
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/id/783/400/350',
    filter: 'vintage',
    petId: 'p3',
    petName: '花花',
    petAvatar: 'https://picsum.photos/id/783/200/200',
    date: '2024-01-12',
    mood: 'curious',
    tags: ['日常'],
    likes: 67,
    isLiked: false,
    isFavorite: false,
    comments: [],
    commentsCount: 0,
    visibility: 'public',
    createdAt: '2024-01-12T16:30:00Z'
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    filter: 'bright',
    petId: 'p2',
    petName: '豆豆',
    petAvatar: 'https://picsum.photos/id/659/200/200',
    date: '2024-01-11',
    mood: 'cute',
    tags: ['萌照', '生日'],
    likes: 312,
    isLiked: true,
    isFavorite: false,
    comments: [
      { id: 'c5-1', userId: 'f1', userName: '妈妈', userAvatar: 'https://picsum.photos/id/91/200/200', content: '生日快乐！', createdAt: '2024-01-11 12:00' },
      { id: 'c5-2', userId: 'f3', userName: '妹妹', userAvatar: 'https://picsum.photos/id/338/200/200', content: '豆豆越来越可爱了', createdAt: '2024-01-11 13:00' }
    ],
    commentsCount: 2,
    visibility: 'public',
    description: '豆豆生日快乐！',
    createdAt: '2024-01-11T12:00:00Z'
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/id/237/400/280',
    filter: 'cool',
    petId: 'p1',
    petName: '小橘',
    petAvatar: 'https://picsum.photos/id/237/200/200',
    date: '2024-01-10',
    location: '浴室',
    mood: 'hungry',
    tags: ['洗澡'],
    likes: 45,
    isLiked: false,
    isFavorite: true,
    comments: [],
    commentsCount: 0,
    visibility: 'family',
    createdAt: '2024-01-10T20:00:00Z'
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/id/659/400/450',
    filter: 'original',
    petId: 'p2',
    petName: '豆豆',
    petAvatar: 'https://picsum.photos/id/659/200/200',
    date: '2024-01-09',
    mood: 'happy',
    tags: ['玩耍'],
    likes: 178,
    isLiked: false,
    isFavorite: false,
    comments: [],
    commentsCount: 0,
    visibility: 'public',
    createdAt: '2024-01-09T09:00:00Z'
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/id/718/400/320',
    filter: 'original',
    petId: 'p3',
    petName: '花花',
    petAvatar: 'https://picsum.photos/id/783/200/200',
    date: '2024-01-08',
    location: '阳台',
    mood: 'sleepy',
    tags: ['睡姿', '日常'],
    likes: 92,
    isLiked: true,
    isFavorite: false,
    comments: [],
    commentsCount: 0,
    visibility: 'public',
    createdAt: '2024-01-08T15:00:00Z'
  },
  {
    id: '9',
    imageUrl: 'https://picsum.photos/id/783/400/380',
    filter: 'warm',
    petId: 'p1',
    petName: '小橘',
    petAvatar: 'https://picsum.photos/id/237/200/200',
    date: '2024-01-07',
    mood: 'playful',
    tags: ['玩耍', '萌照'],
    likes: 156,
    isLiked: false,
    isFavorite: false,
    comments: [],
    commentsCount: 0,
    visibility: 'public',
    createdAt: '2024-01-07T11:00:00Z'
  },
  {
    id: '10',
    imageUrl: 'https://picsum.photos/id/1025/400/500',
    filter: 'original',
    petId: 'p2',
    petName: '豆豆',
    petAvatar: 'https://picsum.photos/id/659/200/200',
    date: '2024-01-06',
    location: '海边',
    mood: 'happy',
    tags: ['出游'],
    likes: 234,
    isLiked: false,
    isFavorite: true,
    comments: [],
    commentsCount: 0,
    visibility: 'public',
    createdAt: '2024-01-06T08:30:00Z'
  },
  {
    id: '11',
    imageUrl: 'https://picsum.photos/id/237/400/360',
    filter: 'original',
    petId: 'p3',
    petName: '花花',
    petAvatar: 'https://picsum.photos/id/783/200/200',
    date: '2024-01-05',
    mood: 'curious',
    tags: ['日常', '萌照'],
    likes: 78,
    isLiked: false,
    isFavorite: false,
    comments: [],
    commentsCount: 0,
    visibility: 'family',
    createdAt: '2024-01-05T19:00:00Z'
  },
  {
    id: '12',
    imageUrl: 'https://picsum.photos/id/659/400/420',
    filter: 'original',
    petId: 'p1',
    petName: '小橘',
    petAvatar: 'https://picsum.photos/id/237/200/200',
    date: '2024-01-04',
    mood: 'cute',
    tags: ['萌照', '吃饭'],
    likes: 189,
    isLiked: true,
    isFavorite: false,
    comments: [],
    commentsCount: 0,
    visibility: 'private',
    createdAt: '2024-01-04T12:30:00Z'
  }
];

export const getPhotosByPet = (petId: string): Photo[] => {
  return mockPhotos.filter(photo => photo.petId === petId);
};

export const getPhotosByMood = (mood: MoodType): Photo[] => {
  return mockPhotos.filter(photo => photo.mood === mood);
};

export const getPhotosByTag = (tag: string): Photo[] => {
  return mockPhotos.filter(photo => photo.tags.includes(tag));
};