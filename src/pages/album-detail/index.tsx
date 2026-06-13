import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppStore } from '@/store/useAppStore';
import { albumTypeLabels, albumTypeColors } from '@/types/album';
import styles from './index.module.scss';

const AlbumDetailPage: React.FC = () => {
  const { albums, photos } = useAppStore();
  const [album, setAlbum] = useState<typeof albums[0] | null>(null);
  const [albumPhotos, setAlbumPhotos] = useState<typeof photos>([]);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1] as { options?: { id?: string } };
    const albumId = currentPage.options?.id || '';
    const foundAlbum = albums.find(a => a.id === albumId);
    if (foundAlbum) {
      setAlbum(foundAlbum);
      setAlbumPhotos(photos.filter(p => p.albumId === albumId));
    }
  }, [albums, photos]);

  if (!album) {
    return (
      <View className={styles.loading}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.albumDetailPage}>
      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.header}>
          <Image src={album.cover} mode="aspectFill" className={styles.cover} />
          <View className={styles.headerOverlay}>
            <View className={styles.typeTag} style={{ backgroundColor: albumTypeColors[album.type] }}>
              <Text className={styles.typeText}>{albumTypeLabels[album.type]}</Text>
            </View>
            <Text className={styles.title}>{album.title}</Text>
            <Text className={styles.meta}>{album.petName} · {album.photoCount}张照片</Text>
          </View>
        </View>

        <View className={styles.infoSection}>
          {album.description && (
            <Text className={styles.description}>{album.description}</Text>
          )}
          <View className={styles.infoRow}>
            <Text className={styles.infoItem}>
              <Text className={styles.infoIcon}>�</Text>
              <Text className={styles.infoText}>创建于 {album.createdAt}</Text>
            </Text>
            <Text className={styles.infoItem}>
              <Text className={styles.infoIcon}>🔄</Text>
              <Text className={styles.infoText}>更新于 {album.updatedAt}</Text>
            </Text>
          </View>
          {!album.isPublic && (
            <View className={styles.privateBadge}>
              <Text>🔒 私密相册</Text>
            </View>
          )}
        </View>

        <View className={styles.photosSection}>
          <Text className={styles.sectionTitle}>相册照片</Text>
          {albumPhotos.length > 0 ? (
            <View className={styles.photosGrid}>
              {albumPhotos.map(photo => (
                <View
                  key={photo.id}
                  className={styles.photoItem}
                  onClick={() => Taro.navigateTo({ url: `/pages/detail/index?id=${photo.id}` })}
                >
                  <Image src={photo.imageUrl} mode="aspectFill" className={styles.photoImage} />
                </View>
              ))}
            </View>
          ) : (
            <View className={styles.emptyPhotos}>
              <Text className={styles.emptyIcon}>📷</Text>
              <Text className={styles.emptyText}>相册暂无照片</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AlbumDetailPage;