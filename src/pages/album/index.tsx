import React, { useState } from 'react';
import { View, Text, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import AlbumCard from '@/components/AlbumCard';
import { AlbumType, albumTypeLabels, albumTypeColors } from '@/types/album';
import styles from './index.module.scss';

const AlbumPage: React.FC = () => {
  const { albums, pets, addAlbum } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<AlbumType>('custom');
  const [isPublic, setIsPublic] = useState(true);

  const types: AlbumType[] = ['birthday', 'bath', 'travel', 'daily', 'play', 'custom'];

  const handleAlbumClick = (albumId: string) => {
    Taro.navigateTo({
      url: `/pages/album-detail/index?id=${albumId}`
    });
  };

  const handleCreateAlbum = () => {
    if (!title.trim()) {
      Taro.showToast({ title: '请输入相册名称', icon: 'none' });
      return;
    }
    if (!selectedPetId) {
      Taro.showToast({ title: '请选择宠物', icon: 'none' });
      return;
    }

    const pet = pets.find(p => p.id === selectedPetId);
    const newAlbum = {
      id: `album_${Date.now()}`,
      title,
      cover: pet?.avatar || 'https://picsum.photos/id/237/400/400',
      type: selectedType,
      petId: selectedPetId,
      petName: pet?.name || '',
      photoCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      description,
      isPublic
    };

    addAlbum(newAlbum);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
    setSelectedPetId(null);
    setSelectedType('custom');
    setIsPublic(true);

    Taro.showToast({ title: '创建成功', icon: 'success' });
  };

  return (
    <View className={styles.albumPage}>
      <View className={styles.header}>
        <Text className={styles.title}>专题相册</Text>
        <View className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
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

      {showCreateModal && (
        <View className={styles.modal} onClick={() => setShowCreateModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>创建专题相册</Text>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>相册名称</Text>
              <Input
                className={styles.input}
                placeholder="请输入相册名称"
                value={title}
                onInput={(e) => setTitle(e.detail.value)}
              />
            </View>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>选择宠物</Text>
              <ScrollView scrollX className={styles.petScroll}>
                <View className={styles.petSelector}>
                  {pets.map(pet => (
                    <View
                      key={pet.id}
                      className={classnames(styles.petOption, selectedPetId === pet.id && styles.petActive)}
                      onClick={() => setSelectedPetId(pet.id)}
                    >
                      <Text className={styles.petName}>{pet.name}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>相册类型</Text>
              <View className={styles.typeSelector}>
                {types.map(type => (
                  <View
                    key={type}
                    className={classnames(styles.typeOption, selectedType === type && styles.typeActive)}
                    onClick={() => setSelectedType(type)}
                    style={selectedType === type ? { backgroundColor: albumTypeColors[type] } : {}}
                  >
                    <Text className={styles.typeText}>{albumTypeLabels[type]}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>相册描述</Text>
              <Input
                className={styles.input}
                placeholder="请输入相册描述（可选）"
                value={description}
                onInput={(e) => setDescription(e.detail.value)}
              />
            </View>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>可见范围</Text>
              <View className={styles.visibilitySelector}>
                <View
                  className={classnames(styles.visibilityOption, isPublic && styles.visibilityActive)}
                  onClick={() => setIsPublic(true)}
                >
                  <Text>🌍 公开</Text>
                </View>
                <View
                  className={classnames(styles.visibilityOption, !isPublic && styles.visibilityActive)}
                  onClick={() => setIsPublic(false)}
                >
                  <Text>🔒 私密</Text>
                </View>
              </View>
            </View>

            <View className={styles.modalActions}>
              <View className={styles.modalBtn} onClick={() => setShowCreateModal(false)}>取消</View>
              <View className={styles.modalBtn} onClick={handleCreateAlbum}>创建</View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AlbumPage;