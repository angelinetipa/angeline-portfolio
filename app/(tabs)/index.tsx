import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated,
  Dimensions, TouchableOpacity, Linking, BackHandler,
  Platform, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { profile } from '../../constants/data';

const { width, height } = Dimensions.get('window');

// ─── Animated data node (floating dot)
function DataNode({ x, y, size, color, duration, delay }: {
  x: number; y: number; size: number; color: string; duration: number; delay: number;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -14] });
  const opacity    = anim.interpolate({ inputRange: [0, 0.3, 0.7, 1], outputRange: [0.3, 0.7, 0.7, 0.3] });
  return (
    <Animated.View style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: color, opacity,
      transform: [{ translateY }],
      shadowColor: color, shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.9, shadowRadius: size,
    }} />
  );
}

// ─── Animated connection line between two nodes
function DataLine({ x1, y1, x2, y2, delay }: { x1:number; y1:number; x2:number; y2:number; delay:number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 2400, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 2400, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.05, 0.25, 0.05] });
  return (
    <Animated.View style={{
      position: 'absolute', left: x1, top: y1,
      width: len, height: 1,
      backgroundColor: theme.colors.accent,
      opacity,
      transform: [{ rotate: `${angle}deg` }, { translateX: len / 2 - len / 2 }],
      transformOrigin: '0% 50%',
    }} />
  );
}

const nodes = [
  { x: 30,      y: 60,        size: 8,  color: theme.colors.accent,    duration: 3000, delay: 0    },
  { x: width-50,y: 90,        size: 6,  color: theme.colors.primary,   duration: 3600, delay: 600  },
  { x: 60,      y: 260,       size: 5,  color: theme.colors.dataTeal,  duration: 2800, delay: 1200 },
  { x: width-70,y: 280,       size: 9,  color: theme.colors.accent,    duration: 4000, delay: 300  },
  { x: width/2-40, y: 40,     size: 5,  color: theme.colors.dataSky,   duration: 3200, delay: 900  },
  { x: width/2+60, y: 310,    size: 6,  color: theme.colors.primary,   duration: 2600, delay: 1500 },
];

const lines = [
  { x1: 38, y1: 64, x2: width-44, y2: 93 },
  { x1: 65, y1: 263, x2: width/2-37, y2: 44 },
  { x1: width-64, y1: 284, x2: width/2+63, y2: 313 },
];

const quickLinks = [
  { label: 'About',    icon: 'person'         as const, route: '/about',    grad: theme.gradients.primary },
  { label: 'Projects', icon: 'code-slash'     as const, route: '/projects', grad: theme.gradients.accent  },
  { label: 'Creative', icon: 'color-palette'  as const, route: '/creative', grad: theme.gradients.primary },
  { label: 'Connect',  icon: 'paper-plane'    as const, route: '/connect',  grad: theme.gradients.accent  },
];

