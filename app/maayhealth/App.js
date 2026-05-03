import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Platform, Dimensions, ScrollView,
  Image,
} from 'react-native';

// ─── Theme tokens (matching the warm screenshot palette) ───────────────────────
const { width: SW } = Dimensions.get('window');
const PAD = 20;
const GAP = 14;
const CARD_W = (SW - PAD * 2 - GAP) / 2;

const T = {
  bg:          '#FAF5EE',     // very warm cream
  card:        '#FFFFFF',
  heroBg:      '#F5E6D0',     // warm peachy hero
  green:       '#2D6B4F',
  greenLight:  '#E8F0EC',
  gold:        '#C8953A',
  goldLight:   '#FDF3D8',
  orange:      '#D4874A',
  orangeLight: '#FDF2E7',
  textDark:    '#2C3E2D',
  textMid:     '#5A6B5C',
  textMuted:   '#8A9B8C',
  textFaint:   '#B8C5BA',
  divider:     '#EDE6DA',
  shadow:      '#C8B8A0',
};

const SAFE_TOP = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 52;

// ─── Hero Illustration (from assets) ─────────────────────────────
function HeroIllustration() {
  return (
    <Image
      source={require('./assets/New_assets/hero_illustration.png')}
      style={{ width: 170, height: 190, resizeMode: 'contain' }}
    />
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

function HomeScreen({ navigate }) {
  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={T.bg} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.avatarWrap}>
          <Image
            source={require('./assets/New_assets/User_avatar.png')}
            style={s.avatarImage}
          />
          <View style={s.onlineDot} />
        </View>

        <View style={s.brand}>
          <Image
            source={require('./assets/New_assets/App_logo.png')}
            style={s.logoImage}
          />
          <Text style={s.brandText}>MaaHealth</Text>
        </View>

        <TouchableOpacity style={s.bellBtn} activeOpacity={0.7}>
          <View style={s.bellIcon}>
            <View style={[s.bellBody, { borderWidth: 2, borderColor: T.textMuted, borderRadius: 10, width: 18, height: 20 }]} />
          </View>
          <View style={s.bellDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* ─── Hero Card ─── */}
        <View style={s.heroCard}>
          <View style={s.heroLeft}>
            <View style={s.greetRow}>
              <Text style={s.sunIcon}>☀️</Text>
              <View>
                <Text style={s.greetText}>Good morning,</Text>
                <Text style={s.greetName}>Savitri</Text>
              </View>
            </View>
            <Text style={s.heroSub}>Week 32 · Here's your care plan for today</Text>
          </View>
          <HeroIllustration />
        </View>

        {/* ─── Summary Cards ─── */}
        <View style={s.summaryRow}>
          <View style={s.summaryCard}>
            <View style={[s.iconCircle, { backgroundColor: T.goldLight }]}>
              <Text style={s.iconText}>📅</Text>
            </View>
            <View style={s.summaryContent}>
              <Text style={s.summaryLabel}>Next ANC Visit</Text>
              <Text style={s.summaryValue}>24 May 2025</Text>
              <Text style={s.summarySub}>18 days to go</Text>
            </View>
          </View>

          <View style={[s.summaryCard, { marginLeft: GAP }]}>
            <View style={[s.iconCircle, { backgroundColor: T.greenLight }]}>
              <Text style={s.iconText}>🌿</Text>
            </View>
            <View style={s.summaryContent}>
              <Text style={s.summaryLabel}>Today's Nutrition Goal</Text>
              <Text style={s.summaryValue}>Iron · Folate · Protein</Text>
              <View style={s.trackPill}>
                <Text style={s.trackText}>✓ On track</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─── Feature Grid ─── */}
        <View style={s.featureGrid}>
            {[
            {
              title: 'Symptom Checker',
              desc: 'Doctor-validated symptom check, smart guidance.',
              bg: T.greenLight,
              accent: T.green,
              image: require('./assets/New_assets/SymptomChecker.png'),
              screen: 'symptom',
            },
            {
              title: 'ANC Tracker',
              desc: 'Appointments, supplements, and weekly milestones.',
              bg: T.goldLight,
              accent: T.gold,
              image: require('./assets/New_assets/ANCTracker.png'),
              screen: 'ancTracker',
            },
            {
              title: 'Meal Scan & Nutrition',
              desc: 'Scan meals, analyze regional foods, track nutrition.',
              bg: T.greenLight,
              accent: T.green,
              image: require('./assets/New_assets/MealScan.png'),
              screen: 'scan',
            },
            {
              title: 'Cook Helper',
              desc: "Today's meal plan & notify cook instantly.",
              bg: T.orangeLight,
              accent: T.orange,
              image: require('./assets/New_assets/CookHelper.png'),
              screen: 'cookDelegation',
            },
          ].map((card, i) => (
            <TouchableOpacity
              key={i}
              style={[s.featureCard, { backgroundColor: card.bg }]}
              onPress={() => card.screen && navigate(card.screen)}
              activeOpacity={0.85}
            >
              <View style={s.featureTop}>
                <Image
                  source={card.image}
                  style={s.featureImage}
                />
              </View>
              <Text style={[s.featureTitle, { color: card.accent }]}>{card.title}</Text>
              <Text style={s.featureDesc}>{card.desc}</Text>
              <View style={s.featureArrowWrap}>
                <View style={[s.featureArrow, { backgroundColor: card.bg }]}>
                  <Text style={[s.featureArrowText, { color: card.accent }]}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── Today's Meal Card ─── */}
        <TouchableOpacity
          style={s.mealCard}
          onPress={() => navigate('mealDetail')}
          activeOpacity={0.9}
        >
          <View style={s.mealLeft}>
          <Image
            source={require('./assets/New_assets/Mealphoto.png')}
            style={s.mealImage}
          />
            <View style={s.mealInfo}>
              <Text style={s.mealEyebrow}>TODAY'S MEAL</Text>
              <Text style={s.mealName}>Laxmi's Moong Dal, Brown Rice, Beetroot Thoran, Curd</Text>
              <View style={s.mealPill}>
                <Text style={s.mealPillText}>✓ Planned</Text>
              </View>
            </View>
          </View>

          <View style={s.mealNutrients}>
            {[
              { color: '#E07070', label: 'Iron', value: '28mg' },
              { color: '#7BBF8A', label: 'Protein', value: '68g' },
              { color: '#E0C478', label: 'Folate', value: '600µg' },
            ].map((n, i) => (
              <View key={i} style={s.nutrientItem}>
                <View style={[s.nutrientIcon, { backgroundColor: n.color + '20' }]}>
                  <Text style={[s.nutrientIconText, { color: n.color }]}>
                    {i === 0 ? '🌿' : i === 1 ? '💪' : '💧'}
                  </Text>
                </View>
                <Text style={s.nutrientLabel}>{n.label}</Text>
                <Text style={s.nutrientValue}>{n.value}</Text>
                <View style={s.nutrientBarTrack}>
                  <View style={[s.nutrientBarFill, { width: `${[60, 75, 80][i]}%`, backgroundColor: n.color }]} />
                </View>
              </View>
            ))}
          </View>

          <Text style={s.mealChevron}>›</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ─── Bottom Navigation ─── */}
      <View style={s.bottomNav}>
        {[
          { id: 'home', label: 'Home', icon: '🏠', active: true },
          { id: 'tracker', label: 'Tracker', icon: '📅', screen: 'nutrition' },
          { id: 'scan', label: 'Scan', icon: 'scan', center: true, screen: 'scan' },
          { id: 'support', label: 'Support', icon: '🤝', screen: 'support' },
          { id: 'profile', label: 'Profile', icon: '👤', screen: 'profile' },
        ].map((tab) => {
          if (tab.center) {
            return (
              <TouchableOpacity
                key={tab.id}
                style={s.navCenterBtn}
                onPress={() => navigate(tab.screen)}
                activeOpacity={0.85}
              >
                <View style={s.navCenterCircle}>
                  <Text style={s.navCenterIcon}>📷</Text>
                </View>
                <Text style={s.navCenterLabel}>{tab.label}</Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={tab.id}
              style={s.navItem}
              onPress={() => tab.screen && navigate(tab.screen)}
              activeOpacity={0.7}
            >
              <Text style={[s.navIcon, tab.active && s.navIconActive]}>{tab.icon}</Text>
              <Text style={[s.navLabel, tab.active && s.navLabelActive]}>{tab.label}</Text>
              {tab.active && <View style={s.navIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    paddingTop: SAFE_TOP,
    paddingBottom: 12,
    backgroundColor: T.bg,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarImage: {
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
    borderColor: T.bg,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 6,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
    color: T.green,
    letterSpacing: 0.3,
  },
  bellBtn: {
    position: 'relative',
    padding: 6,
  },
  bellIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBody: {
    width: 18,
    height: 20,
  },
  bellDot: {
    position: 'absolute',
    top: 6,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: T.orange,
    borderWidth: 1.5,
    borderColor: T.bg,
  },

  // Hero
  heroCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: T.heroBg,
    borderRadius: 28,
    marginHorizontal: PAD,
    marginTop: 8,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 0,
    overflow: 'hidden',
    minHeight: 175,
    shadowColor: T.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  heroLeft: {
    flex: 1,
    paddingBottom: 24,
    paddingRight: 8,
  },
  greetRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  sunIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  greetText: {
    fontSize: 15,
    fontWeight: '600',
    color: T.textMid,
  },
  greetName: {
    fontSize: 24,
    fontWeight: '800',
    color: T.textDark,
    lineHeight: 30,
  },
  heroSub: {
    fontSize: 12.5,
    color: T.textMid,
    lineHeight: 18,
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    marginHorizontal: PAD,
    marginTop: 18,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: T.card,
    borderRadius: 20,
    padding: 14,
    shadowColor: T.shadow,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 20,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 10.5,
    color: T.textMuted,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: 3,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '800',
    color: T.textDark,
    lineHeight: 20,
  },
  summarySub: {
    fontSize: 11.5,
    color: T.textMid,
    marginTop: 2,
  },
  trackPill: {
    backgroundColor: '#D6EDE0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  trackText: {
    fontSize: 10.5,
    color: T.green,
    fontWeight: '700',
  },

  // Feature Grid
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    marginHorizontal: PAD,
    marginTop: 18,
  },
  featureCard: {
    width: CARD_W,
    borderRadius: 24,
    padding: 14,
    paddingBottom: 12,
    minHeight: 200,
    shadowColor: T.shadow,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  featureTop: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: T.textDark,
    lineHeight: 22,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11.5,
    color: T.textMuted,
    lineHeight: 17,
    flex: 1,
  },
  featureArrowWrap: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  featureArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureArrowText: {
    fontSize: 16,
    fontWeight: '700',
  },

  // Meal Card
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.card,
    borderRadius: 24,
    marginHorizontal: PAD,
    marginTop: 16,
    padding: 14,
    shadowColor: T.shadow,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  mealLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: T.divider,
  },
  mealInfo: {
    marginLeft: 12,
    flex: 1,
  },
  mealEyebrow: {
    fontSize: 9,
    fontWeight: '800',
    color: T.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  mealName: {
    fontSize: 13,
    fontWeight: '700',
    color: T.textDark,
    lineHeight: 19,
  },
  mealPill: {
    backgroundColor: T.greenLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  mealPillText: {
    fontSize: 11,
    color: T.green,
    fontWeight: '700',
  },
  mealNutrients: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 12,
  },
  nutrientItem: {
    alignItems: 'center',
    width: 50,
  },
  nutrientIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  nutrientIconText: {
    fontSize: 14,
  },
  nutrientLabel: {
    fontSize: 9.5,
    color: T.textMuted,
    fontWeight: '600',
  },
  nutrientValue: {
    fontSize: 11.5,
    fontWeight: '800',
    color: T.textDark,
    marginTop: 1,
  },
  nutrientBarTrack: {
    width: 36,
    height: 3,
    backgroundColor: T.divider,
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  nutrientBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  mealChevron: {
    fontSize: 22,
    color: T.textFaint,
    fontWeight: '300',
    marginLeft: 8,
  },

  // Bottom Nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: T.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'android' ? 12 : 28,
    shadowColor: T.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 2,
  },
  navIcon: {
    fontSize: 22,
    opacity: 0.4,
    marginBottom: 2,
  },
  navIconActive: {
    opacity: 1,
    color: T.green,
  },
  navLabel: {
    fontSize: 10.5,
    color: T.textMuted,
    fontWeight: '500',
  },
  navLabelActive: {
    color: T.green,
    fontWeight: '700',
  },
  navIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: T.green,
    marginTop: 3,
  },
  navCenterBtn: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 2,
  },
  navCenterCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: T.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    shadowColor: T.green,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 4,
    borderColor: T.bg,
  },
  navCenterIcon: {
    fontSize: 24,
    color: T.card,
  },
  navCenterLabel: {
    fontSize: 10.5,
    color: T.textMuted,
    fontWeight: '500',
    marginTop: 2,
  },
});

// ─── Keep existing imports and router below ──────────────────────────────────

// ─── Onboarding ───────────────────────────────────────────────────────────────
import WelcomeScreen      from './src/screens/onboarding/WelcomeScreen';
import LanguageScreen     from './src/screens/onboarding/LanguageScreen';
import VoiceIntroScreen   from './src/screens/onboarding/VoiceIntroScreen';
import MaternalDataScreen from './src/screens/onboarding/MaternalDataScreen';
import BudgetScreen       from './src/screens/onboarding/BudgetScreen';
import AssignCookScreen   from './src/screens/onboarding/AssignCookScreen';

// ─── Core hubs ────────────────────────────────────────────────────────────────
import ANCTrackerScreen       from './src/screens/hubs/ANCTrackerScreen';
import NutritionTrackerScreen from './src/screens/hubs/NutritionTrackerScreen';
import SupportMarketplaceScreen from './src/screens/hubs/SupportMarketplaceScreen';
import ProfileScreen          from './src/screens/hubs/ProfileScreen';

// ─── Logistics ──────────────────────────────────────────────────────────────────
import MealDetailScreen        from './src/screens/logistics/MealDetailScreen';
import DadiVsDoctorModal       from './src/screens/logistics/DadiVsDoctorModal';
import CookDelegationScreen    from './src/screens/logistics/CookDelegationScreen';
import WeeklyMealPlanScreen    from './src/screens/logistics/WeeklyMealPlanScreen';
import LocalSourcingScreen     from './src/screens/logistics/LocalSourcingScreen';
import SelectCookScreen        from './src/screens/logistics/SelectCookScreen';
import OrderConfirmationScreen from './src/screens/logistics/OrderConfirmationScreen';

// ─── Health ───────────────────────────────────────────────────────────────────
import SymptomScreen       from './src/screens/health/SymptomScreen';
import TriageDietaryScreen from './src/screens/health/TriageDietaryScreen';
import EmergencyAlertModal from './src/screens/health/EmergencyAlertModal';
import DoctorBookingScreen from './src/screens/health/DoctorBookingScreen';

// ─── Scan ─────────────────────────────────────────────────────────────────────
import ScanFlowScreen from './src/screens/scan/ScanScreen';

// ─── Maintenance ──────────────────────────────────────────────────────────────
import WeeklySurveyScreen from './src/screens/maintenance/WeeklySurveyScreen';

// ─── Shared components ────────────────────────────────────────────────────────
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

  // Onboarding flow
  if (screen === 'welcome')      return <WelcomeScreen onNext={() => nav('language')} />;
  if (screen === 'language')     return <LanguageScreen onNext={() => nav('voiceIntro')} />;
  if (screen === 'voiceIntro')   return <VoiceIntroScreen onNext={() => nav('maternalData')} />;
  if (screen === 'maternalData') return <MaternalDataScreen onNext={() => nav('budget')} />;
  if (screen === 'budget')       return <BudgetScreen onNext={() => nav('assignCook')} />;
  if (screen === 'assignCook')   return <AssignCookScreen onNext={() => nav('home')} />;

  // Core hubs
  if (screen === 'ancTracker')
    return <ANCTrackerScreen onBack={() => nav('home')} />;
  if (screen === 'nutrition')
    return <NutritionTrackerScreen onBack={() => nav('home')} onScan={() => nav('scan')} />;
  if (screen === 'support')
    return <SupportMarketplaceScreen onBack={() => nav('home')} onBook={() => nav('doctorBooking')} />;
  if (screen === 'profile')
    return <ProfileScreen onBack={() => nav('home')} onLogout={() => nav('welcome')} />;

  // Logistics
  if (screen === 'mealDetail')
    return (
      <>
        <MealDetailScreen
          onBack={() => nav('home')}
          onNotifyCook={() => nav('cookDelegation')}
          onDadiDoctor={() => setDadiVisible(true)}
        />
        <DadiVsDoctorModal visible={dadiVisible} onClose={() => setDadiVisible(false)} />
      </>
    );
  if (screen === 'cookDelegation')
    return <CookDelegationScreen onBack={() => nav('mealDetail')} onDone={() => nav('home')} />;
  if (screen === 'weeklyPlan')
    return <WeeklyMealPlanScreen onBack={() => nav('home')} />;
  if (screen === 'sourcing')
    return <LocalSourcingScreen onBack={() => nav('home')} onSelectCook={() => nav('selectCook')} />;
  if (screen === 'selectCook')
    return <SelectCookScreen onBack={() => nav('sourcing')} onHire={(cook) => { setHiredCook(cook); nav('orderConfirmation'); }} />;
  if (screen === 'orderConfirmation')
    return <OrderConfirmationScreen cook={hiredCook} onDone={() => nav('home')} />;

  // Health
  if (screen === 'symptom')
    return (
      <>
        <SymptomScreen
          onBack={() => nav('home')}
          onVoiceTriage={() => nav('voiceTriage')}
          onResult={handleTriageResult}
        />
        <EmergencyAlertModal
          visible={emergencyVisible}
          onClose={() => { setEmergencyVisible(false); nav('home'); }}
          onCallASHA={() => {}}
          onCallDoctor={() => nav('support')}
        />
      </>
    );
  if (screen === 'voiceTriage')
    return (
      <>
        <SymptomScreen
          onBack={() => nav('home')}
          onVoiceTriage={() => {}}
          onResult={handleTriageResult}
        />
        <EmergencyAlertModal
          visible={emergencyVisible}
          onClose={() => { setEmergencyVisible(false); nav('home'); }}
          onCallASHA={() => {}}
          onCallDoctor={() => nav('support')}
        />
      </>
    );
  if (screen === 'triage')
    return <TriageDietaryScreen onBack={() => nav('symptom')} onBookDoctor={() => nav('doctorBooking')} />;
  if (screen === 'doctorBooking')
    return <DoctorBookingScreen onBack={() => nav('support')} onBooked={() => nav('home')} />;

  // Scan
  if (screen === 'scan')
    return <ScanFlowScreen onBack={() => nav('home')} onDone={() => nav('home')} />;

  // Maintenance
  if (screen === 'weeklySurvey')
    return <WeeklySurveyScreen onBack={() => nav('home')} onDone={() => nav('home')} />;

  // Home (default)
  return <HomeScreen navigate={nav} />;
}
