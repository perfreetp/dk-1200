import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { Album, albumTypeLabels, albumTypeColors } from '@/types/album';
import styles from './index.module.scss';

interface AlbumCardProps {
  album: Album;
  onClick?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  return (
    <View className={styles.albumCard} onClick={onClick}>
      <Image src={album.cover} mode="aspectFill" className={styles.cover} />
      <View className={styles.overlay}>
        <View className={styles.typeTag} style={{ backgroundColor: albumTypeColors[album.type] }}>
          <Text className={styles.typeText}>{albumTypeLabels[album.type]}</Text>
        </View>
        <Text className={styles.title}>{album.title}</Text>
        <View className={styles.meta}>
          <Text className={styles.petName}>{album.petName}</Text>
          <Text className={styles.photoCount}>{album.photoCount}张</Text>
        </View>
      </View>
      {!album.isPublic && (
        <View className={styles.privateBadge}>
          <Text className={styles.privateIcon}>🔒</Text>
        </View>
      )}
    </View>
  );
};

export default AlbumCard;