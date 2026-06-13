import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import { Pet } from '@/types/pet';
import { MoodType, moodLabels } from '@/types/photo';
import styles from './index.module.scss';

interface FilterBarProps {
  pets: Pet[];
  selectedPetId: string | null;
  selectedMood: MoodType | null;
  selectedTag: string | null;
  tags: string[];
  onPetSelect: (petId: string | null) => void;
  onMoodSelect: (mood: MoodType | null) => void;
  onTagSelect: (tag: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  pets,
  selectedPetId,
  selectedMood,
  selectedTag,
  tags,
  onPetSelect,
  onMoodSelect,
  onTagSelect
}) => {
  const moods: MoodType[] = ['happy', 'sleepy', 'playful', 'curious', 'hungry', 'cute'];

  return (
    <View className={styles.filterBar}>
      <ScrollView scrollX className={styles.scrollContainer}>
        <View className={styles.scrollContent}>
          <View
            className={classnames(styles.filterItem, !selectedPetId && !selectedMood && !selectedTag && styles.active)}
            onClick={() => {
              onPetSelect(null);
              onMoodSelect(null);
              onTagSelect(null);
            }}
          >
            <Text className={styles.filterText}>全部</Text>
          </View>
          
          {pets.map(pet => (
            <View
              key={pet.id}
              className={classnames(styles.filterItem, styles.petItem, selectedPetId === pet.id && styles.active)}
              onClick={() => onPetSelect(selectedPetId === pet.id ? null : pet.id)}
            >
              <Text className={styles.filterText}>{pet.name}</Text>
            </View>
          ))}
          
          {moods.map(mood => (
            <View
              key={mood}
              className={classnames(styles.filterItem, styles.moodItem, selectedMood === mood && styles.active)}
              onClick={() => onMoodSelect(selectedMood === mood ? null : mood)}
            >
              <Text className={styles.filterText}>{moodLabels[mood]}</Text>
            </View>
          ))}
          
          {tags.map(tag => (
            <View
              key={tag}
              className={classnames(styles.filterItem, styles.tagItem, selectedTag === tag && styles.active)}
              onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
            >
              <Text className={styles.filterText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterBar;