import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Platform, Dimensions, ScrollView,
  Image, ImageBackground,
} from 'react-native';

// ─── Theme (warm palette matching screenshot) ─────────────────────────────────
const { width: SW } = Dimensions.get('window');
const PAD = 18;
const GAP = 12;
const CARD_W = (SW - PAD * 2 - GAP) / 2;

const C = {
  bg:          '#FDF8F0',     // warm cream page bg
  card:        '#FFFFFF',
  green:       '#2D6B4F',
  greenLight:  '#E8F5EE',
  gold:        '#C8953A',
  goldLight:   '#FDF5E0',
  orange:      '#D4874A',
  orangeLight: '#FDF2E8',
  peach:       '#FAE8D5',
  text:        '#1C2B22',
  textMid:     '#4A5E50',
  textMuted:   '#7A8F80',
  textFaint:   '#B5C4B8',
  border:      '#F0E8DA',
  divider:     '#E8DFD0',
  shadow:      'rgba(120,100,80,0.08)',
};

const SAFE_TOP = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 52;

// ─── Helper: image with fallback ──────────────────────────────────────────────
function Img({ source, style, fallback }) {
  try { return <Image source={source} style={style} resizeMode="contain" />; }
  catch (e) { return <Text style={style}>{fallback}</Text>; }
}

// ─── Home Screen ────────────────────────────────────────────────────────────────

