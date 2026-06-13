import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const { currentUser, photos, pets, albums } = useAppStore();

  const favoriteCount = photos.filter(p => p.isFavorite).length;
  const unreadCount = currentUser.notifications.filter(n => !n.isRead).length;

  const menuItems = [
    { icon: '❤️', text: '我的收藏', badge: favoriteCount > 0 ? favoriteCount : null },
    { icon: '🔔', text: '消息通知', badge: unreadCount > 0 ? unreadCount : null },
    { icon: '🎨', text: '生成明信片', badge: null },
    { icon: '📱', text: '九宫格分享', badge: null },
    { icon: '⚙️', text: '设置', badge: null }
  ];

  const handleMenuClick = (text: string) => {
    if (text === '消息通知') {
      Taro.showToast({
        title: '消息功能开发中',
        icon: 'none'
      });
    } else if (text === '我的收藏') {
      Taro.showToast({
        title: '收藏功能开发中',
        icon: 'none'
      });
    } else {
      Taro.showToast({
        title: `${text}功能开发中`,
        icon: 'none'
      });
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
            <Text className={styles.statNum}>{photos.length}</Text>
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
              onClick={() => handleMenuClick(item.text)}
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
    </View>
  );
};

export default MinePage;