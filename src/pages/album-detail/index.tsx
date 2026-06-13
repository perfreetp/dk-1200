import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppStore } from '@/store/useAppStore';
import { albumTypeLabels, albumTypeColors } from '@/types/album';
import styles from './index.module.scss';

const AlbumDetailPage: React.FC = () => {
  const { albums, getAlbumPhotos, photos, addPhotosToAlbum } = useAppStore();
  const [album, setAlbum] = useState<typeof albums[0] | null>(null);
  const [albumId, setAlbumId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1] as { options?: { id?: string } };
    const id = currentPage.options?.id || '';
    setAlbumId(id);
    const foundAlbum = albums.find(a => a.id === id);
    if (foundAlbum) {
      setAlbum(foundAlbum);
    }
  }, [albums]);

  const albumPhotos = useMemo(() => {
    if (!albumId) return [];
    return getAlbumPhotos(albumId);
  }, [albumId, getAlbumPhotos]);

  const availablePhotos = useMemo(() => {
    if (!album) return [];
    return photos.filter(p => 
      p.petId === album.petId && 
      !album.photoIds.includes(p.id) &&
      p.visibility !== 'private'
    );
  }, [photos, album]);

  const handlePhotoSelect = (photoId: string) => {
    if (selectedPhotoIds.includes(photoId)) {
      setSelectedPhotoIds(selectedPhotoIds.filter(id => id !== photoId));
    } else if (selectedPhotoIds.length < 9) {
      setSelectedPhotoIds([...selectedPhotoIds, photoId]);
    } else {
      Taro.showToast({ title: '最多选择9张', icon: 'none' });
    }
  };

  const handleAddPhotos = () => {
    if (selectedPhotoIds.length === 0) {
      Taro.showToast({ title: '请选择照片', icon: 'none' });
      return;
    }
    addPhotosToAlbum(albumId, selectedPhotoIds);
    setSelectedPhotoIds([]);
    setShowAddModal(false);
    Taro.showToast({ title: '添加成功', icon: 'success' });
  };

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
            <Text className={styles.meta}>{album.petName} · {albumPhotos.length}张照片</Text>
          </View>
        </View>

        <View className={styles.infoSection}>
          {album.description && (
            <Text className={styles.description}>{album.description}</Text>
          )}
          <View className={styles.infoRow}>
            <Text className={styles.infoItem}>
              <Text className={styles.infoIcon}>📅</Text>
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

        <View className={styles.actionsBar}>
          <Text className={styles.sectionTitle}>相册照片</Text>
          {availablePhotos.length > 0 && (
            <Text className={styles.addBtn} onClick={() => setShowAddModal(true)}>+ 添加照片</Text>
          )}
        </View>

        <View className={styles.photosSection}>
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
              {availablePhotos.length > 0 && (
                <Text className={styles.emptyBtn} onClick={() => setShowAddModal(true)}>添加照片</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {showAddModal && (
        <View className={styles.modal} onClick={() => setShowAddModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>选择照片添加到相册</Text>
            <ScrollView scrollY className={styles.modalScroll}>
              <View className={styles.photoSelectGrid}>
                {availablePhotos.map(photo => (
                  <View
                    key={photo.id}
                    className={styles.photoSelectItem}
                    onClick={() => handlePhotoSelect(photo.id)}
                  >
                    <Image src={photo.imageUrl} mode="aspectFill" className={styles.photoSelectImage} />
                    {selectedPhotoIds.includes(photo.id) && (
                      <View className={styles.photoSelectCheck}>✓</View>
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className={styles.modalActions}>
              <View className={styles.modalBtn} onClick={() => setShowAddModal(false)}>取消</View>
              <View className={styles.modalBtn} onClick={handleAddPhotos}>添加 ({selectedPhotoIds.length})</View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AlbumDetailPage;