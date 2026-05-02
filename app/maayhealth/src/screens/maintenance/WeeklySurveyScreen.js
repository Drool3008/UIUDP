import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const QUESTIONS = [
  {
    q: 'How are you feeling overall this week?',
    options: ['Very good 😊', 'Good 🙂', 'Okay 😐', 'Not great 😔'],
  },
  {
    q: 'How well did you follow your meal plan?',
    options: ['All meals ✅', 'Most meals 👍', 'Some meals 😐', 'Struggled ❌'],
  },
  {
    q: 'Did your cook prepare the suggested meals?',
    options: ['Every day', 'Most days', 'Sometimes', 'Not at all'],
  },
  {
    q: 'Any budget concerns this week?',
    options: ['No issues', 'Slightly tight', 'Over budget', 'Couldn\'t afford'],
  },
];

export default function WeeklySurveyScreen({ onBack, onDone }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answer = (qi, ai) => setAnswers(a => ({ ...a, [qi]: ai }));
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.successBody}>
          <Text style={s.successEmoji}>🌟</Text>
          <Text style={s.successTitle}>Thank you, Savitri!</Text>
          <Text style={s.successSub}>Your feedback is being analysed to update your plan for next week.</Text>
          <View style={s.aiCard}>
            <Text style={s.aiIcon}>🤖</Text>
            <View style={s.aiInfo}>
              <Text style={s.aiTitle}>AI is updating your plan</Text>
              <Text style={s.aiSub}>New meal plan available in your language by Sunday evening.</Text>
            </View>
          </View>
          <TouchableOpacity style={s.btn} onPress={onDone}>
            <Text style={s.btnTxt}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <View>
          <Text style={s.title}>Weekly Check-in</Text>
          <Text style={s.sub}>4 quick questions · 2 minutes</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        <View style={s.triggerCard}>
          <Text style={s.triggerEmoji}>🗓</Text>
          <Text style={s.triggerTxt}>Sunday weekly check-in · Week 32</Text>
        </View>

        {QUESTIONS.map((q, qi) => (
          <View key={qi} style={s.questionCard}>
            <Text style={s.qNum}>Q{qi + 1}</Text>
            <Text style={s.qText}>{q.q}</Text>
            <View style={s.optionsGrid}>
              {q.options.map((opt, ai) => (
                <TouchableOpacity key={ai}
                  style={[s.optBtn, answers[qi] === ai && s.optBtnOn]}
                  onPress={() => answer(qi, ai)}>
                  <Text style={[s.optTxt, answers[qi] === ai && s.optTxtOn]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={[s.submitBtn, !allAnswered && s.submitDisabled]}
          onPress={handleSubmit} disabled={!allAnswered}>
          <Text style={s.submitTxt}>Submit & Update My Plan →</Text>
        </TouchableOpacity>

        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex:1, backgroundColor: C.bg },
  header:       { flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingVertical:14, gap:12 },
  backTxt:      { fontSize:24, color: C.green, fontWeight:'700' },
  title:        { fontSize:20, fontWeight:'800', color: C.textDark },
  sub:          { fontSize:12, color: C.textMuted },
  scroll:       { paddingHorizontal:20, paddingBottom:24 },
  triggerCard:  { backgroundColor: C.softGold, borderRadius:16, padding:14,
                  flexDirection:'row', alignItems:'center', gap:10, marginBottom:20 },
  triggerEmoji: { fontSize:24 },
  triggerTxt:   { fontSize:13, color: C.textDark, fontWeight:'600' },
  questionCard: { backgroundColor: C.cardWhite, borderRadius:20, padding:18, marginBottom:14,
                  shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  qNum:         { fontSize:11, color: C.textMuted, fontWeight:'700', letterSpacing:0.5, marginBottom:6 },
  qText:        { fontSize:15, fontWeight:'800', color: C.textDark, lineHeight:22, marginBottom:14 },
  optionsGrid:  { gap:8 },
  optBtn:       { borderRadius:12, paddingVertical:12, paddingHorizontal:14,
                  backgroundColor: C.bg, borderWidth:1.5, borderColor: C.divider },
  optBtnOn:     { backgroundColor: C.softGreen, borderColor: C.green },
  optTxt:       { fontSize:13, color: C.textMid, fontWeight:'500' },
  optTxtOn:     { color: C.green, fontWeight:'700' },
  submitBtn:    { backgroundColor: C.green, borderRadius:16, paddingVertical:16, alignItems:'center' },
  submitDisabled:{ opacity:0.4 },
  submitTxt:    { color: C.cardWhite, fontSize:15, fontWeight:'800' },
  successBody:  { flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:28, gap:20 },
  successEmoji: { fontSize:64 },
  successTitle: { fontSize:24, fontWeight:'900', color: C.green },
  successSub:   { fontSize:14, color: C.textMid, textAlign:'center', lineHeight:21 },
  aiCard:       { backgroundColor: C.softGreen, borderRadius:16, padding:16, flexDirection:'row',
                  gap:12, alignItems:'flex-start', width:'100%' },
  aiIcon:       { fontSize:24 },
  aiInfo:       { flex:1 },
  aiTitle:      { fontSize:14, fontWeight:'800', color: C.green },
  aiSub:        { fontSize:12, color: C.textMid, marginTop:3, lineHeight:18 },
  btn:          { width:'100%', backgroundColor: C.green, borderRadius:16,
                  paddingVertical:16, alignItems:'center' },
  btnTxt:       { color: C.cardWhite, fontSize:15, fontWeight:'800' },
});
