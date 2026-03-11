import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { projects } from '../../constants/data';
import { ClayCard } from '../../components/ClayCard';

const statusColor = {
  live: theme.colors.primary,
  'in-progress': theme.colors.accent,
  planned: theme.colors.stone,
};

const statusLabel = {
  live: '🟢 Live',
  'in-progress': '🔵 In Progress',
  planned: '⚪ Planned',
};

export default function ProjectsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[theme.colors.bg, theme.colors.bgAlt]} style={styles.header}>
        <Text style={styles.pageTag}>WHAT I BUILT</Text>
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>Real problems, real code, real outcomes.</Text>
      </LinearGradient>

      <View style={styles.body}>
        {projects.map((project, i) => (
          <ClayCard key={project.id} variant={i % 2 === 0 ? 'white' : 'sky'} elevated style={styles.card}>
            {/* Status chip */}
            <View style={[styles.statusChip, { backgroundColor: statusColor[project.status as keyof typeof statusColor] + '22' }]}>
              <Text style={[styles.statusText, { color: statusColor[project.status as keyof typeof statusColor] }]}>
                {statusLabel[project.status as keyof typeof statusLabel]}
              </Text>
            </View>

            <Text style={styles.cardTitle}>{project.title}</Text>
            <Text style={styles.cardDesc}>{project.description}</Text>

            {/* Tags */}
            <View style={styles.tags}>
              {project.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Links */}
            <View style={styles.linkRow}>
              {project.github ? (
                <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(project.github)}>
                  <Ionicons name="logo-github" size={16} color={theme.colors.primary} />
                  <Text style={styles.linkText}>GitHub</Text>
                </TouchableOpacity>
              ) : null}
              {project.demo ? (
                <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(project.demo)}>
                  <Ionicons name="open-outline" size={16} color={theme.colors.accent} />
                  <Text style={[styles.linkText, { color: theme.colors.accent }]}>Live Demo</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </ClayCard>
        ))}

        {/* Call to action */}
        <ClayCard variant="green" style={styles.ctaCard}>
          <Text style={styles.ctaText}>More coming soon — I build consistently. 🌱</Text>
        </ClayCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  content: { flexGrow: 1, paddingBottom: 40 },
  header: {
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: theme.spacing.lg,
  },
  pageTag: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: theme.colors.textMuted, marginBottom: 6 },
  title: { fontSize: 36, fontWeight: '800', color: theme.colors.text, marginBottom: 6 },
  subtitle: { fontSize: 15, color: theme.colors.textSub },
  body: { paddingHorizontal: theme.spacing.lg, gap: 16, paddingTop: 8 },
  card: { gap: 10 },
  statusChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  cardTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.text },
  cardDesc: { fontSize: 14, color: theme.colors.textSub, lineHeight: 22 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: theme.colors.clay,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  tagText: { fontSize: 12, color: theme.colors.primary, fontWeight: '600' },
  linkRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.primaryLight,
  },
  linkText: { fontSize: 13, fontWeight: '600', color: theme.colors.primary },
  ctaCard: { alignItems: 'center', paddingVertical: 20 },
  ctaText: { fontSize: 15, color: theme.colors.primary, fontWeight: '600', textAlign: 'center' },
});
