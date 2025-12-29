import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './Icon';
import { MapPoint } from '../../constants/mapData';
import { SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface MapMarkerProps {
  point: MapPoint;
  onPress: (point: MapPoint) => void;
}

export default function MapMarker({ point, onPress }: MapMarkerProps) {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(point)}
      style={[
        styles.container,
        {
          left: point.x,
          top: point.y,
          backgroundColor: point.color,
          borderColor: colors.card,
        },
      ]}
    >
      <Icon name={point.icon} size={sizes.small} color={colors.card} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    ...SHADOWS.medium,
    zIndex: 10,
  },
});
