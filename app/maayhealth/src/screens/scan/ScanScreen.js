import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

function ScanCamera({ onCapture }) {
  return (
    <View style={cam.wrap}>
      <View style={cam.viewfinder}>
        <View style={cam.corner1} /><View style={cam.corner2} />
        <View style={cam.corner3} /><View style={cam.corner4} />
        <Text style={cam.hint}>Point at your meal</Text>
      </View>
      <View style={cam.controls}>
        <TouchableOpacity style={cam.btn} onPress={onCapture}>
          <View style={cam.shutterOuter}><View style={cam.shutterInner} /></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const cam = StyleSheet.create({
  wrap:         { flex:1, backgroundColor:'#0D1A12' },
  viewfinder:   { flex:1, margin:40, borderWidth:1, borderColor:'rgba(255,255,255,0.2)',
                  borderRadius:16, alignItems:'center', justifyContent:'center', position:'relative' },
  corner1:      { position:'absolute', top:-2, left:-2, width:30, height:30,
                  borderTopWidth:3, borderLeftWidth:3, borderColor:'#4ADE80', borderRadius:4 },
  corner2:      { position:'absolute', top:-2, right:-2, width:30, height:30,
                  borderTopWidth:3, borderRightWidth:3, borderColor:'#4ADE80', borderRadius:4 },
  corner3:      { position:'absolute', bottom:-2, left:-2, width:30, height:30,
                  borderBottomWidth:3, borderLeftWidth:3, borderColor:'#4ADE80', borderRadius:4 },
  corner4:      { position:'absolute', bottom:-2, right:-2, width:30, height:30,
                  borderBottomWidth:3, borderRightWidth:3, borderColor:'#4ADE80', borderRadius:4 },
  hint:         { color:'rgba(255,255,255,0.5)', fontSize:14, fontWeight:'500' },
  controls:     { height:100, alignItems:'center', justifyContent:'center' },
  btn:          { padding:8 },
  shutterOuter: { width:64, height:64, borderRadius:32, borderWidth:3, borderColor: C.cardWhite,
                  alignItems:'center', justifyContent:'center' },
  shutterInner: { width:52, height:52, borderRadius:26, backgroundColor: C.cardWhite },
});

function ScanAnalysis({ onDone }) {
  const [step, setStep] = useState(0);
  const steps = [
    'Identifying dish…',
    'Extracting ingredients…',
    'Matching regional recipe database…',
    'Calculating nutrition values…',
    'Done!',
  ];
  useEffect(() => {
    if (step < steps.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(t);
    } else {
      setTimeout(onDone, 500);
    }
  }, [step]);

  return (
    <View style={an.wrap}>
      <Text style={an.emoji}>🤖</Text>
      <Text style={an.title}>AI Analysing…</Text>
      <Text style={an.step}>{steps[step]}</Text>
      <View style={an.barTrack}>
        <View style={[an.barFill, { width:`${(step/(steps.length-1))*100}%` }]} />
      </View>
      <Text style={an.sub}>Powered by MaaHealth nutrition engine</Text>
    </View>
  );
}

const an = StyleSheet.create({
  wrap:    { flex:1, backgroundColor: C.bg, alignItems:'center', justifyContent:'center', padding:40, gap:16 },
  emoji:   { fontSize:64 },
  title:   { fontSize:22, fontWeight:'800', color: C.textDark },
  step:    { fontSize:14, color: C.textMid, height:22 },
  barTrack:{ width:'100%', height:8, backgroundColor: C.divider, borderRadius:4, overflow:'hidden' },
  barFill: { height:'100%', backgroundColor: C.green, borderRadius:4 },
  sub:     { fontSize:11, color: C.textMuted },
});

function ScanResult({ onLog, onDiscard }) {
  const result = {
    dish: 'Moong Dal Khichdi',
    confidence: 94,
    ingredients: [
      { name:'Moong Dal', qty:'~200g', iron:'7mg', protein:'12g' },
      { name:'Brown Rice', qty:'~120g', iron:'1mg', protein:'3g' },
      { name:'Drumstick leaves', qty:'~50g', iron:'6mg', protein:'2g' },
    ],
    nutrition: { kcal:380, iron:'14mg', folate:'180µg', protein:'17g', calcium:'120mg' },
  };

  return (
    <SafeAreaView style={sr.safe}>
      <View style={sr.header}>
        <Text style={sr.title}>Scan Result</Text>
        <View style={sr.confBadge}><Text style={sr.confTxt}>✓ {result.confidence}% match</Text></View>
      </View>
      <ScrollView contentContainerStyle={sr.scroll}>
        <View style={sr.dishCard}>
          <Text style={sr.dishEmoji}>🍛</Text>
          <View>
            <Text style={sr.dishName}>{result.dish}</Text>
            <Text style={sr.dishSub}>AI Identified · Regional recipe matched</Text>
          </View>
        </View>
        <Text style={sr.sectionLabel}>Detected ingredients</Text>
        {result.ingredients.map((ing, i) => (
          <View key={i} style={sr.ingRow}>
            <Text style={sr.ingName}>{ing.name} ({ing.qty})</Text>
            <Text style={sr.ingNutri}>Fe {ing.iron} · Prot {ing.protein}</Text>
          </View>
        ))}
        <Text style={sr.sectionLabel}>Nutrition summary</Text>
        <View style={sr.nutriGrid}>
          {Object.entries(result.nutrition).map(([k,v]) => (
            <View key={k} style={sr.nutriBox}>
              <Text style={sr.nutriVal}>{v}</Text>
              <Text style={sr.nutriKey}>{k}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={sr.logBtn} onPress={onLog}>
          <Text style={sr.logBtnTxt}>✓ Log this meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={sr.discardBtn} onPress={onDiscard}>
          <Text style={sr.discardTxt}>Discard & rescan</Text>
        </TouchableOpacity>
        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const sr = StyleSheet.create({
  safe:        { flex:1, backgroundColor: C.bg },
  header:      { flexDirection:'row', alignItems:'center', justifyContent:'space-between',
                 paddingHorizontal:20, paddingVertical:14 },
  title:       { fontSize:20, fontWeight:'800', color: C.textDark },
  confBadge:   { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:10, paddingVertical:4 },
  confTxt:     { fontSize:12, color: C.green, fontWeight:'700' },
  scroll:      { paddingHorizontal:20, paddingBottom:24 },
  dishCard:    { backgroundColor: C.green, borderRadius:20, padding:18, flexDirection:'row',
                 gap:14, alignItems:'center', marginBottom:16 },
  dishEmoji:   { fontSize:44 },
  dishName:    { fontSize:18, fontWeight:'800', color: C.cardWhite },
  dishSub:     { fontSize:11, color:'#A8D5BE', marginTop:3 },
  sectionLabel:{ fontSize:14, fontWeight:'800', color: C.textDark, marginBottom:10 },
  ingRow:      { backgroundColor: C.cardWhite, borderRadius:12, padding:12, marginBottom:8,
                 flexDirection:'row', justifyContent:'space-between' },
  ingName:     { fontSize:13, color: C.textDark, fontWeight:'500' },
  ingNutri:    { fontSize:11, color: C.textMuted },
  nutriGrid:   { flexDirection:'row', flexWrap:'wrap', gap:10, marginBottom:20 },
  nutriBox:    { backgroundColor: C.cardWhite, borderRadius:12, padding:12, alignItems:'center',
                 minWidth:60, shadowColor:'#000', shadowOpacity:0.04, shadowRadius:4, elevation:1 },
  nutriVal:    { fontSize:15, fontWeight:'800', color: C.green },
  nutriKey:    { fontSize:10, color: C.textMuted, marginTop:2, textTransform:'capitalize' },
  logBtn:      { backgroundColor: C.green, borderRadius:16, paddingVertical:16,
                 alignItems:'center', marginBottom:10 },
  logBtnTxt:   { color: C.cardWhite, fontSize:15, fontWeight:'800' },
  discardBtn:  { borderWidth:1.5, borderColor: C.divider, borderRadius:16,
                 paddingVertical:13, alignItems:'center' },
  discardTxt:  { fontSize:13, color: C.textMuted, fontWeight:'600' },
});

function ScanSuccess({ onDone }) {
  return (
    <View style={ss.wrap}>
      <Text style={ss.emoji}>🎉</Text>
      <Text style={ss.title}>Meal Logged!</Text>
      <Text style={ss.sub}>Your nutrition tracker has been updated.</Text>
      <View style={ss.progressCard}>
        <Text style={ss.progressLabel}>Iron — Daily progress</Text>
        <View style={ss.bar}><View style={[ss.fill, { width:'74%' }]} /></View>
        <Text style={ss.progressSub}>20mg of 27mg goal · +14mg from this meal</Text>
      </View>
      <View style={ss.nudgeCard}>
        <Text style={ss.nudgeEmoji}>💡</Text>
        <Text style={ss.nudgeTxt}>Next goal: Add a calcium source at dinner — try curd or ragi.</Text>
      </View>
      <TouchableOpacity style={ss.btn} onPress={onDone}>
        <Text style={ss.btnTxt}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const ss = StyleSheet.create({
  wrap:         { flex:1, backgroundColor: C.bg, alignItems:'center',
                  justifyContent:'center', padding:28, gap:16 },
  emoji:        { fontSize:64 },
  title:        { fontSize:26, fontWeight:'900', color: C.green },
  sub:          { fontSize:14, color: C.textMid },
  progressCard: { width:'100%', backgroundColor: C.cardWhite, borderRadius:20, padding:18,
                  gap:8, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  progressLabel:{ fontSize:13, fontWeight:'700', color: C.textDark },
  bar:          { height:10, backgroundColor: C.divider, borderRadius:5, overflow:'hidden' },
  fill:         { height:'100%', backgroundColor:'#E07878', borderRadius:5 },
  progressSub:  { fontSize:11, color: C.textMuted },
  nudgeCard:    { width:'100%', backgroundColor: C.softGold, borderRadius:16, padding:16,
                  flexDirection:'row', gap:10, alignItems:'flex-start' },
  nudgeEmoji:   { fontSize:20 },
  nudgeTxt:     { flex:1, fontSize:13, color: C.textDark, lineHeight:19 },
  btn:          { width:'100%', backgroundColor: C.green, borderRadius:16,
                  paddingVertical:16, alignItems:'center' },
  btnTxt:       { color: C.cardWhite, fontSize:15, fontWeight:'800' },
});

// Master scan flow controller
export default function ScanFlowScreen({ onBack, onDone }) {
  const [phase, setPhase] = useState('camera'); // camera | analysis | result | success

  if (phase === 'camera') return <ScanCamera onCapture={() => setPhase('analysis')} />;
  if (phase === 'analysis') return <ScanAnalysis onDone={() => setPhase('result')} />;
  if (phase === 'result') return (
    <ScanResult onLog={() => setPhase('success')} onDiscard={() => setPhase('camera')} />
  );
  if (phase === 'success') return <ScanSuccess onDone={onDone} />;
}
