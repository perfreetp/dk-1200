import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppStore } from '@/store/useAppStore';
import { notificationLabels } from '@/types/user';
import { FilterType } from '@/types/photo';
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

const MinePage: React.FC = () => {
  const { currentUser, getVisiblePhotos, pets, albums } = useAppStore();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPostcardModal, setShowPostcardModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [generatedPostcard, setGeneratedPostcard] = useState<string>('');

  const visiblePhotos = getVisiblePhotos();
  
  const favoriteCount = visiblePhotos.filter(p => p.isFavorite).length;
  const unreadCount = currentUser.notifications.filter(n => !n.isRead).length;

  const menuItems = [
    { icon: '❤️', text: '我的收藏', badge: favoriteCount > 0 ? favoriteCount : null, action: () => handleFavorites() },
    { icon: '🔔', text: '消息通知', badge: unreadCount > 0 ? unreadCount : null, action: () => setShowNotificationModal(true) },
    { icon: '🎨', text: '生成明信片', badge: null, action: () => setShowPostcardModal(true) },
    { icon: '📱', text: '九宫格分享', badge: null, action: () => setShowShareModal(true) },
    { icon: '⚙️', text: '设置', badge: null, action: () => handleSettings() }
  ];

  const handleFavorites = () => {
    const favorites = visiblePhotos.filter(p => p.isFavorite);
    if (favorites.length === 0) {
      Taro.showToast({ title: '暂无收藏', icon: 'none' });
      return;
    }
    Taro.showToast({ title: '收藏列表功能开发中', icon: 'none' });
  };

  const handleSettings = () => {
    Taro.showToast({ title: '设置功能开发中', icon: 'none' });
  };

  const handleNotificationClick = (notificationId: string) => {
    Taro.showToast({ title: '查看通知详情', icon: 'none' });
  };

  const handleShareGenerate = () => {
    if (selectedPhotos.length === 0) {
      Taro.showToast({ title: '请选择照片', icon: 'none' });
      return;
    }
    Taro.showToast({ title: '九宫格生成成功', icon: 'success' });
    setShowShareModal(false);
    setSelectedPhotos([]);
  };

  const handlePostcardGenerate = () => {
    if (!selectedPetId) {
      Taro.showToast({ title: '请选择宠物', icon: 'none' });
      return;
    }
    const pet = pets.find(p => p.id === selectedPetId);
    const petPhotos = visiblePhotos.filter(p => p.petId === selectedPetId);
    const recentPhotos = petPhotos.slice(0, 4).map(p => p.imageUrl);
    
    setGeneratedPostcard(`生成的明信片: ${pet?.name}的成长记录`);
    Taro.showToast({ title: '明信片生成成功', icon: 'success' });
  };

  const handlePhotoSelect = (photoUrl: string) => {
    if (selectedPhotos.includes(photoUrl)) {
      setSelectedPhotos(selectedPhotos.filter(p => p !== photoUrl));
    } else if (selectedPhotos.length < 9) {
      setSelectedPhotos([...selectedPhotos, photoUrl]);
    } else {
      Taro.showToast({ title: '最多选择9张', icon: 'none' });
    }
  };

  return (
    <View className={styles.minePage}>
      <View className={styles.header}>
        <View className={styles.userInfo}>
          <Image src={currentUser.avatar} mode="aspectFill" className={styles.avatar} />
          <Text className={styles.name}>{currentUser.name}</Text>
        </View>
        
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{pets.length}</Text>
            <Text className={styles.statLabel}>宠物</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{visiblePhotos.length}</Text>
            <Text className={styles.statLabel}>照片</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{albums.length}</Text>
            <Text className={styles.statLabel}>相册</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{currentUser.familyMembers.length}</Text>
            <Text className={styles.statLabel}>家人</Text>
          </View>
        </View>
      </View>

      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.section}>
          {menuItems.map((item, index) => (
            <View
              key={index}
              className={styles.menuItem}
              onClick={item.action}
            >
              <View className={styles.menuLeft}>
                <Text className={styles.menuIcon}>{item.icon}</Text>
                <Text className={styles.menuText}>{item.text}</Text>
              </View>
              <View className={styles.menuRight}>
                {item.badge && (
                  <Text className={styles.notificationBadge}>{item.badge}</Text>
                )}
                <Text className={styles.menuArrow}>›</Text>
              </View>
            </View>
          ))}
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>家庭成员</Text>
          <View className={styles.familySection}>
            <View className={styles.familyList}>
              {currentUser.familyMembers.map(member => (
                <View key={member.id} className={styles.familyItem}>
                  <Image src={member.avatar} mode="aspectFill" className={styles.familyAvatar} />
                  <Text className={styles.familyName}>{member.name}</Text>
                  <Text className={styles.familyRelation}>{member.relation}</Text>
                </View>
              ))}
              <View className={styles.familyItem}>
                <View className={styles.addFamily}>
                  <Text className={styles.addFamilyIcon}>+</Text>
                </View>
                <Text className={styles.familyName}>邀请</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {showNotificationModal && (
        <View className={styles.modal} onClick={() => setShowNotificationModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>消息通知</Text>
            {currentUser.notifications.length > 0 ? (
              <ScrollView scrollY className={styles.notificationList}>
                {currentUser.notifications.map(notification => (
                  <View
                    key={notification.id}
                    className={styles.notificationItem}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <View className={styles.notificationIcon}>
                      {notification.type === 'like' && <Text>❤️</Text>}
                      {notification.type === 'comment' && <Text>💬</Text>}
                      {notification.type === 'remind' && <Text>🔔</Text>}
                      {notification.type === 'invite' && <Text>👋</Text>}
                    </View>
                    <View className={styles.notificationContent}>
                      <Text className={styles.notificationTitle}>{notification.title}</Text>
                      <Text className={styles.notificationText}>{notification.content}</Text>
                      <Text className={styles.notificationTime}>{notification.createdAt}</Text>
                    </View>
                    {!notification.isRead && (
                      <View className={styles.notificationDot}></View>
                    )}
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View className={styles.emptyNotifications}>
                <Text className={styles.emptyIcon}>🔔</Text>
                <Text className={styles.emptyText}>暂无消息</Text>
              </View>
            )}
            <View className={styles.modalClose} onClick={() => setShowNotificationModal(false)}>关闭</View>
          </View>
        </View>
      )}

      {showShareModal && (
        <View className={styles.modal} onClick={() => setShowShareModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>生成九宫格</Text>
            <Text className={styles.modalSubtitle}>选择要分享的照片（最多9张）</Text>
            <ScrollView scrollY className={styles.photoSelectList}>
              <View className={styles.photoSelectGrid}>
                {visiblePhotos.slice(0, 18).map(photo => (
                  <View
                    key={photo.id}
                    className={classnames(styles.photoSelectItem, selectedPhotos.includes(photo.imageUrl) && styles.photoSelected)}
                    onClick={() => handlePhotoSelect(photo.imageUrl)}
                  >
                    <Image src={photo.imageUrl} mode="aspectFill" className={styles.photoSelectImage} style={getFilterStyle(photo.filter)} />
                    {selectedPhotos.includes(photo.imageUrl) && (
                      <View className={styles.photoSelectCheck}>✓</View>
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className={styles.modalActions}>
              <View className={styles.modalBtn} onClick={() => setShowShareModal(false)}>取消</View>
              <View className={styles.modalBtn} onClick={handleShareGenerate}>生成 ({selectedPhotos.length}/9)</View>
            </View>
          </View>
        </View>
      )}

      {showPostcardModal && (
        <View className={styles.modal} onClick={() => setShowPostcardModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>生成成长明信片</Text>
            <Text className={styles.modalSubtitle}>选择宠物</Text>
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
            {selectedPetId && (
              <View className={styles.postcardPreview}>
                <Text className={styles.previewTitle}>预览</Text>
                <View className={styles.postcardTemplate}>
                  <Text className={styles.postcardTitle}>{pets.find(p => p.id === selectedPetId)?.name}的成长记录</Text>
                  <View className={styles.postcardPhotos}>
                    {visiblePhotos.filter(p => p.petId === selectedPetId).slice(0, 4).map((photo, index) => (
                      <Image key={index} src={photo.imageUrl} mode="aspectFill" className={styles.postcardImage} style={getFilterStyle(photo.filter)} />
                    ))}
                  </View>
                  <Text className={styles.postcardDate}>{new Date().toISOString().split('T')[0]}</Text>
                </View>
              </View>
            )}
            <View className={styles.modalActions}>
              <View className={styles.modalBtn} onClick={() => setShowPostcardModal(false)}>取消</View>
              <View className={styles.modalBtn} onClick={handlePostcardGenerate}>生成明信片</View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MinePage;