// ─── Floating Exit Button
function FloatingExit() {
  const lastBack = useRef(0);
  const scale = useRef(new Animated.Value(1)).current;

  const onPress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scale,  { toValue: 1, tension: 200, friction: 6, useNativeDriver: true }),
    ]).start();
    if (Platform.OS === 'android') {
      const now = Date.now();
      if (now - lastBack.current < 2000) { BackHandler.exitApp(); return; }
      lastBack.current = now;
      Alert.alert('', 'Press again to exit', [{ text: 'OK' }], { cancelable: true });
    } else {
      Alert.alert('Exit', 'Close the app from your home screen.', [{ text: 'OK' }]);
    }
  };

  return (
    <Animated.View style={[fab.wrap, { transform: [{ scale }] }]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <LinearGradient colors={['#5c5c6e', '#2e2e3a']} style={fab.btn}>
          <Ionicons name="power-outline" size={20} color={theme.colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const fab = StyleSheet.create({
  wrap: {
    position: 'absolute', bottom: 96, right: 20, zIndex: 50,
    shadowColor: '#2e2e3a', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 14, elevation: 12,
  },
  btn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});

// ─── Main Screen
export default function HomeScreen() {
  const router   = useRouter();
  const fade     = useRef(new Animated.Value(0)).current;
  const slideY   = useRef(new Animated.Value(36)).current;
  const photoSc  = useRef(new Animated.Value(0.78)).current;
  const badgeBob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,   { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideY, { toValue: 0, tension: 50, friction: 9, useNativeDriver: true }),
      Animated.spring(photoSc,{ toValue: 1, tension: 45, friction: 8, useNativeDriver: true }),
    ]).start(() => {
      Animated.loop(Animated.sequence([
        Animated.timing(badgeBob, { toValue: -5, duration: 1400, useNativeDriver: true }),
        Animated.timing(badgeBob, { toValue:  0, duration: 1400, useNativeDriver: true }),
      ])).start();
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Full-screen seamless gradient background */}
      <LinearGradient
        colors={['#E8F4EC', '#EBF4FB', '#E4EEF8', '#ECF5F0']}
        locations={[0, 0.35, 0.65, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Animated data network */}
      {lines.map((l, i) => <DataLine key={i} {...l} delay={i * 400} />)}
      {nodes.map((n, i) => <DataNode key={i} {...n} />)}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── PHOTO ── */}
        <Animated.View style={[styles.photoWrap, { transform: [{ scale: photoSc }] }]}>
          <View style={styles.glowRing} />
          <LinearGradient colors={theme.gradients.primary} style={styles.photo}>
            <Text style={styles.photoLetter}>A</Text>
            {/* TODO: replace with:
            <Image source={require('../../assets/hero.jpg')} style={styles.photoImg} /> */}
          </LinearGradient>

          <Animated.View style={[styles.badge, { transform: [{ translateY: badgeBob }] }]}>
            <Ionicons name="briefcase-outline" size={11} color={theme.colors.primary} />
            <Text style={styles.badgeText}>Open to Work</Text>
          </Animated.View>

          <View style={styles.dataBadge}>
            <Ionicons name="analytics" size={11} color={theme.colors.accent} />
            <Text style={styles.dataBadgeText}>Big Data</Text>
          </View>
        </Animated.View>

        {/* ── NAME + TAGLINE ── */}
        <Animated.View style={[styles.textBlock, { opacity: fade, transform: [{ translateY: slideY }] }]}>
          <Text style={styles.hi}>Hello, I'm</Text>
          <Text style={styles.name}>Angeline<Text style={{ color: theme.colors.accent }}> ✦</Text></Text>
          <Text style={styles.tagline}>{profile.tagline}</Text>
          <View style={styles.schoolRow}>
            <Ionicons name="school-outline" size={12} color={theme.colors.textMuted} />
            <Text style={styles.school}>PUP Sta. Mesa · BS CompE (Big Data)</Text>
          </View>
        </Animated.View>

        {/* ── CTA ── */}
        <Animated.View style={[styles.ctaRow, { opacity: fade }]}>
          <TouchableOpacity onPress={() => router.push('/projects')} activeOpacity={0.85}>
            <LinearGradient colors={theme.gradients.primary} style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>See My Work</Text>
              <Ionicons name="arrow-forward" size={15} color={theme.colors.white} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => Linking.openURL(profile.github)} activeOpacity={0.85}>
            <Ionicons name="logo-github" size={17} color={theme.colors.primary} />
            <Text style={styles.btnSecondaryText}>GitHub</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── EXPLORE ── */}
        <Animated.View style={[styles.exploreBlock, { opacity: fade }]}>
          <Text style={styles.exploreLabel}>EXPLORE</Text>
          <View style={styles.grid}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.label}
                style={styles.gridItem}
                onPress={() => router.push(link.route as any)}
                activeOpacity={0.82}
              >
                {/* Single gradient surface — no nested boxes */}
                <LinearGradient
                  colors={['rgba(255,255,255,0.82)', 'rgba(240,248,252,0.75)']}
                  style={styles.gridCard}
                >
                  <LinearGradient colors={link.grad} style={styles.gridIconCircle}>
                    <Ionicons name={link.icon} size={20} color={theme.colors.white} />
                  </LinearGradient>
                  <Text style={styles.gridLabel}>{link.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ── QUOTE ── */}
        <Animated.View style={[styles.quoteWrap, { opacity: fade }]}>
          <LinearGradient
            colors={['rgba(255,255,255,0.75)', 'rgba(235,244,251,0.65)']}
            style={styles.quoteCard}
          >
            <Ionicons name="analytics-outline" size={22} color={theme.colors.accent} style={{ marginBottom: 6 }} />
            <Text style={styles.quoteText}>
              "Soon-to-graduate, already building. Big data, mobile apps, and a little bit of art — that's me."
            </Text>
            <Text style={styles.quoteAuthor}>— Angeline</Text>
          </LinearGradient>
        </Animated.View>
      </ScrollView>

      <FloatingExit />
    </View>
  );
}

