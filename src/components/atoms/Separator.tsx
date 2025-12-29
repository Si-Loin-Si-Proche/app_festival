import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SeparatorProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
}

export default function Separator({
  color,
  thickness = StyleSheet.hairlineWidth,
  marginVertical = 15,
}: SeparatorProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: color || colors.text,
          height: thickness,
          marginVertical: marginVertical,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});
