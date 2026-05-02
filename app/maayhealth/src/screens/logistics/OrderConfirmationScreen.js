import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const STEPS = [
  { label:'Order placed',        done:true  },
  { label:'Cook notified',       done:true  },
  { label:'Ingredients sourced', done:false },
  { label:'Meal prepared',       done:false },
];

export default function OrderConfirmationScreen({ cook, onDone }) {
  const cookName = cook?.name ?? 'Sunita Devi';
  const cookFee  = cook?.fee  ?? '₹2,000/mo';

  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    if (animStep < 2) {
      const t = setTimeout(() => setAnimStep(s => s + 1), 800);
      return () => clearTimeout(t);
    }
  }, [animStep]);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={s.heroCard}>
          <Text style={s.heroEmoji}>🎉</Text>
          <Text style={s.heroTitle}>Cook Hired!</Text>
          <Text style={s.heroSub}>{cookName} has been assigned to your kitchen.</Text>
        </View>

        {/* Cook summary */}
        <View style={s.cookCard}>
          <Text style={s.cookEmoji}>👩‍🍳</Text>
          <View style={s.cookInfo}>
            <Text style={s.cookName}>{cookName}</Text>
            <Text style={s.cookFee}>{cookFee} · Active from today</Text>
          </View>
          <View style={s.verifiedBadge}>
            <Text style={s.verifiedTxt}>✓ Verified</Text>
          </View>
        </View>

        {/* Order timeline */}
        <Text style={s.sectionLabel}>Order status</Text>
        <View style={s.timeline}>
          {STEPS.map((step, i) => {
            const active = i <= animStep;
            return (
              <View key={i} style={s.timelineRow}>
                <View style={s.timelineLeft}>
                  <View style={[s.dot, active && s.dotOn]}>
                    {active && <Text style={s.dotCheck}>✓</Text>}
                  </View>
                  {i < STEPS.length - 1 && (
                    <View style={[s.connector, active && i < animStep && s.connectorOn]} />
                  )}
                </View>
                <Text style={[s.stepTxt, active && s.stepTxtOn]}>{step.label}</Text>
              </View>
            );
          })}
        </View>

        {/* WhatsApp message preview */}
        <Text style={s.sectionLabel}>Message sent to cook</Text>
        <View style={s.whatsappBubble}>
          <View style={s.waBubbleHeader}>
            <Text style={s.waIcon}>💬</Text>
            <Text style={s.waName}>{cookName}</Text>
            <Text style={s.waTime}>Just now</Text>
          </View>
          <Text style={s.waMsg}>
            {`Namaste ${cookName.split(' ')[0]}! 🙏\n\nYou have been hired by Savitri for daily maternal nutrition meals.\n\n📋 Today's meal plan has been shared. Please start from tomorrow's breakfast.\n\n✅ Meal plan for Week 32 is ready in the app.\n\n— MaaHealth`}
          </Text>
        </View>

        {/* What's next */}
        <View style={s.nextCard}>
          <Text style={s.nextTitle}>What happens next</Text>
          {[
            { emoji:'📋', txt:"Cook receives your weekly meal plan automatically" },
            { emoji:'🛒', txt:"Ingredients sourced from nearby verified vendors" },
            { emoji:'📲', txt:"You'll get a notification when each meal is ready" },
          ].map((item, i) => (
            <View key={i} style={s.nextRow}>
              <Text style={s.nextEmoji}>{item.emoji}</Text>
              <Text style={s.nextTxt}>{item.txt}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={s.doneBtn} onPress={onDone}>
          <Text style={s.doneBtnTxt}>Back to Home</Text>
        </TouchableOpacity>

        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:           { flex:1, backgroundColor: C.bg },
  scroll:         { paddingHorizontal:20, paddingTop:24, paddingBottom:24 },
  heroCard:       { backgroundColor: C.green, borderRadius:24, padding:28, alignItems:'center',
                    gap:10, marginBottom:20 },
  heroEmoji:      { fontSize:56 },
  heroTitle:      { fontSize:26, fontWeight:'900', color: C.cardWhite },
  heroSub:        { fontSize:13, color:'#A8D5BE', textAlign:'center' },
  cookCard:       { backgroundColor: C.cardWhite, borderRadius:18, padding:16, flexDirection:'row',
                    alignItems:'center', gap:12, marginBottom:24,
                    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  cookEmoji:      { fontSize:36 },
  cookInfo:       { flex:1 },
  cookName:       { fontSize:15, fontWeight:'800', color: C.textDark },
  cookFee:        { fontSize:12, color: C.textMuted, marginTop:2 },
  verifiedBadge:  { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:10, paddingVertical:5 },
  verifiedTxt:    { fontSize:11, color: C.green, fontWeight:'700' },
  sectionLabel:   { fontSize:14, fontWeight:'800', color: C.textDark, marginBottom:12 },
  timeline:       { backgroundColor: C.cardWhite, borderRadius:18, padding:18, marginBottom:24,
                    shadowColor:'#000', shadowOpacity:0.04, shadowRadius:6, elevation:1 },
  timelineRow:    { flexDirection:'row', alignItems:'flex-start', gap:14, minHeight:44 },
  timelineLeft:   { alignItems:'center', width:20 },
  dot:            { width:20, height:20, borderRadius:10, borderWidth:2, borderColor: C.divider,
                    backgroundColor: C.bg, alignItems:'center', justifyContent:'center' },
  dotOn:          { backgroundColor: C.green, borderColor: C.green },
  dotCheck:       { fontSize:10, color: C.cardWhite, fontWeight:'900' },
  connector:      { width:2, flex:1, backgroundColor: C.divider, marginVertical:2 },
  connectorOn:    { backgroundColor: C.green },
  stepTxt:        { fontSize:13, color: C.textMuted, paddingTop:2 },
  stepTxtOn:      { color: C.textDark, fontWeight:'600' },
  whatsappBubble: { backgroundColor:'#DCF8C6', borderRadius:18, padding:16, marginBottom:24,
                    borderWidth:1, borderColor:'#B8E6A0' },
  waBubbleHeader: { flexDirection:'row', alignItems:'center', gap:8, marginBottom:10 },
  waIcon:         { fontSize:16 },
  waName:         { flex:1, fontSize:13, fontWeight:'700', color:'#1A5C2A' },
  waTime:         { fontSize:11, color:'#5A7A5A' },
  waMsg:          { fontSize:13, color:'#1A3A1A', lineHeight:20 },
  nextCard:       { backgroundColor: C.cardWhite, borderRadius:18, padding:18, marginBottom:20,
                    gap:12, shadowColor:'#000', shadowOpacity:0.04, shadowRadius:6, elevation:1 },
  nextTitle:      { fontSize:14, fontWeight:'800', color: C.textDark, marginBottom:4 },
  nextRow:        { flexDirection:'row', gap:12, alignItems:'flex-start' },
  nextEmoji:      { fontSize:18, width:24 },
  nextTxt:        { flex:1, fontSize:13, color: C.textMid, lineHeight:19 },
  doneBtn:        { backgroundColor: C.green, borderRadius:16, paddingVertical:16, alignItems:'center' },
  doneBtnTxt:     { color: C.cardWhite, fontSize:15, fontWeight:'800' },
});
