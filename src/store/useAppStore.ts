import { create } from 'zustand';
import { Photo, Pet, Album, User, Notification } from '@/types';
import { mockPhotos } from '@/data/photos';
import { mockPets } from '@/data/pets';
import { mockAlbums } from '@/data/albums';

interface AppState {
  photos: Photo[];
  pets: Pet[];
  albums: Album[];
  currentUser: User;
  selectedPetId: string | null;
  selectedMood: string | null;
  selectedTag: string | null;
  
  setPhotos: (photos: Photo[]) => void;
  addPhoto: (photo: Photo) => void;
  updatePhoto: (id: string, photo: Partial<Photo>) => void;
  deletePhoto: (id: string) => void;
  toggleLike: (id: string) => void;
  toggleFavorite: (id: string) => void;
  
  setPets: (pets: Pet[]) => void;
  addPet: (pet: Pet) => void;
  updatePet: (id: string, pet: Partial<Pet>) => void;
  
  setAlbums: (albums: Album[]) => void;
  addAlbum: (album: Album) => void;
  updateAlbum: (id: string, album: Partial<Album>) => void;
  
  setSelectedPetId: (id: string | null) => void;
  setSelectedMood: (mood: string | null) => void;
  setSelectedTag: (tag: string | null) => void;
  
  getFilteredPhotos: () => Photo[];
}

const mockUser: User = {
  id: 'u1',
  name: '宠物主人',
  avatar: 'https://picsum.photos/id/64/200/200',
  pets: ['p1', 'p2', 'p3'],
  familyMembers: [
    { id: 'f1', name: '妈妈', avatar: 'https://picsum.photos/id/91/200/200', relation: '妈妈', joinedAt: '2023-01-01' },
    { id: 'f2', name: '爸爸', avatar: 'https://picsum.photos/id/177/200/200', relation: '爸爸', joinedAt: '2023-01-01' },
    { id: 'f3', name: '妹妹', avatar: 'https://picsum.photos/id/338/200/200', relation: '妹妹', joinedAt: '2023-06-01' }
  ],
  favorites: ['2', '5', '6', '10'],
  notifications: [
    { id: 'n1', type: 'like', title: '妈妈点赞了你的照片', content: '小橘的萌照', createdAt: '2024-01-15', isRead: false, photoId: '1', userId: 'f1' },
    { id: 'n2', type: 'comment', title: '爸爸评论了', content: '豆豆真可爱！', createdAt: '2024-01-14', isRead: false, photoId: '5', userId: 'f2' },
    { id: 'n3', type: 'remind', title: '拍照提醒', content: '小橘已经7天没有新照片了，快来拍一张吧', createdAt: '2024-01-13', isRead: true }
  ]
};

export const useAppStore = create<AppState>((set, get) => ({
  photos: mockPhotos,
  pets: mockPets,
  albums: mockAlbums,
  currentUser: mockUser,
  selectedPetId: null,
  selectedMood: null,
  selectedTag: null,
  
  setPhotos: (photos) => set({ photos }),
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  updatePhoto: (id, updates) => set((state) => ({
    photos: state.photos.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  deletePhoto: (id) => set((state) => ({
    photos: state.photos.filter(p => p.id !== id)
  })),
  toggleLike: (id) => set((state) => ({
    photos: state.photos.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    })
  })),
  toggleFavorite: (id) => set((state) => ({
    photos: state.photos.map(p => {
      if (p.id === id) {
        return { ...p, isFavorite: !p.isFavorite };
      }
      return p;
    })
  })),
  
  setPets: (pets) => set({ pets }),
  addPet: (pet) => set((state) => ({ pets: [...state.pets, pet] })),
  updatePet: (id, updates) => set((state) => ({
    pets: state.pets.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  
  setAlbums: (albums) => set({ albums }),
  addAlbum: (album) => set((state) => ({ albums: [...state.albums, album] })),
  updateAlbum: (id, updates) => set((state) => ({
    albums: state.albums.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  
  setSelectedPetId: (id) => set({ selectedPetId: id }),
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  
  getFilteredPhotos: () => {
    const { photos, selectedPetId, selectedMood, selectedTag } = get();
    let filtered = photos;
    
    if (selectedPetId) {
      filtered = filtered.filter(p => p.petId === selectedPetId);
    }
    if (selectedMood) {
      filtered = filtered.filter(p => p.mood === selectedMood);
    }
    if (selectedTag) {
      filtered = filtered.filter(p => p.tags.includes(selectedTag));
    }
    
    return filtered;
  }
}));