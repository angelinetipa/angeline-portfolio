import { useEffect, useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

const { width, height } = Dimensions.get('window');

// Floating data node for splash
function DataNode({ x, y, delay, size = 6 }: { x: number; y: number; delay: number; size?: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.7, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);
  return (
    <Animated.View style={[{ position: 'absolute', left: x, top: y, width: size, height: size,
      borderRadius: size / 2, backgroundColor: theme.colors.accent,
      shadowColor: theme.colors.accent, shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8, shadowRadius: 6, elevation: 4,
    }, { opacity, transform: [{ scale }] }]} />
  );
}

function SplashScreen({ onDone }: { onDone: () => void }) {
  const fadeOut = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(barWidth, { toValue: width * 0.5, duration: 900, useNativeDriver: false }),
      Animated.delay(300),
      Animated.timing(fadeOut, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => onDone());
  }, []);

  const nodes = [
    { x: 30, y: 120, delay: 200, size: 5 }, { x: width - 50, y: 180, delay: 350, size: 7 },
    { x: 60, y: height - 200, delay: 150, size: 5 }, { x: width - 70, y: height - 250, delay: 500, size: 6 },
    { x: width / 2 - 80, y: 80, delay: 400, size: 4 }, { x: width / 2 + 60, y: height - 150, delay: 300, size: 5 },
  ];

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: fadeOut, zIndex: 999 }]}>
      <LinearGradient colors={['#EDF5F0', '#E8F2FA', '#EBF4FB']} style={StyleSheet.absoluteFillObject} />
      {nodes.map((n, i) => <DataNode key={i} {...n} />)}
      <View style={splashStyles.center}>
        <Animated.View style={[splashStyles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <LinearGradient colors={theme.gradients.primary} style={splashStyles.logoGradient}>
            <Ionicons name="leaf" size={36} color={theme.colors.white} />
          </LinearGradient>
          <View style={splashStyles.logoBadge}>
            <Ionicons name="analytics" size={12} color={theme.colors.accent} />
          </View>
        </Animated.View>
        <Animated.Text style={[splashStyles.name, { opacity: textOpacity }]}>Angeline</Animated.Text>
        <Animated.Text style={[splashStyles.sub, { opacity: textOpacity }]}>Portfolio · Big Data · Dev</Animated.Text>
        <View style={splashStyles.barBg}>
          <Animated.View style={[splashStyles.barFill, { width: barWidth }]} />
        </View>
      </View>
    </Animated.View>
  );
}

const splashStyles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  logoWrap: { position: 'relative', marginBottom: 8 },
  logoGradient: {
    width: 88, height: 88, borderRadius: 28, alignItems: 'center', justifyContent: 'center',
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5, shadowRadius: 20, elevation: 12,
  },
  logoBadge: {
    position: 'absolute', bottom: -4, right: -4, width: 26, height: 26,
    borderRadius: 13, backgroundColor: theme.colors.white, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: theme.colors.accentLight,
  },
  name: { fontSize: 32, fontWeight: '800', color: theme.colors.text, letterSpacing: -0.5 },
  sub: { fontSize: 14, color: theme.colors.textMuted, letterSpacing: 1 },
  barBg: {
    width: width * 0.5, height: 3, borderRadius: 2,
    backgroundColor: theme.colors.clay, marginTop: 8, overflow: 'hidden',
  },
  barFill: {
    height: '100%', borderRadius: 2,
    backgroundColor: theme.colors.accent,
    shadowColor: theme.colors.accent, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 6,
  },
});

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <>
      <StatusBar style="dark" backgroundColor={theme.colors.bg} />
      <Stack screenOptions={{ headerShown: false }} />
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
    </>
  );
}
