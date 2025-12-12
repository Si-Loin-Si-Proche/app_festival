import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from '../atoms/Icon';
import { COLORS, SIZES, SPACING, FONTS } from '../../constants/theme';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export default function SearchBar({
  onSearch,
  onChangeText,
  placeholder = 'Recherche...',
  backgroundColor = COLORS.secondary,
  style,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleTextChange = (text: string) => {
    setQuery(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.inputContainer, { backgroundColor: backgroundColor }]}
      >
        {/* 1. Icône Loupe */}
        <View style={styles.leftIcon}>
          <Icon name="search" size={24} color={COLORS.text} />
        </View>

        {/* 2. Champ Texte */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text}
          cursorColor={COLORS.text}
          value={query}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="none"
        />

        {/* 3. Bouton Flèche */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.rightIcon}
          activeOpacity={0.7}
        >
          <Icon name="arrowRight" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.m,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.text,
    paddingHorizontal: SPACING.m,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.text,
  },
  leftIcon: {
    marginRight: SPACING.s,
  },
  rightIcon: {
    marginLeft: SPACING.s,
  },
});
