import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar,
  Platform,
} from 'react-native';
import { colors } from './src/theme/colors';

// Polyfill for SafeAreaView without the deprecated RN import
function SafeAreaView({ style, children }) {
  return (
    <View style={[{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }, style]}>
      {children}
    </View>
  );
}

// ─── Sub-screens ────────────────────────────────────────────────────────────

function MealPlanScreen({ navigate }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.cream }}>
      <View style={subStyles.header}>
        <TouchableOpacity onPress={() => navigate('home')}>
          <Text style={subStyles.back}>←</Text>
        </TouchableOpacity>
        <Text style={subStyles.title}>7-Day Meal Plan</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: colors.text }}>🌿 Week Plan Loaded</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function CookHelperScreen({ navigate }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.cream }}>
      <View style={subStyles.header}>
        <TouchableOpacity onPress={() => navigate('home')}>
          <Text style={subStyles.back}>←</Text>
        </TouchableOpacity>
        <Text style={subStyles.title}>Cook Helper</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: colors.text }}>📲 Notify Cook</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SymptomScreen({ navigate }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.cream }}>
      <View style={subStyles.header}>
        <TouchableOpacity onPress={() => navigate('home')}>
          <Text style={subStyles.back}>←</Text>
        </TouchableOpacity>
        <Text style={subStyles.title}>Symptom Check</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: colors.text }}>🩺 How are you feeling?</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function PhotoScanScreen({ navigate }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.cream }}>
      <View style={subStyles.header}>
        <TouchableOpacity onPress={() => navigate('home')}>
          <Text style={subStyles.back}>←</Text>
        </TouchableOpacity>
        <Text style={subStyles.title}>Meal Scan & Nutrition</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: colors.text }}>📷 Scan your meal</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Feature cards data ──────────────────────────────────────────────────────

const FEATURE_CARDS = [
  {
    id: 'symptom',
    icon: '🩺',
    title: 'Symptom\nChecker',
    desc: 'Doctor-validated symptom check, smart guidance.',
    bg: '#EEF6F2',
    screen: 'symptom',
  },
  {
    id: 'anc',
    icon: '📋',
    title: 'ANC\nTracker',
    desc: 'Appointments, supplements, and weekly milestones.',
    bg: '#F5F0FA',
    screen: null,
  },
  {
    id: 'meal',
    icon: '🥗',
    title: 'Meal Scan &\nNutrition',
    desc: 'Scan meals, analyse regional foods, track nutrition.',
    bg: '#FFF8ED',
    screen: 'photoScan',
  },
  {
    id: 'cook',
    icon: '🍳',
    title: 'Cook\nHelper',
    desc: "Today's meal plan to notify your cook.",
    bg: '#FFF0F0',
    screen: 'cookHelper',
  },
];

// ─── Bottom tab bar ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'home',    icon: '🏠', label: 'Home'    },
  { id: 'tracker', icon: '📊', label: 'Tracker'  },
  { id: 'scan',    icon: '📷', label: 'Scan'     },
  { id: 'support', icon: '💬', label: 'Support'  },
  { id: 'profile', icon: '👤', label: 'Profile'  },
];

