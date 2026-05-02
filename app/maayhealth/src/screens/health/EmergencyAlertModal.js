import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { C } from '../../theme/colors';

export default function EmergencyAlertModal({ visible, onClose, onCallASHA, onCallDoctor }) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={s.safe}>
        {/* Alert header */}
        <View style={s.alertBanner}>
          <Text style={s.alertEmoji}>🚨</Text>
          <Text style={s.alertTitle}>Emergency Alert</Text>
          <Text style={s.alertSub}>Critical symptom detected — act now</Text>
        </View>

        <View style={s.body}>
          {/* What's happening card */}
          <View style={s.warningCard}>
            <Text style={s.warningTitle}>⚠️ High severity symptoms</Text>
            <Text style={s.warningTxt}>
              Your symptoms suggest a potentially serious condition that requires immediate medical attention. Do not wait.
            </Text>
          </View>

          {/* Action cards */}
          <Text style={s.actLabel}>IMMEDIATE ACTIONS</Text>

          <TouchableOpacity style={s.actionCard} onPress={onCallASHA}>
            <View style={s.actionIcon}><Text style={s.actionIconTxt}>📞</Text></View>
            <View style={s.actionInfo}>
              <Text style={s.actionTitle}>Call ASHA Worker</Text>
              <Text style={s.actionSub}>Your local ASHA: Kavitha · +91 94830 12345</Text>
            </View>
            <Text style={s.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.actionCard, s.actionCardGold]} onPress={onCallDoctor}>
            <View style={[s.actionIcon, s.actionIconGold]}><Text style={s.actionIconTxt}>🏥</Text></View>
            <View style={s.actionInfo}>
              <Text style={s.actionTitle}>Call Doctor</Text>
              <Text style={s.actionSub}>Dr. Ananya Sharma · Available now</Text>
            </View>
            <Text style={s.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.ambulanceBtn}>
            <Text style={s.ambulanceTxt}>🚑  Call Ambulance (108)</Text>
          </TouchableOpacity>

          {/* What to do now */}
          <View style={s.instructCard}>
            <Text style={s.instructTitle}>While you wait</Text>
            {[
              'Lie down on your left side.',
              'Do not eat or drink anything.',
              'Keep someone with you at all times.',
              'Gather your ANC card and documents.',
            ].map((inst, i) => (
              <View key={i} style={s.instructRow}>
                <View style={s.instructDot} />
                <Text style={s.instructTxt}>{inst}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={s.dismissBtn} onPress={onClose}>
          <Text style={s.dismissTxt}>I'm safe now — go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

const s = StyleSheet.create({
  safe:          { flex:1, backgroundColor:'#1A0A0A' },
  alertBanner:   { backgroundColor: C.red, padding:24, alignItems:'center', gap:8 },
  alertEmoji:    { fontSize:44 },
  alertTitle:    { fontSize:26, fontWeight:'900', color: C.cardWhite },
  alertSub:      { fontSize:14, color:'#FFB3B3' },
  body:          { flex:1, padding:20, gap:14 },
  warningCard:   { backgroundColor:'#3A1010', borderRadius:16, padding:16,
                   borderWidth:2, borderColor: C.red },
  warningTitle:  { fontSize:15, fontWeight:'800', color:'#FF8080', marginBottom:6 },
  warningTxt:    { fontSize:13, color:'#FFB3B3', lineHeight:19 },
  actLabel:      { fontSize:10, color:'#FF8080', fontWeight:'700', letterSpacing:1 },
  actionCard:    { backgroundColor:'#2A1010', borderRadius:16, padding:16,
                   flexDirection:'row', alignItems:'center', gap:12,
                   borderWidth:1.5, borderColor:'#FF6060' },
  actionCardGold:{ borderColor: C.gold, backgroundColor:'#2A2010' },
  actionIcon:    { width:44, height:44, borderRadius:22, backgroundColor: C.red,
                   alignItems:'center', justifyContent:'center' },
  actionIconGold:{ backgroundColor: C.gold },
  actionIconTxt: { fontSize:22 },
  actionInfo:    { flex:1 },
  actionTitle:   { fontSize:15, fontWeight:'800', color: C.cardWhite },
  actionSub:     { fontSize:11, color:'#FF9999', marginTop:2 },
  actionArrow:   { fontSize:20, color:'#FF6060', fontWeight:'700' },
  ambulanceBtn:  { backgroundColor: C.red, borderRadius:16, paddingVertical:16,
                   alignItems:'center', borderWidth:2, borderColor:'#FF6060' },
  ambulanceTxt:  { fontSize:16, fontWeight:'900', color: C.cardWhite },
  instructCard:  { backgroundColor:'#1E1010', borderRadius:16, padding:16, gap:10 },
  instructTitle: { fontSize:13, fontWeight:'800', color:'#FF8080', marginBottom:4 },
  instructRow:   { flexDirection:'row', alignItems:'flex-start', gap:10 },
  instructDot:   { width:6, height:6, borderRadius:3, backgroundColor: C.gold, marginTop:6 },
  instructTxt:   { fontSize:13, color:'#FFB3B3', lineHeight:20, flex:1 },
  dismissBtn:    { margin:20, borderRadius:16, borderWidth:1.5, borderColor:'#604040',
                   paddingVertical:14, alignItems:'center' },
  dismissTxt:    { fontSize:14, color:'#FF9999', fontWeight:'600' },
});
