import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { profile } from '../../constants/data';
import { ClayCard } from '../../components/ClayCard';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const quickLinks = [
  { label: 'About', icon: 'person-outline' as const, route: '/about' },
  { label: 'Projects', icon: 'code-slash-outline' as const, route: '/projects' },
  { label: 'Skills', icon: 'flash-outline' as const, route: '/skills' },
  { label: 'Art', icon: 'color-palette-outline' as const, route: '/art' },
  { label: 'Certs', icon: 'ribbon-outline' as const, route: '/certifications' },
  { label: 'Checklist', icon: 'checkbox-outline' as const, route: '/checklist' },
];

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        {/* Background blobs */}
        <View style={styles.blobGreen} />
        <View style={styles.blobBlue} />

        {/* Photo */}
        <Animated.View style={[styles.photoContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.photoFrame}>
            {/* TODO: Replace with actual image:
                <Image source={require('../../assets/hero.jpg')} style={styles.photo} />
            */}
            <LinearGradient
              colors={[theme.colors.primaryLight, theme.colors.accent]}
              style={styles.photoPlaceholder}
            >
              <Text style={styles.photoInitial}>A</Text>
            </LinearGradient>
          </View>
          {/* Floating badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>👩‍💻 Open to Work</Text>
          </View>
        </Animated.View>

        {/* Name & tagline */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.greeting}>Hi, I'm</Text>
          <Text style={styles.name}>Angeline ✦</Text>
          <Text style={styles.tagline}>{profile.tagline}</Text>
          <View style={styles.schoolRow}>
            <Ionicons name="school-outline" size={14} color={theme.colors.textSub} />
            <Text style={styles.school}>{profile.school}</Text>
          </View>
        </Animated.View>

        {/* CTA Buttons */}
        <Animated.View style={[styles.ctaRow, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => router.push('/projects')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimaryText}>See My Work</Text>
            <Ionicons name="arrow-forward" size={16} color={theme.colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => Linking.openURL(profile.github)}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-github" size={18} color={theme.colors.primary} />
            <Text style={styles.btnSecondaryText}>GitHub</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Quick Nav Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Explore</Text>
        <View style={styles.grid}>
          {quickLinks.map((link, i) => (
            <TouchableOpacity
              key={link.label}
              style={styles.gridItem}
              onPress={() => router.push(link.route as any)}
              activeOpacity={0.8}
            >
              <ClayCard variant={i % 2 === 0 ? 'green' : 'sky'} style={styles.gridCard}>
                <Ionicons name={link.icon} size={26} color={theme.colors.primary} />
                <Text style={styles.gridLabel}>{link.label}</Text>
              </ClayCard>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tagline card */}
      <View style={[styles.section, { paddingBottom: 40 }]}>
        <ClayCard variant="green" elevated style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            "Soon-to-graduate, already building. Big data, mobile apps, and a little bit of art — that's me."
          </Text>
          <Text style={styles.quoteName}>— {profile.nickname}</Text>
        </ClayCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    flexGrow: 1,
  },
  heroSection: {
    minHeight: isWeb ? 600 : height * 0.75,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  // Background blobs for organic feel
  blobGreen: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(143, 184, 154, 0.25)',
    top: -60,
    right: -80,
  },
  blobBlue: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(114, 180, 220, 0.18)',
    bottom: 20,
    left: -60,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  photoFrame: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: theme.colors.white,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoInitial: {
    fontSize: 64,
    fontWeight: '700',
    color: theme.colors.white,
  },
  badge: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  greeting: {
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.textSub,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  name: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '800',
    color: theme.colors.text,
    letterSpacing: -1,
    marginBottom: 8,
  },
  tagline: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.colors.textSub,
    lineHeight: 22,
    maxWidth: 300,
    alignSelf: 'center',
    marginBottom: 10,
  },
  schoolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  school: {
    fontSize: 13,
    color: theme.colors.textMuted,
    flexShrink: 1,
    maxWidth: 260,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: theme.radius.full,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
  },
  btnPrimaryText: {
    color: theme.colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: theme.radius.full,
    borderWidth: 1.5,
    borderColor: theme.colors.primaryLight,
  },
  btnSecondaryText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: (width - theme.spacing.lg * 2 - 12 * 2) / 3,
    minWidth: isWeb ? 100 : undefined,
  },
  gridCard: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSub,
    textAlign: 'center',
  },
  quoteCard: {
    marginTop: 8,
    paddingVertical: 28,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  quoteName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
    textAlign: 'right',
  },
});
