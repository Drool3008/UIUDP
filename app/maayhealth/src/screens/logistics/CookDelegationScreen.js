import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { C } from '../../theme/colors';

const STEPS = [
  { id:'extract', label:'AI extracting ingredients',   icon:'🤖', done:false },
  { id:'message', label:'Generating WhatsApp message', icon:'💬', done:false },
  { id:'send',    label:'Sending to Laxmi',            icon:'📱', done:false },
  { id:'confirm', label:'Message delivered',           icon:'✅', done:false },
];

const WA_MESSAGE =
`🌿 *MaaHealth — Today's Meal Plan*
For: Savitri Devi (Week 32)

Please prepare:
• Moong Dal — 250g
• Brown Rice — 150g
• Drumstick leaves — 100g
• Jaggery — 30g
• Ghee — 1 tsp

Recipe tip: Pressure cook dal & rice together. Add drumstick leaves last. Serve hot. 🍛

_Sent by MaaHealth_`;

export default function CookDelegationScreen({ onBack, onDone }) {
  const [step, setStep] = useState(0);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep(s => s + 1), 900);
      return () => clearTimeout(t);
    } else {
      setNotified(true);
    }
  }, [step]);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Cook Helper</Text>
      </View>

      <View style={s.body}>
        {!notified ? (
          <>
            <Text style={s.processingTitle}>Notifying your cook…</Text>
            <View style={s.stepsCard}>
              {STEPS.map((st, i) => (
                <View key={st.id} style={s.stepRow}>
                  <View style={[s.stepCircle, i < step && s.stepDone, i === step && s.stepActive]}>
                    <Text style={s.stepIcon}>{i < step ? '✓' : st.icon}</Text>
                  </View>
                  {i < STEPS.length - 1 && (
                    <View style={[s.connector, i < step && s.connectorDone]} />
                  )}
                  <Text style={[s.stepLabel, i < step && s.stepLabelDone]}>{st.label}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* NOTIFIED state */}
            <View style={s.notifiedBadge}>
              <Text style={s.notifiedIcon}>✅</Text>
              <Text style={s.notifiedTitle}>NOTIFIED</Text>
              <Text style={s.notifiedSub}>Laxmi received the meal plan</Text>
            </View>

            {/* WhatsApp message preview */}
            <View style={s.waCard}>
              <View style={s.waHeader}>
                <Text style={s.waIcon}>💬</Text>
                <Text style={s.waLabel}>Message sent to Laxmi (+91 98765 43210)</Text>
              </View>
              <View style={s.waBubble}>
                <Text style={s.waText}>{WA_MESSAGE}</Text>
              </View>
              <Text style={s.waTime}>Delivered 8:02 AM ✓✓</Text>
            </View>

            <TouchableOpacity style={s.btn} onPress={onDone}>
              <Text style={s.btnTxt}>Back to Home</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex:1, backgroundColor: C.bg },
  header:        { flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingVertical:14, gap:12 },
  backTxt:       { fontSize:24, color: C.green, fontWeight:'700' },
  title:         { fontSize:20, fontWeight:'800', color: C.textDark },
  body:          { flex:1, paddingHorizontal:20, paddingTop:20 },
  processingTitle:{ fontSize:18, fontWeight:'800', color: C.textDark, marginBottom:24 },
  stepsCard:     { backgroundColor: C.cardWhite, borderRadius:20, padding:20, gap:0,
                   shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  stepRow:       { flexDirection:'row', alignItems:'center', gap:14, marginBottom:0 },
  stepCircle:    { width:40, height:40, borderRadius:20, backgroundColor: C.divider,
                   alignItems:'center', justifyContent:'center' },
  stepDone:      { backgroundColor: C.green },
  stepActive:    { backgroundColor: C.softGreen, borderWidth:2, borderColor: C.green },
  stepIcon:      { fontSize:18 },
  connector:     { position:'absolute', left:20, top:40, width:2, height:28,
                   backgroundColor: C.divider, zIndex:-1 },
  connectorDone: { backgroundColor: C.green },
  stepLabel:     { fontSize:14, color: C.textMid, fontWeight:'500', flex:1 },
  stepLabelDone: { color: C.green, fontWeight:'700' },
  notifiedBadge: { backgroundColor: C.green, borderRadius:24, padding:24, alignItems:'center',
                   gap:8, marginBottom:20 },
  notifiedIcon:  { fontSize:44 },
  notifiedTitle: { fontSize:22, fontWeight:'900', color: C.cardWhite, letterSpacing:1 },
  notifiedSub:   { fontSize:13, color:'#A8D5BE' },
  waCard:        { backgroundColor: C.cardWhite, borderRadius:20, padding:16, marginBottom:20,
                   shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  waHeader:      { flexDirection:'row', alignItems:'center', gap:8, marginBottom:12 },
  waIcon:        { fontSize:22 },
  waLabel:       { fontSize:12, color: C.textMuted, flex:1 },
  waBubble:      { backgroundColor:'#E8F8EE', borderRadius:16, borderTopLeftRadius:4,
                   padding:14, marginBottom:8 },
  waText:        { fontSize:13, color: C.textDark, lineHeight:21 },
  waTime:        { fontSize:10, color: C.textMuted, textAlign:'right' },
  btn:           { backgroundColor: C.green, borderRadius:16, paddingVertical:16, alignItems:'center' },
  btnTxt:        { color: C.cardWhite, fontSize:16, fontWeight:'800' },
});
