import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  TextProps,
  StyleProp,
} from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';

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
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        color ? { color } : undefined,
        // 3. React Native gère maintenant l'aplatissement du tableau automatiquement
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
  h1: { fontSize: 32, fontFamily: FONTS.bold, marginBottom: 8 },
  h2: { fontSize: 24, fontFamily: FONTS.bold, marginBottom: 6 },
  h3: { fontSize: 20, fontFamily: FONTS.bold, marginBottom: 4 },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 12 },
  quote: { fontSize: 16, fontStyle: 'italic' },
});
