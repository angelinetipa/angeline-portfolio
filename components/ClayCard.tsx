import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../constants/theme';

interface ClayCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'green' | 'sky' | 'stone' | 'white';
  elevated?: boolean;
}

export function ClayCard({ children, style, variant = 'white', elevated = false }: ClayCardProps) {
  const bgMap = {
    green: theme.colors.clay,
    sky: theme.colors.claySky,
    stone: theme.colors.stoneLight,
    white: theme.colors.white,
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: bgMap[variant] },
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  elevated: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
});
