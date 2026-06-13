import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import { moodLabels, moodColors, filterLabels, FilterType } from '@/types/photo';
import styles from './index.module.scss';

const DetailPage: React.FC = () => {
  const { photos, toggleLike, toggleFavorite, addComment } = useAppStore();
  const [photo, setPhoto] = useState<typeof photos[0] | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1] as { options?: { id?: string } };
    const photoId = currentPage.options?.id || '';
    const foundPhoto = photos.find(p => p.id === photoId);
    if (foundPhoto) {
      setPhoto(foundPhoto);
    }
  }, [photos]);

  const handleLike = () => {
    if (photo) {
      toggleLike(photo.id);
    }
  };

  const handleFavorite = () => {
    if (photo) {
      toggleFavorite(photo.id);
    }
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !photo) return;
    addComment(photo.id, newComment);
    setNewComment('');
    Taro.showToast({ title: '评论成功', icon: 'success' });
  };

  const getFilterStyle = (filter: FilterType | undefined) => {
    if (!filter || filter === 'original') return {};
    switch (filter) {
      case 'warm':
        return { filter: 'sepia(20%) saturate(120%) hue-rotate(10deg)' };
      case 'cool':
        return { filter: 'sepia(10%) saturate(90%) hue-rotate(180deg)' };
      case 'vintage':
        return { filter: 'sepia(50%) contrast(110%) brightness(90%)' };
      case 'bright':
        return { filter: 'brightness(1.15) contrast(105%)' };
      default:
        return {};
    }
  };

  if (!photo) {
    return (
      <View className={styles.loading}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.detailPage}>
      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.imageContainer}>
          <Image
            src={photo.imageUrl}
            mode="aspectFit"
            className={styles.photoImage}
            style={getFilterStyle(photo.filter)}
          />
          {photo.filter && photo.filter !== 'original' && (
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
            {photo.location && <Text className={styles.location}>📍 {photo.location}</Text>}
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
            <Text className={styles.actionText}>{photo.commentsCount}</Text>
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
            <Text className={styles.commentsTitle}>评论 ({photo.commentsCount})</Text>
            {photo.comments.length > 0 ? (
              photo.comments.map(comment => (
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
              ))
            ) : (
              <View className={styles.emptyComments}>
                <Text>暂无评论，来发表第一条吧~</Text>
              </View>
            )}
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