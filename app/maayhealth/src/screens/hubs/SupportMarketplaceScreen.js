import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const EXPERTS = [
  { name:'Dr. Ananya Sharma', role:'Gynaecologist',       exp:'12 yrs', rating:'4.9', fee:'₹300',  avail:'Today 5PM', emoji:'👩‍⚕️', badge:'Expert Validated' },
  { name:'Priya Nair RD',     role:'Maternal Dietician',  exp:'8 yrs',  rating:'4.8', fee:'₹200',  avail:'Today 7PM', emoji:'🥗', badge:'Expert Validated' },
  { name:'Dr. Meena Iyer',    role:'ASHA Coordinator',   exp:'15 yrs', rating:'5.0', fee:'Free',   avail:'Now',       emoji:'🌿', badge:null },
  { name:'Suman Verma RD',    role:'Prenatal Nutritionist',exp:'6 yrs', rating:'4.7', fee:'₹150',  avail:'Tomorrow',  emoji:'🍎', badge:null },
];

export default function SupportMarketplaceScreen({ onBack, onBook }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id:'all', label:'All' },
    { id:'diet', label:'Dietician' },
    { id:'gyno', label:'Gynae' },
    { id:'free', label:'Free' },
  ];

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.back}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Support & Consult</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        <View style={s.heroCard}>
          <Text style={s.heroTitle}>Book a specialist</Text>
          <Text style={s.heroSub}>Expert-validated maternal health consultations in your language</Text>
        </View>

        <View style={s.filterRow}>
          {filters.map(f => (
            <TouchableOpacity key={f.id} style={[s.filterChip, filter===f.id && s.filterChipOn]}
              onPress={() => setFilter(f.id)}>
              <Text style={[s.filterTxt, filter===f.id && s.filterTxtOn]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {EXPERTS.map((e, i) => (
          <View key={i} style={s.expertCard}>
            <View style={s.expertTop}>
              <Text style={s.expertEmoji}>{e.emoji}</Text>
              <View style={s.expertInfo}>
                <Text style={s.expertName}>{e.name}</Text>
                <Text style={s.expertRole}>{e.role} · {e.exp}</Text>
                {e.badge && (
                  <View style={s.badgeWrap}>
                    <Text style={s.badgeEmoji}>✅</Text>
                    <Text style={s.badgeTxt}>{e.badge}</Text>
                  </View>
                )}
              </View>
              <View style={s.ratingWrap}>
                <Text style={s.star}>⭐</Text>
                <Text style={s.rating}>{e.rating}</Text>
              </View>
            </View>
            <View style={s.expertBottom}>
              <View style={s.availChip}>
                <Text style={s.availTxt}>🟢 {e.avail}</Text>
              </View>
              <TouchableOpacity style={s.bookBtn} onPress={onBook}>
                <Text style={s.bookBtnTxt}>Book · {e.fee}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex:1, backgroundColor: C.bg },
  header:      { flexDirection:'row', alignItems:'center', paddingHorizontal:20,
                 paddingVertical:14, gap:12 },
  back:        { padding:4 },
  backTxt:     { fontSize:24, color: C.green, fontWeight:'700' },
  title:       { flex:1, fontSize:20, fontWeight:'800', color: C.textDark },
  scroll:      { paddingHorizontal:20, paddingBottom:24 },
  heroCard:    { backgroundColor: C.green, borderRadius:24, padding:20, marginBottom:16 },
  heroTitle:   { fontSize:20, fontWeight:'800', color: C.cardWhite, marginBottom:4 },
  heroSub:     { fontSize:13, color:'#A8D5BE', lineHeight:19 },
  filterRow:   { flexDirection:'row', gap:8, marginBottom:16, flexWrap:'wrap' },
  filterChip:  { borderRadius:20, paddingHorizontal:14, paddingVertical:8,
                 backgroundColor: C.cardWhite, borderWidth:1.5, borderColor: C.divider },
  filterChipOn:{ backgroundColor: C.green, borderColor: C.green },
  filterTxt:   { fontSize:12, fontWeight:'600', color: C.textMid },
  filterTxtOn: { color: C.cardWhite },
  expertCard:  { backgroundColor: C.cardWhite, borderRadius:20, padding:16, marginBottom:14,
                 shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  expertTop:   { flexDirection:'row', alignItems:'flex-start', gap:12, marginBottom:12 },
  expertEmoji: { fontSize:36, width:44 },
  expertInfo:  { flex:1, gap:3 },
  expertName:  { fontSize:15, fontWeight:'800', color: C.textDark },
  expertRole:  { fontSize:12, color: C.textMuted },
  badgeWrap:   { flexDirection:'row', alignItems:'center', gap:4, marginTop:2 },
  badgeEmoji:  { fontSize:11 },
  badgeTxt:    { fontSize:10, color: C.green, fontWeight:'700' },
  ratingWrap:  { alignItems:'center', gap:2 },
  star:        { fontSize:14 },
  rating:      { fontSize:13, fontWeight:'800', color: C.textDark },
  expertBottom:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  availChip:   { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:10, paddingVertical:5 },
  availTxt:    { fontSize:12, color: C.green, fontWeight:'600' },
  bookBtn:     { backgroundColor: C.green, borderRadius:12, paddingHorizontal:18, paddingVertical:10 },
  bookBtnTxt:  { color: C.cardWhite, fontSize:13, fontWeight:'800' },
});
