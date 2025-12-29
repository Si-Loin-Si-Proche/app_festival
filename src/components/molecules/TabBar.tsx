import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from '../atoms/Icon';
import { SHADOWS } from '../../constants/theme';
import { IconName } from '../../constants/icons';
import { useTheme } from '../../context/ThemeContext';

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();

  const icons: Record<string, IconName> = {
    index: 'house',
    infos: 'info',
    programmation: 'calendar',
    reglages: 'settings',
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.filtreSelected,
          borderColor: colors.text,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        if (
          ['_sitemap', '+not-found'].includes(route.name) ||
          !icons[route.name]
        ) {
          return null;
        }
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Icon
              name={icons[route.name] || 'info'}
              size={28}
              color={colors.text}
              strokeWidth={isFocused ? 3 : 2}
              opacity={isFocused ? 1 : 0.7}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    height: 65,
    ...SHADOWS.medium,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
