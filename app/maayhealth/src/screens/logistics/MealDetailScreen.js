import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const INGREDIENTS = [
  { name:'Moong Dal',        qty:'250g', available:true  },
  { name:'Brown Rice',       qty:'150g', available:true  },
  { name:'Drumstick leaves', qty:'100g', available:false },
  { name:'Jaggery',          qty:'30g',  available:false },
  { name:'Ghee',             qty:'1 tsp',available:true  },
  { name:'Turmeric',         qty:'½ tsp',available:true  },
];

export default function MealDetailScreen({ onBack, onNotifyCook, onDadiDoctor }) {
  const [kitchenStocked, setKitchenStocked] = useState(null);
  const missing = INGREDIENTS.filter(i => !i.available);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Today's Meal</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero dish card */}
        <View style={s.dishCard}>
          <Text style={s.dishEmoji}>🍛</Text>
          <View style={s.dishInfo}>
            <Text style={s.dishName}>Moong Dal Khichdi</Text>
            <Text style={s.dishSub}>Iron-rich · Easy digestion · 440 kcal</Text>
            <View style={s.nutriChips}>
              {[{l:'Iron',c:'#E07878'},{l:'Folate',c:'#7BBF8A'},{l:'Protein',c:'#78A8E0'}].map((n,i)=>(
                <View key={i} style={[s.nutriChip,{backgroundColor:n.c+'22'}]}>
                  <Text style={[s.nutriChipTxt,{color:n.c}]}>{n.l}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <Text style={s.sectionTitle}>Ingredients</Text>
        <View style={s.ingredCard}>
          {INGREDIENTS.map((ing, i) => (
            <View key={i} style={[s.ingRow, i < INGREDIENTS.length-1 && s.ingBorder]}>
              <Text style={s.ingName}>{ing.name}</Text>
              <Text style={s.ingQty}>{ing.qty}</Text>
              <Text style={ing.available ? s.avail : s.missing}>
                {ing.available ? '✓' : '✗ Need to buy'}
              </Text>
            </View>
          ))}
        </View>

        {/* Kitchen stocked question */}
        <View style={s.questionCard}>
          <Text style={s.questionTxt}>🔍 Is the kitchen stocked?</Text>
          <Text style={s.questionSub}>{missing.length} items need to be purchased</Text>
          <View style={s.questionBtns}>
            <TouchableOpacity style={[s.qBtn, kitchenStocked===false && s.qBtnNo]}
              onPress={() => { setKitchenStocked(false); }}>
              <Text style={[s.qBtnTxt, kitchenStocked===false && s.qBtnTxtSelected]}>
                No — buy items
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.qBtn, kitchenStocked===true && s.qBtnYes]}
              onPress={() => { setKitchenStocked(true); onNotifyCook(); }}>
              <Text style={[s.qBtnTxt, kitchenStocked===true && s.qBtnTxtSelected]}>
                Yes — notify cook
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dadi vs Doctor */}
        <TouchableOpacity style={s.dadiCard} onPress={onDadiDoctor}>
          <Text style={s.dadiIcon}>🧓</Text>
          <View style={s.dadiInfo}>
            <Text style={s.dadiTitle}>Traditional belief?</Text>
            <Text style={s.dadiSub}>Tap to see Dadi vs Doctor fact card</Text>
          </View>
          <Text style={s.dadiArrow}>→</Text>
        </TouchableOpacity>

        {/* Recipe steps */}
        <Text style={s.sectionTitle}>Recipe Steps</Text>
        <View style={s.stepsCard}>
          {[
            'Wash moong dal and rice together.',
            'Pressure cook with 3 cups water for 3 whistles.',
            'Heat ghee, add turmeric and pour over khichdi.',
            'Stir in drumstick leaves and jaggery. Cook 5 min.',
            'Serve hot with a teaspoon of ghee on top.',
          ].map((step, i) => (
            <View key={i} style={s.stepRow}>
              <View style={s.stepNum}><Text style={s.stepNumTxt}>{i+1}</Text></View>
              <Text style={s.stepTxt}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex:1, backgroundColor: C.bg },
  header:       { flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingVertical:14, gap:12 },
  backTxt:      { fontSize:24, color: C.green, fontWeight:'700' },
  title:        { fontSize:20, fontWeight:'800', color: C.textDark },
  scroll:       { paddingHorizontal:20, paddingBottom:24 },
  dishCard:     { backgroundColor: C.green, borderRadius:24, padding:20, flexDirection:'row',
                  gap:16, alignItems:'center', marginBottom:20 },
  dishEmoji:    { fontSize:54 },
  dishInfo:     { flex:1, gap:6 },
  dishName:     { fontSize:18, fontWeight:'800', color: C.cardWhite },
  dishSub:      { fontSize:12, color:'#A8D5BE' },
  nutriChips:   { flexDirection:'row', gap:6, flexWrap:'wrap' },
  nutriChip:    { borderRadius:8, paddingHorizontal:8, paddingVertical:3 },
  nutriChipTxt: { fontSize:10, fontWeight:'700' },
  sectionTitle: { fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:12 },
  ingredCard:   { backgroundColor: C.cardWhite, borderRadius:20, paddingVertical:4,
                  marginBottom:16, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  ingRow:       { flexDirection:'row', alignItems:'center', paddingHorizontal:16, paddingVertical:12 },
  ingBorder:    { borderBottomWidth:1, borderBottomColor: C.divider },
  ingName:      { flex:1, fontSize:14, color: C.textDark, fontWeight:'500' },
  ingQty:       { fontSize:13, color: C.textMuted, marginRight:12 },
  avail:        { fontSize:12, color: C.green, fontWeight:'700' },
  missing:      { fontSize:11, color: C.orange, fontWeight:'600' },
  questionCard: { backgroundColor: C.cardWhite, borderRadius:20, padding:18, marginBottom:14,
                  shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  questionTxt:  { fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:4 },
  questionSub:  { fontSize:12, color: C.textMuted, marginBottom:14 },
  questionBtns: { flexDirection:'row', gap:10 },
  qBtn:         { flex:1, borderRadius:12, paddingVertical:12, alignItems:'center',
                  backgroundColor: C.bg, borderWidth:1.5, borderColor: C.divider },
  qBtnYes:      { backgroundColor: C.green, borderColor: C.green },
  qBtnNo:       { backgroundColor: C.softOrange, borderColor: C.orange },
  qBtnTxt:      { fontSize:13, fontWeight:'700', color: C.textMid },
  qBtnTxtSelected: { color: C.cardWhite },
  dadiCard:     { backgroundColor: C.softGold, borderRadius:16, padding:16,
                  flexDirection:'row', alignItems:'center', gap:12, marginBottom:20 },
  dadiIcon:     { fontSize:30 },
  dadiInfo:     { flex:1 },
  dadiTitle:    { fontSize:14, fontWeight:'800', color: C.textDark },
  dadiSub:      { fontSize:12, color: C.textMid },
  dadiArrow:    { fontSize:18, color: C.gold },
  stepsCard:    { backgroundColor: C.cardWhite, borderRadius:20, padding:18, gap:14,
                  shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  stepRow:      { flexDirection:'row', gap:14, alignItems:'flex-start' },
  stepNum:      { width:26, height:26, borderRadius:13, backgroundColor: C.softGreen,
                  alignItems:'center', justifyContent:'center', flexShrink:0 },
  stepNumTxt:   { fontSize:12, fontWeight:'800', color: C.green },
  stepTxt:      { flex:1, fontSize:13, color: C.textDark, lineHeight:20 },
});
