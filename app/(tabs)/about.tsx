import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { profile } from '../../constants/data';
import { ClayCard } from '../../components/ClayCard';

const facts = [
  { icon: '🎓', label: 'Degree', value: profile.degree },
  { icon: '🏫', label: 'School', value: profile.school },
  { icon: '📍', label: 'Based in', value: profile.location },
  { icon: '🎨', label: 'Also into', value: 'Realistic portrait drawing' },
  { icon: '📊', label: 'Specializes in', value: 'Big Data & Mobile Development' },
  { icon: '🌱', label: 'Currently', value: 'Building in public, learning every day' },
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={[theme.colors.bg, theme.colors.bgAlt]} style={styles.header}>
        <View style={styles.blobAccent} />
        <Text style={styles.pageTag}>WHO I AM</Text>
        <Text style={styles.title}>About Me</Text>

        {/* Photo placeholder */}
        <View style={styles.photoWrap}>
          {/* TODO: <Image source={require('../../assets/hero.jpg')} style={styles.photo} /> */}
          <LinearGradient colors={[theme.colors.primaryLight, theme.colors.accent]} style={styles.photo}>
            <Text style={{ fontSize: 48 }}>🌿</Text>
          </LinearGradient>
          <View style={styles.photoRing} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Bio */}
        <ClayCard variant="white" elevated style={styles.bioCard}>
          <Text style={styles.bioHeading}>Hey there 👋</Text>
          <Text style={styles.bioText}>
            I'm Angeline — a soon-to-graduate Computer Engineer from PUP Sta. Mesa, specializing in Big Data.
            I build mobile and web apps, and I like making things that actually solve real problems.
          </Text>
          <Text style={styles.bioText}>
            When I'm not coding, I draw realistic portraits. It keeps me grounded — and honestly, it makes me
            a better designer too.
          </Text>
          <Text style={styles.bioText}>
            I'm a bit anxious about what's next, but I'm showing up every day anyway. That's the plan.
          </Text>
        </ClayCard>

        {/* Quick facts */}
        <Text style={styles.sectionLabel}>Quick Facts</Text>
        {facts.map((f) => (
          <ClayCard key={f.label} variant="sky" style={styles.factRow}>
            <Text style={styles.factIcon}>{f.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.factLabel}>{f.label}</Text>
              <Text style={styles.factValue}>{f.value}</Text>
            </View>
          </ClayCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  content: { flexGrow: 1, paddingBottom: 40 },
  header: {
    paddingTop: 64,
    paddingBottom: 40,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  blobAccent: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(114,180,220,0.15)',
    top: -40,
    right: -40,
  },
  pageTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    color: theme.colors.textMuted,
    marginBottom: 6,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 28,
  },
  photoWrap: {
    position: 'relative',
    width: 140,
    height: 140,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoRing: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 152,
    height: 152,
    borderRadius: 76,
    borderWidth: 3,
    borderColor: theme.colors.primaryLight,
    borderStyle: 'dashed',
  },
  body: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    gap: 12,
  },
  bioCard: { marginBottom: 8, gap: 12 },
  bioHeading: { fontSize: 20, fontWeight: '700', color: theme.colors.text },
  bioText: { fontSize: 15, color: theme.colors.textSub, lineHeight: 24 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 4,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  factIcon: { fontSize: 22 },
  factLabel: { fontSize: 11, fontWeight: '600', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  factValue: { fontSize: 14, fontWeight: '600', color: theme.colors.text, marginTop: 2 },
});