function HomeScreen({ navigate }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* ── Header ── */}
      <View style={h.header}>
        <View style={h.avatarShell}>
          <Img             source={require('./assets/New_assets/User_avatar.webp')} style={h.avatar} fallback="👩" />
          <View style={h.statusDot} />
        </View>

        <View style={h.brand}>
          <Img source={require('./assets/New_assets/App_logo.webp')} style={h.logo} fallback="🌿" />
          <Text style={h.brandText}>MaaHealth</Text>
        </View>

        <TouchableOpacity style={h.bell} activeOpacity={0.7}>
          <Text style={{ fontSize: 20 }}>🔔</Text>
          <View style={h.bellDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>

        {/* ── Hero: illustration fills card, text floats on top-left ── */}
        <View style={h.heroWrap}>
          <ImageBackground
            source={require('./assets/New_assets/hero_illustration.webp')}
            style={h.heroBg}
            imageStyle={{ resizeMode: 'cover', borderRadius: 28 }}
          >
            <View style={h.heroOverlay}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontSize: 18 }}>☀️</Text>
                <Text style={h.heroGreet}>Good morning,{'\n'}Savitri</Text>
              </View>
              <Text style={h.heroSub}>Week 32 · Here's your care plan for today</Text>
            </View>
          </ImageBackground>
        </View>

        {/* ── Summary Row ── */}
        <View style={h.summaryRow}>
          <View style={h.summaryCard}>
            <View style={[h.summBadge, { backgroundColor: C.goldLight }]}>
              <Img source={require('./assets/New_assets/ANCTracker.webp')} style={h.summBadgeImg} fallback="📅" />
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={h.summLabel}>Next ANC Visit</Text>
              <Text style={h.summValue}>24 May 2025</Text>
              <Text style={h.summSub}>18 days to go</Text>
            </View>
          </View>

          <View style={[h.summaryCard, { marginLeft: GAP }]}>
            <View style={[h.summBadge, { backgroundColor: C.greenLight }]}>
              <Img source={require('./assets/New_assets/App_logo.webp')} style={h.summBadgeImg} fallback="🌿" />
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={h.summLabel}>Today's Nutrition Goal</Text>
              <Text style={h.summValue}>Iron · Folate · Protein</Text>
              <View style={h.trackPill}>
                <Text style={h.trackText}>✓ On track</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Feature Grid (2×2) ── */}
        <View style={h.grid}>
          {[
            { title: 'Symptom Checker', desc: 'Doctor-validated symptom check, smart guidance.', bg: '#EDF6F0', img: require('./assets/New_assets/SymptomChecker.webp'), accent: C.green, screen: 'symptom', plate: '#D4EDE0' },
            { title: 'ANC Tracker', desc: 'Appointments, supplements, and weekly milestones.', bg: '#FDF6E0', img: require('./assets/New_assets/ANCTracker.webp'), accent: C.gold, screen: 'ancTracker', plate: '#F5E8C8' },
            { title: 'Meal Scan & Nutrition', desc: 'Scan meals, analyze regional foods, track nutrition.', bg: '#EDF6F0', img: require('./assets/New_assets/MealScan.webp'), accent: C.green, screen: 'scan', plate: '#D4EDE0' },
            { title: 'Cook Helper', desc: "Today's meal plan & notify cook instantly.", bg: '#FDF2E8', img: require('./assets/New_assets/CookHelper.webp'), accent: C.orange, screen: 'cookDelegation', plate: '#F5DDD0' },
          ].map((c, i) => (
            <TouchableOpacity key={i} style={[h.featureCard, { backgroundColor: c.bg }]} onPress={() => c.screen && navigate(c.screen)} activeOpacity={0.85}>
              <View style={[h.featurePlate, { backgroundColor: c.plate }]}>
                <Img source={c.img} style={h.featureImg} fallback={['🩺','📋','📷','👨‍🍳'][i]} />
              </View>
              <Text style={[h.featureTitle, { color: c.accent }]}>{c.title}</Text>
              <Text style={h.featureDesc}>{c.desc}</Text>
              <View style={[h.featureArrow, { backgroundColor: C.card }]}>
                <Text style={{ fontSize: 16, color: c.accent, fontWeight: '700' }}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Today's Meal ── */}
        <TouchableOpacity style={h.mealCard} onPress={() => navigate('mealDetail')} activeOpacity={0.9}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Img source={require('./assets/New_assets/Mealphoto.webp')} style={h.mealPhoto} fallback="🍛" />
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={h.mealLabel}>TODAY'S MEAL</Text>
              <Text style={h.mealName}>Laxmi's Moong Dal, Brown Rice, Beetroot Thoran, Curd</Text>
              <View style={h.mealPill}>
                <Text style={h.mealPillText}>✓ Planned</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 14, marginLeft: 12 }}>
            {[
              { label: 'Iron', value: '28mg', icon: '🌿', color: '#5A8A5A' },
              { label: 'Protein', value: '68g', icon: '💪', color: '#D4874A' },
              { label: 'Folate', value: '600µg', icon: '💧', color: '#D4A843' },
            ].map((n, i) => (
              <View key={i} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>{n.icon}</Text>
                <Text style={{ fontSize: 10, color: C.textMuted, fontWeight: '600', marginTop: 2 }}>{n.label}</Text>
                <Text style={{ fontSize: 12, fontWeight: '800', color: C.text, marginTop: 1 }}>{n.value}</Text>
                <View style={{ width: 28, height: 3, backgroundColor: C.divider, borderRadius: 2, marginTop: 3 }}>
                  <View style={{ width: ['60%','75%','80%'][i], height: '100%', backgroundColor: n.color, borderRadius: 2 }} />
                </View>
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 20, color: C.textFaint, marginLeft: 6 }}>›</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ── Bottom Nav ── */}
      <View style={h.navBar}>
        {[
          { id: 'home', label: 'Home', icon: '🏠', active: true },
          { id: 'tracker', label: 'Tracker', icon: '📅', screen: 'nutrition' },
          { id: 'scan', label: 'Scan', center: true, icon: '📷', screen: 'scan' },
          { id: 'support', label: 'Support', icon: '🤝', screen: 'support' },
          { id: 'profile', label: 'Profile', icon: '👤', screen: 'profile' },
        ].map(tab => {
          if (tab.center) {
            return (
              <TouchableOpacity key={tab.id} style={h.navCenterBtn} onPress={() => navigate(tab.screen)}>
                <View style={h.navCenterCircle}><Text style={{ fontSize: 22 }}>{tab.icon}</Text></View>
                <Text style={h.navCenterLabel}>{tab.label}</Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity key={tab.id} style={h.navItem} onPress={() => tab.screen && navigate(tab.screen)}>
              <Text style={{ fontSize: 20, opacity: tab.active ? 1 : 0.5 }}>{tab.icon}</Text>
              <Text style={[h.navLabel, tab.active && { color: C.green, fontWeight: '700' }]}>{tab.label}</Text>
              {tab.active && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: C.green, marginTop: 2 }} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────────

const h = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    paddingTop: SAFE_TOP,
    paddingBottom: 10,
    backgroundColor: C.bg,
  },
  avatarShell: { position: 'relative' },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#D4C0A8',
    backgroundColor: '#F0E0D0',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ADE80',
    borderWidth: 2,
    borderColor: C.bg,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logo: {
    width: 22,
    height: 22,
  },
  brandText: {
    fontSize: 19,
    fontWeight: '800',
    color: C.green,
    letterSpacing: 0.3,
  },
  bell: {
    position: 'relative',
    padding: 6,
  },
  bellDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.orange,
    borderWidth: 1.5,
    borderColor: C.bg,
  },

  // Hero
  heroWrap: {
    marginHorizontal: PAD,
    marginTop: 8,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: C.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  heroBg: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: 20,
    paddingBottom: 24,
    // slight gradient-like bottom fade via background
    backgroundColor: 'rgba(253,248,240,0.45)',
  },
  heroGreet: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8B6F3E',
    lineHeight: 30,
  },
  heroSub: {
    fontSize: 13,
    color: C.textMid,
    marginTop: 6,
    lineHeight: 18,
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    marginHorizontal: PAD,
    marginTop: 16,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 14,
    shadowColor: C.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: C.border,
  },
  summBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summBadgeImg: {
    width: 28,
    height: 28,
  },
  summLabel: {
    fontSize: 10.5,
    color: C.textMuted,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  summValue: {
    fontSize: 14,
    fontWeight: '800',
    color: C.text,
    lineHeight: 20,
    marginTop: 2,
  },
  summSub: {
    fontSize: 11.5,
    color: C.textMid,
    marginTop: 2,
  },
  trackPill: {
    backgroundColor: C.greenLight,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  trackText: {
    fontSize: 10.5,
    color: C.green,
    fontWeight: '700',
  },

  // Feature Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    marginHorizontal: PAD,
    marginTop: 16,
  },
  featureCard: {
    width: CARD_W,
    borderRadius: 22,
    padding: 14,
    paddingBottom: 12,
    minHeight: 240,
    shadowColor: C.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    overflow: 'hidden',
  },
  featurePlate: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  featureImg: {
    width: 90,
    height: 90,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11.5,
    color: C.textMuted,
    lineHeight: 17,
  },
  featureArrow: {
    alignSelf: 'flex-end',
    marginTop: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },

  // Meal Card
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 22,
    marginHorizontal: PAD,
    marginTop: 16,
    padding: 14,
    shadowColor: C.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: C.border,
  },
  mealPhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: C.divider,
  },
  mealLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: C.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  mealName: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text,
    lineHeight: 19,
  },
  mealPill: {
    backgroundColor: C.greenLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  mealPillText: {
    fontSize: 11,
    color: C.green,
    fontWeight: '700',
  },

  // Bottom Nav
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: C.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'android' ? 12 : 26,
    shadowColor: C.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 10,
    borderTopWidth: 1,
    borderColor: C.border,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 2,
    gap: 3,
  },
  navLabel: {
    fontSize: 11,
    color: C.textMuted,
    fontWeight: '500',
  },
  navCenterBtn: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 2,
    gap: 3,
  },
  navCenterCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    shadowColor: C.green,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 4,
    borderColor: C.bg,
  },
  navCenterLabel: {
    fontSize: 11,
    color: C.textMuted,
    fontWeight: '500',
    marginTop: 2,
  },
});

