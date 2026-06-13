import React, { useState, useMemo } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import PhotoCard from '@/components/PhotoCard';
import FilterBar from '@/components/FilterBar';
import { MoodType } from '@/types/photo';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const {
    photos,
    pets,
    selectedPetId,
    selectedMood,
    selectedTag,
    setSelectedPetId,
    setSelectedMood,
    setSelectedTag,
    toggleLike,
    toggleFavorite
  } = useAppStore();

  const [searchText, setSearchText] = useState('');

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    photos.forEach(photo => {
      photo.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    let result = photos;
    
    if (selectedPetId) {
      result = result.filter(p => p.petId === selectedPetId);
    }
    if (selectedMood) {
      result = result.filter(p => p.mood === selectedMood);
    }
    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }
    if (searchText) {
      result = result.filter(p => 
        p.petName.includes(searchText) ||
        p.description?.includes(searchText) ||
        p.tags.some(tag => tag.includes(searchText))
      );
    }
    
    return result;
  }, [photos, selectedPetId, selectedMood, selectedTag, searchText]);

  const leftColumn = filteredPhotos.filter((_, index) => index % 2 === 0);
  const rightColumn = filteredPhotos.filter((_, index) => index % 2 === 1);

  const handlePhotoClick = (photoId: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${photoId}`
    });
  };

  const handleUpload = () => {
    Taro.switchTab({
      url: '/pages/upload/index'
    });
  };

  return (
    <View className={styles.homePage}>
      <View className={styles.header}>
        <View className={styles.searchBar}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchInput}
            placeholder="搜索宠物、标签..."
            value={searchText}
            onInput={(e) => setSearchText(e.detail.value)}
          />
        </View>
      </View>
      
      <FilterBar
        pets={pets}
        selectedPetId={selectedPetId}
        selectedMood={selectedMood as MoodType | null}
        selectedTag={selectedTag}
        tags={allTags}
        onPetSelect={setSelectedPetId}
        onMoodSelect={(mood) => setSelectedMood(mood)}
        onTagSelect={setSelectedTag}
      />

      <ScrollView scrollY className={styles.scrollView}>
        {filteredPhotos.length > 0 ? (
          <View className={styles.waterfall}>
            <View className={styles.column}>
              {leftColumn.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => handlePhotoClick(photo.id)}
                />
              ))}
            </View>
            <View className={styles.column}>
              {rightColumn.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => handlePhotoClick(photo.id)}
                />
              ))}
            </View>
          </View>
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyText}>暂无照片，快来上传吧~</Text>
          </View>
        )}
      </ScrollView>

      <View className={styles.uploadBtn} onClick={handleUpload}>
        <Text className={styles.uploadIcon}>+</Text>
      </View>
    </View>
  );
};

export default HomePage;