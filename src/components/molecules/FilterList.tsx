import React from 'react';
import { FlatList, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Tag from '../atoms/Tag';
import { SPACING } from '../../constants/theme';
import { useAppHaptics } from '../../hooks/useAppHaptics';

interface FilterListProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function FilterList({
  options,
  selected,
  onSelect,
  style,
}: FilterListProps) {
  const { selection } = useAppHaptics();
  return (
    <View style={[styles.container, style]}>
      <FlatList
        horizontal
        data={options}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={{ marginRight: 10 }}>
            <Tag
              label={item}
              isSelected={selected === item}
              onPress={() => {
                selection();
                onSelect(item);
              }}
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
