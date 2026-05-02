import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const VENDORS = [
  { name:'Ramesh Vegetables', type:'Vegetable Vendor', dist:'0.4 km', rating:'4.8',
    items:'Drumstick, Spinach, Methi', open:true, emoji:'🥬' },
  { name:'Annapoorna Store',  type:'Grocery',          dist:'0.7 km', rating:'4.6',
    items:'Dal, Rice, Jaggery',       open:true, emoji:'🏪' },
  { name:'Gopal Dairy Farm',  type:'Dairy & Milk',     dist:'1.2 km', rating:'4.9',
    items:'Milk, Curd, Ghee',         open:true, emoji:'🥛' },
  { name:'Goat Farm Direct',  type:'Meat & Poultry',   dist:'2.1 km', rating:'4.5',
    items:'Goat, Chicken (fresh)',     open:false, emoji:'🐐' },
];

const COOKS = [
  { name:'Laxmi (Your Cook)', dist:'Assigned', rating:'5.0', specialty:'South Indian',
    fee:'₹2,500/mo', avail:'Active', emoji:'👩‍🍳', assigned:true },
  { name:'Sunita Devi',       dist:'0.6 km',   rating:'4.7', specialty:'North Indian',
    fee:'₹2,000/mo', avail:'Available', emoji:'👩‍🍳' },
  { name:'Meera Bai',         dist:'1.0 km',   rating:'4.8', specialty:'Gujarati',
    fee:'₹1,800/mo', avail:'Available', emoji:'👩‍🍳' },
];

