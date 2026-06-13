import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppStore } from '@/store/useAppStore';
import { petTypeLabels, timelineLabels } from '@/types/pet';
import { moodLabels, moodColors, FilterType } from '@/types/photo';
import styles from './index.module.scss';

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

const PetDetailPage: React.FC = () => {
  const { pets, getPetPhotos, albums } = useAppStore();
  const [pet, setPet] = useState<typeof pets[0] | null>(null);
  const [petId, setPetId] = useState('');
  const [activeTab, setActiveTab] = useState<'photos' | 'timeline'>('photos');

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1] as { options?: { id?: string } };
    const id = currentPage.options?.id || '';
    setPetId(id);
    const foundPet = pets.find(p => p.id === id);
    if (foundPet) {
      setPet(foundPet);
    }
  }, [pets]);

  const petPhotos = useMemo(() => {
    if (!petId) return [];
    return getPetPhotos(petId);
  }, [petId, getPetPhotos]);

  const petAlbums = useMemo(() => {
    return albums.filter(a => a.petId === petId);
  }, [albums, petId]);

  const groupedPhotos = useMemo(() => {
    return petPhotos.reduce((acc, photo) => {
      const date = photo.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(photo);
      return acc;
    }, {} as Record<string, typeof petPhotos>);
  }, [petPhotos]);

  const timelineData = useMemo(() => {
    return Object.entries(groupedPhotos).map(([date, photos]) => ({
      date,
      photos
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [groupedPhotos]);

  if (!pet) {
    return (
      <View className={styles.loading}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.petDetailPage}>
      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.header}>
          <Image src={pet.avatar} mode="aspectFill" className={styles.avatar} />
          <View className={styles.headerOverlay}>
            <Text className={styles.name}>{pet.name}</Text>
            <Text className={styles.breed}>{pet.breed} · {petTypeLabels[pet.type]} · {pet.age}</Text>
          </View>
        </View>

        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{petPhotos.length}</Text>
            <Text className={styles.statLabel}>照片</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{petAlbums.length}</Text>
            <Text className={styles.statLabel}>相册</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{pet.familyMembers.length}</Text>
            <Text className={styles.statLabel}>关注</Text>
          </View>
        </View>

        <View className={styles.infoSection}>
          <Text className={styles.sectionTitle}>基本信息</Text>
          <View className={styles.infoGrid}>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>生日</Text>
              <Text className={styles.infoValue}>{pet.birthday}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>性别</Text>
              <Text className={styles.infoValue}>{pet.gender === 'male' ? '♂ 公' : '♀ 母'}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>颜色</Text>
              <Text className={styles.infoValue}>{pet.color}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>体重</Text>
              <Text className={styles.infoValue}>{pet.weight || '-'}</Text>
            </View>
          </View>
          {pet.description && (
            <Text className={styles.description}>{pet.description}</Text>
          )}
        </View>

        <View className={styles.tabs}>
          <View
            className={styles.tabItem}
            onClick={() => setActiveTab('photos')}
          >
            <Text className={activeTab === 'photos' ? styles.tabActive : styles.tabText}>照片</Text>
            {activeTab === 'photos' && <View className={styles.tabIndicator}></View>}
          </View>
          <View
            className={styles.tabItem}
            onClick={() => setActiveTab('timeline')}
          >
            <Text className={activeTab === 'timeline' ? styles.tabActive : styles.tabText}>时间线</Text>
            {activeTab === 'timeline' && <View className={styles.tabIndicator}></View>}
          </View>
        </View>

        {activeTab === 'photos' && (
          <View className={styles.photosSection}>
            {petPhotos.length > 0 ? (
              <View className={styles.photosGrid}>
                {petPhotos.map(photo => (
                  <View
                    key={photo.id}
                    className={styles.photoItem}
                    onClick={() => Taro.navigateTo({ url: `/pages/detail/index?id=${photo.id}` })}
                  >
                    <Image src={photo.imageUrl} mode="aspectFill" className={styles.photoImage} style={getFilterStyle(photo.filter)} />
                  </View>
                ))}
              </View>
            ) : (
              <View className={styles.emptyPhotos}>
                <Text className={styles.emptyIcon}>📷</Text>
                <Text className={styles.emptyText}>暂无照片</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'timeline' && (
          <View className={styles.timelineSection}>
            {timelineData.length > 0 ? (
              timelineData.map((item, index) => (
                <View key={index} className={styles.timelineItem}>
                  <Text className={styles.timelineDate}>{item.date}</Text>
                  <View className={styles.timelinePhotos}>
                    {item.photos.map(photo => (
                      <View
                        key={photo.id}
                        className={styles.timelinePhoto}
                        onClick={() => Taro.navigateTo({ url: `/pages/detail/index?id=${photo.id}` })}
                      >
                        <Image src={photo.imageUrl} mode="aspectFill" className={styles.timelineImage} style={getFilterStyle(photo.filter)} />
                        <View className={styles.timelineMood}>
                          <View className={styles.moodDot} style={{ backgroundColor: moodColors[photo.mood] }} />
                          <Text className={styles.moodText}>{moodLabels[photo.mood]}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            ) : (
              <View className={styles.emptyPhotos}>
                <Text className={styles.emptyIcon}>📅</Text>
                <Text className={styles.emptyText}>暂无时间线记录</Text>
              </View>
            )}
          </View>
        )}

        {petAlbums.length > 0 && (
          <View className={styles.albumsSection}>
            <Text className={styles.sectionTitle}>专属相册</Text>
            <View className={styles.albumsGrid}>
              {petAlbums.map(album => (
                <View
                  key={album.id}
                  className={styles.albumItem}
                  onClick={() => Taro.navigateTo({ url: `/pages/album-detail/index?id=${album.id}` })}
                >
                  <Image src={album.cover} mode="aspectFill" className={styles.albumCover} />
                  <Text className={styles.albumTitle}>{album.title}</Text>
                  <Text className={styles.albumCount}>{album.photoIds.length}张</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PetDetailPage;