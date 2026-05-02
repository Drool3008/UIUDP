import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const NUTRIENTS = [
  { key:'iron',    label:'Iron',    unit:'mg', goal:27,  today:19, color:'#E07878', emoji:'🩸' },
  { key:'folate',  label:'Folate',  unit:'µg', goal:600, today:440, color:'#7BBF8A', emoji:'🌿' },
  { key:'protein', label:'Protein', unit:'g',  goal:75,  today:52, color:'#78A8E0', emoji:'💪' },
  { key:'calcium', label:'Calcium', unit:'mg', goal:1000, today:680, color:'#E0C478', emoji:'🥛' },
  { key:'vitD',    label:'Vit D',   unit:'IU', goal:600, today:200, color:'#C4A0E0', emoji:'☀️' },
];

const MEALS = [
  { type:'Breakfast', name:'Pesarattu + Sambar', kcal:320, logged:true, time:'8:30 AM' },
  { type:'Lunch',     name:'Palak Moong Dal + Brown Rice', kcal:480, logged:true, time:'1:00 PM' },
  { type:'Snack',     name:'Roasted Chana + Apple', kcal:180, logged:false, time:'4:00 PM' },
  { type:'Dinner',    name:'Khichdi + Ghee',        kcal:360, logged:false, time:'8:00 PM' },
];

function NutrientBar({ n }) {
  const pct = Math.min(100, (n.today / n.goal) * 100);
  return (
    <View style={nb.wrap}>
      <View style={nb.header}>
        <View style={nb.labelRow}>
          <Text style={nb.emoji}>{n.emoji}</Text>
          <Text style={nb.label}>{n.label}</Text>
        </View>
        <Text style={nb.values}>{n.today}{n.unit} <Text style={nb.goal}>/ {n.goal}{n.unit}</Text></Text>
      </View>
      <View style={nb.track}>
        <View style={[nb.fill, { width:`${pct}%`, backgroundColor: n.color }]} />
      </View>
      <Text style={nb.pctTxt}>{Math.round(pct)}% of daily goal</Text>
    </View>
  );
}

