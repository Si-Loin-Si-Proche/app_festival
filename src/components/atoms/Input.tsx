import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from './Icon';
import { IconName } from '../../constants/icons';
import { FONTS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: InputProps) {
  const { colors, sizes } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : isFocused
      ? colors.primary
      : colors.tabBarInactive;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[styles.label, { color: colors.text, fontSize: sizes.body }]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          { borderColor, backgroundColor: colors.card },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            <Icon name={leftIcon} size={20} color={colors.textLight} />
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: sizes.h3,
            },
          ]}
          placeholderTextColor={colors.textLight}
          cursorColor={colors.primary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.rightIcon}
          >
            <Icon name={rightIcon} size={20} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text
          style={[
            styles.errorText,
            { color: colors.error, fontSize: sizes.small },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
    width: '100%',
  },
  label: {
    fontFamily: FONTS.bold,
    marginBottom: SPACING.s,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: SPACING.m,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: FONTS.regular,
  },
  leftIcon: {
    marginRight: SPACING.s,
  },
  rightIcon: {
    marginLeft: SPACING.s,
  },
  errorText: {
    marginTop: SPACING.xs,
    fontFamily: FONTS.regular,
  },
});