// ─── Keep all existing imports and router below ────────────────────────────────

// Onboarding
import WelcomeScreen      from './src/screens/onboarding/WelcomeScreen';
import LanguageScreen     from './src/screens/onboarding/LanguageScreen';
import VoiceIntroScreen   from './src/screens/onboarding/VoiceIntroScreen';
import MaternalDataScreen from './src/screens/onboarding/MaternalDataScreen';
import BudgetScreen       from './src/screens/onboarding/BudgetScreen';
import AssignCookScreen   from './src/screens/onboarding/AssignCookScreen';

// Core hubs
import ANCTrackerScreen       from './src/screens/hubs/ANCTrackerScreen';
import NutritionTrackerScreen from './src/screens/hubs/NutritionTrackerScreen';
import SupportMarketplaceScreen from './src/screens/hubs/SupportMarketplaceScreen';
import ProfileScreen          from './src/screens/hubs/ProfileScreen';

// Logistics
import MealDetailScreen        from './src/screens/logistics/MealDetailScreen';
import DadiVsDoctorModal       from './src/screens/logistics/DadiVsDoctorModal';
import CookDelegationScreen    from './src/screens/logistics/CookDelegationScreen';
import WeeklyMealPlanScreen    from './src/screens/logistics/WeeklyMealPlanScreen';
import LocalSourcingScreen     from './src/screens/logistics/LocalSourcingScreen';
import SelectCookScreen        from './src/screens/logistics/SelectCookScreen';
import OrderConfirmationScreen from './src/screens/logistics/OrderConfirmationScreen';

// Health
import SymptomScreen       from './src/screens/health/SymptomScreen';
import TriageDietaryScreen from './src/screens/health/TriageDietaryScreen';
import EmergencyAlertModal from './src/screens/health/EmergencyAlertModal';
import DoctorBookingScreen from './src/screens/health/DoctorBookingScreen';

