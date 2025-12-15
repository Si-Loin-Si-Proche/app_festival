import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from './Icon';
import { MapPoint } from '../../constants/mapData';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

interface MapMarkerProps {
  point: MapPoint;
  onPress: (point: MapPoint) => void;
}

export default function MapMarker({ point, onPress }: MapMarkerProps) {
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
        },
      ]}
    >
      <Icon name={point.icon} size={SIZES.small} color={COLORS.card} />
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
    borderColor: COLORS.card,
    ...SHADOWS.medium,
    zIndex: 10,
  },
});