export default function LocalSourcingScreen({ onBack, onSelectCook }) {
  const [tab, setTab] = useState('vendors');

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Hyperlocal Sourcing</Text>
      </View>

      {/* Map placeholder */}
      <View style={s.mapArea}>
        <View style={s.mapPlaceholder}>
          <Text style={s.mapEmoji}>🗺</Text>
          <Text style={s.mapTxt}>Browse nearby vendors</Text>
          {VENDORS.map((v, i) => (
            <View key={i} style={[s.mapPin, { top: 20 + i*22, left: 30 + i*40 }]}>
              <Text style={s.mapPinEmoji}>{v.emoji}</Text>
            </View>
          ))}
        </View>
        <View style={s.mapBadge}><Text style={s.mapBadgeTxt}>📍 Bangalore, KA</Text></View>
      </View>

      {/* Tabs */}
      <View style={s.tabs}>
        {['vendors','cooks'].map(t => (
          <TouchableOpacity key={t} style={[s.tab, tab===t && s.tabOn]} onPress={() => setTab(t)}>
            <Text style={[s.tabTxt, tab===t && s.tabTxtOn]}>
              {t === 'vendors' ? '🛒 Vendors' : '👩‍🍳 Cooks'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {tab === 'vendors' && VENDORS.map((v, i) => (
          <View key={i} style={s.card}>
            <Text style={s.cardEmoji}>{v.emoji}</Text>
            <View style={s.cardInfo}>
              <Text style={s.cardName}>{v.name}</Text>
              <Text style={s.cardType}>{v.type} · {v.dist}</Text>
              <Text style={s.cardItems}>{v.items}</Text>
            </View>
            <View style={s.cardRight}>
              <Text style={s.rating}>⭐ {v.rating}</Text>
              <View style={[s.openPill, !v.open && s.closedPill]}>
                <Text style={[s.openTxt, !v.open && s.closedTxt]}>{v.open ? 'Open' : 'Closed'}</Text>
              </View>
            </View>
          </View>
        ))}

        {tab === 'cooks' && COOKS.map((cook, i) => (
          <TouchableOpacity key={i} style={[s.card, cook.assigned && s.cardAssigned]}
            onPress={() => !cook.assigned && onSelectCook(cook)}>
            <Text style={s.cardEmoji}>{cook.emoji}</Text>
            <View style={s.cardInfo}>
              <Text style={s.cardName}>{cook.name}</Text>
              <Text style={s.cardType}>{cook.specialty} · {cook.dist}</Text>
              <Text style={s.cardItems}>{cook.fee} · {cook.avail}</Text>
            </View>
            <View style={s.cardRight}>
              <Text style={s.rating}>⭐ {cook.rating}</Text>
              {cook.assigned
                ? <Text style={s.assignedTxt}>✓ Yours</Text>
                : <TouchableOpacity style={s.hireBtn} onPress={() => onSelectCook(cook)}>
                    <Text style={s.hireTxt}>Hire</Text>
                  </TouchableOpacity>
              }
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex:1, backgroundColor: C.bg },
  header:       { flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingVertical:14, gap:12 },
  backTxt:      { fontSize:24, color: C.green, fontWeight:'700' },
  title:        { flex:1, fontSize:20, fontWeight:'800', color: C.textDark },
  mapArea:      { height:150, marginHorizontal:20, marginBottom:12, position:'relative' },
  mapPlaceholder:{ flex:1, backgroundColor:'#D4EAD8', borderRadius:20, alignItems:'center',
                   justifyContent:'center', overflow:'hidden' },
  mapEmoji:     { fontSize:40, opacity:0.3 },
  mapTxt:       { fontSize:13, color: C.green, fontWeight:'600', marginTop:4 },
  mapPin:       { position:'absolute', width:28, height:28, borderRadius:14,
                  backgroundColor: C.cardWhite, alignItems:'center', justifyContent:'center',
                  shadowColor:'#000', shadowOpacity:0.15, shadowRadius:4, elevation:3 },
  mapPinEmoji:  { fontSize:16 },
  mapBadge:     { position:'absolute', bottom:10, right:10, backgroundColor: C.cardWhite,
                  borderRadius:10, paddingHorizontal:10, paddingVertical:5,
                  shadowColor:'#000', shadowOpacity:0.08, shadowRadius:4, elevation:2 },
  mapBadgeTxt:  { fontSize:11, color: C.textDark, fontWeight:'600' },
  tabs:         { flexDirection:'row', marginHorizontal:20, marginBottom:12,
                  backgroundColor: C.cardWhite, borderRadius:12, padding:4,
                  shadowColor:'#000', shadowOpacity:0.04, shadowRadius:4, elevation:1 },
  tab:          { flex:1, borderRadius:10, paddingVertical:10, alignItems:'center' },
  tabOn:        { backgroundColor: C.green },
  tabTxt:       { fontSize:13, fontWeight:'600', color: C.textMuted },
  tabTxtOn:     { color: C.cardWhite },
  scroll:       { paddingHorizontal:20, paddingBottom:24 },
  card:         { backgroundColor: C.cardWhite, borderRadius:18, padding:14, marginBottom:10,
                  flexDirection:'row', alignItems:'center', gap:12,
                  shadowColor:'#000', shadowOpacity:0.04, shadowRadius:6, elevation:1 },
  cardAssigned: { borderWidth:2, borderColor: C.green },
  cardEmoji:    { fontSize:28, width:36 },
  cardInfo:     { flex:1, gap:2 },
  cardName:     { fontSize:14, fontWeight:'800', color: C.textDark },
  cardType:     { fontSize:11, color: C.textMuted },
  cardItems:    { fontSize:11, color: C.textMid },
  cardRight:    { alignItems:'center', gap:6 },
  rating:       { fontSize:12, fontWeight:'700', color: C.textDark },
  openPill:     { backgroundColor: C.softGreen, borderRadius:8, paddingHorizontal:8, paddingVertical:3 },
  closedPill:   { backgroundColor: C.divider },
  openTxt:      { fontSize:10, color: C.green, fontWeight:'700' },
  closedTxt:    { color: C.textMuted },
  assignedTxt:  { fontSize:11, color: C.green, fontWeight:'700' },
  hireBtn:      { backgroundColor: C.green, borderRadius:10, paddingHorizontal:12, paddingVertical:6 },
  hireTxt:      { fontSize:12, color: C.cardWhite, fontWeight:'700' },
});
