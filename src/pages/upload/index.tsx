import React, { useState } from 'react';
import { View, Text, Image, Input, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import { MoodType, VisibilityType, FilterType, moodLabels, moodColors } from '@/types/photo';
import styles from './index.module.scss';

const filters: { id: FilterType; name: string }[] = [
  { id: 'original', name: '原图' },
  { id: 'warm', name: '暖色' },
  { id: 'cool', name: '冷色' },
  { id: 'vintage', name: '复古' },
  { id: 'bright', name: '明亮' }
];

const defaultTags = ['日常', '萌照', '睡姿', '吃饭', '玩耍', '出游', '生日', '洗澡'];

interface PhotoEditState {
  filter: FilterType;
  cropped: boolean;
}

const UploadPage: React.FC = () => {
  const { pets, addPhoto } = useAppStore();

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(['https://picsum.photos/id/237/400/400']);
  const [photoEdits, setPhotoEdits] = useState<Record<string, PhotoEditState>>({});
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [visibility, setVisibility] = useState<VisibilityType>('public');
  const [showCropModal, setShowCropModal] = useState(false);
  const [currentCropIndex, setCurrentCropIndex] = useState(0);

  const moods: MoodType[] = ['happy', 'sleepy', 'playful', 'curious', 'hungry', 'cute'];

  const handleAddPhoto = () => {
    Taro.chooseImage({
      count: 9 - selectedPhotos.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newPhotos = res.tempFilePaths;
        setSelectedPhotos([...selectedPhotos, ...newPhotos]);
        const newEdits: Record<string, PhotoEditState> = {};
        newPhotos.forEach(photo => {
          newEdits[photo] = { filter: 'original', cropped: false };
        });
        setPhotoEdits(prev => ({ ...prev, ...newEdits }));
      },
      fail: (err) => {
        console.error('[Upload] 选择图片失败:', err);
      }
    });
  };

  const handleRemovePhoto = (index: number) => {
    const photoUrl = selectedPhotos[index];
    setSelectedPhotos(selectedPhotos.filter((_, i) => i !== index));
    const newEdits = { ...photoEdits };
    delete newEdits[photoUrl];
    setPhotoEdits(newEdits);
  };

  const handleFilterChange = (index: number, filter: FilterType) => {
    const photoUrl = selectedPhotos[index];
    setPhotoEdits(prev => ({
      ...prev,
      [photoUrl]: { ...(prev[photoUrl] || { filter: 'original', cropped: false }), filter }
    }));
  };

  const handleCropStart = (index: number) => {
    setCurrentCropIndex(index);
    setShowCropModal(true);
  };

  const handleCropConfirm = () => {
    const photoUrl = selectedPhotos[currentCropIndex];
    setPhotoEdits(prev => ({
      ...prev,
      [photoUrl]: { ...(prev[photoUrl] || { filter: 'original', cropped: false }), cropped: true }
    }));
    setShowCropModal(false);
    Taro.showToast({ title: '裁剪完成', icon: 'success' });
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
      Taro.showToast({ title: '请先选择照片', icon: 'none' });
      return;
    }
    if (!selectedPetId) {
      Taro.showToast({ title: '请选择宠物', icon: 'none' });
      return;
    }

    const pet = pets.find(p => p.id === selectedPetId);
    
    selectedPhotos.forEach((photoUrl, index) => {
      const edit = photoEdits[photoUrl] || { filter: 'original', cropped: false };
      const newPhoto = {
        id: `new_${Date.now()}_${index}`,
        imageUrl: photoUrl,
        filter: edit.filter,
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
        comments: [],
        commentsCount: 0,
        visibility,
        createdAt: new Date().toISOString()
      };
      addPhoto(newPhoto);
    });

    Taro.showToast({ title: '上传成功', icon: 'success' });

    setTimeout(() => {
      Taro.switchTab({ url: '/pages/home/index' });
    }, 1500);
  };

  return (
    <View className={styles.uploadPage}>
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>选择照片</Text>
        <View className={styles.photoGrid}>
          {selectedPhotos.map((photo, index) => {
            const edit = photoEdits[photo] || { filter: 'original', cropped: false };
            return (
              <View key={index} className={styles.photoItem}>
                <Image src={photo} mode="aspectFill" className={styles.photoImage} />
                <View className={styles.photoActions}>
                  <View className={styles.actionBtn} onClick={() => handleCropStart(index)}>
                    <Text className={styles.actionIcon}>✂️</Text>
                  </View>
                  <View className={styles.actionBtn} onClick={() => handleRemovePhoto(index)}>
                    <Text className={styles.actionIcon}>×</Text>
                  </View>
                </View>
                {edit.filter !== 'original' && (
                  <View className={styles.filterBadge}>
                    <Text className={styles.filterBadgeText}>{filters.find(f => f.id === edit.filter)?.name}</Text>
                  </View>
                )}
                {edit.cropped && (
                  <View className={styles.cropBadge}>
                    <Text className={styles.cropBadgeText}>已裁剪</Text>
                  </View>
                )}
              </View>
            );
          })}
          {selectedPhotos.length < 9 && (
            <View className={styles.addPhoto} onClick={handleAddPhoto}>
              <Text className={styles.addIcon}>+</Text>
              <Text className={styles.addText}>添加照片</Text>
            </View>
          )}
        </View>
      </View>

      {selectedPhotos.length > 0 && (
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>滤镜效果</Text>
          <ScrollView scrollX className={styles.filterScroll}>
            <View className={styles.filterList}>
              {selectedPhotos.map((photo, photoIndex) => (
                <View key={photoIndex} className={styles.filterGroup}>
                  <Image src={photo} mode="aspectFill" className={styles.filterPreview} />
                  <View className={styles.filterOptions}>
                    {filters.map(filter => {
                      const edit = photoEdits[photo] || { filter: 'original', cropped: false };
                      return (
                        <View
                          key={filter.id}
                          className={classnames(styles.filterOption, edit.filter === filter.id && styles.filterActive)}
                          onClick={() => handleFilterChange(photoIndex, filter.id)}
                        >
                          <Text className={styles.filterOptionText}>{filter.name}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

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
          上传照片 ({selectedPhotos.length})
        </Button>
      </View>

      {showCropModal && (
        <View className={styles.cropModal} onClick={() => setShowCropModal(false)}>
          <View className={styles.cropContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.cropTitle}>裁剪照片</Text>
            <View className={styles.cropImageContainer}>
              <Image src={selectedPhotos[currentCropIndex]} mode="aspectFit" className={styles.cropImage} />
              <View className={styles.cropFrame}></View>
            </View>
            <View className={styles.cropActions}>
              <Button className={styles.cropBtn} onClick={() => setShowCropModal(false)}>取消</Button>
              <Button className={styles.cropBtn} onClick={handleCropConfirm}>确定裁剪</Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default UploadPage;