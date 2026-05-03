import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Platform, Dimensions, ScrollView,
  Image,
} from 'react-native';

// ─── Theme tokens ───────────────────────────────────────────────────────────────
const { width: SW } = Dimensions.get('window');
const PAD = 20;
const GAP = 12;
const CARD_W = (SW - PAD * 2 - GAP) / 2;

const C = {
  bg:          '#FAF5EE',
  card:        '#FFFFFF',
  hero:        '#F5E6D0',
  green:       '#2D6B4F',
  greenLight:  '#E8F0EC',
  gold:        '#C8953A',
  goldLight:   '#FDF3D8',
  orange:      '#D4874A',
  orangeLight: '#FDF2E7',
  text:        '#2C3E2D',
  textMid:     '#5A6B5C',
  textMuted:   '#8A9B8C',
  textFaint:   '#B8C5BA',
  border:      '#EDE6DA',
  shadow:      '#C8B8A0',
};

const SAFE_TOP = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 52;

// ─── Asset helpers ──────────────────────────────────────────────────────────────
// Wrap images in try-catch fallback so app doesn't break if asset is missing
function SafeImage({ source, style, fallback }) {
  try {
    return <Image source={source} style={style} resizeMode="contain" />;
  } catch (e) {
    return <View style={[style, { alignItems: 'center', justifyContent: 'center', backgroundColor: C.goldLight }]}><Text style={{ fontSize: 24 }}>{fallback}</Text></View>;
  }
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

function HomeScreen({ navigate }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={st.header}>
        <View style={st.avatarWrap}>
          <SafeImage
            source={require('./assets/New_assets/User_avatar.png')}
            style={st.avatarImg}
            fallback="👩"
          />
          <View style={st.onlineDot} />
        </View>

        <View style={st.brand}>
          <SafeImage
            source={require('./assets/New_assets/App_logo.png')}
            style={st.logoImg}
            fallback="🌿"
          />
          <Text style={st.brandText}>MaaHealth</Text>
        </View>

        <TouchableOpacity style={st.bellBtn} activeOpacity={0.7}>
          <Text style={{ fontSize: 22 }}>🔔</Text>
          <View style={st.bellDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>

        {/* ─── Hero ─── */}
        <View style={st.heroCard}>
          <View style={st.heroLeft}>
            <Text style={st.heroGreet}>Good morning,{'\n'}Savitri</Text>
            <Text style={st.heroSub}>Week 32 · Here's your care plan for today</Text>
          </View>
          <SafeImage
            source={require('./assets/New_assets/hero_illustration.png')}
            style={{ width: 160, height: 170 }}
            fallback="🤰"
          />
        </View>

        {/* ─── Summary Row ─── */}
        <View style={st.summaryRow}>
          <View style={st.summaryCard}>
            <View style={[st.summIconWrap, { backgroundColor: C.goldLight }]}>
              <Text style={{ fontSize: 22 }}>📅</Text>
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={st.summLabel}>Next ANC Visit</Text>
              <Text style={st.summValue}>24 May 2025</Text>
              <Text style={st.summSub}>18 days to go</Text>
            </View>
          </View>

          <View style={[st.summaryCard, { marginLeft: GAP }]}>
            <View style={[st.summIconWrap, { backgroundColor: C.greenLight }]}>
              <Text style={{ fontSize: 22 }}>🌿</Text>
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={st.summLabel}>Today's Nutrition Goal</Text>
              <Text style={st.summValue}>Iron · Folate · Protein</Text>
              <View style={st.trackPill}>
                <Text style={st.trackText}>✓ On track</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─── Feature Grid ─── */}
        <View style={st.grid}>
          {[
            { title: 'Symptom\nChecker', desc: 'Doctor-validated symptom check.', bg: '#EAF3EC', accent: C.green, img: require('./assets/New_assets/SymptomChecker.png'), fallback: '🩺', screen: 'symptom' },
            { title: 'ANC\nTracker', desc: 'Appointments and milestones.', bg: '#FEF3D8', accent: C.gold, img: require('./assets/New_assets/ANCTracker.png'), fallback: '📋', screen: 'ancTracker' },
            { title: 'Meal Scan\n& Nutrition', desc: 'Scan and track nutrition.', bg: '#EAF3EC', accent: C.green, img: require('./assets/New_assets/MealScan.png'), fallback: '📷', screen: 'scan' },
            { title: 'Cook\nHelper', desc: 'Notify cook instantly.', bg: '#FDF2E7', accent: C.orange, img: require('./assets/New_assets/CookHelper.png'), fallback: '👨‍🍳', screen: 'cookDelegation' },
          ].map((card, i) => (
            <TouchableOpacity
              key={i}
              style={[st.featureCard, { backgroundColor: card.bg }]}
              onPress={() => card.screen && navigate(card.screen)}
              activeOpacity={0.85}
            >
              <View style={st.featureImgWrap}>
                <SafeImage source={card.img} style={st.featureImg} fallback={card.fallback} />
              </View>
              <Text style={[st.featureTitle, { color: card.accent }]}>{card.title}</Text>
              <Text style={st.featureDesc}>{card.desc}</Text>
              <View style={st.featureArrow}>
                <Text style={{ fontSize: 18, color: card.accent, fontWeight: '700' }}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── Today's Meal ─── */}
        <TouchableOpacity style={st.mealCard} onPress={() => navigate('mealDetail')} activeOpacity={0.9}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <SafeImage
              source={require('./assets/New_assets/Mealphoto.png')}
              style={st.mealImg}
              fallback="🍛"
            />
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={st.mealEyebrow}>TODAY'S MEAL</Text>
              <Text style={st.mealName}>Laxmi's Moong Dal, Brown Rice, Beetroot Thoran, Curd</Text>
              <View style={st.mealPill}>
                <Text style={st.mealPillText}>✓ Planned</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 16, marginLeft: 12 }}>
            {[
              { label: 'Iron', value: '28mg', color: '#E07070' },
              { label: 'Protein', value: '68g', color: '#7BBF8A' },
              { label: 'Folate', value: '600µg', color: '#E0C478' },
            ].map((n, i) => (
              <View key={i} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 10, color: C.textMuted, fontWeight: '600' }}>{n.label}</Text>
                <Text style={{ fontSize: 12, fontWeight: '800', color: C.text, marginTop: 2 }}>{n.value}</Text>
                <View style={{ width: 32, height: 3, backgroundColor: C.border, borderRadius: 2, marginTop: 4 }}>
                  <View style={{ width: ['60%', '75%', '80%'][i], height: '100%', backgroundColor: n.color, borderRadius: 2 }} />
                </View>
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 22, color: C.textFaint, marginLeft: 8 }}>›</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ─── Bottom Nav ─── */}
      <View style={st.navBar}>
        {[
          { id: 'home', label: 'Home', icon: '🏠', active: true },
          { id: 'tracker', label: 'Tracker', icon: '📅', screen: 'nutrition' },
          { id: 'scan', label: 'Scan', center: true, icon: '📷', screen: 'scan' },
          { id: 'support', label: 'Support', icon: '🤝', screen: 'support' },
          { id: 'profile', label: 'Profile', icon: '👤', screen: 'profile' },
        ].map((tab) => {
          if (tab.center) {
            return (
              <TouchableOpacity key={tab.id} style={st.navCenter} onPress={() => navigate(tab.screen)}>
                <View style={st.navCenterCircle}>
                  <Text style={{ fontSize: 22 }}>{tab.icon}</Text>
                </View>
                <Text style={st.navCenterLabel}>{tab.label}</Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity key={tab.id} style={st.navItem} onPress={() => tab.screen && navigate(tab.screen)}>
              <Text style={{ fontSize: 20, opacity: tab.active ? 1 : 0.5 }}>{tab.icon}</Text>
              <Text style={[st.navLabel, tab.active && { color: C.green, fontWeight: '700' }]}>{tab.label}</Text>
              {tab.active && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: C.green, marginTop: 2 }} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const st = StyleSheet.create({
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
  avatarWrap: {
    position: 'relative',
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D4B896',
  },
  onlineDot: {
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
  logoImg: {
    width: 24,
    height: 24,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
    color: C.green,
    letterSpacing: 0.3,
  },
  bellBtn: {
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
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.hero,
    borderRadius: 24,
    marginHorizontal: PAD,
    marginTop: 8,
    padding: 20,
    minHeight: 160,
    shadowColor: C.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0DCC0',
  },
  heroLeft: {
    flex: 1,
  },
  heroGreet: {
    fontSize: 24,
    fontWeight: '800',
    color: C.text,
    lineHeight: 32,
  },
  heroSub: {
    fontSize: 13,
    color: C.textMid,
    marginTop: 8,
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
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: C.border,
  },
  summIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summLabel: {
    fontSize: 11,
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
    fontSize: 11,
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
    minHeight: 210,
    shadowColor: C.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  featureImgWrap: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureImg: {
    width: 110,
    height: 110,
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
    marginTop: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: C.border,
  },
  mealImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: C.border,
  },
  mealEyebrow: {
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
    paddingBottom: Platform.OS === 'android' ? 12 : 28,
    shadowColor: C.shadow,
    shadowOpacity: 0.2,
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
  navCenter: {
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
    shadowRadius: 12,
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

// ─── Keep existing imports and router ───────────────────────────────────────────

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

// ─── Root Router ──────────────────────────────────────────────────────────────

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
