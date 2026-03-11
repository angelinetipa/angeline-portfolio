import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { checklist } from '../../constants/data';
import { ClayCard } from '../../components/ClayCard';

type Item = { text: string; done: boolean };
type Section = { section: string; items: Item[] };

export default function ChecklistScreen() {
  const [sections, setSections] = useState<Section[]>(checklist);

  const toggle = (sectionIdx: number, itemIdx: number) => {
    setSections((prev) => {
      const next = prev.map((s, si) =>
        si !== sectionIdx
          ? s
          : {
              ...s,
              items: s.items.map((it, ii) =>
                ii !== itemIdx ? it : { ...it, done: !it.done }
              ),
            }
      );
      return next;
    });
  };

  const totalItems = sections.flatMap((s) => s.items).length;
  const doneItems = sections.flatMap((s) => s.items).filter((i) => i.done).length;
  const progress = totalItems > 0 ? doneItems / totalItems : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[theme.colors.bg, theme.colors.bgAlt]} style={styles.header}>
        <Text style={styles.pageTag}>THE PLAN</Text>
        <Text style={styles.title}>Grad Checklist</Text>
        <Text style={styles.subtitle}>One step at a time. You've got this. 🌱</Text>

        {/* Progress */}
        <ClayCard variant="white" elevated style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>{doneItems} of {totalItems} done</Text>
            <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
          </View>
        </ClayCard>
      </LinearGradient>

      <View style={styles.body}>
        {sections.map((section, si) => (
          <View key={section.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <ClayCard variant={si % 2 === 0 ? 'white' : 'sky'} style={styles.sectionCard}>
              {section.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  style={styles.itemRow}
                  onPress={() => toggle(si, ii)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
                    {item.done && <Ionicons name="checkmark" size={14} color={theme.colors.white} />}
                  </View>
                  <Text style={[styles.itemText, item.done && styles.itemTextDone]}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </ClayCard>
          </View>
        ))}

        <ClayCard variant="green" style={styles.footer}>
          <Text style={styles.footerText}>
            Priority: Resume → GitHub → Portfolio app → 2 more projects → Apply 🎯
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
  subtitle: { fontSize: 15, color: theme.colors.textSub, marginBottom: 20 },
  progressCard: { gap: 10 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 14, fontWeight: '600', color: theme.colors.textSub },
  progressPct: { fontSize: 20, fontWeight: '800', color: theme.colors.primary },
  progressBar: {
    height: 10,
    backgroundColor: theme.colors.clay,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
  body: { paddingHorizontal: theme.spacing.lg, gap: 10, paddingTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: theme.colors.text, marginBottom: 8, marginTop: 4 },
  sectionCard: { gap: 4, paddingVertical: 14 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 6 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  itemText: { flex: 1, fontSize: 14, color: theme.colors.textSub, lineHeight: 20 },
  itemTextDone: { color: theme.colors.textMuted, textDecorationLine: 'line-through' },
  footer: { marginTop: 8, paddingVertical: 20 },
  footerText: { fontSize: 14, fontWeight: '600', color: theme.colors.primary, lineHeight: 22 },
});
