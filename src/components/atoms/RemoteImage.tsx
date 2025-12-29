import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Image, ImageStyle, ImageContentFit } from 'expo-image';
import { useTheme } from '../../context/ThemeContext';
import Icon from './Icon';

interface RemoteImageProps {
  url?: string | null;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  showLoader?: boolean;
}

export default function RemoteImage({
  url,
  style,
  resizeMode = 'cover',
  showLoader = true,
}: RemoteImageProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getContentFit = (): ImageContentFit => {
    switch (resizeMode) {
      case 'stretch':
        return 'fill';
      case 'center':
        return 'none';
      default:
        return resizeMode as ImageContentFit;
    }
  };

  if (!url || hasError) {
    return (
      <View
        style={[
          styles.container,
          styles.fallbackContainer,
          { backgroundColor: colors.border },
          style as StyleProp<ViewStyle>,
        ]}
      >
        <Icon name="image" size={30} color={colors.tabBarInactive} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card },
        style as StyleProp<ViewStyle>,
      ]}
    >
      <Image
        source={url}
        style={[StyleSheet.absoluteFill, styles.image]}
        contentFit={getContentFit()}
        cachePolicy="disk"
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
