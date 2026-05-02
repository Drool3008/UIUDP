import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const FIXES = [
  { title:'Drink water now',        desc:'Dehydration causes dizziness. Drink 2 glasses slowly.',   emoji:'💧', urgent:true },
  { title:'Eat iron-rich snack',    desc:'Low iron = fatigue + dizziness. Try dates or jaggery.',   emoji:'🩸', urgent:true },
  { title:'Rest on your left side', desc:'Improves blood flow to baby. Rest for 20 minutes.',       emoji:'🛋', urgent:false },
  { title:"Today's lunch helps",    desc:'Palak Moong Dal has 12mg iron — exactly what you need.',  emoji:'🍲', urgent:false },
];

export default function TriageDietaryScreen({ onBack, onBookDoctor, symptoms = ['dizziness','fatigue'] }) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Triage Result</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Result hero */}
        <View style={s.resultCard}>
          <Text style={s.resultEmoji}>🌿</Text>
          <Text style={s.resultTitle}>Non-Critical</Text>
          <Text style={s.resultSub}>
            Your symptoms are manageable with dietary adjustments. No emergency action needed right now.
          </Text>
          <View style={s.resultChips}>
            {symptoms.map((sym, i) => (
              <View key={i} style={s.symChip}><Text style={s.symChipTxt}>{sym}</Text></View>
            ))}
          </View>
        </View>

        {/* AI explanation */}
        <View style={s.aiCard}>
          <View style={s.aiHeader}>
            <Text style={s.aiIcon}>🤖</Text>
            <Text style={s.aiLabel}>AI Triage — Dietary Fix Suggested</Text>
          </View>
          <Text style={s.aiTxt}>
            Based on your symptoms, low iron and mild dehydration are the most likely cause at Week 32. The fixes below address both.
          </Text>
        </View>

        {/* Fixes */}
        <Text style={s.sectionLabel}>Suggested actions</Text>
        {FIXES.map((fix, i) => (
          <View key={i} style={[s.fixCard, fix.urgent && s.fixCardUrgent]}>
            <Text style={s.fixEmoji}>{fix.emoji}</Text>
            <View style={s.fixInfo}>
              {fix.urgent && <View style={s.urgentPill}><Text style={s.urgentTxt}>Do now</Text></View>}
              <Text style={s.fixTitle}>{fix.title}</Text>
              <Text style={s.fixDesc}>{fix.desc}</Text>
            </View>
          </View>
        ))}

        {/* Update timeline */}
        <View style={s.logCard}>
          <Text style={s.logTxt}>📝 This check has been added to your health timeline.</Text>
        </View>

        {/* Book doctor option */}
        <TouchableOpacity style={s.doctorBtn} onPress={onBookDoctor}>
          <Text style={s.doctorBtnTxt}>Still concerned? Book a Consultation →</Text>
        </TouchableOpacity>

        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex:1, backgroundColor: C.bg },
  header:      { flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingVertical:14, gap:12 },
  backTxt:     { fontSize:24, color: C.green, fontWeight:'700' },
  title:       { fontSize:20, fontWeight:'800', color: C.textDark },
  scroll:      { paddingHorizontal:20, paddingBottom:24 },
  resultCard:  { backgroundColor: C.green, borderRadius:24, padding:24, alignItems:'center',
                 gap:8, marginBottom:16 },
  resultEmoji: { fontSize:44 },
  resultTitle: { fontSize:22, fontWeight:'900', color: C.cardWhite },
  resultSub:   { fontSize:13, color:'#A8D5BE', textAlign:'center', lineHeight:19 },
  resultChips: { flexDirection:'row', gap:8, flexWrap:'wrap', justifyContent:'center', marginTop:4 },
  symChip:     { backgroundColor:'rgba(255,255,255,0.2)', borderRadius:10, paddingHorizontal:12, paddingVertical:4 },
  symChipTxt:  { fontSize:11, color: C.cardWhite, fontWeight:'600', textTransform:'capitalize' },
  aiCard:      { backgroundColor:'#E8F0FF', borderRadius:16, padding:16, marginBottom:16 },
  aiHeader:    { flexDirection:'row', alignItems:'center', gap:8, marginBottom:6 },
  aiIcon:      { fontSize:18 },
  aiLabel:     { fontSize:12, fontWeight:'700', color:'#3050A0' },
  aiTxt:       { fontSize:13, color:'#3050A0', lineHeight:19 },
  sectionLabel:{ fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:12 },
  fixCard:     { backgroundColor: C.cardWhite, borderRadius:16, padding:16, marginBottom:10,
                 flexDirection:'row', alignItems:'flex-start', gap:14,
                 shadowColor:'#000', shadowOpacity:0.04, shadowRadius:6, elevation:1 },
  fixCardUrgent:{ borderWidth:2, borderColor: C.orange },
  fixEmoji:    { fontSize:28 },
  fixInfo:     { flex:1, gap:4 },
  urgentPill:  { backgroundColor: C.softOrange, borderRadius:8, paddingHorizontal:8,
                 paddingVertical:2, alignSelf:'flex-start' },
  urgentTxt:   { fontSize:10, color: C.orange, fontWeight:'800' },
  fixTitle:    { fontSize:14, fontWeight:'800', color: C.textDark },
  fixDesc:     { fontSize:12, color: C.textMid, lineHeight:18 },
  logCard:     { backgroundColor: C.softGreen, borderRadius:14, padding:14, marginBottom:14 },
  logTxt:      { fontSize:13, color: C.green, fontWeight:'500' },
  doctorBtn:   { borderWidth:1.5, borderColor: C.green, borderRadius:16,
                 paddingVertical:14, alignItems:'center' },
  doctorBtnTxt:{ fontSize:14, color: C.green, fontWeight:'700' },
});
