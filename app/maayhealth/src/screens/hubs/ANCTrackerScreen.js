import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const APPOINTMENTS = [
  { date:'24 May 2025', label:'Routine ANC Check',    done:false, daysLeft:18, icon:'🏥' },
  { date:'10 Apr 2025', label:'Blood Test (CBC)',      done:true,  icon:'🩸' },
  { date:'22 Mar 2025', label:'Ultrasound – 28 weeks', done:true, icon:'🔊' },
];

const SUPPLEMENTS = [
  { name:'Iron tablet',   dose:'100mg', time:'8:00 PM', taken:true,  color:'#E07878' },
  { name:'Folic Acid',    dose:'5mg',   time:'8:00 AM', taken:true,  color:'#7BBF8A' },
  { name:'Calcium',       dose:'500mg', time:'2:00 PM', taken:false, color:'#78A8E0' },
  { name:'Vitamin D',     dose:'1000IU',time:'8:00 AM', taken:false, color:'#E0C478' },
];

const MILESTONES = [
  { week:28, label:'Growth scan done',     done:true  },
  { week:30, label:'Iron levels checked',  done:true  },
  { week:32, label:'Current week',         done:false, current:true },
  { week:34, label:'ANC visit',            done:false },
  { week:36, label:'Pre-delivery check',   done:false },
  { week:40, label:'Due date',             done:false },
];

