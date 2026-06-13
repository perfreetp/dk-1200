import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppStore } from '@/store/useAppStore';
import AlbumCard from '@/components/AlbumCard';
import styles from './index.module.scss';

const AlbumPage: React.FC = () => {
  const { albums } = useAppStore();

  const handleAlbumClick = (albumId: string) => {
    Taro.navigateTo({
      url: `/pages/album-detail/index?id=${albumId}`
    });
  };

  const handleCreateAlbum = () => {
    Taro.showToast({
      title: '创建专题功能开发中',
      icon: 'none'
    });
  };

  return (
    <View className={styles.albumPage}>
      <View className={styles.header}>
        <Text className={styles.title}>专题相册</Text>
        <View className={styles.createBtn} onClick={handleCreateAlbum}>
          <Text className={styles.createIcon}>+</Text>
          <Text className={styles.createText}>创建</Text>
        </View>
      </View>

      <ScrollView scrollY className={styles.scrollView}>
        {albums.length > 0 ? (
          <View className={styles.albumGrid}>
            {albums.map(album => (
              <View key={album.id} className={styles.albumItem}>
                <AlbumCard
                  album={album}
                  onClick={() => handleAlbumClick(album.id)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyIcon}>📸</Text>
            <Text className={styles.emptyText}>还没有创建专题相册哦~</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AlbumPage;