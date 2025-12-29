import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from '../atoms/Icon';
import { SPACING, FONTS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

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
  backgroundColor,
  style,
}: SearchBarProps) {
  const { colors, sizes } = useTheme();
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

  const currentBackgroundColor = backgroundColor || colors.secondary;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: currentBackgroundColor,
            borderColor: colors.text,
          },
        ]}
      >
        <View style={styles.leftIcon}>
          <Icon name="search" size={24} color={colors.text} />
        </View>

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: sizes.h3,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          cursorColor={colors.text}
          value={query}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="none"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.rightIcon}
          activeOpacity={0.7}
        >
          <Icon name="arrowRight" size={24} color={colors.text} />
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
    paddingHorizontal: SPACING.m,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: FONTS.regular,
  },
  leftIcon: {
    marginRight: SPACING.s,
  },
  rightIcon: {
    marginLeft: SPACING.s,
  },
});
