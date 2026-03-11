import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { ClayCard } from '../../components/ClayCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - theme.spacing.lg * 2 - 12) / 2;

// TODO: Replace with your actual portrait drawings
const placeholderArt = [
  { id: '1', title: 'Portrait Study 1', medium: 'Pencil on paper', year: '2023' },
  { id: '2', title: 'Portrait Study 2', medium: 'Pencil on paper', year: '2023' },
  { id: '3', title: 'Portrait Study 3', medium: 'Charcoal', year: '2024' },
  { id: '4', title: 'Portrait Study 4', medium: 'Pencil', year: '2024' },
];

export default function ArtScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[theme.colors.stoneLight, theme.colors.bg]} style={styles.header}>
        <Text style={styles.pageTag}>ANOTHER SIDE OF ME</Text>
        <Text style={styles.title}>Art Gallery</Text>
        <Text style={styles.subtitle}>Realistic portrait drawings — how I stay grounded.</Text>
      </LinearGradient>

      <View style={styles.body}>
        <ClayCard variant="stone" style={styles.intro}>
          <Text style={styles.introText}>
            Drawing keeps me present. There's something about studying a face closely — the light,
            the shadows — that teaches patience I apply to code too. 🎨
          </Text>
        </ClayCard>

        <Text style={styles.sectionLabel}>Portraits</Text>
        <View style={styles.grid}>
          {placeholderArt.map((art) => (
            <TouchableOpacity key={art.id} activeOpacity={0.85}>
              <ClayCard variant="white" style={[styles.artCard, { width: CARD_WIDTH }]}>
                {/* TODO: Replace gradient with actual artwork image */}
                <LinearGradient
                  colors={['#C8B89A', '#E8D8C4']}
                  style={styles.artImage}
                >
                  <Text style={styles.artEmoji}>🖋</Text>
                  <Text style={styles.artPlaceholderText}>Add artwork</Text>
                </LinearGradient>
                <Text style={styles.artTitle}>{art.title}</Text>
                <Text style={styles.artMeta}>{art.medium} · {art.year}</Text>
              </ClayCard>
            </TouchableOpacity>
          ))}
        </View>

        <ClayCard variant="sky" style={styles.addNote}>
          <Text style={styles.addNoteText}>
            📸 To add your drawings: place images in{' '}
            <Text style={styles.code}>assets/art/</Text> and update{' '}
            <Text style={styles.code}>constants/data.ts</Text>
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
  body: { paddingHorizontal: theme.spacing.lg, paddingTop: 8, gap: 16 },
  intro: { paddingVertical: 20 },
  introText: { fontSize: 15, color: theme.colors.textSub, lineHeight: 24 },
  sectionLabel: {
    fontSize: 12, fontWeight: '700', letterSpacing: 2,
    color: theme.colors.textMuted, textTransform: 'uppercase',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  artCard: { padding: 0, overflow: 'hidden' },
  artImage: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.lg - 2,
    margin: 0,
    gap: 6,
  },
  artEmoji: { fontSize: 28 },
  artPlaceholderText: { fontSize: 11, color: '#9A8878', fontWeight: '600' },
  artTitle: { fontSize: 13, fontWeight: '700', color: theme.colors.text, paddingHorizontal: 12, paddingTop: 10 },
  artMeta: { fontSize: 11, color: theme.colors.textMuted, paddingHorizontal: 12, paddingBottom: 12 },
  addNote: { paddingVertical: 16 },
  addNoteText: { fontSize: 13, color: theme.colors.textSub, lineHeight: 20 },
  code: { fontFamily: 'monospace', backgroundColor: theme.colors.clay, color: theme.colors.primary },
});
