import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppStore } from '@/store/useAppStore';
import PetCard from '@/components/PetCard';
import styles from './index.module.scss';

const PetPage: React.FC = () => {
  const { pets } = useAppStore();

  const handlePetClick = (petId: string) => {
    Taro.navigateTo({
      url: `/pages/pet-detail/index?id=${petId}`
    });
  };

  const handleAddPet = () => {
    Taro.showToast({
      title: '添加宠物功能开发中',
      icon: 'none'
    });
  };

  return (
    <View className={styles.petPage}>
      <View className={styles.header}>
        <Text className={styles.title}>我的宠物</Text>
        <View className={styles.addBtn} onClick={handleAddPet}>
          <Text className={styles.addIcon}>+</Text>
        </View>
      </View>

      <ScrollView scrollY className={styles.scrollView}>
        {pets.length > 0 ? (
          <View className={styles.petList}>
            {pets.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
                onClick={() => handlePetClick(pet.id)}
              />
            ))}
          </View>
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyIcon}>🐾</Text>
            <Text className={styles.emptyText}>还没有添加宠物哦~</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PetPage;