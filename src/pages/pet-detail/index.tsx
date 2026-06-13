import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const PetDetailPage: React.FC = () => {
  return (
    <View className={styles.petDetailPage}>
      <Text className={styles.placeholderIcon}>🐾</Text>
      <Text className={styles.placeholderTitle}>宠物详情</Text>
      <Text className={styles.placeholderText}>功能正在开发中...</Text>
    </View>
  );
};

export default PetDetailPage;