export default function ANCTrackerScreen({ onBack }) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.back}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>ANC Tracker</Text>
        <View style={s.badge}><Text style={s.badgeTxt}>Week 32</Text></View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Next appointment hero */}
        <View style={s.nextCard}>
          <View style={s.nextLeft}>
            <Text style={s.nextLabel}>NEXT APPOINTMENT</Text>
            <Text style={s.nextDate}>24 May 2025</Text>
            <Text style={s.nextName}>Routine ANC Check</Text>
            <View style={s.countdownPill}>
              <Text style={s.countdownTxt}>🗓 18 days to go</Text>
            </View>
          </View>
          <Text style={s.nextEmoji}>🏥</Text>
        </View>

        {/* Supplements today */}
        <Text style={s.sectionTitle}>Today's Supplements</Text>
        <View style={s.suppWrap}>
          {SUPPLEMENTS.map((sup, i) => (
            <View key={i} style={s.suppRow}>
              <View style={[s.suppDot, { backgroundColor: sup.color }]} />
              <View style={s.suppInfo}>
                <Text style={s.suppName}>{sup.name} <Text style={s.suppDose}>{sup.dose}</Text></Text>
                <Text style={s.suppTime}>{sup.time}</Text>
              </View>
              <View style={[s.suppCheck, sup.taken && s.suppCheckDone]}>
                <Text style={s.suppCheckTxt}>{sup.taken ? '✓' : ''}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Milestone timeline */}
        <Text style={s.sectionTitle}>Pregnancy Milestones</Text>
        <View style={s.timeline}>
          {MILESTONES.map((m, i) => (
            <View key={i} style={s.milestoneRow}>
              <View style={s.timelineLeft}>
                <View style={[s.dot, m.done && s.dotDone, m.current && s.dotCurrent]} />
                {i < MILESTONES.length - 1 && <View style={[s.connector, m.done && s.connectorDone]} />}
              </View>
              <View style={s.milestoneContent}>
                <Text style={[s.milestoneWeek, m.current && s.milestoneWeekCurrent]}>Week {m.week}</Text>
                <Text style={[s.milestoneLabel, m.done && s.milestoneDone]}>{m.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Past appointments */}
        <Text style={s.sectionTitle}>Past Appointments</Text>
        {APPOINTMENTS.filter(a => a.done).map((apt, i) => (
          <View key={i} style={s.aptCard}>
            <Text style={s.aptIcon}>{apt.icon}</Text>
            <View style={s.aptInfo}>
              <Text style={s.aptLabel}>{apt.label}</Text>
              <Text style={s.aptDate}>{apt.date}</Text>
            </View>
            <View style={s.aptDoneBadge}><Text style={s.aptDoneTxt}>✓ Done</Text></View>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex:1, backgroundColor: C.bg },
  header:       { flexDirection:'row', alignItems:'center', paddingHorizontal:20,
                  paddingVertical:14, gap:12 },
  back:         { padding:4 },
  backTxt:      { fontSize:24, color: C.green, fontWeight:'700' },
  title:        { flex:1, fontSize:20, fontWeight:'800', color: C.textDark },
  badge:        { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:10, paddingVertical:4 },
  badgeTxt:     { fontSize:12, color: C.green, fontWeight:'700' },
  scroll:       { paddingHorizontal:20, paddingBottom:24 },
  nextCard:     { backgroundColor: C.green, borderRadius:24, padding:20, flexDirection:'row',
                  alignItems:'center', justifyContent:'space-between', marginBottom:20 },
  nextLeft:     { gap:6 },
  nextLabel:    { fontSize:10, color:'#A8D5BE', fontWeight:'700', letterSpacing:0.8 },
  nextDate:     { fontSize:22, fontWeight:'900', color: C.cardWhite },
  nextName:     { fontSize:13, color:'#C8EAD8' },
  countdownPill:{ backgroundColor:'rgba(255,255,255,0.2)', borderRadius:10,
                  paddingHorizontal:10, paddingVertical:4, alignSelf:'flex-start' },
  countdownTxt: { fontSize:12, color: C.cardWhite, fontWeight:'600' },
  nextEmoji:    { fontSize:44 },
  sectionTitle: { fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:12, marginTop:4 },
  suppWrap:     { backgroundColor: C.cardWhite, borderRadius:20, paddingVertical:8,
                  marginBottom:20, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  suppRow:      { flexDirection:'row', alignItems:'center', paddingHorizontal:16,
                  paddingVertical:12, gap:12 },
  suppDot:      { width:10, height:10, borderRadius:5 },
  suppInfo:     { flex:1 },
  suppName:     { fontSize:14, fontWeight:'600', color: C.textDark },
  suppDose:     { color: C.textMuted, fontWeight:'400' },
  suppTime:     { fontSize:11, color: C.textMuted, marginTop:2 },
  suppCheck:    { width:26, height:26, borderRadius:13, borderWidth:2, borderColor: C.divider,
                  alignItems:'center', justifyContent:'center' },
  suppCheckDone:{ backgroundColor: C.green, borderColor: C.green },
  suppCheckTxt: { color: C.cardWhite, fontSize:13, fontWeight:'800' },
  timeline:     { backgroundColor: C.cardWhite, borderRadius:20, padding:20,
                  marginBottom:20, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  milestoneRow: { flexDirection:'row', gap:14, minHeight:50 },
  timelineLeft: { alignItems:'center', width:16 },
  dot:          { width:16, height:16, borderRadius:8, borderWidth:2, borderColor: C.divider,
                  backgroundColor: C.cardWhite },
  dotDone:      { backgroundColor: C.green, borderColor: C.green },
  dotCurrent:   { backgroundColor: C.cardWhite, borderColor: C.green, borderWidth:3 },
  connector:    { flex:1, width:2, backgroundColor: C.divider, marginVertical:2 },
  connectorDone:{ backgroundColor: C.green },
  milestoneContent: { flex:1, paddingBottom:16 },
  milestoneWeek:    { fontSize:11, color: C.textMuted, fontWeight:'600' },
  milestoneWeekCurrent: { color: C.green },
  milestoneLabel:   { fontSize:14, color: C.textDark, fontWeight:'500' },
  milestoneDone:    { color: C.textMuted },
  aptCard:      { flexDirection:'row', alignItems:'center', gap:12, backgroundColor: C.cardWhite,
                  borderRadius:16, padding:14, marginBottom:10,
                  shadowColor:'#000', shadowOpacity:0.04, shadowRadius:6, elevation:1 },
  aptIcon:      { fontSize:22 },
  aptInfo:      { flex:1 },
  aptLabel:     { fontSize:14, fontWeight:'600', color: C.textDark },
  aptDate:      { fontSize:11, color: C.textMuted, marginTop:2 },
  aptDoneBadge: { backgroundColor: C.softGreen, borderRadius:8, paddingHorizontal:8, paddingVertical:4 },
  aptDoneTxt:   { fontSize:11, color: C.green, fontWeight:'700' },
});
