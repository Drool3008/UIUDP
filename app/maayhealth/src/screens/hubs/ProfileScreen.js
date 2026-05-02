import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const ROWS = [
  { icon:'🍽', label:'Cook Assigned',     value:'Laxmi · +91 98765 43210',  action:'Change' },
  { icon:'💰', label:'Weekly Budget',     value:'₹1,500',                    action:'Edit'   },
  { icon:'🏥', label:'Due Date',          value:'15 August 2025',            action:'Edit'   },
  { icon:'🌐', label:'Language',          value:'Hindi (हिन्दी)',              action:'Change' },
  { icon:'📱', label:'Notifications',     value:'WhatsApp + App',            action:'Edit'   },
];

export default function ProfileScreen({ onBack, onLogout }) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.back}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar card */}
        <View style={s.avatarCard}>
          <View style={s.avatarCircle}>
            <Text style={s.avatarEmoji}>🤰</Text>
          </View>
          <Text style={s.name}>Savitri Devi</Text>
          <Text style={s.sub}>Week 32 · 3rd Trimester</Text>
          <View style={s.weekBadge}><Text style={s.weekBadgeTxt}>🌿 Due in 56 days</Text></View>
        </View>

        {/* Stats row */}
        <View style={s.statsRow}>
          {[
            { label:'Meals Logged', val:'124' },
            { label:'Streak',       val:'12 days' },
            { label:'ANC Visits',   val:'5 done' },
          ].map((st, i) => (
            <View key={i} style={s.statCard}>
              <Text style={s.statVal}>{st.val}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings rows */}
        <Text style={s.sectionTitle}>My Details</Text>
        <View style={s.settingsCard}>
          {ROWS.map((row, i) => (
            <View key={i} style={[s.settingRow, i < ROWS.length-1 && s.settingBorder]}>
              <Text style={s.settingIcon}>{row.icon}</Text>
              <View style={s.settingInfo}>
                <Text style={s.settingLabel}>{row.label}</Text>
                <Text style={s.settingValue}>{row.value}</Text>
              </View>
              <TouchableOpacity style={s.actionBtn}>
                <Text style={s.actionTxt}>{row.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={s.logoutBtn} onPress={onLogout}>
          <Text style={s.logoutTxt}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height:32 }} />
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
  scroll:       { paddingHorizontal:20, paddingBottom:24 },
  avatarCard:   { backgroundColor: C.green, borderRadius:28, padding:24,
                  alignItems:'center', gap:8, marginBottom:16 },
  avatarCircle: { width:90, height:90, borderRadius:45, backgroundColor:'rgba(255,255,255,0.2)',
                  alignItems:'center', justifyContent:'center' },
  avatarEmoji:  { fontSize:50 },
  name:         { fontSize:22, fontWeight:'900', color: C.cardWhite },
  sub:          { fontSize:13, color:'#A8D5BE' },
  weekBadge:    { backgroundColor:'rgba(255,255,255,0.2)', borderRadius:12,
                  paddingHorizontal:14, paddingVertical:6 },
  weekBadgeTxt: { fontSize:12, color: C.cardWhite, fontWeight:'600' },
  statsRow:     { flexDirection:'row', gap:10, marginBottom:20 },
  statCard:     { flex:1, backgroundColor: C.cardWhite, borderRadius:16, padding:14,
                  alignItems:'center', gap:4,
                  shadowColor:'#000', shadowOpacity:0.05, shadowRadius:6, elevation:2 },
  statVal:      { fontSize:16, fontWeight:'900', color: C.green },
  statLabel:    { fontSize:10, color: C.textMuted, textAlign:'center' },
  sectionTitle: { fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:12 },
  settingsCard: { backgroundColor: C.cardWhite, borderRadius:20,
                  shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2, marginBottom:16 },
  settingRow:   { flexDirection:'row', alignItems:'center', paddingHorizontal:16,
                  paddingVertical:14, gap:12 },
  settingBorder:{ borderBottomWidth:1, borderBottomColor: C.divider },
  settingIcon:  { fontSize:20, width:28 },
  settingInfo:  { flex:1 },
  settingLabel: { fontSize:11, color: C.textMuted, fontWeight:'600' },
  settingValue: { fontSize:14, color: C.textDark, fontWeight:'500', marginTop:2 },
  actionBtn:    { backgroundColor: C.softGreen, borderRadius:8, paddingHorizontal:10, paddingVertical:5 },
  actionTxt:    { fontSize:12, color: C.green, fontWeight:'700' },
  logoutBtn:    { borderRadius:16, borderWidth:1.5, borderColor: C.red,
                  paddingVertical:14, alignItems:'center' },
  logoutTxt:    { color: C.red, fontSize:15, fontWeight:'700' },
});
