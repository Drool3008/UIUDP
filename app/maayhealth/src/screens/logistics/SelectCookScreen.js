import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const COOKS = [
  { name:'Sunita Devi',  dist:'0.6 km', rating:'4.7', specialty:'North Indian · Rajasthani',
    exp:'8 yrs', fee:'₹2,000/mo', avail:'Available now', emoji:'👩‍🍳',
    dishes:['Dal Baati', 'Methi Roti', 'Khichdi', 'Bajra Roti'] },
  { name:'Meera Bai',    dist:'1.0 km', rating:'4.8', specialty:'Gujarati · Maharashtrian',
    exp:'11 yrs', fee:'₹1,800/mo', avail:'Available now', emoji:'👩‍🍳',
    dishes:['Khichdi', 'Dhokla', 'Thepla', 'Amti Dal'] },
  { name:'Kavitha S.',   dist:'1.4 km', rating:'4.6', specialty:'South Indian · Karnataka',
    exp:'5 yrs', fee:'₹1,600/mo', avail:'Available tomorrow', emoji:'👩‍🍳',
    dishes:['Sambar', 'Rasam', 'Ragi Mudde', 'Kootu'] },
];

export default function SelectCookScreen({ onBack, onHire }) {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <View>
          <Text style={s.title}>Hire a Cook</Text>
          <Text style={s.sub}>Trained in maternal nutrition recipes</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        <View style={s.infoCard}>
          <Text style={s.infoEmoji}>🌿</Text>
          <Text style={s.infoTxt}>All cooks are verified and trained in your weekly meal plan recipes.</Text>
        </View>

        {COOKS.map((cook, i) => (
          <TouchableOpacity key={i}
            style={[s.cookCard, selected === i && s.cookCardOn]}
            onPress={() => setSelected(i)}
            activeOpacity={0.85}>

            <View style={s.cookTop}>
              <Text style={s.cookEmoji}>{cook.emoji}</Text>
              <View style={s.cookInfo}>
                <Text style={s.cookName}>{cook.name}</Text>
                <Text style={s.cookSpec}>{cook.specialty}</Text>
                <Text style={s.cookMeta}>{cook.exp} experience · {cook.dist}</Text>
              </View>
              <View style={s.cookRight}>
                <Text style={s.rating}>⭐ {cook.rating}</Text>
                <Text style={s.fee}>{cook.fee}</Text>
              </View>
            </View>

            <View style={s.availRow}>
              <View style={[s.availPill, cook.avail.includes('tomorrow') && s.availPillAlt]}>
                <Text style={[s.availTxt, cook.avail.includes('tomorrow') && s.availTxtAlt]}>
                  🟢 {cook.avail}
                </Text>
              </View>
            </View>

            <View style={s.dishRow}>
              {cook.dishes.map((d, di) => (
                <View key={di} style={s.dishChip}>
                  <Text style={s.dishTxt}>{d}</Text>
                </View>
              ))}
            </View>

            {selected === i && (
              <View style={s.selectedBadge}>
                <Text style={s.selectedTxt}>✓ Selected</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[s.hireBtn, selected === null && s.hireBtnDisabled]}
          disabled={selected === null}
          onPress={() => onHire(COOKS[selected])}>
          <Text style={s.hireBtnTxt}>
            {selected !== null ? `Hire ${COOKS[selected].name} →` : 'Select a cook first'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:           { flex:1, backgroundColor: C.bg },
  header:         { flexDirection:'row', alignItems:'center', paddingHorizontal:20,
                    paddingVertical:14, gap:12 },
  backTxt:        { fontSize:24, color: C.green, fontWeight:'700' },
  title:          { fontSize:20, fontWeight:'800', color: C.textDark },
  sub:            { fontSize:12, color: C.textMuted },
  scroll:         { paddingHorizontal:20, paddingBottom:24 },
  infoCard:       { backgroundColor: C.softGreen, borderRadius:14, padding:14, flexDirection:'row',
                    gap:10, alignItems:'center', marginBottom:20 },
  infoEmoji:      { fontSize:20 },
  infoTxt:        { flex:1, fontSize:12, color: C.green, lineHeight:18, fontWeight:'500' },
  cookCard:       { backgroundColor: C.cardWhite, borderRadius:20, padding:16, marginBottom:14,
                    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2,
                    borderWidth:2, borderColor:'transparent' },
  cookCardOn:     { borderColor: C.green },
  cookTop:        { flexDirection:'row', alignItems:'flex-start', gap:12, marginBottom:12 },
  cookEmoji:      { fontSize:36, width:42 },
  cookInfo:       { flex:1, gap:3 },
  cookName:       { fontSize:15, fontWeight:'800', color: C.textDark },
  cookSpec:       { fontSize:12, color: C.textMid, fontWeight:'500' },
  cookMeta:       { fontSize:11, color: C.textMuted },
  cookRight:      { alignItems:'flex-end', gap:4 },
  rating:         { fontSize:12, fontWeight:'700', color: C.textDark },
  fee:            { fontSize:12, fontWeight:'800', color: C.green },
  availRow:       { marginBottom:10 },
  availPill:      { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:10,
                    paddingVertical:4, alignSelf:'flex-start' },
  availPillAlt:   { backgroundColor: C.divider },
  availTxt:       { fontSize:11, color: C.green, fontWeight:'600' },
  availTxtAlt:    { color: C.textMuted },
  dishRow:        { flexDirection:'row', flexWrap:'wrap', gap:6 },
  dishChip:       { backgroundColor: C.bg, borderRadius:8, paddingHorizontal:8, paddingVertical:4,
                    borderWidth:1, borderColor: C.divider },
  dishTxt:        { fontSize:10, color: C.textMid, fontWeight:'500' },
  selectedBadge:  { position:'absolute', top:14, right:14, backgroundColor: C.green,
                    borderRadius:10, paddingHorizontal:10, paddingVertical:4 },
  selectedTxt:    { fontSize:11, color: C.cardWhite, fontWeight:'700' },
  hireBtn:        { backgroundColor: C.green, borderRadius:16, paddingVertical:16,
                    alignItems:'center', marginTop:4 },
  hireBtnDisabled:{ opacity:0.4 },
  hireBtnTxt:     { color: C.cardWhite, fontSize:15, fontWeight:'800' },
});
