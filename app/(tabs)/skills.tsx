import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { skills } from '../../constants/data';
import { ClayCard } from '../../components/ClayCard';

const categoryColors = ['green', 'sky', 'stone', 'green'] as const;

export default function SkillsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[theme.colors.bgAlt, theme.colors.bg]} style={styles.header}>
        <Text style={styles.pageTag}>WHAT I KNOW</Text>
        <Text style={styles.title}>Skills</Text>
        <Text style={styles.subtitle}>My current stack — going deep, not wide.</Text>
      </LinearGradient>

      <View style={styles.body}>
        {skills.map((group, i) => (
          <ClayCard key={group.category} variant={categoryColors[i % categoryColors.length]} elevated={i === 0} style={styles.groupCard}>
            <Text style={styles.groupTitle}>{group.category}</Text>
            <View style={styles.pills}>
              {group.items.map((skill) => (
                <View key={skill} style={styles.pill}>
                  <Text style={styles.pillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </ClayCard>
        ))}

        <ClayCard variant="sky" style={styles.noteCard}>
          <Text style={styles.noteTitle}>Currently learning 📚</Text>
          <Text style={styles.noteText}>DSA fundamentals · Git branching workflows · Deploying to Play Store</Text>
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
  body: { paddingHorizontal: theme.spacing.lg, gap: 14, paddingTop: 8 },
  groupCard: { gap: 12 },
  groupTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.text },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.radius.full,
    borderWidth: 1.5,
    borderColor: 'rgba(79,143,104,0.25)',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 2,
  },
  pillText: { fontSize: 13, fontWeight: '600', color: theme.colors.textSub },
  noteCard: { paddingVertical: 20 },
  noteTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.accent, marginBottom: 8 },
  noteText: { fontSize: 14, color: theme.colors.textSub, lineHeight: 22 },
});
