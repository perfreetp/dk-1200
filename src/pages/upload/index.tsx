import React, { useState } from 'react';
import { View, Text, Image, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import { MoodType, moodLabels, moodColors, VisibilityType } from '@/types/photo';
import styles from './index.module.scss';

const filters = [
  { id: 'original', name: '原图' },
  { id: 'warm', name: '暖色' },
  { id: 'cool', name: '冷色' },
  { id: 'vintage', name: '复古' },
  { id: 'bright', name: '明亮' }
];

const defaultTags = ['日常', '萌照', '睡姿', '吃饭', '玩耍', '出游', '生日', '洗澡'];

const UploadPage: React.FC = () => {
  const { pets, addPhoto } = useAppStore();

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([
    'https://picsum.photos/id/237/400/400'
  ]);
  const [selectedFilter, setSelectedFilter] = useState('original');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [visibility, setVisibility] = useState<VisibilityType>('public');

  const moods: MoodType[] = ['happy', 'sleepy', 'playful', 'curious', 'hungry', 'cute'];

  const handleAddPhoto = () => {
    Taro.chooseImage({
      count: 9 - selectedPhotos.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setSelectedPhotos([...selectedPhotos, ...res.tempFilePaths]);
      },
      fail: (err) => {
        console.error('[Upload] 选择图片失败:', err);
      }
    });
  };

  const handleRemovePhoto = (index: number) => {
    setSelectedPhotos(selectedPhotos.filter((_, i) => i !== index));
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleUpload = () => {
    if (selectedPhotos.length === 0) {
      Taro.showToast({
        title: '请先选择照片',
        icon: 'none'
      });
      return;
    }
    if (!selectedPetId) {
      Taro.showToast({
        title: '请选择宠物',
        icon: 'none'
      });
      return;
    }

    const pet = pets.find(p => p.id === selectedPetId);
    
    selectedPhotos.forEach((photoUrl, index) => {
      const newPhoto = {
        id: `new_${Date.now()}_${index}`,
        imageUrl: photoUrl,
        petId: selectedPetId,
        petName: pet?.name || '',
        petAvatar: pet?.avatar || '',
        date,
        location,
        mood: selectedMood || 'happy',
        tags: selectedTags,
        likes: 0,
        isLiked: false,
        isFavorite: false,
        comments: 0,
        visibility
      };
      addPhoto(newPhoto);
    });

    Taro.showToast({
      title: '上传成功',
      icon: 'success'
    });

    setTimeout(() => {
      Taro.switchTab({
        url: '/pages/home/index'
      });
    }, 1500);
  };

  return (
    <View className={styles.uploadPage}>
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>选择照片</Text>
        <View className={styles.photoGrid}>
          {selectedPhotos.map((photo, index) => (
            <View key={index} className={styles.photoItem}>
              <Image src={photo} mode="aspectFill" className={styles.photoImage} />
              <View className={styles.photoRemove} onClick={() => handleRemovePhoto(index)}>
                <Text className={styles.removeIcon}>×</Text>
              </View>
            </View>
          ))}
          {selectedPhotos.length < 9 && (
            <View className={styles.addPhoto} onClick={handleAddPhoto}>
              <Text className={styles.addIcon}>+</Text>
              <Text className={styles.addText}>添加照片</Text>
            </View>
          )}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>滤镜效果</Text>
        <View className={styles.filterList}>
          {filters.map(filter => (
            <View
              key={filter.id}
              className={styles.filterItem}
              onClick={() => setSelectedFilter(filter.id)}
            >
              <Image
                src={selectedPhotos[0] || 'https://picsum.photos/id/237/120/120'}
                mode="aspectFill"
                className={classnames(styles.filterPreview, selectedFilter === filter.id && styles.filterActive)}
              />
              <Text className={styles.filterName}>{filter.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>标记信息</Text>
        
        <View className={styles.formItem}>
          <Text className={styles.formLabel}>选择宠物</Text>
          <View className={styles.petSelector}>
            {pets.map(pet => (
              <View
                key={pet.id}
                className={classnames(styles.petOption, selectedPetId === pet.id && styles.petActive)}
                onClick={() => setSelectedPetId(pet.id)}
              >
                <Image src={pet.avatar} mode="aspectFill" className={styles.petAvatar} />
                <Text className={styles.petName}>{pet.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.formItem}>
          <Text className={styles.formLabel}>日期</Text>
          <Input
            className={styles.input}
            type="text"
            placeholder="选择日期"
            value={date}
            onInput={(e) => setDate(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.formLabel}>地点</Text>
          <Input
            className={styles.input}
            type="text"
            placeholder="添加地点（可选）"
            value={location}
            onInput={(e) => setLocation(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.formLabel}>表情状态</Text>
          <View className={styles.moodSelector}>
            {moods.map(mood => (
              <View
                key={mood}
                className={classnames(styles.moodOption, selectedMood === mood && styles.moodActive)}
                onClick={() => setSelectedMood(mood)}
              >
                <View className={styles.moodDot} style={{ backgroundColor: moodColors[mood] }} />
                <Text className={styles.moodText}>{moodLabels[mood]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.formItem}>
          <Text className={styles.formLabel}>标签</Text>
          <View className={styles.tagSelector}>
            {defaultTags.map(tag => (
              <View
                key={tag}
                className={classnames(styles.tagOption, selectedTags.includes(tag) && styles.tagActive)}
                onClick={() => handleTagSelect(tag)}
              >
                <Text>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>可见范围</Text>
        <View className={styles.visibilitySelector}>
          <View
            className={classnames(styles.visibilityOption, visibility === 'public' && styles.visibilityActive)}
            onClick={() => setVisibility('public')}
          >
            <Text className={styles.visibilityIcon}>🌍</Text>
            <Text className={styles.visibilityText}>公开</Text>
          </View>
          <View
            className={classnames(styles.visibilityOption, visibility === 'family' && styles.visibilityActive)}
            onClick={() => setVisibility('family')}
          >
            <Text className={styles.visibilityIcon}>👨‍👩‍👧</Text>
            <Text className={styles.visibilityText}>家人可见</Text>
          </View>
          <View
            className={classnames(styles.visibilityOption, visibility === 'private' && styles.visibilityActive)}
            onClick={() => setVisibility('private')}
          >
            <Text className={styles.visibilityIcon}>🔒</Text>
            <Text className={styles.visibilityText}>私密</Text>
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button className={styles.uploadButton} onClick={handleUpload}>
          上传照片
        </Button>
      </View>
    </View>
  );
};

export default UploadPage;