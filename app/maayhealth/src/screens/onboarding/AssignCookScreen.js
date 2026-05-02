import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { C } from '../../theme/colors';

export default function AssignCookScreen({ onNext }) {
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [assigned, setAssigned] = useState(false);

  const canSubmit = name.trim().length > 1 && phone.replace(/\D/g,'').length === 10;

  const handleAssign = () => {
    if (canSubmit) setAssigned(true);
  };

  if (assigned) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.successBody}>
          <View style={s.successCircle}>
            <Text style={s.successEmoji}>👩‍🍳</Text>
          </View>
          <Text style={s.successTitle}>Cook Assigned!</Text>
          <Text style={s.successSub}>
            <Text style={s.bold}>{name}</Text> will receive today's meal plan on WhatsApp every morning.
          </Text>
          <View style={s.waCard}>
            <Text style={s.waIcon}>💬</Text>
            <View>
              <Text style={s.waLabel}>WhatsApp message preview</Text>
              <Text style={s.waMsg}>
                "Savitri's meal for today:{'\n'}• Moong Dal 250g{'\n'}• Brown Rice 150g{'\n'}• Drumstick leaves 100g"
              </Text>
            </View>
          </View>
          <TouchableOpacity style={s.btn} onPress={onNext}>
            <Text style={s.btnTxt}>Go to Home →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.progressRow}>
        {[1,2,3,4].map(i => <View key={i} style={[s.pip, s.pipOn]} />)}
      </View>

      <View style={s.body}>
        <Text style={s.step}>Step 4 of 4</Text>
        <Text style={s.title}>Assign your cook</Text>
        <Text style={s.sub}>
          We'll send your daily meal plan to your cook via WhatsApp automatically.
        </Text>

        <View style={s.formCard}>
          <View style={s.field}>
            <Text style={s.fieldLabel}>Cook's name</Text>
            <TextInput
              style={s.input}
              placeholder="e.g. Laxmi"
              placeholderTextColor={C.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={s.field}>
            <Text style={s.fieldLabel}>WhatsApp number</Text>
            <View style={s.phoneRow}>
              <View style={s.countryCode}><Text style={s.countryTxt}>🇮🇳 +91</Text></View>
              <TextInput
                style={[s.input, s.phoneInput]}
                placeholder="10-digit mobile number"
                placeholderTextColor={C.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoIcon}>💬</Text>
          <Text style={s.infoTxt}>
            Your cook will receive a structured WhatsApp message every morning with ingredients to buy and prepare.
          </Text>
        </View>

        <TouchableOpacity style={s.skipLink} onPress={onNext}>
          <Text style={s.skipTxt}>I'll add a cook later →</Text>
        </TouchableOpacity>
      </View>

      <View style={s.footer}>
        <TouchableOpacity style={[s.btn, !canSubmit && s.btnDisabled]} onPress={handleAssign}>
          <Text style={s.btnTxt}>Assign Cook & Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex:1, backgroundColor: C.bg },
  progressRow:   { flexDirection:'row', gap:8, paddingHorizontal:24, paddingTop:16, paddingBottom:8 },
  pip:           { flex:1, height:4, borderRadius:2, backgroundColor: C.divider },
  pipOn:         { backgroundColor: C.green },
  body:          { flex:1, paddingHorizontal:24, paddingTop:12 },
  step:          { fontSize:12, color: C.textMuted, fontWeight:'600', marginBottom:6 },
  title:         { fontSize:22, fontWeight:'800', color: C.textDark, marginBottom:6 },
  sub:           { fontSize:13, color: C.textMid, marginBottom:24 },
  formCard:      { backgroundColor: C.cardWhite, borderRadius:20, padding:20, gap:16,
                   marginBottom:16, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  field:         { gap:6 },
  fieldLabel:    { fontSize:12, fontWeight:'700', color: C.textMuted, letterSpacing:0.3 },
  input:         { backgroundColor: C.bg, borderRadius:12, paddingHorizontal:14, paddingVertical:12,
                   fontSize:15, color: C.textDark, borderWidth:1, borderColor: C.divider },
  phoneRow:      { flexDirection:'row', gap:8 },
  countryCode:   { backgroundColor: C.bg, borderRadius:12, paddingHorizontal:12, paddingVertical:12,
                   borderWidth:1, borderColor: C.divider, justifyContent:'center' },
  countryTxt:    { fontSize:14, color: C.textDark, fontWeight:'600' },
  phoneInput:    { flex:1 },
  infoCard:      { flexDirection:'row', gap:10, backgroundColor:'#E8F5FF',
                   borderRadius:14, padding:14, alignItems:'flex-start', marginBottom:16 },
  infoIcon:      { fontSize:18 },
  infoTxt:       { flex:1, fontSize:12, color: C.textMid, lineHeight:18 },
  skipLink:      { alignSelf:'center' },
  skipTxt:       { fontSize:13, color: C.textMuted, textDecorationLine:'underline' },
  footer:        { paddingHorizontal:24, paddingBottom:36 },
  btn:           { backgroundColor: C.green, borderRadius:16, paddingVertical:16, alignItems:'center' },
  btnDisabled:   { opacity:0.4 },
  btnTxt:        { color: C.cardWhite, fontSize:16, fontWeight:'800' },
  successBody:   { flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:28, gap:20 },
  successCircle: { width:120, height:120, borderRadius:60, backgroundColor: C.softGreen,
                   alignItems:'center', justifyContent:'center' },
  successEmoji:  { fontSize:56 },
  successTitle:  { fontSize:26, fontWeight:'900', color: C.green },
  successSub:    { fontSize:14, color: C.textMid, textAlign:'center', lineHeight:21 },
  bold:          { fontWeight:'800', color: C.textDark },
  waCard:        { flexDirection:'row', gap:12, backgroundColor: '#E8F8EE',
                   borderRadius:16, padding:16, width:'100%', alignItems:'flex-start' },
  waIcon:        { fontSize:24 },
  waLabel:       { fontSize:10, fontWeight:'700', color: C.textMuted, marginBottom:4 },
  waMsg:         { fontSize:13, color: C.textDark, lineHeight:20 },
});