const GRID_GAP = 10;
const ITEM_W   = (width - theme.spacing.lg * 2 - GRID_GAP) / 2;

const styles = StyleSheet.create({
  content: {
    paddingTop: 68,
    paddingBottom: 100,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    gap: 18,
  },

  // Photo
  photoWrap: { alignItems: 'center', position: 'relative', marginBottom: 4 },
  glowRing: {
    position: 'absolute', width: 178, height: 178, borderRadius: 89,
    top: -9, left: -9,
    backgroundColor: theme.colors.primaryGlow,
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 28,
  },
  photo: {
    width: 160, height: 160, borderRadius: 80,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: theme.colors.white,
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 18, elevation: 10,
  },
  photoLetter: { fontSize: 54, fontWeight: '800', color: theme.colors.white },
  photoImg: { width: 160, height: 160, borderRadius: 80 },
  badge: {
    position: 'absolute', bottom: -6,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 11, paddingVertical: 5, borderRadius: theme.radius.full,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12, shadowRadius: 8, elevation: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: theme.colors.primary },
  dataBadge: {
    position: 'absolute', top: 0, right: -14,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 9, paddingVertical: 4, borderRadius: theme.radius.full,
    borderWidth: 1.5, borderColor: theme.colors.accentLight,
    shadowColor: theme.colors.accent, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 3,
  },
  dataBadgeText: { fontSize: 10, fontWeight: '700', color: theme.colors.accent },

  // Text
  textBlock: { alignItems: 'center', gap: 3 },
  hi: { fontSize: 15, color: theme.colors.textSub, letterSpacing: 0.3 },
  name: { fontSize: 42, fontWeight: '800', color: theme.colors.text, letterSpacing: -1.5, lineHeight: 50 },
  tagline: { fontSize: 13, color: theme.colors.textSub, textAlign: 'center', maxWidth: 270, lineHeight: 20, marginTop: 2 },
  schoolRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  school: { fontSize: 12, color: theme.colors.textMuted },

  // Buttons
  ctaRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  btnPrimary: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    paddingHorizontal: 24, paddingVertical: 13, borderRadius: theme.radius.full,
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 14, elevation: 7,
  },
  btnPrimaryText: { color: theme.colors.white, fontWeight: '700', fontSize: 14 },
  btnSecondary: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 18, paddingVertical: 13, borderRadius: theme.radius.full,
    borderWidth: 1.5, borderColor: theme.colors.primaryLight,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  btnSecondaryText: { color: theme.colors.primary, fontWeight: '700', fontSize: 14 },

  // Explore grid
  exploreBlock: { width: '100%', gap: 12 },
  exploreLabel: {
    fontSize: 11, fontWeight: '700', letterSpacing: 2.5,
    color: theme.colors.textMuted, textTransform: 'uppercase', textAlign: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP, justifyContent: 'center' },
  gridItem: {
    width: ITEM_W,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  gridCard: {
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 20, gap: 10,
  },
  gridIconCircle: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  gridLabel: { fontSize: 13, fontWeight: '700', color: theme.colors.textSub },

  // Quote
  quoteWrap: { width: '100%' },
  quoteCard: {
    borderRadius: theme.radius.lg, padding: 22,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.75)',
    shadowColor: theme.colors.shadowBlue,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 14, elevation: 4,
    gap: 2,
  },
  quoteText: { fontSize: 14, fontStyle: 'italic', color: theme.colors.text, lineHeight: 22 },
  quoteAuthor: { fontSize: 12, fontWeight: '700', color: theme.colors.accent, textAlign: 'right', marginTop: 8 },
});
