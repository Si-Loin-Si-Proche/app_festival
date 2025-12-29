import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface LoaderProps {
  color?: string;
  size?: 'small' | 'large';
}

export default function Loader({ color, size = 'large' }: LoaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color || colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
