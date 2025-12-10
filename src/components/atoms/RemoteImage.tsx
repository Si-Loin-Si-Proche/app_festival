import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageProps,
} from 'react-native';
import { COLORS } from '../../constants/theme';
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!url || hasError) {
    return (
      <View style={[styles.container, styles.fallbackContainer, style]}>
        <Icon name="image" size={30} color={COLORS.tabBarInactive} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
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
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E1E1',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
