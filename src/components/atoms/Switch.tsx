import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../constants/theme';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

export default function CustomSwitch({
  value,
  onValueChange,
}: CustomSwitchProps) {
  const [animatedValue] = useState(() => new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.off, COLORS.on],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={styles.container}
    >
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: 15, // Forme pilule
    borderWidth: 2, // Bordure épaisse
    borderColor: COLORS.text,
    justifyContent: 'center',
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11, // Rond parfait
    backgroundColor: COLORS.text,
    position: 'absolute',
  },
});
