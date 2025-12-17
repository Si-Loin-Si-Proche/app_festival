import React, { useState } from 'react';
import { FlatList, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Tag from '../atoms/Tag';
import { SPACING } from '../../constants/theme';

interface FilterListProps {
  // Liste des options
  options: string[];
  // Fonction appelée quand l'utilisateur change de filtre
  selected: string;
  onSelect: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function FilterList({ options, onSelect }: FilterListProps) {
  // On garde en mémoire quel filtre est actif (par défaut le premier)
  const [activeFilter, setActiveFilter] = useState(options[0]);

  const handlePress = (item: string) => {
    setActiveFilter(item);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal // Scroll horizontal
        data={options}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false} // Cache la barre de scroll
        contentContainerStyle={styles.listContent} // Padding autour de la liste
        renderItem={({ item }) => (
          <View style={{ marginRight: 10 }}>
            {/* marginRight crée l'espace entre chaque Tag */}
            <Tag
              label={item}
              isSelected={activeFilter === item}
              onPress={() => handlePress(item)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.s,
  },
  listContent: {
    paddingHorizontal: SPACING.m,
  },
});
