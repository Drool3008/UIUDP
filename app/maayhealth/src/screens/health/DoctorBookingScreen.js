import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const DOCTORS = [
  { name:'Dr. Ananya Sharma', role:'Gynaecologist', exp:'12 yrs', rating:'4.9',
    fee:'₹300', slots:['Today 5:00 PM','Today 6:30 PM','Tomorrow 10:00 AM'],
    emoji:'👩‍⚕️', lang:'Hindi, English', badge:true },
  { name:'Priya Nair RD', role:'Maternal Dietician', exp:'8 yrs', rating:'4.8',
    fee:'₹200', slots:['Today 7:00 PM','Tomorrow 9:00 AM','Tomorrow 2:00 PM'],
    emoji:'🥗', lang:'Malayalam, English', badge:true },
  { name:'Dr. Meena Iyer', role:'ASHA Coordinator', exp:'15 yrs', rating:'5.0',
    fee:'Free', slots:['Now','Today 4:00 PM','Today 8:00 PM'],
    emoji:'🌿', lang:'Kannada, Tamil, Hindi', badge:false },
];

export default function DoctorBookingScreen({ onBack, onBooked }) {
  const [selected, setSelected] = useState(null);
  const [slot, setSlot] = useState({});
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (selected !== null && slot[selected] !== undefined) setBooked(true);
  };

  if (booked) {
    const doc = DOCTORS[selected];
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.successBody}>
          <Text style={s.successEmoji}>📅</Text>
          <Text style={s.successTitle}>Booking Confirmed!</Text>
          <Text style={s.successSub}>
            Your consultation with {doc.name} is confirmed.
          </Text>
          <View style={s.confirmCard}>
            <Text style={s.confirmEmoji}>{doc.emoji}</Text>
            <View style={s.confirmInfo}>
              <Text style={s.confirmName}>{doc.name}</Text>
              <Text style={s.confirmRole}>{doc.role}</Text>
              <Text style={s.confirmSlot}>🕐 {doc.slots[slot[selected]]}</Text>
              <Text style={s.confirmFee}>Fee: {doc.fee}</Text>
            </View>
          </View>
          <View style={s.reminderCard}>
            <Text style={s.reminderEmoji}>🔔</Text>
            <Text style={s.reminderTxt}>You'll get a reminder 30 minutes before your appointment.</Text>
          </View>
          <TouchableOpacity style={s.doneBtn} onPress={onBooked}>
            <Text style={s.doneBtnTxt}>Back to Home</Text>
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
          <Text style={s.title}>Book a Consultation</Text>
          <Text style={s.sub}>Specialists in maternal health</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {DOCTORS.map((doc, i) => (
          <TouchableOpacity key={i}
            style={[s.docCard, selected === i && s.docCardOn]}
            onPress={() => setSelected(i)}
            activeOpacity={0.88}>

            <View style={s.docTop}>
              <Text style={s.docEmoji}>{doc.emoji}</Text>
              <View style={s.docInfo}>
                <Text style={s.docName}>{doc.name}</Text>
                <Text style={s.docRole}>{doc.role} · {doc.exp}</Text>
                <Text style={s.docLang}>🗣 {doc.lang}</Text>
                {doc.badge && (
                  <View style={s.badgeRow}>
                    <Text style={s.badgeEmoji}>✅</Text>
                    <Text style={s.badgeTxt}>Expert Validated</Text>
                  </View>
                )}
              </View>
              <View style={s.docRight}>
                <Text style={s.rating}>⭐ {doc.rating}</Text>
                <Text style={s.fee}>{doc.fee}</Text>
              </View>
            </View>

            {selected === i && (
              <>
                <View style={s.divider} />
                <Text style={s.slotLabel}>Choose a time slot</Text>
                <View style={s.slotRow}>
                  {doc.slots.map((sl, si) => (
                    <TouchableOpacity key={si}
                      style={[s.slotChip, slot[i] === si && s.slotChipOn]}
                      onPress={() => setSlot(prev => ({ ...prev, [i]: si }))}>
                      <Text style={[s.slotTxt, slot[i] === si && s.slotTxtOn]}>{sl}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[s.bookBtn, (selected === null || slot[selected] === undefined) && s.bookBtnDisabled]}
          disabled={selected === null || slot[selected] === undefined}
          onPress={handleBook}>
          <Text style={s.bookBtnTxt}>
            {selected !== null && slot[selected] !== undefined
              ? `Confirm Booking →`
              : 'Select a doctor & time slot'}
          </Text>
        </TouchableOpacity>

        <View style={{ height:32 }} />
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
  docCard:        { backgroundColor: C.cardWhite, borderRadius:20, padding:16, marginBottom:14,
                    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2,
                    borderWidth:2, borderColor:'transparent' },
  docCardOn:      { borderColor: C.green },
  docTop:         { flexDirection:'row', alignItems:'flex-start', gap:12 },
  docEmoji:       { fontSize:36, width:44 },
  docInfo:        { flex:1, gap:3 },
  docName:        { fontSize:15, fontWeight:'800', color: C.textDark },
  docRole:        { fontSize:12, color: C.textMuted },
  docLang:        { fontSize:11, color: C.textMid },
  badgeRow:       { flexDirection:'row', alignItems:'center', gap:4, marginTop:2 },
  badgeEmoji:     { fontSize:11 },
  badgeTxt:       { fontSize:10, color: C.green, fontWeight:'700' },
  docRight:       { alignItems:'flex-end', gap:4 },
  rating:         { fontSize:12, fontWeight:'700', color: C.textDark },
  fee:            { fontSize:13, fontWeight:'800', color: C.green },
  divider:        { height:1, backgroundColor: C.divider, marginVertical:14 },
  slotLabel:      { fontSize:12, fontWeight:'700', color: C.textMuted, marginBottom:8 },
  slotRow:        { flexDirection:'row', flexWrap:'wrap', gap:8 },
  slotChip:       { backgroundColor: C.bg, borderRadius:10, paddingHorizontal:12, paddingVertical:8,
                    borderWidth:1.5, borderColor: C.divider },
  slotChipOn:     { backgroundColor: C.softGreen, borderColor: C.green },
  slotTxt:        { fontSize:12, color: C.textMid, fontWeight:'500' },
  slotTxtOn:      { color: C.green, fontWeight:'700' },
  bookBtn:        { backgroundColor: C.green, borderRadius:16, paddingVertical:16,
                    alignItems:'center', marginTop:4 },
  bookBtnDisabled:{ opacity:0.4 },
  bookBtnTxt:     { color: C.cardWhite, fontSize:15, fontWeight:'800' },
  successBody:    { flex:1, alignItems:'center', justifyContent:'center',
                    paddingHorizontal:28, gap:18 },
  successEmoji:   { fontSize:64 },
  successTitle:   { fontSize:24, fontWeight:'900', color: C.green },
  successSub:     { fontSize:14, color: C.textMid, textAlign:'center' },
  confirmCard:    { width:'100%', backgroundColor: C.cardWhite, borderRadius:20, padding:18,
                    flexDirection:'row', gap:14, alignItems:'center',
                    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  confirmEmoji:   { fontSize:36 },
  confirmInfo:    { flex:1, gap:4 },
  confirmName:    { fontSize:15, fontWeight:'800', color: C.textDark },
  confirmRole:    { fontSize:12, color: C.textMuted },
  confirmSlot:    { fontSize:13, color: C.green, fontWeight:'700' },
  confirmFee:     { fontSize:12, color: C.textMid },
  reminderCard:   { width:'100%', backgroundColor: C.softGold, borderRadius:16, padding:14,
                    flexDirection:'row', gap:10, alignItems:'flex-start' },
  reminderEmoji:  { fontSize:18 },
  reminderTxt:    { flex:1, fontSize:13, color: C.textDark, lineHeight:19 },
  doneBtn:        { width:'100%', backgroundColor: C.green, borderRadius:16,
                    paddingVertical:16, alignItems:'center' },
  doneBtnTxt:     { color: C.cardWhite, fontSize:15, fontWeight:'800' },
});
