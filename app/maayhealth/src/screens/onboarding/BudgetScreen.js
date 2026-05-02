import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { C } from '../../theme/colors';

const MIN = 500, MAX = 3000, DEFAULT = 1500;
const PRESETS = [500, 1000, 1500, 2000, 2500, 3000];

export default function BudgetScreen({ onNext }) {
  const [budget, setBudget] = useState(DEFAULT);

  const steps = Math.round((MAX - MIN) / 100);
  const pct   = (budget - MIN) / (MAX - MIN);

  const nudge = (dir) => setBudget(b => Math.min(MAX, Math.max(MIN, b + dir * 100)));

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.progressRow}>
        {[1,2,3,4].map(i => <View key={i} style={[s.pip, i <= 3 && s.pipOn]} />)}
      </View>

      <View style={s.body}>
        <Text style={s.step}>Step 3 of 4</Text>
        <Text style={s.title}>Weekly food budget</Text>
        <Text style={s.sub}>We'll build your meal plan around this. You can change it anytime.</Text>

        {/* Big display */}
        <View style={s.displayCard}>
          <Text style={s.rupee}>₹</Text>
          <Text style={s.amount}>{budget.toLocaleString('en-IN')}</Text>
          <Text style={s.perWeek}>per week</Text>
        </View>

        {/* Manual nudge */}
        <View style={s.nudgeRow}>
          <TouchableOpacity style={s.nudgeBtn} onPress={() => nudge(-1)}>
            <Text style={s.nudgeTxt}>− ₹100</Text>
          </TouchableOpacity>
          <View style={s.track}>
            <View style={[s.fill, { width: `${pct * 100}%` }]} />
            <View style={[s.thumb, { left: `${pct * 96}%` }]} />
          </View>
          <TouchableOpacity style={s.nudgeBtn} onPress={() => nudge(1)}>
            <Text style={s.nudgeTxt}>+ ₹100</Text>
          </TouchableOpacity>
        </View>

        <View style={s.rangeRow}>
          <Text style={s.rangeLabel}>₹{MIN}</Text>
          <Text style={s.rangeLabel}>₹{MAX}</Text>
        </View>

        {/* Preset chips */}
        <Text style={s.presetLabel}>Quick select</Text>
        <View style={s.presets}>
          {PRESETS.map(p => (
            <TouchableOpacity key={p} style={[s.chip, budget === p && s.chipOn]}
              onPress={() => setBudget(p)}>
              <Text style={[s.chipTxt, budget === p && s.chipTxtOn]}>₹{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Insight */}
        <View style={s.insightCard}>
          <Text style={s.insightIcon}>💡</Text>
          <Text style={s.insightTxt}>
            ₹1,500/week covers 3 iron-rich meals daily for a 3rd trimester mother in most Indian cities.
          </Text>
        </View>
      </View>

      <View style={s.footer}>
        <TouchableOpacity style={s.btn} onPress={onNext}>
          <Text style={s.btnTxt}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex:1, backgroundColor: C.bg },
  progressRow: { flexDirection:'row', gap:8, paddingHorizontal:24, paddingTop:16, paddingBottom:8 },
  pip:         { flex:1, height:4, borderRadius:2, backgroundColor: C.divider },
  pipOn:       { backgroundColor: C.green },
  body:        { flex:1, paddingHorizontal:24, paddingTop:12 },
  step:        { fontSize:12, color: C.textMuted, fontWeight:'600', marginBottom:6 },
  title:       { fontSize:22, fontWeight:'800', color: C.textDark, marginBottom:6 },
  sub:         { fontSize:13, color: C.textMid, marginBottom:28 },
  displayCard: { backgroundColor: C.cardWhite, borderRadius:24, paddingVertical:28,
                 alignItems:'center', marginBottom:28,
                 shadowColor:'#000', shadowOpacity:0.06, shadowRadius:10, elevation:3 },
  rupee:       { fontSize:20, color: C.textMuted, fontWeight:'700' },
  amount:      { fontSize:52, fontWeight:'900', color: C.green, lineHeight:60 },
  perWeek:     { fontSize:13, color: C.textMuted, marginTop:2 },
  nudgeRow:    { flexDirection:'row', alignItems:'center', gap:12, marginBottom:8 },
  nudgeBtn:    { backgroundColor: C.cardWhite, borderRadius:10, paddingHorizontal:10,
                 paddingVertical:8, borderWidth:1, borderColor: C.divider },
  nudgeTxt:    { fontSize:12, fontWeight:'700', color: C.green },
  track:       { flex:1, height:8, backgroundColor: C.divider, borderRadius:4,
                 position:'relative', justifyContent:'center' },
  fill:        { height:8, backgroundColor: C.green, borderRadius:4 },
  thumb:       { position:'absolute', width:20, height:20, borderRadius:10,
                 backgroundColor: C.green, top:-6,
                 shadowColor: C.green, shadowOpacity:0.4, shadowRadius:6, elevation:4 },
  rangeRow:    { flexDirection:'row', justifyContent:'space-between', marginBottom:24 },
  rangeLabel:  { fontSize:11, color: C.textMuted },
  presetLabel: { fontSize:13, fontWeight:'700', color: C.textDark, marginBottom:10 },
  presets:     { flexDirection:'row', flexWrap:'wrap', gap:10, marginBottom:24 },
  chip:        { paddingHorizontal:16, paddingVertical:8, borderRadius:20,
                 backgroundColor: C.cardWhite, borderWidth:1.5, borderColor: C.divider },
  chipOn:      { backgroundColor: C.green, borderColor: C.green },
  chipTxt:     { fontSize:13, fontWeight:'600', color: C.textDark },
  chipTxtOn:   { color: C.cardWhite },
  insightCard: { flexDirection:'row', gap:10, backgroundColor: C.softGold,
                 borderRadius:14, padding:14, alignItems:'flex-start' },
  insightIcon: { fontSize:18 },
  insightTxt:  { flex:1, fontSize:12, color: C.textMid, lineHeight:18 },
  footer:      { paddingHorizontal:24, paddingBottom:36 },
  btn:         { backgroundColor: C.green, borderRadius:16, paddingVertical:16, alignItems:'center' },
  btnTxt:      { color: C.cardWhite, fontSize:16, fontWeight:'800' },
});
