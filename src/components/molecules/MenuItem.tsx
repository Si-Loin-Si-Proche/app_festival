import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import CustomSwitch from '../atoms/Switch';
import { SPACING, FONTS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface MenuItemProps {
  label: string;
  type: 'switch' | 'dropdown' | 'link';
  value?: boolean;
  onValueChange?: (val: boolean) => void;
  selectedValue?: string;
  options?: string[];
  isExpanded?: boolean;
  onSelectOption?: (option: string) => void;
  onPress?: () => void;
}

export default function MenuItem({
  label,
  type,
  value,
  onValueChange,
  selectedValue,
  options,
  isExpanded,
  onSelectOption,
  onPress,
}: MenuItemProps) {
  const { colors } = useTheme();

  return (
    <View style={{ zIndex: isExpanded ? 100 : 1 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={type !== 'switch' ? onPress : undefined}
        activeOpacity={type === 'switch' ? 1 : 0.7}
        disabled={type === 'switch'}
      >
        <Typography variant="h2" style={styles.label}>
          {label}
        </Typography>

        <View style={styles.rightContent}>
          {type === 'switch' && value !== undefined && onValueChange && (
            <CustomSwitch value={value} onValueChange={onValueChange} />
          )}

          {type === 'dropdown' && (
            <View
              style={[
                styles.dropdownBox,
                {
                  borderColor: colors.text,
                  backgroundColor: colors.card,
                },
                isExpanded && { backgroundColor: colors.background },
              ]}
            >
              <Typography variant="h2" style={styles.dropdownText}>
                {selectedValue}
              </Typography>
              <View
                style={{
                  transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                }}
              >
                <Icon name="arrowDown" size={18} color={colors.text} />
              </View>
            </View>
          )}

          {type === 'link' && (
            <Icon name="arrowRight" size={24} color={colors.text} />
          )}
        </View>
      </TouchableOpacity>

      {type === 'dropdown' && isExpanded && options && (
        <View
          style={[
            styles.optionsListContainer,
            {
              borderColor: colors.text,
              backgroundColor: colors.card,
            },
          ]}
        >
          {options.map((opt, index) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionItem,
                { borderBottomColor: colors.border },
                index === options.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => onSelectOption && onSelectOption(opt)}
            >
              <Typography variant="body" style={{ fontFamily: FONTS.bold }}>
                {opt}
              </Typography>
              {selectedValue === opt && (
                <Icon
                  name="check"
                  size={22}
                  color={colors.on}
                  strokeWidth={3}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    width: '100%',
  },
  label: { marginBottom: 0 },
  rightContent: { flexDirection: 'row', alignItems: 'center' },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dropdownText: {
    marginBottom: 0,
    fontFamily: FONTS.bold,
  },
  optionsListContainer: {
    borderWidth: 2,
    borderRadius: 12,
    marginTop: -5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
  },
});
