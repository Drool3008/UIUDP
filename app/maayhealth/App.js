import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform, Dimensions, ScrollView } from 'react-native';
import { C } from './src/theme/colors';

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

// ─── Logistics ────────────────────────────────────────────────────────────────
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

// ─── Constants ───────────────────────────────────────────────────────────────
const { width: SW } = Dimensions.get('window');
const SAFE_TOP = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 50;
const PAD = 16, GAP = 12, CARD_W = (SW - PAD * 2 - GAP) / 2;

// ─── Home screen ─────────────────────────────────────────────────────────────

function HeroArt() {
  return (
    <View style={{ width:154, height:184, position:'relative' }}>
      <View style={{ position:'absolute', bottom:0, right:0, width:140, height:140, borderRadius:70, backgroundColor:'#EDD9B8', opacity:0.6 }} />
      <View style={{ position:'absolute', bottom:0, left:2, right:2, height:28, borderRadius:14, backgroundColor:'#C4956A' }} />
      <View style={{ position:'absolute', bottom:20, left:2, right:2, height:44, borderRadius:14, backgroundColor:'#D4A87A' }} />
      <View style={{ position:'absolute', bottom:8, right:4, width:18, height:50, borderRadius:9, backgroundColor:'#B8895A' }} />
      <View style={{ position:'absolute', bottom:52, left:36, width:60, height:68, borderRadius:30, backgroundColor:'#D4956A' }} />
      <View style={{ position:'absolute', bottom:58, left:52, width:44, height:50, borderRadius:22, backgroundColor:'#E0A87C' }} />
      <View style={{ position:'absolute', bottom:116, left:54, width:18, height:16, borderRadius:8, backgroundColor:'#D4956A' }} />
      <View style={{ position:'absolute', bottom:126, left:44, width:38, height:38, borderRadius:19, backgroundColor:'#C8845A' }} />
      <View style={{ position:'absolute', bottom:154, left:42, width:42, height:20, borderTopLeftRadius:21, borderTopRightRadius:21, backgroundColor:'#3D2010' }} />
      <View style={{ position:'absolute', bottom:64, left:78, width:18, height:28, borderRadius:4, backgroundColor:'#2D3748' }} />
      <View style={{ position:'absolute', bottom:67, left:80, width:14, height:22, borderRadius:2, backgroundColor:'#7CB9E8' }} />
      <View style={{ position:'absolute', top:4, left:2, width:22, height:22, borderRadius:11, backgroundColor:'#5A8A5A', transform:[{rotate:'-20deg'}] }} />
      <View style={{ position:'absolute', top:8, left:14, width:18, height:18, borderRadius:9, backgroundColor:'#4A7A4A', transform:[{rotate:'30deg'}] }} />
      <View style={{ position:'absolute', top:22, left:10, width:3, height:20, borderRadius:2, backgroundColor:'#5A7A5A' }} />
    </View>
  );
}

