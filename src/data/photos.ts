import { Photo, MoodType } from '@/types/photo';

const moods: MoodType[] = ['happy', 'sleepy', 'playful', 'curious', 'hungry', 'cute'];
const tags = ['生日', '洗澡', '出游', '日常', '玩耍', '萌照', '睡姿', '吃饭'];

export const mockPhotos: Photo[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/237/400/500',
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
    comments: 23,
    visibility: 'public',
    description: '今天小橘特别开心，一直在客厅跑来跑去'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/659/400/300',
    petId: 'p2',
    petName: '豆豆',
    petAvatar: 'https://picsum.photos/id/659/200/200',
    date: '2024-01-14',
    mood: 'sleepy',
    tags: ['睡姿'],
    likes: 256,
    isLiked: true,
    isFavorite: true,
    comments: 45,
    visibility: 'family',
    description: '豆豆睡得好香'
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/id/718/400/600',
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
    comments: 12,
    visibility: 'public',
    albumId: 'a1'
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/id/783/400/350',
    petId: 'p3',
    petName: '花花',
    petAvatar: 'https://picsum.photos/id/783/200/200',
    date: '2024-01-12',
    mood: 'curious',
    tags: ['日常'],
    likes: 67,
    isLiked: false,
    isFavorite: false,
    comments: 8,
    visibility: 'public'
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    petId: 'p2',
    petName: '豆豆',
    petAvatar: 'https://picsum.photos/id/659/200/200',
    date: '2024-01-11',
    mood: 'cute',
    tags: ['萌照', '生日'],
    likes: 312,
    isLiked: true,
    isFavorite: false,
    comments: 56,
    visibility: 'public',
    albumId: 'a2',
    description: '豆豆生日快乐！'
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/id/237/400/280',
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
    comments: 7,
    visibility: 'family',
    albumId: 'a3'
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/id/659/400/450',
    petId: 'p2',
    petName: '豆豆',
    petAvatar: 'https://picsum.photos/id/659/200/200',
    date: '2024-01-09',
    mood: 'happy',
    tags: ['玩耍'],
    likes: 178,
    isLiked: false,
    isFavorite: false,
    comments: 34,
    visibility: 'public'
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/id/718/400/320',
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
    comments: 15,
    visibility: 'public'
  },
  {
    id: '9',
    imageUrl: 'https://picsum.photos/id/783/400/380',
    petId: 'p1',
    petName: '小橘',
    petAvatar: 'https://picsum.photos/id/237/200/200',
    date: '2024-01-07',
    mood: 'playful',
    tags: ['玩耍', '萌照'],
    likes: 156,
    isLiked: false,
    isFavorite: false,
    comments: 28,
    visibility: 'public'
  },
  {
    id: '10',
    imageUrl: 'https://picsum.photos/id/1025/400/500',
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
    comments: 42,
    visibility: 'public',
    albumId: 'a1'
  },
  {
    id: '11',
    imageUrl: 'https://picsum.photos/id/237/400/360',
    petId: 'p3',
    petName: '花花',
    petAvatar: 'https://picsum.photos/id/783/200/200',
    date: '2024-01-05',
    mood: 'curious',
    tags: ['日常', '萌照'],
    likes: 78,
    isLiked: false,
    isFavorite: false,
    comments: 11,
    visibility: 'family'
  },
  {
    id: '12',
    imageUrl: 'https://picsum.photos/id/659/400/420',
    petId: 'p1',
    petName: '小橘',
    petAvatar: 'https://picsum.photos/id/237/200/200',
    date: '2024-01-04',
    mood: 'cute',
    tags: ['萌照', '吃饭'],
    likes: 189,
    isLiked: true,
    isFavorite: false,
    comments: 35,
    visibility: 'public'
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