import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClayCard } from '../../components/ClayCard';
import { certifications } from '../../constants/data';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_W = (width - theme.spacing.lg * 2 - 12) / 2;

const placeholderArt = [
  { id: '1', title: 'Portrait Study I',   medium: 'Pencil',   year: '2023' },
  { id: '2', title: 'Portrait Study II',  medium: 'Pencil',   year: '2023' },
  { id: '3', title: 'Portrait Study III', medium: 'Charcoal', year: '2024' },
  { id: '4', title: 'Portrait Study IV',  medium: 'Charcoal', year: '2024' },
];

const artBg: [string, string][] = [
  ['#C8B89A', '#E8D8C4'],
  ['#A8B8C8', '#C8D8E4'],
  ['#B8A898', '#D8C8B8'],
  ['#9AB8B0', '#C0D4CE'],
];

type TabKey = 'art' | 'certs';

export default function CreativeScreen() {
  const [tab, setTab] = useState<TabKey>('art');

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
          <Text style={styles.pageTag}>CREATIVE SIDE</Text>
          <Text style={styles.title}>Art & Certs</Text>
          <Text style={styles.subtitle}>The other things that make me, me.</Text>
        </View>

        {/* Tab switcher */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'art' && styles.tabBtnActive]}
            onPress={() => setTab('art')}
            activeOpacity={0.8}
          >
            {tab === 'art' && (
              <LinearGradient
                colors={theme.gradients.primary}
                style={[StyleSheet.absoluteFillObject, { borderRadius: theme.radius.full }]}
              />
            )}
            <Ionicons name="color-palette-outline" size={16} color={tab === 'art' ? theme.colors.white : theme.colors.textMuted} />
            <Text style={[styles.tabLabel, tab === 'art' && styles.tabLabelActive]}>Art Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'certs' && styles.tabBtnActiveBlue]}
            onPress={() => setTab('certs')}
            activeOpacity={0.8}
          >
            {tab === 'certs' && (
              <LinearGradient
                colors={theme.gradients.accent}
                style={[StyleSheet.absoluteFillObject, { borderRadius: theme.radius.full }]}
              />
            )}
            <Ionicons name="ribbon-outline" size={16} color={tab === 'certs' ? theme.colors.white : theme.colors.textMuted} />
            <Text style={[styles.tabLabel, tab === 'certs' && styles.tabLabelActive]}>Certifications</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {tab === 'art' && (
            <>
              <ClayCard variant="stone" style={styles.intro}>
                <Ionicons name="brush-outline" size={20} color={theme.colors.stone} />
                <Text style={styles.introText}>
                  Drawing keeps me present — studying light and shadow teaches a patience I bring to coding too.
                </Text>
              </ClayCard>
              <View style={styles.grid}>
                {placeholderArt.map((art, i) => (
                  <TouchableOpacity key={art.id} activeOpacity={0.85}>
                    <ClayCard variant="white" style={[styles.artCard, { width: CARD_W }]}>
                      <LinearGradient colors={artBg[i % artBg.length]} style={styles.artImg}>
                        <Ionicons name="pencil-outline" size={28} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.artPlaceholder}>Add image</Text>
                      </LinearGradient>
                      <View style={styles.artInfo}>
                        <Text style={styles.artTitle}>{art.title}</Text>
                        <Text style={styles.artMeta}>{art.medium} · {art.year}</Text>
                      </View>
                    </ClayCard>
                  </TouchableOpacity>
                ))}
              </View>
              <ClayCard variant="sky" style={styles.addNote}>
                <Ionicons name="information-circle-outline" size={16} color={theme.colors.accent} />
                <Text style={styles.addNoteText}>
                  Add images in <Text style={styles.code}>assets/art/</Text> and update <Text style={styles.code}>constants/data.ts</Text>
                </Text>
              </ClayCard>
            </>
          )}

          {tab === 'certs' && (
            <>
              {certifications.map((cert, i) => (
                <ClayCard key={cert.id} variant={i % 2 === 0 ? 'white' : 'sky'} elevated glow={i === 0 ? 'blue' : 'none'} style={styles.certCard}>
                  <LinearGradient
                    colors={i % 2 === 0 ? theme.gradients.primary : theme.gradients.accent}
                    style={styles.certIconWrap}
                  >
                    <Ionicons name="ribbon" size={22} color={theme.colors.white} />
                  </LinearGradient>
                  <View style={{ flex: 1, gap: 3 }}>
                    <Text style={styles.certTitle}>{cert.title}</Text>
                    <Text style={styles.certIssuer}>{cert.issuer}</Text>
                    <View style={styles.yearChip}>
                      <Text style={styles.yearText}>{cert.year}</Text>
                    </View>
                  </View>
                </ClayCard>
              ))}
              <ClayCard variant="data" style={styles.addNote}>
                <Ionicons name="add-circle-outline" size={16} color={theme.colors.accent} />
                <Text style={styles.addNoteText}>
                  Add your DataCamp / Google certs in <Text style={styles.code}>constants/data.ts</Text>
                </Text>
              </ClayCard>
            </>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingBottom: 100 },
  header: { paddingTop: 64, paddingBottom: 28, paddingHorizontal: theme.spacing.lg, overflow: 'hidden', position: 'relative' },
  orb: { position: 'absolute', width: 160, height: 160, borderRadius: 80, opacity: 0.3, backgroundColor: theme.colors.stone, top: -40, right: -20 },
  pageTag: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: theme.colors.textMuted, marginBottom: 4 },
  title: { fontSize: 36, fontWeight: '800', color: theme.colors.text, marginBottom: 6 },
  subtitle: { fontSize: 14, color: theme.colors.textSub },
  tabRow: { flexDirection: 'row', gap: 10, paddingHorizontal: theme.spacing.lg, paddingBottom: 4 },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 12, borderRadius: theme.radius.full, backgroundColor: theme.colors.white, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.06)', overflow: 'hidden' },
  tabBtnActive: { borderColor: theme.colors.primaryLight },
  tabBtnActiveBlue: { borderColor: theme.colors.accentLight },
  tabLabel: { fontSize: 13, fontWeight: '700', color: theme.colors.textMuted },
  tabLabelActive: { color: theme.colors.white },
  body: { paddingHorizontal: theme.spacing.lg, paddingTop: 12, gap: 12 },
  intro: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', paddingVertical: 16 },
  introText: { flex: 1, fontSize: 14, color: theme.colors.textSub, lineHeight: 21 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  artCard: { padding: 0, overflow: 'hidden', gap: 0 },
  artImg: { height: 150, alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: theme.radius.lg - 2 },
  artPlaceholder: { fontSize: 10, color: 'rgba(255,255,255,0.65)', fontWeight: '600' },
  artInfo: { padding: 10, gap: 2 },
  artTitle: { fontSize: 12, fontWeight: '700', color: theme.colors.text },
  artMeta: { fontSize: 11, color: theme.colors.textMuted },
  addNote: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 14 },
  addNoteText: { flex: 1, fontSize: 13, color: theme.colors.textSub },
  code: { fontWeight: '700', color: theme.colors.primary },
  certCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  certIconWrap: { width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  certTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.text },
  certIssuer: { fontSize: 12, color: theme.colors.textSub },
  yearChip: { alignSelf: 'flex-start', backgroundColor: theme.colors.clay, paddingHorizontal: 10, paddingVertical: 3, borderRadius: theme.radius.full, marginTop: 4 },
  yearText: { fontSize: 11, fontWeight: '700', color: theme.colors.primary },
});