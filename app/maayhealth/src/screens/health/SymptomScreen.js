import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const QUICK = [
  { id:'dizzy',   label:'Dizziness',      emoji:'😵' },
  { id:'tired',   label:'Fatigue',         emoji:'😴' },
  { id:'nausea',  label:'Nausea',          emoji:'🤢' },
  { id:'swollen', label:'Swollen feet',    emoji:'🦶' },
  { id:'headache',label:'Headache',        emoji:'🤕' },
  { id:'cramps',  label:'Leg cramps',      emoji:'😣' },
  { id:'bp',      label:'High BP feeling', emoji:'❤️' },
  { id:'bleed',   label:'Bleeding',        emoji:'🩸' },
];

export default function SymptomScreen({ onBack, onVoiceTriage, onResult }) {
  const [selected, setSelected] = useState([]);
  const [severity, setSeverity] = useState(null);

  const toggle = (id) => setSelected(prev =>
    prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const isCritical = selected.some(s => ['bp','bleed'].includes(s)) || severity === 'severe';

  const handleSubmit = () => onResult(isCritical ? 'emergency' : 'dietary');

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Symptom Checker</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Voice entry */}
        <TouchableOpacity style={s.voiceCard} onPress={onVoiceTriage}>
          <View style={s.voiceFab}><Text style={s.voiceFabTxt}>🎤</Text></View>
          <View>
            <Text style={s.voiceTitle}>Speak your symptoms</Text>
            <Text style={s.voiceSub}>e.g. "I feel dizzy and have a headache"</Text>
          </View>
        </TouchableOpacity>

        <View style={s.orRow}>
          <View style={s.line} /><Text style={s.orTxt}>or select below</Text><View style={s.line} />
        </View>

        {/* Symptom grid */}
        <Text style={s.sectionLabel}>What are you feeling?</Text>
        <View style={s.grid}>
          {QUICK.map(sym => {
            const on = selected.includes(sym.id);
            const isCrit = ['bp','bleed'].includes(sym.id);
            return (
              <TouchableOpacity key={sym.id}
                style={[s.symCard, on && s.symCardOn, on && isCrit && s.symCardCrit]}
                onPress={() => toggle(sym.id)}>
                <Text style={s.symEmoji}>{sym.emoji}</Text>
                <Text style={[s.symLabel, on && s.symLabelOn]}>{sym.label}</Text>
                {on && isCrit && <Text style={s.critBadge}>⚠ Critical</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Severity */}
        {selected.length > 0 && (
          <View style={s.severityCard}>
            <Text style={s.severityTitle}>How severe do you feel?</Text>
            <View style={s.severityRow}>
              {['mild','moderate','severe'].map(sev => (
                <TouchableOpacity key={sev} style={[s.sevBtn, severity===sev && s.sevBtnOn(sev)]}
                  onPress={() => setSeverity(sev)}>
                  <Text style={[s.sevTxt, severity===sev && s.sevTxtOn]}>{sev}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selected.length > 0 && (
          <TouchableOpacity style={[s.submitBtn, isCritical && s.submitBtnCrit]} onPress={handleSubmit}>
            <Text style={s.submitTxt}>
              {isCritical ? '🚨 Get Emergency Guidance' : '✓ Check Symptoms'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex:1, backgroundColor: C.bg },
  header:        { flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingVertical:14, gap:12 },
  backTxt:       { fontSize:24, color: C.green, fontWeight:'700' },
  title:         { fontSize:20, fontWeight:'800', color: C.textDark },
  scroll:        { paddingHorizontal:20, paddingBottom:24 },
  voiceCard:     { backgroundColor: C.green, borderRadius:20, padding:18,
                   flexDirection:'row', alignItems:'center', gap:16, marginBottom:20 },
  voiceFab:      { width:52, height:52, borderRadius:26, backgroundColor:'rgba(255,255,255,0.2)',
                   alignItems:'center', justifyContent:'center' },
  voiceFabTxt:   { fontSize:26 },
  voiceTitle:    { fontSize:15, fontWeight:'800', color: C.cardWhite, marginBottom:3 },
  voiceSub:      { fontSize:12, color:'#A8D5BE' },
  orRow:         { flexDirection:'row', alignItems:'center', gap:10, marginBottom:20 },
  line:          { flex:1, height:1, backgroundColor: C.divider },
  orTxt:         { fontSize:12, color: C.textMuted },
  sectionLabel:  { fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:12 },
  grid:          { flexDirection:'row', flexWrap:'wrap', gap:10, marginBottom:20 },
  symCard:       { width:'47%', backgroundColor: C.cardWhite, borderRadius:16, padding:14,
                   alignItems:'center', gap:6, borderWidth:2, borderColor:'transparent',
                   shadowColor:'#000', shadowOpacity:0.04, shadowRadius:6, elevation:1 },
  symCardOn:     { borderColor: C.green, backgroundColor: C.softGreen },
  symCardCrit:   { borderColor: C.red, backgroundColor:'#FDECEA' },
  symEmoji:      { fontSize:28 },
  symLabel:      { fontSize:12, fontWeight:'600', color: C.textDark, textAlign:'center' },
  symLabelOn:    { color: C.green },
  critBadge:     { fontSize:10, color: C.red, fontWeight:'700' },
  severityCard:  { backgroundColor: C.cardWhite, borderRadius:20, padding:18, marginBottom:16,
                   shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  severityTitle: { fontSize:14, fontWeight:'800', color: C.textDark, marginBottom:12 },
  severityRow:   { flexDirection:'row', gap:10 },
  sevBtn:        { flex:1, borderRadius:12, paddingVertical:10, alignItems:'center',
                   backgroundColor: C.bg, borderWidth:1.5, borderColor: C.divider },
  sevBtnOn:      (sev) => ({
    backgroundColor: sev==='severe' ? C.red : sev==='moderate' ? C.orange : C.green,
    borderColor: sev==='severe' ? C.red : sev==='moderate' ? C.orange : C.green,
  }),
  sevTxt:        { fontSize:13, fontWeight:'600', color: C.textMid, textTransform:'capitalize' },
  sevTxtOn:      { color: C.cardWhite },
  submitBtn:     { backgroundColor: C.green, borderRadius:16, paddingVertical:16, alignItems:'center' },
  submitBtnCrit: { backgroundColor: C.red },
  submitTxt:     { color: C.cardWhite, fontSize:15, fontWeight:'800' },
});
