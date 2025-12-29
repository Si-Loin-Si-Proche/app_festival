import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageProps,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Icon from './Icon';

interface RemoteImageProps extends Omit<ImageProps, 'source'> {
  url?: string | null;
  showLoader?: boolean;
}

export default function RemoteImage({
  url,
  style,
  resizeMode = 'cover',
  showLoader = true,
  ...props
}: RemoteImageProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!url || hasError) {
    return (
      <View
        style={[
          styles.container,
          styles.fallbackContainer,
          { backgroundColor: colors.border }, // Adapte le fond gris
          style,
        ]}
      >
        <Icon name="image" size={30} color={colors.tabBarInactive} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card }, style]}>
      <Image
        source={{ uri: url }}
        style={[StyleSheet.absoluteFill, styles.image]}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />

      {isLoading && showLoader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Légèrement assombri pour le contraste
  },
});
