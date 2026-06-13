import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import { moodLabels, moodColors, filterLabels } from '@/types/photo';
import styles from './index.module.scss';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

const DetailPage: React.FC = () => {
  const { photos, toggleLike, toggleFavorite } = useAppStore();
  const [photo, setPhoto] = useState<typeof photos[0] | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1] as { options?: { id?: string } };
    const photoId = currentPage.options?.id || '';
    const foundPhoto = photos.find(p => p.id === photoId);
    if (foundPhoto) {
      setPhoto(foundPhoto);
      setComments([
        { id: 'c1', userId: 'f1', userName: '妈妈', userAvatar: 'https://picsum.photos/id/91/200/200', content: '小橘真可爱！', createdAt: '2024-01-15 11:30' },
        { id: 'c2', userId: 'f2', userName: '爸爸', userAvatar: 'https://picsum.photos/id/177/200/200', content: '好萌啊', createdAt: '2024-01-15 12:00' }
      ]);
    }
  }, [photos]);

  const handleLike = () => {
    if (photo) {
      toggleLike(photo.id);
      setPhoto(prev => prev ? { ...prev, isLiked: !prev.isLiked, likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1 } : null);
    }
  };

  const handleFavorite = () => {
    if (photo) {
      toggleFavorite(photo.id);
      setPhoto(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      userId: 'u1',
      userName: '我',
      userAvatar: 'https://picsum.photos/id/64/200/200',
      content: newComment,
      createdAt: new Date().toLocaleString()
    };
    setComments([comment, ...comments]);
    setNewComment('');
    if (photo) {
      setPhoto(prev => prev ? { ...prev, comments: prev.comments + 1 } : null);
    }
  };

  if (!photo) {
    return (
      <View className={styles.loading}>
        <Text>加载中...</Text>
      </View>
    );
  }

  const filterStyle = photo.filter && photo.filter !== 'original' 
    ? { filter: photo.filter === 'warm' ? 'sepia(20%) saturate(120%)' : photo.filter === 'cool' ? 'cool' : photo.filter === 'vintage' ? 'sepia(50%)' : 'brightness(1.1)' }
    : {};

  return (
    <View className={styles.detailPage}>
      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.imageContainer}>
          <Image
            src={photo.imageUrl}
            mode="aspectFit"
            className={styles.photoImage}
            style={filterStyle}
          />
          {photo.filter && (
            <View className={styles.filterTag}>
              <Text>{filterLabels[photo.filter]}</Text>
            </View>
          )}
        </View>

        <View className={styles.infoSection}>
          <View className={styles.petInfo}>
            <Image src={photo.petAvatar} mode="aspectFill" className={styles.petAvatar} />
            <View className={styles.petDetail}>
              <Text className={styles.petName}>{photo.petName}</Text>
              <View className={styles.moodTag}>
                <View className={styles.moodDot} style={{ backgroundColor: moodColors[photo.mood] }} />
                <Text className={styles.moodText}>{moodLabels[photo.mood]}</Text>
              </View>
            </View>
          </View>

          <View className={styles.meta}>
            <Text className={styles.date}>{photo.date}</Text>
            {photo.location && <Text className={styles.location}>� {photo.location}</Text>}
          </View>

          {photo.description && (
            <Text className={styles.description}>{photo.description}</Text>
          )}

          {photo.tags.length > 0 && (
            <View className={styles.tags}>
              {photo.tags.map((tag, index) => (
                <Text key={index} className={styles.tag}>{tag}</Text>
              ))}
            </View>
          )}

          <View className={styles.visibilityBadge}>
            {photo.visibility === 'public' && <Text>🌍 公开</Text>}
            {photo.visibility === 'family' && <Text>👨‍👩‍👧 家人可见</Text>}
            {photo.visibility === 'private' && <Text>🔒 私密</Text>}
          </View>
        </View>

        <View className={styles.actionsSection}>
          <View className={styles.actionBtn} onClick={handleLike}>
            <Text className={classnames(styles.actionIcon, photo.isLiked && styles.liked)}>❤️</Text>
            <Text className={styles.actionText}>{photo.likes}</Text>
          </View>
          <View className={styles.actionBtn} onClick={() => setShowComments(!showComments)}>
            <Text className={styles.actionIcon}>💬</Text>
            <Text className={styles.actionText}>{photo.comments}</Text>
          </View>
          <View className={styles.actionBtn} onClick={handleFavorite}>
            <Text className={classnames(styles.actionIcon, photo.isFavorite && styles.favorited)}>⭐</Text>
            <Text className={styles.actionText}>{photo.isFavorite ? '已收藏' : '收藏'}</Text>
          </View>
          <View className={styles.actionBtn} onClick={() => Taro.showToast({ title: '分享功能开发中', icon: 'none' })}>
            <Text className={styles.actionIcon}>🔗</Text>
            <Text className={styles.actionText}>分享</Text>
          </View>
        </View>

        {showComments && (
          <View className={styles.commentsSection}>
            <Text className={styles.commentsTitle}>评论 ({comments.length})</Text>
            {comments.map(comment => (
              <View key={comment.id} className={styles.commentItem}>
                <Image src={comment.userAvatar} mode="aspectFill" className={styles.commentAvatar} />
                <View className={styles.commentContent}>
                  <View className={styles.commentHeader}>
                    <Text className={styles.commentName}>{comment.userName}</Text>
                    <Text className={styles.commentTime}>{comment.createdAt}</Text>
                  </View>
                  <Text className={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}
            <View className={styles.commentInputSection}>
              <Input
                className={styles.commentInput}
                placeholder="发表评论..."
                value={newComment}
                onInput={(e) => setNewComment(e.detail.value)}
                confirmType="send"
                onConfirm={handleCommentSubmit}
              />
              <Button className={styles.sendBtn} onClick={handleCommentSubmit}>发送</Button>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailPage;