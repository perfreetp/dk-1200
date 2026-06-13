import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const AlbumDetailPage: React.FC = () => {
  return (
    <View className={styles.albumDetailPage}>
      <Text className={styles.placeholderIcon}>📸</Text>
      <Text className={styles.placeholderTitle}>专题详情</Text>
      <Text className={styles.placeholderText}>功能正在开发中...</Text>
    </View>
  );
};

export default AlbumDetailPage;