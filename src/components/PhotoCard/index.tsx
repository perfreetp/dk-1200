import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import classnames from 'classnames';
import { Photo, moodLabels, moodColors, FilterType } from '@/types/photo';
import styles from './index.module.scss';

interface PhotoCardProps {
  photo: Photo;
  onClick?: () => void;
}

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

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <View className={styles.card} onClick={onClick}>
      <Image
        src={photo.imageUrl}
        mode="aspectFill"
        className={styles.image}
        lazyLoad
        style={getFilterStyle(photo.filter)}
      />
      <View className={styles.info}>
        <View className={styles.petInfo}>
          <Image
            src={photo.petAvatar}
            mode="aspectFill"
            className={styles.petAvatar}
          />
          <Text className={styles.petName}>{photo.petName}</Text>
        </View>
        <View className={styles.meta}>
          <Text className={styles.date}>{photo.date}</Text>
          {photo.location && (
            <Text className={styles.location}>{photo.location}</Text>
          )}
        </View>
        <View className={styles.moodTag}>
          <View
            className={styles.moodDot}
            style={{ backgroundColor: moodColors[photo.mood] }}
          />
          <Text className={styles.moodText}>{moodLabels[photo.mood]}</Text>
        </View>
        {photo.tags.length > 0 && (
          <View className={styles.tags}>
            {photo.tags.slice(0, 2).map((tag, index) => (
              <Text key={index} className={styles.tag}>{tag}</Text>
            ))}
          </View>
        )}
      </View>
      <View className={styles.stats}>
        <View className={styles.statItem}>
          <Text className={classnames(styles.statIcon, photo.isLiked && styles.liked)}>♥</Text>
          <Text className={styles.statNum}>{photo.likes}</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={classnames(styles.statIcon, photo.isFavorite && styles.favorited)}>★</Text>
          <Text className={styles.statNum}>{photo.commentsCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default PhotoCard;