function BottomTabBar({ activeTab, onTabPress }) {
  return (
    <View style={tabStyles.bar}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={tabStyles.tab}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={tabStyles.icon}>{tab.icon}</Text>
          <Text style={[tabStyles.label, activeTab === tab.id && tabStyles.labelActive]}>
            {tab.label}
          </Text>
          {activeTab === tab.id && <View style={tabStyles.dot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────

function HomeScreen({ navigate }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.leafIcon}>🌿</Text>
        <Text style={styles.brandName}>MaaHealth</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Greeting banner ── */}
        <View style={styles.greetingCard}>
          <View style={styles.greetingLeft}>
            <Text style={styles.sunIcon}>☀️</Text>
            <View>
              <Text style={styles.greetingText}>Good morning, Savitri</Text>
              <Text style={styles.greetingSub}>Week 32 · Here's your care plan for today</Text>
            </View>
          </View>
          {/* Decorative illustration placeholder */}
          <View style={styles.illustrationBox}>
            <Text style={styles.illustrationEmoji}>🤰</Text>
          </View>
        </View>

        {/* ── Info cards row ── */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>📅</Text>
            <Text style={styles.infoCardTitle}>Next ANC Visit</Text>
            <Text style={styles.infoCardValue}>24 May 2025</Text>
            <Text style={styles.infoCardSub}>18 days to go</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardIcon}>🥗</Text>
            <Text style={styles.infoCardTitle}>Today's Nutrition Goal</Text>
            <Text style={styles.infoCardValue}>Iron · Folate · Protein</Text>
            <View style={styles.onTrackBadge}>
              <Text style={styles.onTrackText}>✓ On track</Text>
            </View>
          </View>
        </View>

        {/* ── Feature cards grid ── */}
        <View style={styles.grid}>
          {FEATURE_CARDS.map(card => (
            <TouchableOpacity
              key={card.id}
              style={[styles.featureCard, { backgroundColor: card.bg }]}
              onPress={() => card.screen && navigate(card.screen)}
              activeOpacity={0.8}
            >
              <Text style={styles.featureIcon}>{card.icon}</Text>
              <Text style={styles.featureTitle}>{card.title}</Text>
              <Text style={styles.featureDesc}>{card.desc}</Text>
              <Text style={styles.featureArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Today's Meal strip ── */}
        <TouchableOpacity
          style={styles.mealStrip}
          onPress={() => navigate('mealPlan')}
          activeOpacity={0.85}
        >
          <View style={styles.mealStripLeft}>
            <Text style={styles.mealStripLabel}>Today's Meal</Text>
            <Text style={styles.mealStripName}>Laxmi's Moong Dal, Brown Rice, Beetroot Tharati, Curd</Text>
            <View style={styles.mealStripBadge}>
              <Text style={styles.mealStripBadgeText}>Planned ✓</Text>
            </View>
          </View>
          <View style={styles.mealStripRight}>
            <View style={styles.nutriChip}>
              <Text style={styles.nutriIcon}>🩸</Text>
              <Text style={styles.nutriLabel}>Iron</Text>
              <Text style={styles.nutriValue}>28mg</Text>
            </View>
            <View style={styles.nutriChip}>
              <Text style={styles.nutriIcon}>🟡</Text>
              <Text style={styles.nutriLabel}>Folate</Text>
              <Text style={styles.nutriValue}>60g</Text>
            </View>
            <View style={styles.nutriChip}>
              <Text style={styles.nutriIcon}>💪</Text>
              <Text style={styles.nutriLabel}>Protein</Text>
              <Text style={styles.nutriValue}>400g</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const navigateRef = useRef(setScreen);
  navigateRef.current = setScreen;

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') setScreen('home');
    else if (tabId === 'scan') setScreen('photoScan');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'mealPlan':  return <MealPlanScreen navigate={navigateRef.current} />;
      case 'cookHelper': return <CookHelperScreen navigate={navigateRef.current} />;
      case 'symptom':   return <SymptomScreen navigate={navigateRef.current} />;
      case 'photoScan': return <PhotoScanScreen navigate={navigateRef.current} />;
      default:          return <HomeScreen navigate={navigateRef.current} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  leafIcon: { fontSize: 22, marginRight: 8 },
  brandName: { flex: 1, color: colors.white, fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  bellBtn: { padding: 4 },
  bellIcon: { fontSize: 20 },

  // Scroll
  scroll: { padding: 16, paddingBottom: 24 },

  // Greeting card
  greetingCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  greetingLeft: { flexDirection: 'row', alignItems: 'flex-start', flex: 1, gap: 10 },
  sunIcon: { fontSize: 22, marginTop: 2 },
  greetingText: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 4 },
  greetingSub: { fontSize: 12, color: colors.textMuted, maxWidth: 200 },
  illustrationBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.peach,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  illustrationEmoji: { fontSize: 36 },

  // Info cards row
  infoRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  infoCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  infoCardIcon: { fontSize: 18, marginBottom: 4 },
  infoCardTitle: { fontSize: 11, color: colors.textMuted, fontWeight: '600', marginBottom: 4, letterSpacing: 0.2 },
  infoCardValue: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 4 },
  infoCardSub: { fontSize: 11, color: colors.textSecondary },
  onTrackBadge: {
    marginTop: 4,
    backgroundColor: colors.successLight,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  onTrackText: { fontSize: 11, color: colors.success, fontWeight: '600' },

  // Feature grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 14 },
  featureCard: {
    width: '47.5%',
    borderRadius: 16,
    padding: 14,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  featureIcon: { fontSize: 28, marginBottom: 6 },
  featureTitle: { fontSize: 14, fontWeight: '700', color: colors.text, lineHeight: 19, marginBottom: 4 },
  featureDesc: { fontSize: 11, color: colors.textSecondary, lineHeight: 15, flex: 1 },
  featureArrow: { fontSize: 16, color: colors.primary, fontWeight: '700', marginTop: 8, alignSelf: 'flex-end' },

  // Today's Meal strip
  mealStrip: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  mealStripLeft: { flex: 1 },
  mealStripLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, marginBottom: 4 },
  mealStripName: { fontSize: 12, color: colors.text, lineHeight: 16, marginBottom: 6 },
  mealStripBadge: {
    backgroundColor: colors.successLight,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  mealStripBadgeText: { fontSize: 10, color: colors.success, fontWeight: '600' },
  mealStripRight: { gap: 6 },
  nutriChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  nutriIcon: { fontSize: 12 },
  nutriLabel: { fontSize: 10, color: colors.textSecondary, width: 34 },
  nutriValue: { fontSize: 11, fontWeight: '700', color: colors.text },
});

const tabStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 2 },
  icon: { fontSize: 20 },
  label: { fontSize: 10, color: colors.textMuted, fontWeight: '500' },
  labelActive: { color: colors.primary, fontWeight: '700' },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 2,
  },
});

const subStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  back: { color: colors.goldLight, fontSize: 22 },
  title: { color: colors.white, fontSize: 18, fontWeight: '700' },
});
