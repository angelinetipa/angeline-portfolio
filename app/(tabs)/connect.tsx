import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, BackHandler, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClayCard } from '../../components/ClayCard';
import { checklist, profile } from '../../constants/data';
import { theme } from '../../constants/theme';

type TabKey = 'contact' | 'checklist';
type Section = { section: string; items: { text: string; done: boolean }[] };

const contacts = [
  { icon: 'mail-outline' as const, label: 'Email', value: profile.email, action: () => Linking.openURL(`mailto:${profile.email}`), gradient: theme.gradients.primary },
  { icon: 'logo-github' as const, label: 'GitHub', value: 'View my repositories', action: () => Linking.openURL(profile.github), gradient: ['#2d2d2d', '#1a1a1a'] as [string, string] },
  { icon: 'logo-linkedin' as const, label: 'LinkedIn', value: 'Connect with me', action: () => Linking.openURL(profile.linkedin), gradient: ['#2867B2', '#004182'] as [string, string] },
];

function useExitHandler() {
  const lastBack = useRef(0);
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      const now = Date.now();
      if (now - lastBack.current < 2000) { BackHandler.exitApp(); return true; }
      lastBack.current = now;
      Alert.alert('', 'Press back again to exit', [{ text: 'OK' }], { cancelable: true });
      return true;
    });
    return () => handler.remove();
  }, []);
}

export default function ConnectScreen() {
  useExitHandler();
  const [tab, setTab] = useState<TabKey>('contact');
  const [sections, setSections] = useState<Section[]>(checklist);
  const fade = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideY, { toValue: 0, tension: 50, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggle = (si: number, ii: number) => {
    setSections(prev => prev.map((s, sIdx) => sIdx !== si ? s : {
      ...s, items: s.items.map((it, iIdx) => iIdx !== ii ? it : { ...it, done: !it.done }),
    }));
  };

  const allItems = sections.flatMap(s => s.items);
  const doneCount = allItems.filter(i => i.done).length;
  const progress = allItems.length > 0 ? doneCount / allItems.length : 0;

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
            <Text style={styles.pageTag}>GET IN TOUCH</Text>
            <Text style={styles.title}>Connect</Text>
            <Text style={styles.subtitle}>Open to opportunities, collabs, or just a hello.</Text>
          </Animated.View>
        </View>

        {/* Tab switcher */}
        <View style={styles.tabRow}>
          <TouchableOpacity style={[styles.tabBtn, tab === 'contact' && styles.tabBtnActive]} onPress={() => setTab('contact')} activeOpacity={0.8}>
            {tab === 'contact' && <LinearGradient colors={theme.gradients.primary} style={[StyleSheet.absoluteFillObject, { borderRadius: theme.radius.full }]} />}
            <Ionicons name="paper-plane-outline" size={16} color={tab === 'contact' ? theme.colors.white : theme.colors.textMuted} />
            <Text style={[styles.tabLabel, tab === 'contact' && styles.tabLabelActive]}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabBtn, tab === 'checklist' && styles.tabBtnActiveBlue]} onPress={() => setTab('checklist')} activeOpacity={0.8}>
            {tab === 'checklist' && <LinearGradient colors={theme.gradients.accent} style={[StyleSheet.absoluteFillObject, { borderRadius: theme.radius.full }]} />}
            <Ionicons name="checkbox-outline" size={16} color={tab === 'checklist' ? theme.colors.white : theme.colors.textMuted} />
            <Text style={[styles.tabLabel, tab === 'checklist' && styles.tabLabelActive]}>Checklist</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {tab === 'contact' && (
            <>
              {contacts.map((c) => (
                <TouchableOpacity key={c.label} onPress={c.action} activeOpacity={0.8}>
                  <ClayCard variant="white" elevated style={styles.contactCard}>
                    <LinearGradient colors={c.gradient} style={styles.contactIcon}>
                      <Ionicons name={c.icon} size={22} color={theme.colors.white} />
                    </LinearGradient>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.contactLabel}>{c.label}</Text>
                      <Text style={styles.contactValue}>{c.value}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
                  </ClayCard>
                </TouchableOpacity>
              ))}
              <ClayCard variant="green" elevated glow="green" style={styles.ctaCard}>
                <Ionicons name="leaf" size={24} color={theme.colors.primary} />
                <Text style={styles.ctaTitle}>Available for work</Text>
                <Text style={styles.ctaText}>Fresh grad, eager to contribute, ready to grow fast. Let's build something meaningful.</Text>
              </ClayCard>
              <View style={styles.footer}>
                <Text style={styles.footerText}>Made with 💚 by Angeline · {new Date().getFullYear()}</Text>
              </View>
            </>
          )}

          {tab === 'checklist' && (
            <>
              <ClayCard variant="white" elevated style={styles.progressCard}>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>{doneCount} of {allItems.length} done</Text>
                  <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
                </View>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
                </View>
              </ClayCard>

              {sections.map((section, si) => (
                <View key={section.section}>
                  <Text style={styles.sectionTitle}>{section.section}</Text>
                  <ClayCard variant={si % 2 === 0 ? 'white' : 'sky'} style={styles.sectionCard}>
                    {section.items.map((item, ii) => (
                      <TouchableOpacity key={ii} style={styles.itemRow} onPress={() => toggle(si, ii)} activeOpacity={0.7}>
                        <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
                          {item.done && <Ionicons name="checkmark" size={13} color={theme.colors.white} />}
                        </View>
                        <Text style={[styles.itemText, item.done && styles.itemDone]}>{item.text}</Text>
                      </TouchableOpacity>
                    ))}
                  </ClayCard>
                </View>
              ))}

              <ClayCard variant="data" glow="blue" style={styles.priorityCard}>
                <Ionicons name="flag-outline" size={18} color={theme.colors.accent} />
                <Text style={styles.priorityText}>Resume → GitHub → Portfolio → 2 projects → Apply</Text>
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
  orb: { position: 'absolute', width: 160, height: 160, borderRadius: 80, opacity: 0.2, backgroundColor: theme.colors.accent, top: -30, right: -30 },
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
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  contactIcon: { width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: 10, fontWeight: '700', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  contactValue: { fontSize: 14, fontWeight: '600', color: theme.colors.text, marginTop: 2 },
  ctaCard: { paddingVertical: 24, gap: 8, alignItems: 'flex-start' },
  ctaTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.text },
  ctaText: { fontSize: 14, color: theme.colors.textSub, lineHeight: 22 },
  footer: { alignItems: 'center', paddingVertical: 12 },
  footerText: { fontSize: 12, color: theme.colors.textMuted },
  progressCard: { gap: 10 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 14, fontWeight: '600', color: theme.colors.textSub },
  progressPct: { fontSize: 22, fontWeight: '800', color: theme.colors.primary },
  progressBg: { height: 10, backgroundColor: theme.colors.clay, borderRadius: theme.radius.full, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: theme.radius.full, backgroundColor: theme.colors.primary },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: theme.colors.text, marginBottom: 6, marginTop: 4 },
  sectionCard: { gap: 2, paddingVertical: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 5 },
  checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: theme.colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
  checkboxDone: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  itemText: { flex: 1, fontSize: 13, color: theme.colors.textSub, lineHeight: 20 },
  itemDone: { color: theme.colors.textMuted, textDecorationLine: 'line-through' },
  priorityCard: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 16 },
  priorityText: { flex: 1, fontSize: 13, fontWeight: '600', color: theme.colors.textSub },
});