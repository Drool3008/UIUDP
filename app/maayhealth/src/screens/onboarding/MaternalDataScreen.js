import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const STAGES = [
  { id:'t1', label:'1st Trimester', sub:'Weeks 1–12', emoji:'🌱' },
  { id:'t2', label:'2nd Trimester', sub:'Weeks 13–26', emoji:'🌿' },
  { id:'t3', label:'3rd Trimester', sub:'Weeks 27–40', emoji:'🌳' },
];

const CONDITIONS = [
  { id:'anemia',     label:'Anaemia',             emoji:'🩸' },
  { id:'diabetes',   label:'Gestational Diabetes', emoji:'🍬' },
  { id:'bp',         label:'High Blood Pressure',  emoji:'❤️' },
  { id:'thyroid',    label:'Thyroid Issue',         emoji:'🦋' },
  { id:'none',       label:'None of the above',    emoji:'✅' },
];

export default function MaternalDataScreen({ onNext }) {
  const [stage, setStage]   = useState('t3');
  const [week, setWeek]     = useState(32);
  const [conds, setConds]   = useState([]);

  const toggleCond = id => {
    if (id === 'none') { setConds(['none']); return; }
    setConds(prev => prev.includes('none')
      ? [id]
      : prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.progressRow}>
        {[1,2,3,4].map(i => <View key={i} style={[s.pip, i <= 2 && s.pipOn]} />)}
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.step}>Step 2 of 4</Text>
        <Text style={s.title}>Your pregnancy details</Text>
        <Text style={s.sub}>This helps us personalise your nutrition plan.</Text>

        {/* Trimester */}
        <Text style={s.sectionLabel}>Which trimester are you in?</Text>
        <View style={s.row}>
          {STAGES.map(st => (
            <TouchableOpacity
              key={st.id}
              style={[s.stageCard, stage === st.id && s.stageCardOn]}
              onPress={() => setStage(st.id)}
            >
              <Text style={s.stageEmoji}>{st.emoji}</Text>
              <Text style={[s.stageName, stage === st.id && s.stageNameOn]}>{st.label}</Text>
              <Text style={s.stageSub}>{st.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Week slider row */}
        <Text style={s.sectionLabel}>Pregnancy week</Text>
        <View style={s.weekRow}>
          <TouchableOpacity style={s.weekBtn} onPress={() => setWeek(w => Math.max(1, w-1))}>
            <Text style={s.weekBtnTxt}>−</Text>
          </TouchableOpacity>
          <View style={s.weekDisplay}>
            <Text style={s.weekNum}>{week}</Text>
            <Text style={s.weekLbl}>weeks</Text>
          </View>
          <TouchableOpacity style={s.weekBtn} onPress={() => setWeek(w => Math.min(42, w+1))}>
            <Text style={s.weekBtnTxt}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Conditions */}
        <Text style={s.sectionLabel}>Any health conditions?</Text>
        {CONDITIONS.map(c => {
          const on = conds.includes(c.id);
          return (
            <TouchableOpacity key={c.id} style={[s.condRow, on && s.condRowOn]}
              onPress={() => toggleCond(c.id)}>
              <Text style={s.condEmoji}>{c.emoji}</Text>
              <Text style={[s.condLabel, on && s.condLabelOn]}>{c.label}</Text>
              <View style={[s.checkbox, on && s.checkboxOn]}>
                {on && <Text style={s.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity style={s.btn} onPress={onNext}>
          <Text style={s.btnTxt}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: C.bg },
  progressRow: { flexDirection:'row', gap:8, paddingHorizontal:24, paddingTop:16, paddingBottom:8 },
  pip:         { flex:1, height:4, borderRadius:2, backgroundColor: C.divider },
  pipOn:       { backgroundColor: C.green },
  body:        { paddingHorizontal:24, paddingTop:12, paddingBottom:20 },
  step:        { fontSize:12, color: C.textMuted, fontWeight:'600', marginBottom:6 },
  title:       { fontSize:22, fontWeight:'800', color: C.textDark, marginBottom:6 },
  sub:         { fontSize:13, color: C.textMid, marginBottom:24 },
  sectionLabel:{ fontSize:14, fontWeight:'700', color: C.textDark, marginBottom:12, marginTop:4 },
  row:         { flexDirection:'row', gap:10, marginBottom:24 },
  stageCard:   { flex:1, borderRadius:16, backgroundColor: C.cardWhite, alignItems:'center',
                 paddingVertical:14, gap:4, borderWidth:2, borderColor:'transparent',
                 shadowColor:'#000', shadowOpacity:0.05, shadowRadius:6, elevation:2 },
  stageCardOn: { borderColor: C.green, backgroundColor: C.softGreen },
  stageEmoji:  { fontSize:22 },
  stageName:   { fontSize:11, fontWeight:'700', color: C.textDark, textAlign:'center' },
  stageNameOn: { color: C.green },
  stageSub:    { fontSize:9, color: C.textMuted, textAlign:'center' },
  weekRow:     { flexDirection:'row', alignItems:'center', justifyContent:'center',
                 gap:20, marginBottom:24 },
  weekBtn:     { width:44, height:44, borderRadius:22, backgroundColor: C.cardWhite,
                 alignItems:'center', justifyContent:'center',
                 shadowColor:'#000', shadowOpacity:0.06, shadowRadius:4, elevation:2 },
  weekBtnTxt:  { fontSize:22, color: C.green, fontWeight:'700' },
  weekDisplay: { alignItems:'center' },
  weekNum:     { fontSize:40, fontWeight:'800', color: C.green },
  weekLbl:     { fontSize:12, color: C.textMuted },
  condRow:     { flexDirection:'row', alignItems:'center', gap:12, backgroundColor: C.cardWhite,
                 borderRadius:14, padding:14, marginBottom:10, borderWidth:1.5,
                 borderColor:'transparent',
                 shadowColor:'#000', shadowOpacity:0.04, shadowRadius:4, elevation:1 },
  condRowOn:   { borderColor: C.green, backgroundColor: C.softGreen },
  condEmoji:   { fontSize:20 },
  condLabel:   { flex:1, fontSize:14, color: C.textDark, fontWeight:'500' },
  condLabelOn: { color: C.green, fontWeight:'700' },
  checkbox:    { width:22, height:22, borderRadius:11, borderWidth:2, borderColor: C.divider,
                 alignItems:'center', justifyContent:'center' },
  checkboxOn:  { backgroundColor: C.green, borderColor: C.green },
  checkmark:   { color: C.cardWhite, fontSize:12, fontWeight:'800' },
  footer:      { paddingHorizontal:24, paddingBottom:36 },
  btn:         { backgroundColor: C.green, borderRadius:16, paddingVertical:16, alignItems:'center' },
  btnTxt:      { color: C.cardWhite, fontSize:16, fontWeight:'800' },
});
