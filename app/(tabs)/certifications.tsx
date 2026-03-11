import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { certifications } from '../../constants/data';
import { ClayCard } from '../../components/ClayCard';

export default function CertificationsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[theme.colors.bgAlt, theme.colors.bg]} style={styles.header}>
        <Text style={styles.pageTag}>PROOF OF LEARNING</Text>
        <Text style={styles.title}>Certifications</Text>
        <Text style={styles.subtitle}>Always learning, always shipping.</Text>
      </LinearGradient>

      <View style={styles.body}>
        {certifications.map((cert, i) => (
          <ClayCard key={cert.id} variant={i % 2 === 0 ? 'white' : 'sky'} elevated style={styles.certCard}>
            <Text style={styles.certBadge}>{cert.badge}</Text>
            <View style={styles.certInfo}>
              <Text style={styles.certTitle}>{cert.title}</Text>
              <Text style={styles.certIssuer}>{cert.issuer}</Text>
              <View style={styles.yearChip}>
                <Text style={styles.yearText}>{cert.year}</Text>
              </View>
            </View>
          </ClayCard>
        ))}

        <ClayCard variant="stone" style={styles.addNote}>
          <Text style={styles.addNoteTitle}>Add your certifications 📋</Text>
          <Text style={styles.addNoteText}>
            Update <Text style={styles.code}>constants/data.ts</Text> → certifications array.
            Add your DataCamp, freeCodeCamp, Google, or any other certs there.
          </Text>
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
  body: { paddingHorizontal: theme.spacing.lg, gap: 12, paddingTop: 8 },
  certCard: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  certBadge: { fontSize: 36 },
  certInfo: { flex: 1, gap: 4 },
  certTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  certIssuer: { fontSize: 13, color: theme.colors.textSub },
  yearChip: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.clay,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
    marginTop: 4,
  },
  yearText: { fontSize: 11, fontWeight: '700', color: theme.colors.primary },
  addNote: { paddingVertical: 20, gap: 8, marginTop: 8 },
  addNoteTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.text },
  addNoteText: { fontSize: 13, color: theme.colors.textSub, lineHeight: 20 },
  code: { fontFamily: 'monospace', color: theme.colors.primary },
});
