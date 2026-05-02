import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { C } from '../../theme/colors';

export default function VoiceIntroScreen({ onNext }) {
  const [listening, setListening] = useState(false);

  const toggleListen = () => setListening(l => !l);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.progressRow}>
        {[1,2,3,4].map(i => (
          <View key={i} style={[s.pip, i === 1 && s.pipOn]} />
        ))}
      </View>

      <View style={s.body}>
        <Text style={s.step}>Step 1 of 4</Text>
        <Text style={s.title}>Tell us about yourself</Text>
        <Text style={s.sub}>
          Speak naturally — we'll ask about your pregnancy stage, diet preferences, and any health conditions.
        </Text>

        {/* Voice FAB illustration */}
        <View style={s.fabArea}>
          <View style={[s.ring3, listening && s.ringActive]} />
          <View style={[s.ring2, listening && s.ringActive]} />
          <View style={[s.ring1, listening && s.ringActive]} />
          <TouchableOpacity style={[s.fab, listening && s.fabOn]} onPress={toggleListen}>
            <Text style={s.fabIcon}>{listening ? '⏹' : '🎤'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.fabHint}>
          {listening ? 'Listening… speak now' : 'Tap the mic to begin'}
        </Text>

        {listening && (
          <View style={s.waveWrap}>
            {[1,2,3,4,5,6,7].map(i => (
              <View key={i} style={[s.bar, { height: 8 + (i % 3) * 14 }]} />
            ))}
          </View>
        )}

        <View style={s.orRow}>
          <View style={s.line} />
          <Text style={s.orTxt}>or type instead</Text>
          <View style={s.line} />
        </View>
      </View>

      <View style={s.footer}>
        <TouchableOpacity style={s.btnOutline} onPress={onNext}>
          <Text style={s.btnOutlineTxt}>Skip voice, fill manually →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={onNext}>
          <Text style={s.btnTxt}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: C.bg },
  progressRow:{ flexDirection:'row', gap: 8, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  pip:        { flex: 1, height: 4, borderRadius: 2, backgroundColor: C.divider },
  pipOn:      { backgroundColor: C.green },
  body:       { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 16 },
  step:       { fontSize: 12, color: C.textMuted, fontWeight: '600', marginBottom: 8 },
  title:      { fontSize: 24, fontWeight: '800', color: C.textDark, textAlign: 'center', marginBottom: 10 },
  sub:        { fontSize: 14, color: C.textMid, textAlign: 'center', lineHeight: 21, marginBottom: 40 },
  fabArea:    { alignItems: 'center', justifyContent: 'center', width: 200, height: 200, marginBottom: 16 },
  ring3:      { position:'absolute', width: 180, height: 180, borderRadius: 90,
                backgroundColor: C.softGreen, opacity: 0.3 },
  ring2:      { position:'absolute', width: 140, height: 140, borderRadius: 70,
                backgroundColor: C.softGreen, opacity: 0.5 },
  ring1:      { position:'absolute', width: 100, height: 100, borderRadius: 50,
                backgroundColor: C.softGreen, opacity: 0.7 },
  ringActive: { backgroundColor: '#C8E6D4' },
  fab:        { width: 72, height: 72, borderRadius: 36, backgroundColor: C.green,
                alignItems: 'center', justifyContent: 'center',
                shadowColor: C.green, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  fabOn:      { backgroundColor: '#C0392B' },
  fabIcon:    { fontSize: 28 },
  fabHint:    { fontSize: 14, color: C.textMid, marginBottom: 20 },
  waveWrap:   { flexDirection: 'row', alignItems: 'center', gap: 5, height: 48, marginBottom: 20 },
  bar:        { width: 6, borderRadius: 3, backgroundColor: C.green },
  orRow:      { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', marginTop: 12 },
  line:       { flex: 1, height: 1, backgroundColor: C.divider },
  orTxt:      { fontSize: 12, color: C.textMuted },
  footer:     { paddingHorizontal: 24, paddingBottom: 36, gap: 12 },
  btn:        { backgroundColor: C.green, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  btnTxt:     { color: C.cardWhite, fontSize: 16, fontWeight: '800' },
  btnOutline: { borderWidth: 1.5, borderColor: C.green, borderRadius: 16,
                paddingVertical: 14, alignItems: 'center' },
  btnOutlineTxt: { color: C.green, fontSize: 14, fontWeight: '600' },
});