const nb = StyleSheet.create({
  wrap:     { marginBottom:14 },
  header:   { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  labelRow: { flexDirection:'row', alignItems:'center', gap:6 },
  emoji:    { fontSize:16 },
  label:    { fontSize:13, fontWeight:'700', color: C.textDark },
  values:   { fontSize:13, fontWeight:'700', color: C.textDark },
  goal:     { color: C.textMuted, fontWeight:'400' },
  track:    { height:10, backgroundColor: C.divider, borderRadius:5, overflow:'hidden' },
  fill:     { height:'100%', borderRadius:5 },
  pctTxt:   { fontSize:10, color: C.textMuted, marginTop:4 },
});

export default function NutritionTrackerScreen({ onBack, onScan }) {
  const [activeTab, setActiveTab] = useState('today');
  const totalKcal = MEALS.filter(m => m.logged).reduce((a, m) => a + m.kcal, 0);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.back}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Nutrition Tracker</Text>
        <TouchableOpacity style={s.scanBtn} onPress={onScan}>
          <Text style={s.scanTxt}>📷 Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={s.tabs}>
        {['today','weekly'].map(tab => (
          <TouchableOpacity key={tab} style={[s.tab, activeTab===tab && s.tabOn]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[s.tabTxt, activeTab===tab && s.tabTxtOn]}>
              {tab === 'today' ? "Today's Log" : 'Weekly Trends'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Calorie ring summary */}
        <View style={s.kcalCard}>
          <View style={s.kcalLeft}>
            <Text style={s.kcalLabel}>CALORIES TODAY</Text>
            <Text style={s.kcalNum}>{totalKcal}</Text>
            <Text style={s.kcalGoal}>of 2,100 kcal goal</Text>
            <View style={s.kcalBar}>
              <View style={[s.kcalFill, { width:`${(totalKcal/2100)*100}%` }]} />
            </View>
          </View>
          <View style={s.kcalRight}>
            <Text style={s.kcalEmoji}>⚡</Text>
            <Text style={s.kcalRemaining}>{2100 - totalKcal}</Text>
            <Text style={s.kcalRemainingLbl}>remaining</Text>
          </View>
        </View>

        {/* Nutrient bars */}
        <Text style={s.sectionTitle}>Key Nutrients</Text>
        <View style={s.nutriCard}>
          {NUTRIENTS.map(n => <NutrientBar key={n.key} n={n} />)}
        </View>

        {/* Meal log */}
        <Text style={s.sectionTitle}>Meal Log</Text>
        {MEALS.map((meal, i) => (
          <View key={i} style={s.mealRow}>
            <View style={[s.mealDot, meal.logged ? s.mealDotDone : s.mealDotPending]} />
            <View style={s.mealInfo}>
              <Text style={s.mealType}>{meal.type} · {meal.time}</Text>
              <Text style={s.mealName}>{meal.name}</Text>
              <Text style={s.mealKcal}>{meal.kcal} kcal</Text>
            </View>
            {!meal.logged && (
              <TouchableOpacity style={s.logBtn} onPress={onScan}>
                <Text style={s.logBtnTxt}>+ Log</Text>
              </TouchableOpacity>
            )}
            {meal.logged && <Text style={s.loggedBadge}>✓ Logged</Text>}
          </View>
        ))}

        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex:1, backgroundColor: C.bg },
  header:      { flexDirection:'row', alignItems:'center', paddingHorizontal:20,
                 paddingVertical:14, gap:12 },
  back:        { padding:4 },
  backTxt:     { fontSize:24, color: C.green, fontWeight:'700' },
  title:       { flex:1, fontSize:20, fontWeight:'800', color: C.textDark },
  scanBtn:     { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:12, paddingVertical:6 },
  scanTxt:     { fontSize:12, color: C.green, fontWeight:'700' },
  tabs:        { flexDirection:'row', marginHorizontal:20, marginBottom:16,
                 backgroundColor: C.cardWhite, borderRadius:12, padding:4,
                 shadowColor:'#000', shadowOpacity:0.04, shadowRadius:4, elevation:1 },
  tab:         { flex:1, borderRadius:10, paddingVertical:10, alignItems:'center' },
  tabOn:       { backgroundColor: C.green },
  tabTxt:      { fontSize:13, fontWeight:'600', color: C.textMuted },
  tabTxtOn:    { color: C.cardWhite },
  scroll:      { paddingHorizontal:20, paddingBottom:24 },
  kcalCard:    { backgroundColor: C.green, borderRadius:24, padding:20, flexDirection:'row',
                 justifyContent:'space-between', alignItems:'center', marginBottom:20 },
  kcalLeft:    { flex:1 },
  kcalLabel:   { fontSize:10, color:'#A8D5BE', fontWeight:'700', letterSpacing:0.8, marginBottom:4 },
  kcalNum:     { fontSize:36, fontWeight:'900', color: C.cardWhite },
  kcalGoal:    { fontSize:12, color:'#A8D5BE', marginBottom:10 },
  kcalBar:     { height:6, backgroundColor:'rgba(255,255,255,0.2)', borderRadius:3, overflow:'hidden' },
  kcalFill:    { height:'100%', backgroundColor: C.cardWhite, borderRadius:3 },
  kcalRight:   { alignItems:'center', gap:4 },
  kcalEmoji:   { fontSize:30 },
  kcalRemaining:{ fontSize:22, fontWeight:'900', color: C.cardWhite },
  kcalRemainingLbl: { fontSize:11, color:'#A8D5BE' },
  sectionTitle:{ fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:12 },
  nutriCard:   { backgroundColor: C.cardWhite, borderRadius:20, padding:18, marginBottom:20,
                 shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  mealRow:     { flexDirection:'row', alignItems:'center', gap:12, backgroundColor: C.cardWhite,
                 borderRadius:16, padding:14, marginBottom:10,
                 shadowColor:'#000', shadowOpacity:0.04, shadowRadius:6, elevation:1 },
  mealDot:     { width:12, height:12, borderRadius:6 },
  mealDotDone: { backgroundColor: C.green },
  mealDotPending: { backgroundColor: C.divider },
  mealInfo:    { flex:1 },
  mealType:    { fontSize:10, color: C.textMuted, fontWeight:'600', marginBottom:2 },
  mealName:    { fontSize:14, fontWeight:'600', color: C.textDark },
  mealKcal:    { fontSize:11, color: C.textMuted, marginTop:2 },
  logBtn:      { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:12, paddingVertical:6 },
  logBtnTxt:   { fontSize:12, color: C.green, fontWeight:'700' },
  loggedBadge: { fontSize:11, color: C.green, fontWeight:'700' },
});
