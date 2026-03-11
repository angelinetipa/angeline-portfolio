import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { profile, skills } from '../../constants/data';

const facts = [
  { icon: 'school-outline'      as const, label: 'Degree',  value: 'BS CompE · Big Data',      color: theme.colors.primary },
  { icon: 'location-outline'    as const, label: 'Based',   value: 'Manila, PH',                color: theme.colors.accent  },
  { icon: 'color-palette-outline' as const, label: 'Art',   value: 'Portrait drawing',          color: theme.colors.stone   },
  { icon: 'leaf-outline'        as const, label: 'Now',     value: 'Building in public',        color: theme.colors.dataTeal},
];

export default function AboutScreen() {
  const fade   = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(28)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,   { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideY, { toValue: 0, tension: 50, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#E8F4EC', '#EBF4FB', '#E4EEF8', '#ECF5F0']}
        locations={[0, 0.35, 0.65, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fade, transform: [{ translateY: slideY }] }]}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarWrap}>
              <View style={styles.glowRing} />
              <LinearGradient colors={theme.gradients.primary} style={styles.avatar}>
                <Text style={{ fontSize: 32 }}>🌿</Text>
                {/* TODO: <Image source={require('../../assets/hero.jpg')} style={styles.avatar} /> */}
              </LinearGradient>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.pageTag}>ABOUT ME</Text>
              <Text style={styles.name}>Angeline</Text>
              <Text style={styles.school}>PUP Sta. Mesa</Text>
            </View>
          </View>

          {/* Bio */}
          <LinearGradient colors={['rgba(255,255,255,0.82)','rgba(240,248,252,0.75)']} style={styles.bioCard}>
            <Text style={styles.bioText}>
              Computer Engineering grad (Big Data) from PUP. I build mobile + web apps that solve real problems.
              When I'm not coding, I draw realistic portraits. A bit anxious about what's next — but showing up every day anyway. That's the plan. 🌱
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Quick facts — 2x2 grid */}
        <Animated.View style={[styles.section, { opacity: fade }]}>
          <Text style={styles.sectionLabel}>Quick Facts</Text>
          <View style={styles.factsGrid}>
            {facts.map((f) => (
              <LinearGradient key={f.label} colors={['rgba(255,255,255,0.82)','rgba(240,248,252,0.72)']} style={styles.factCard}>
                <Ionicons name={f.icon} size={18} color={f.color} />
                <Text style={styles.factLabel}>{f.label}</Text>
                <Text style={styles.factValue}>{f.value}</Text>
              </LinearGradient>
            ))}
          </View>
        </Animated.View>

        {/* Skills — compact */}
        <Animated.View style={[styles.section, { opacity: fade, paddingBottom: 100 }]}>
          <Text style={styles.sectionLabel}>Skills</Text>
          {skills.map((group, i) => (
            <LinearGradient key={group.category} colors={['rgba(255,255,255,0.80)','rgba(235,244,251,0.70)']} style={styles.skillCard}>
              <Text style={styles.skillCategory}>{group.category}</Text>
              <View style={styles.pills}>
                {group.items.map((s) => (
                  <View key={s} style={styles.pill}>
                    <Text style={styles.pillText}>{s}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          ))}
          <LinearGradient colors={['rgba(77,166,216,0.15)','rgba(42,157,143,0.10)']} style={[styles.skillCard, { borderColor: theme.colors.accentLight }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
              <Ionicons name="bulb-outline" size={16} color={theme.colors.accent} />
              <Text style={[styles.skillCategory, { color: theme.colors.accent }]}>Learning now</Text>
            </View>
            <View style={styles.pills}>
              {['DSA basics', 'Git branching', 'Play Store deploy'].map(s => (
                <View key={s} style={[styles.pill, { borderColor: theme.colors.accentLight }]}>
                  <Text style={[styles.pillText, { color: theme.colors.accentDeep }]}>{s}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const FACT_W = (340 - 10) / 2; // approx half width minus gap

const styles = StyleSheet.create({
  content: { paddingTop: 60, paddingHorizontal: theme.spacing.lg, gap: 16 },

  header: { gap: 12 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatarWrap: { position: 'relative', width: 80, height: 80 },
  glowRing: {
    position: 'absolute', width: 92, height: 92, borderRadius: 46,
    top: -6, left: -6, backgroundColor: theme.colors.primaryGlow,
  },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 2.5, borderColor: theme.colors.white },
  headerText: { flex: 1, gap: 2 },
  pageTag: { fontSize: 10, fontWeight: '700', letterSpacing: 2.5, color: theme.colors.textMuted, textTransform: 'uppercase' },
  name: { fontSize: 28, fontWeight: '800', color: theme.colors.text, letterSpacing: -0.5 },
  school: { fontSize: 12, color: theme.colors.textMuted },
  bioCard: {
    borderRadius: theme.radius.md, padding: 16,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 10, elevation: 3,
  },
  bioText: { fontSize: 14, color: theme.colors.textSub, lineHeight: 22 },

  section: { gap: 10 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2.5, color: theme.colors.textMuted, textTransform: 'uppercase' },

  factsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  factCard: {
    width: FACT_W, borderRadius: theme.radius.md, padding: 14, gap: 4,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3,
    flex: 1, minWidth: 140,
  },
  factLabel: { fontSize: 10, fontWeight: '700', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  factValue: { fontSize: 13, fontWeight: '600', color: theme.colors.text },

  skillCard: {
    borderRadius: theme.radius.md, padding: 14, gap: 10,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3,
  },
  skillCategory: { fontSize: 14, fontWeight: '800', color: theme.colors.text },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.75)', paddingHorizontal: 11, paddingVertical: 5,
    borderRadius: theme.radius.full, borderWidth: 1.5, borderColor: 'rgba(61,122,90,0.2)',
  },
  pillText: { fontSize: 12, fontWeight: '600', color: theme.colors.textSub },
});
