import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const CARDS = [
  {
    belief: '"Avoid dal during pregnancy — it causes gas and harms the baby."',
    source:  'Common traditional belief',
    fact:    'Moong dal is one of the best protein and iron sources for pregnant women. Its easily digestible and recommended by ICMR for all trimesters.',
    doctor:  'Dr. ICMR Maternal Nutrition Guidelines 2023',
    safe:    true,
  },
  {
    belief: '"Eating papaya will cause a miscarriage."',
    source:  'Widely held traditional belief',
    fact:    'Raw/unripe papaya contains latex that may trigger contractions. Ripe papaya in small quantities is generally safe after the first trimester.',
    doctor:  'Dr. Ananya Sharma, Gynaecologist',
    safe:    null,
  },
  {
    belief: '"Saffron milk makes the baby fair-skinned."',
    source:  'Common household belief',
    fact:    "Skin colour is determined by genetics. Saffron milk has no effect on pigmentation. It does have mild antioxidant properties and is safe in small amounts.",
    doctor:  'Expert consensus',
    safe:    true,
  },
];

export default function DadiVsDoctorModal({ visible, onClose }) {
  const [idx, setIdx] = useState(0);
  const card = CARDS[idx];

  if (!visible) return null;

  return (
    <View style={s.overlay}>
      <View style={s.wrap}>
        <View style={s.header}>
          <Text style={s.headerTitle}>🧓 Dadi vs. Doctor</Text>
          <TouchableOpacity onPress={onClose}><Text style={s.close}>✕</Text></TouchableOpacity>
        </View>
        <Text style={s.headerSub}>Traditional belief meets clinical advice</Text>

        <View style={s.dots}>
          {CARDS.map((_,i) => (
            <TouchableOpacity key={i} onPress={() => setIdx(i)}>
              <View style={[s.dot, i===idx && s.dotOn]} />
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={s.body}>
          <View style={s.beliefCard}>
            <View style={s.beliefHeader}>
              <Text style={s.beliefEmoji}>🧓</Text>
              <Text style={s.beliefLabel}>Dadi says</Text>
            </View>
            <Text style={s.beliefTxt}>{card.belief}</Text>
            <Text style={s.beliefSource}>{card.source}</Text>
          </View>

          <View style={s.vsDivider}>
            <View style={s.vsLine} />
            <View style={s.vsCircle}><Text style={s.vsTxt}>VS</Text></View>
            <View style={s.vsLine} />
          </View>

          <View style={s.factCard}>
            <View style={s.factHeader}>
              <Text style={s.factEmoji}>👩‍⚕️</Text>
              <Text style={s.factLabel}>Doctor says</Text>
              {card.safe === true  && <View style={s.safePill}><Text style={s.safeTxt}>✓ Safe</Text></View>}
              {card.safe === false && <View style={s.warnPill}><Text style={s.warnTxt}>⚠ Caution</Text></View>}
            </View>
            <Text style={s.factTxt}>{card.fact}</Text>
            <Text style={s.factSource}>— {card.doctor}</Text>
          </View>

          <TouchableOpacity style={s.shareBtn}>
            <Text style={s.shareBtnTxt}>💬 Share with family via WhatsApp</Text>
          </TouchableOpacity>

          <View style={s.navRow}>
            <TouchableOpacity style={s.navBtn} onPress={() => setIdx(i => Math.max(0, i-1))} disabled={idx === 0}>
              <Text style={[s.navTxt, idx===0 && s.navDisabled]}>← Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.navBtn} onPress={() => setIdx(i => Math.min(CARDS.length-1, i+1))} disabled={idx === CARDS.length-1}>
              <Text style={[s.navTxt, idx===CARDS.length-1 && s.navDisabled]}>Next →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  overlay:     { position:'absolute', top:0, left:0, right:0, bottom:0,
                 backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'flex-end' },
  wrap:        { backgroundColor: C.bg, borderTopLeftRadius:24, borderTopRightRadius:24,
                 maxHeight:'90%' },
  header:      { flexDirection:'row', alignItems:'center', justifyContent:'space-between',
                 paddingHorizontal:20, paddingTop:20, paddingBottom:4 },
  headerTitle: { fontSize:20, fontWeight:'900', color: C.textDark },
  close:       { fontSize:20, color: C.textMuted, padding:4 },
  headerSub:   { fontSize:13, color: C.textMuted, paddingHorizontal:20, marginBottom:16 },
  dots:        { flexDirection:'row', gap:8, paddingHorizontal:20, marginBottom:8 },
  dot:         { width:8, height:8, borderRadius:4, backgroundColor: C.divider },
  dotOn:       { backgroundColor: C.green, width:20 },
  body:        { paddingHorizontal:20, paddingBottom:40 },
  beliefCard:  { backgroundColor:'#FFF8E8', borderRadius:20, padding:18, borderWidth:2,
                 borderColor:'#EAD4A0', marginBottom:12 },
  beliefHeader:{ flexDirection:'row', alignItems:'center', gap:8, marginBottom:10 },
  beliefEmoji: { fontSize:22 },
  beliefLabel: { fontSize:13, fontWeight:'800', color:'#8B6914' },
  beliefTxt:   { fontSize:15, color: C.textDark, fontStyle:'italic', lineHeight:22, marginBottom:8 },
  beliefSource:{ fontSize:11, color: C.textMuted },
  vsDivider:   { flexDirection:'row', alignItems:'center', gap:10, marginVertical:6 },
  vsLine:      { flex:1, height:1.5, backgroundColor: C.divider },
  vsCircle:    { width:36, height:36, borderRadius:18, backgroundColor: C.textDark,
                 alignItems:'center', justifyContent:'center' },
  vsTxt:       { color: C.cardWhite, fontSize:12, fontWeight:'900' },
  factCard:    { backgroundColor: C.softGreen, borderRadius:20, padding:18,
                 borderWidth:2, borderColor:'#B0D8BA', marginBottom:16 },
  factHeader:  { flexDirection:'row', alignItems:'center', gap:8, marginBottom:10, flexWrap:'wrap' },
  factEmoji:   { fontSize:22 },
  factLabel:   { fontSize:13, fontWeight:'800', color: C.green },
  safePill:    { backgroundColor: C.green, borderRadius:8, paddingHorizontal:8, paddingVertical:3 },
  safeTxt:     { fontSize:10, color: C.cardWhite, fontWeight:'800' },
  warnPill:    { backgroundColor: C.orange, borderRadius:8, paddingHorizontal:8, paddingVertical:3 },
  warnTxt:     { fontSize:10, color: C.cardWhite, fontWeight:'800' },
  factTxt:     { fontSize:14, color: C.textDark, lineHeight:21, marginBottom:8 },
  factSource:  { fontSize:11, color: C.textMid, fontStyle:'italic' },
  shareBtn:    { backgroundColor: '#25D366', borderRadius:16, paddingVertical:14,
                 alignItems:'center', marginBottom:16 },
  shareBtnTxt: { color: C.cardWhite, fontSize:14, fontWeight:'800' },
  navRow:      { flexDirection:'row', justifyContent:'space-between' },
  navBtn:      { padding:10 },
  navTxt:      { fontSize:14, color: C.green, fontWeight:'700' },
  navDisabled: { color: C.divider },
});
