import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import classnames from 'classnames';
import { Photo, moodLabels, moodColors } from '@/types/photo';
import styles from './index.module.scss';

interface PhotoCardProps {
  photo: Photo;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <View className={styles.card} onClick={onClick}>
      <Image
        src={photo.imageUrl}
        mode="aspectFill"
        className={styles.image}
        lazyLoad
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
          <Text className={styles.statNum}>{photo.comments}</Text>
        </View>
      </View>
    </View>
  );
};

export default PhotoCard;