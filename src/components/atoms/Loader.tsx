import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface LoaderProps {
  color?: string;
  size?: 'small' | 'large';
}

export default function Loader({
  color = COLORS.primary,
  size = 'large',
}: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
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
