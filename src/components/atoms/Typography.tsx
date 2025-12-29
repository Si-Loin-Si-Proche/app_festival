import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  TextProps,
  StyleProp,
} from 'react-native';
import { FONTS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'quote';
  color?: string;
  style?: StyleProp<TextStyle>;
}

export default function Typography({
  children,
  variant = 'body',
  color,
  style,
  ...restProps
}: TypographyProps) {
  const { colors, sizes } = useTheme();
  const getFontSize = () => {
    switch (variant) {
      case 'h1':
        return sizes.h1;
      case 'h2':
        return sizes.h2;
      case 'h3':
        return sizes.h3;
      case 'body':
        return sizes.body;
      case 'quote':
        return sizes.body;
      case 'caption':
        return sizes.small;
      default:
        return sizes.body;
    }
  };
  const dynamicStyle: TextStyle = {
    color: color || colors.text,
    fontSize: getFontSize(),
  };

  return (
    <Text
      style={[styles.base, styles[variant], dynamicStyle, style]}
      {...restProps}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: FONTS.regular,
  },
  h1: {
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  h2: {
    fontFamily: FONTS.bold,
    marginBottom: 6,
  },
  h3: {
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  body: {
    lineHeight: 24,
  },
  caption: {},
  quote: {
    fontStyle: 'italic',
  },
});
