import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClayCard } from '../../components/ClayCard';
import { projects } from '../../constants/data';
import { theme } from '../../constants/theme';

const statusConfig = {
  live:          { color: theme.colors.primary, label: 'Live',        icon: 'checkmark-circle-outline' as const },
  'in-progress': { color: theme.colors.accent,   label: 'In Progress', icon: 'time-outline'             as const },
  planned:       { color: theme.colors.stone,     label: 'Planned',     icon: 'ellipse-outline'          as const },
};

export default function ProjectsScreen() {
  const fade   = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(30)).current;

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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.orb} />
          <Animated.View style={{ opacity: fade, transform: [{ translateY: slideY }] }}>
            <Text style={styles.pageTag}>WHAT I BUILT</Text>
            <Text style={styles.title}>Projects</Text>
            <Text style={styles.subtitle}>Real problems, real code, real outcomes.</Text>
          </Animated.View>
        </View>

        {/* Cards */}
        <View style={styles.body}>
          {projects.map((project, i) => {
            const s = statusConfig[project.status as keyof typeof statusConfig];
            return (
              <ClayCard key={project.id} variant={i % 2 === 0 ? 'white' : 'sky'} elevated glow={i === 0 ? 'green' : 'none'} style={styles.card}>
                <View style={styles.cardTop}>
                  <LinearGradient colors={i % 2 === 0 ? theme.gradients.primary : theme.gradients.accent} style={styles.numBadge}>
                    <Text style={styles.numText}>{String(i + 1).padStart(2, '0')}</Text>
                  </LinearGradient>
                  <View style={[styles.statusChip, { backgroundColor: s.color + '1A' }]}>
                    <Ionicons name={s.icon} size={12} color={s.color} />
                    <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{project.title}</Text>
                <Text style={styles.cardDesc}>{project.description}</Text>
                <View style={styles.tags}>
                  {project.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                {(project.github || project.demo) && (
                  <View style={styles.linkRow}>
                    {project.github ? (
                      <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(project.github)}>
                        <Ionicons name="logo-github" size={15} color={theme.colors.primary} />
                        <Text style={styles.linkText}>Code</Text>
                      </TouchableOpacity>
                    ) : null}
                    {project.demo ? (
                      <TouchableOpacity style={[styles.linkBtn, styles.linkBtnBlue]} onPress={() => Linking.openURL(project.demo)}>
                        <Ionicons name="open-outline" size={15} color={theme.colors.accent} />
                        <Text style={[styles.linkText, { color: theme.colors.accent }]}>Live</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                )}
              </ClayCard>
            );
          })}

          <ClayCard variant="data" glow="blue" style={styles.cta}>
            <Ionicons name="leaf-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.ctaText}>More coming soon — I build consistently.</Text>
          </ClayCard>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingBottom: 100 },
  header: { paddingTop: 64, paddingBottom: 32, paddingHorizontal: theme.spacing.lg, overflow: 'hidden', position: 'relative' },
  orb: { position: 'absolute', width: 160, height: 160, borderRadius: 80, opacity: 0.25, backgroundColor: theme.colors.primaryLight, top: -30, left: -30 },
  pageTag: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: theme.colors.textMuted, marginBottom: 4 },
  title: { fontSize: 36, fontWeight: '800', color: theme.colors.text, marginBottom: 6 },
  subtitle: { fontSize: 14, color: theme.colors.textSub },
  body: { paddingHorizontal: theme.spacing.lg, gap: 14, paddingTop: 8 },
  card: { gap: 10 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  numBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  numText: { fontSize: 12, fontWeight: '800', color: theme.colors.white },
  statusChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: theme.radius.full },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.text },
  cardDesc: { fontSize: 14, color: theme.colors.textSub, lineHeight: 22 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { backgroundColor: theme.colors.clay, paddingHorizontal: 10, paddingVertical: 4, borderRadius: theme.radius.full },
  tagText: { fontSize: 11, fontWeight: '700', color: theme.colors.primary },
  linkRow: { flexDirection: 'row', gap: 10 },
  linkBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 14, borderRadius: theme.radius.full, backgroundColor: theme.colors.white, borderWidth: 1.5, borderColor: theme.colors.primaryLight },
  linkBtnBlue: { borderColor: theme.colors.accentLight },
  linkText: { fontSize: 12, fontWeight: '700', color: theme.colors.primary },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 18 },
  ctaText: { fontSize: 14, color: theme.colors.textSub, fontWeight: '600', flex: 1 },
});