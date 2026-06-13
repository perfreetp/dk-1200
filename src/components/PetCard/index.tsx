import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Pet, petTypeLabels } from '@/types/pet';
import styles from './index.module.scss';

interface PetCardProps {
  pet: Pet;
  onClick?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onClick }) => {
  return (
    <View className={styles.petCard} onClick={onClick}>
      <View className={styles.header}>
        <Image src={pet.avatar} mode="aspectFill" className={styles.avatar} />
        <View className={styles.info}>
          <Text className={styles.name}>{pet.name}</Text>
          <Text className={styles.breed}>{pet.breed}</Text>
          <View className={styles.tags}>
            <Text className={styles.tag}>{petTypeLabels[pet.type]}</Text>
            <Text className={styles.tag}>{pet.age}</Text>
            <Text className={styles.tag}>{pet.gender === 'male' ? '♂' : '♀'}</Text>
          </View>
        </View>
      </View>
      
      <View className={styles.stats}>
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{pet.photoCount}</Text>
          <Text className={styles.statLabel}>照片</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{pet.albums}</Text>
          <Text className={styles.statLabel}>相册</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{pet.familyMembers.length}</Text>
          <Text className={styles.statLabel}>家人</Text>
        </View>
      </View>
      
      {pet.description && (
        <Text className={styles.description}>{pet.description}</Text>
      )}
    </View>
  );
};

export default PetCard;