function HomeScreen({ navigate }) {
  return (
    <View style={{ flex:1, backgroundColor: C.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={h.navbar}>
        <View style={h.avatar}>
          <Text style={h.avatarTxt}>S</Text>
          <View style={h.onlineDot} />
        </View>
        <View style={h.brand}>
          <Text style={h.leaf}>🌿</Text>
          <Text style={h.brandTxt}>MaaHealth</Text>
        </View>
        <TouchableOpacity style={h.bellWrap}>
          <Text style={h.bell}>🔔</Text>
          <View style={h.bellDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* Hero */}
        <View style={h.hero}>
          <View style={h.heroLeft}>
            <View style={h.greetRow}>
              <Text style={h.sun}>☀️</Text>
              <Text style={h.greet}>Good morning,{'\n'}Savitri</Text>
            </View>
            <Text style={h.sub}>Week 32 · Here's your care plan for today</Text>
            <View style={h.bubble}><Text style={h.bubbleTxt}>You're on track today 🌱</Text></View>
          </View>
          <HeroArt />
        </View>

        {/* Summary row */}
        <View style={h.summaryRow}>
          <View style={h.summCard}>
            <Text style={h.summIcon}>📅</Text>
            <Text style={h.summLabel}>Next ANC Visit</Text>
            <Text style={h.summVal}>24 May 2025</Text>
            <Text style={h.summSub}>18 days to go</Text>
          </View>
          <View style={h.summCard}>
            <Text style={h.summIcon}>🌿</Text>
            <Text style={h.summLabel}>Today's Nutrition Goal</Text>
            <Text style={h.summVal}>Iron · Folate · Protein</Text>
            <View style={h.onTrack}><Text style={h.onTrackTxt}>✓ On track</Text></View>
          </View>
        </View>

        {/* Feature grid */}
        <View style={h.grid}>
          {[
            { title:'Symptom\nChecker',      desc:'Doctor-validated symptom check.', bg:'#EAF3EC', accent: C.green,  emoji:'🩺', screen:'symptom'       },
            { title:'ANC\nTracker',           desc:'Appointments and milestones.',    bg:'#FEF3D8', accent:'#C9963A', emoji:'📋', screen:'ancTracker'    },
            { title:'Meal Scan\n& Nutrition', desc:'Scan and track nutrition.',       bg:'#EAF3EC', accent: C.green,  emoji:'📷', screen:'scan'          },
            { title:'Cook\nHelper',           desc:"Send today's meal plan.",         bg:'#FDF2E7', accent:'#D4874A', emoji:'👩‍🍳', screen:'cookDelegation'},
          ].map((card, i) => (
            <TouchableOpacity key={i} style={[h.featureCard, { backgroundColor: card.bg }]}
              onPress={() => navigate(card.screen)} activeOpacity={0.82}>
              <View style={[h.featureIconWrap, { backgroundColor: card.accent+'22' }]}>
                <Text style={h.featureEmoji}>{card.emoji}</Text>
              </View>
              <Text style={[h.featureTitle, { color: card.accent }]}>{card.title}</Text>
              <Text style={h.featureDesc}>{card.desc}</Text>
              <View style={h.featureArrow}>
                <Text style={[h.featureArrowTxt, { color: card.accent }]}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meal card */}
        <TouchableOpacity style={h.mealCard} onPress={() => navigate('mealDetail')} activeOpacity={0.85}>
          <View style={h.mealImg}><Text style={h.mealImgEmoji}>🍛</Text></View>
          <View style={h.mealMid}>
            <Text style={h.mealEyebrow}>TODAY'S MEAL</Text>
            <Text style={h.mealName}>Moong Dal, Brown Rice,{'\n'}Beetroot Thoran, Curd</Text>
            <View style={h.plannedPill}><Text style={h.plannedTxt}>Planned ✓</Text></View>
          </View>
          <View style={h.mealNutri}>
            {[{c:'#E07878',l:'Iron',v:'28mg'},{c:'#7BBF8A',l:'Folate',v:'60g'},{c:'#E0C478',l:'Protein',v:'68g'}].map((n,i) => (
              <View key={i} style={h.nutriRow}>
                <View style={[h.nutriDot, { backgroundColor: n.c }]} />
                <Text style={h.nutriLabel}>{n.l}</Text>
                <Text style={h.nutriVal}>{n.v}</Text>
              </View>
            ))}
          </View>
          <Text style={h.mealArrow}>›</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom nav */}
      <View style={h.tabBar}>
        {[
          { id:'home',    label:'Home',    emoji:'🏠', screen:null          },
          { id:'tracker', label:'Tracker', emoji:'📊', screen:'nutrition'   },
          { id:'scan',    label:'Scan',    emoji:'📷', screen:'scan'        },
          { id:'support', label:'Support', emoji:'💬', screen:'support'     },
          { id:'profile', label:'Profile', emoji:'👤', screen:'profile'     },
        ].map(tab => (
          <TouchableOpacity key={tab.id} style={h.tabItem}
            onPress={() => tab.screen && navigate(tab.screen)} activeOpacity={0.7}>
            <Text style={[h.tabEmoji, tab.id==='home' && h.tabEmojiActive]}>{tab.emoji}</Text>
            <Text style={[h.tabLabel, tab.id==='home' && h.tabLabelActive]}>{tab.label}</Text>
            {tab.id === 'home' && <View style={h.tabDot} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Persistent Voice FAB */}
      <VoiceFAB onNavigate={navigate} />
    </View>
  );
}

const h = StyleSheet.create({
  navbar:    { flexDirection:'row', alignItems:'center', paddingHorizontal:PAD,
               paddingTop: SAFE_TOP + 4, paddingBottom:10, backgroundColor: C.bg },
  avatar:    { width:36, height:36, borderRadius:18, backgroundColor:'#E8D5C0',
               alignItems:'center', justifyContent:'center',
               borderWidth:1.5, borderColor:'#C8A888', position:'relative' },
  avatarTxt: { color:'#5A3820', fontWeight:'900', fontSize:14 },
  onlineDot: { position:'absolute', bottom:0, right:0, width:9, height:9, borderRadius:5,
               backgroundColor:'#4ADE80', borderWidth:1.5, borderColor: C.bg },
  brand:     { flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', gap:6 },
  leaf:      { fontSize:20 },
  brandTxt:  { fontSize:20, fontWeight:'800', color: C.green, letterSpacing:0.2 },
  bellWrap:  { width:36, alignItems:'flex-end', position:'relative' },
  bell:      { fontSize:22 },
  bellDot:   { position:'absolute', top:0, right:0, width:8, height:8, borderRadius:4,
               backgroundColor:'#D4874A', borderWidth:1.5, borderColor: C.bg },
  hero:      { flexDirection:'row', alignItems:'flex-end', paddingLeft:PAD, paddingTop:8,
               paddingBottom:0, minHeight:180 },
  heroLeft:  { flex:1, paddingBottom:20 },
  greetRow:  { flexDirection:'row', alignItems:'flex-start', gap:6, marginBottom:8, flexWrap:'wrap' },
  sun:       { fontSize:22, marginTop:3 },
  greet:     { fontSize:22, fontWeight:'800', color: C.textDark, lineHeight:28, flexShrink:1 },
  sub:       { fontSize:12.5, color: C.textMid, lineHeight:18, marginBottom:14 },
  bubble:    { backgroundColor: C.cardWhite, borderRadius:12, paddingHorizontal:10, paddingVertical:7,
               alignSelf:'flex-start', shadowColor:'#000', shadowOpacity:0.07, shadowRadius:6, elevation:2 },
  bubbleTxt: { fontSize:11, color: C.textMid },
  summaryRow:{ flexDirection:'row', gap:GAP, paddingHorizontal:PAD, marginTop:16, marginBottom:14 },
  summCard:  { flex:1, backgroundColor: C.cardWhite, borderRadius:18, padding:14, gap:5,
               shadowColor:'#C8BCA8', shadowOpacity:0.35, shadowOffset:{width:0,height:2},
               shadowRadius:8, elevation:3 },
  summIcon:  { fontSize:20 },
  summLabel: { fontSize:10, color: C.textMuted, fontWeight:'600', letterSpacing:0.2 },
  summVal:   { fontSize:13, fontWeight:'800', color: C.textDark, lineHeight:18 },
  summSub:   { fontSize:11, color: C.textMid },
  onTrack:   { backgroundColor:'#D6EDE0', borderRadius:8, paddingHorizontal:8, paddingVertical:3, alignSelf:'flex-start' },
  onTrackTxt:{ fontSize:10, color:'#2C6040', fontWeight:'700' },
  grid:      { flexDirection:'row', flexWrap:'wrap', gap:GAP, paddingHorizontal:PAD, marginBottom:14 },
  featureCard:    { width:CARD_W, borderRadius:22, overflow:'hidden', minHeight:195,
                    shadowColor:'#C8BCA8', shadowOpacity:0.30, shadowOffset:{width:0,height:2},
                    shadowRadius:8, elevation:3 },
  featureIconWrap:{ height:110, alignItems:'center', justifyContent:'center' },
  featureEmoji:   { fontSize:44 },
  featureTitle:   { fontSize:13, fontWeight:'800', color: C.textDark, lineHeight:18,
                    marginBottom:3, paddingHorizontal:12 },
  featureDesc:    { fontSize:10.5, color: C.textMuted, lineHeight:14, flex:1, paddingHorizontal:12 },
  featureArrow:   { alignSelf:'flex-end', paddingHorizontal:12, paddingBottom:12 },
  featureArrowTxt:{ fontSize:18, fontWeight:'700' },
  mealCard:  { flexDirection:'row', alignItems:'center', backgroundColor: C.cardWhite,
               borderRadius:22, marginHorizontal:PAD, padding:16, gap:12,
               shadowColor:'#C8BCA8', shadowOpacity:0.30, shadowOffset:{width:0,height:2},
               shadowRadius:8, elevation:3 },
  mealImg:   { width:60, height:60, borderRadius:30, backgroundColor:'#FEF3D8',
               alignItems:'center', justifyContent:'center', borderWidth:2, borderColor:'#EAE3D6' },
  mealImgEmoji:{ fontSize:28, lineHeight:34 },
  mealMid:   { flex:1 },
  mealEyebrow:{ fontSize:9, fontWeight:'700', color: C.textMuted, letterSpacing:0.9, marginBottom:4 },
  mealName:  { fontSize:12.5, fontWeight:'600', color: C.textDark, lineHeight:18 },
  plannedPill:{ backgroundColor:'#D6EDE0', borderRadius:8, paddingHorizontal:8, paddingVertical:3,
               alignSelf:'flex-start', marginTop:6 },
  plannedTxt:{ fontSize:10, color:'#2C6040', fontWeight:'700' },
  mealNutri: { gap:5 },
  nutriRow:  { flexDirection:'row', alignItems:'center', gap:5 },
  nutriDot:  { width:7, height:7, borderRadius:4 },
  nutriLabel:{ fontSize:10, color: C.textMuted, width:36 },
  nutriVal:  { fontSize:10.5, fontWeight:'700', color: C.textDark },
  mealArrow: { fontSize:22, color: C.textMuted },
  tabBar:    { flexDirection:'row', backgroundColor: C.cardWhite, borderTopWidth:1,
               borderTopColor:'#EAE3D6', paddingTop:10,
               paddingBottom: Platform.OS==='android' ? 10 : 26 },
  tabItem:   { flex:1, alignItems:'center', gap:3 },
  tabEmoji:  { fontSize:20, opacity:0.4 },
  tabEmojiActive: { opacity:1 },
  tabLabel:  { fontSize:10, color: C.textMuted },
  tabLabelActive: { color: C.green, fontWeight:'700' },
  tabDot:    { width:4, height:4, borderRadius:2, backgroundColor: C.green },
});

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
