export interface User {
  id: string;
  name: string;
  avatar: string;
  phone?: string;
  pets: string[];
  familyMembers: FamilyMember[];
  favorites: string[];
  notifications: Notification[];
}

export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  relation: string;
  joinedAt: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  photoId?: string;
  userId?: string;
}

export type NotificationType = 'comment' | 'like' | 'favorite' | 'remind' | 'invite';

export const notificationLabels: Record<NotificationType, string> = {
  comment: '评论',
  like: '点赞',
  favorite: '收藏',
  remind: '提醒',
  invite: '邀请'
};