import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '../constants/theme';

interface ClayCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'green' | 'sky' | 'stone' | 'white' | 'data';
  elevated?: boolean;
  glow?: 'green' | 'blue' | 'none';
}

export function ClayCard({ children, style, variant = 'white', elevated = false, glow = 'none' }: ClayCardProps) {
  const gradients: Record<string, [string, string]> = {
    green: ['rgba(107,165,131,0.18)', 'rgba(61,122,90,0.08)'],
    sky:   ['rgba(85,180,211,0.18)', 'rgba(42,127,175,0.08)'],
    stone: ['rgba(240,234,226,1)',   'rgba(230,222,212,1)'],
    white: ['rgba(255,255,255,0.98)','rgba(245,250,247,0.95)'],
    data:  ['rgba(26,95,138,0.15)',  'rgba(42,157,143,0.08)'],
  };

  const glowStyle = glow === 'green'
    ? { shadowColor: theme.colors.primary, shadowOpacity: 0.4, shadowRadius: 18, elevation: 10 }
    : glow === 'blue'
    ? { shadowColor: theme.colors.accent, shadowOpacity: 0.4, shadowRadius: 18, elevation: 10 }
    : {};

  return (
    <View style={[styles.wrap, elevated && styles.elevated, glowStyle, style]}>
      <LinearGradient colors={gradients[variant]} style={styles.gradient}>
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.75)',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  elevated: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
  gradient: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
});