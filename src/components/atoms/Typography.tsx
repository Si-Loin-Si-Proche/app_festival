import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'quote';
  color?: string;
  style?: TextStyle;
}

export default function Typography({
  children,
  variant = 'body',
  color,
  style,
  ...restProps
}: TypographyProps) {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        color ? { color } : undefined,
        style,
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
  },

  h1: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    marginBottom: 8,
  },

  h2: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginBottom: 6,
  },

  h3: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginBottom: 4,
    lineHeight: 24,
  },

  body: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
  },

  caption: {
    fontFamily: FONTS.regular,
    fontSize: 12,
  },

  quote: {
    fontFamily: FONTS.italic,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
