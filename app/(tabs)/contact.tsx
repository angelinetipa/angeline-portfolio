import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { profile } from '../../constants/data';
import { ClayCard } from '../../components/ClayCard';

const contacts = [
  {
    icon: 'mail-outline' as const,
    label: 'Email',
    value: profile.email,
    action: () => Linking.openURL(`mailto:${profile.email}`),
    color: theme.colors.primary,
  },
  {
    icon: 'logo-github' as const,
    label: 'GitHub',
    value: 'View my code',
    action: () => Linking.openURL(profile.github),
    color: theme.colors.text,
  },
  {
    icon: 'logo-linkedin' as const,
    label: 'LinkedIn',
    value: 'Connect with me',
    action: () => Linking.openURL(profile.linkedin),
    color: '#0A66C2',
  },
];

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[theme.colors.bg, theme.colors.bgAlt]} style={styles.header}>
        <View style={styles.blob} />
        <Text style={styles.pageTag}>LET'S TALK</Text>
        <Text style={styles.title}>Contact</Text>
        <Text style={styles.subtitle}>Open to opportunities, collabs, or just a friendly hello. 👋</Text>
      </LinearGradient>

      <View style={styles.body}>
        {contacts.map((c) => (
          <TouchableOpacity key={c.label} onPress={c.action} activeOpacity={0.8}>
            <ClayCard variant="white" elevated style={styles.contactCard}>
              <View style={[styles.iconCircle, { backgroundColor: c.color + '18' }]}>
                <Ionicons name={c.icon} size={24} color={c.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>{c.label}</Text>
                <Text style={styles.contactValue}>{c.value}</Text>
              </View>
              <Ionicons name="arrow-forward-outline" size={18} color={theme.colors.textMuted} />
            </ClayCard>
          </TouchableOpacity>
        ))}

        <ClayCard variant="green" elevated style={styles.cta}>
          <Text style={styles.ctaTitle}>Available for work 🌿</Text>
          <Text style={styles.ctaText}>
            Fresh grad, eager to contribute, and ready to learn fast.
            Let's build something meaningful together.
          </Text>
        </ClayCard>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 💚 by Angeline · {new Date().getFullYear()}</Text>
        </View>
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
    overflow: 'hidden',
    position: 'relative',
  },
  blob: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(114,180,220,0.15)',
    top: -20,
    right: -30,
  },
  pageTag: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: theme.colors.textMuted, marginBottom: 6 },
  title: { fontSize: 36, fontWeight: '800', color: theme.colors.text, marginBottom: 6 },
  subtitle: { fontSize: 15, color: theme.colors.textSub },
  body: { paddingHorizontal: theme.spacing.lg, gap: 12, paddingTop: 8 },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: { fontSize: 12, fontWeight: '700', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  contactValue: { fontSize: 14, fontWeight: '600', color: theme.colors.text, marginTop: 2 },
  cta: { paddingVertical: 24, gap: 8, marginTop: 8 },
  ctaTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.text },
  ctaText: { fontSize: 14, color: theme.colors.textSub, lineHeight: 22 },
  footer: { alignItems: 'center', paddingTop: 8 },
  footerText: { fontSize: 13, color: theme.colors.textMuted },
});