// Scan
import ScanFlowScreen from './src/screens/scan/ScanScreen';

// Maintenance
import WeeklySurveyScreen from './src/screens/maintenance/WeeklySurveyScreen';

// Shared
import VoiceFAB from './src/components/VoiceFAB';

// ─── Root Router ───────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [dadiVisible, setDadiVisible] = useState(false);
  const [emergencyVisible, setEmergencyVisible] = useState(false);
  const [hiredCook, setHiredCook] = useState(null);
  const nav = setScreen;

  const handleTriageResult = (type) => {
    if (type === 'emergency') setEmergencyVisible(true);
    else nav('triage');
  };

  // Onboarding
  if (screen === 'welcome')      return <WelcomeScreen onNext={() => nav('language')} />;
  if (screen === 'language')     return <LanguageScreen onNext={() => nav('voiceIntro')} />;
  if (screen === 'voiceIntro')   return <VoiceIntroScreen onNext={() => nav('maternalData')} />;
  if (screen === 'maternalData') return <MaternalDataScreen onNext={() => nav('budget')} />;
  if (screen === 'budget')       return <BudgetScreen onNext={() => nav('assignCook')} />;
  if (screen === 'assignCook')   return <AssignCookScreen onNext={() => nav('home')} />;

  // Hubs
  if (screen === 'ancTracker')    return <ANCTrackerScreen onBack={() => nav('home')} />;
  if (screen === 'nutrition')     return <NutritionTrackerScreen onBack={() => nav('home')} onScan={() => nav('scan')} />;
  if (screen === 'support')       return <SupportMarketplaceScreen onBack={() => nav('home')} onBook={() => nav('doctorBooking')} />;
  if (screen === 'profile')       return <ProfileScreen onBack={() => nav('home')} onLogout={() => nav('welcome')} />;

  // Logistics
  if (screen === 'mealDetail')
    return (
      <>
        <MealDetailScreen onBack={() => nav('home')} onNotifyCook={() => nav('cookDelegation')} onDadiDoctor={() => setDadiVisible(true)} />
        <DadiVsDoctorModal visible={dadiVisible} onClose={() => setDadiVisible(false)} />
      </>
    );
  if (screen === 'cookDelegation') return <CookDelegationScreen onBack={() => nav('mealDetail')} onDone={() => nav('home')} />;
  if (screen === 'weeklyPlan')     return <WeeklyMealPlanScreen onBack={() => nav('home')} />;
  if (screen === 'sourcing')       return <LocalSourcingScreen onBack={() => nav('home')} onSelectCook={() => nav('selectCook')} />;
  if (screen === 'selectCook')   return <SelectCookScreen onBack={() => nav('sourcing')} onHire={(cook) => { setHiredCook(cook); nav('orderConfirmation'); }} />;
  if (screen === 'orderConfirmation') return <OrderConfirmationScreen cook={hiredCook} onDone={() => nav('home')} />;

  // Health
  if (screen === 'symptom')
    return (
      <>
        <SymptomScreen onBack={() => nav('home')} onVoiceTriage={() => nav('voiceTriage')} onResult={handleTriageResult} />
        <EmergencyAlertModal visible={emergencyVisible} onClose={() => { setEmergencyVisible(false); nav('home'); }} onCallASHA={() => {}} onCallDoctor={() => nav('support')} />
      </>
    );
  if (screen === 'voiceTriage')
    return (
      <>
        <SymptomScreen onBack={() => nav('home')} onVoiceTriage={() => {}} onResult={handleTriageResult} />
        <EmergencyAlertModal visible={emergencyVisible} onClose={() => { setEmergencyVisible(false); nav('home'); }} onCallASHA={() => {}} onCallDoctor={() => nav('support')} />
      </>
    );
  if (screen === 'triage')        return <TriageDietaryScreen onBack={() => nav('symptom')} onBookDoctor={() => nav('doctorBooking')} />;
  if (screen === 'doctorBooking') return <DoctorBookingScreen onBack={() => nav('support')} onBooked={() => nav('home')} />;

  // Scan
  if (screen === 'scan') return <ScanFlowScreen onBack={() => nav('home')} onDone={() => nav('home')} />;

  // Maintenance
  if (screen === 'weeklySurvey') return <WeeklySurveyScreen onBack={() => nav('home')} onDone={() => nav('home')} />;

  // Home
  return <HomeScreen navigate={nav} />;
}
