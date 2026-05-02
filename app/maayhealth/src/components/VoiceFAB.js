import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme/colors';

const SUGGESTIONS = [
  'I feel dizzy',
  'Log my breakfast',
  'What should I eat today?',
  'Notify my cook',
  'Show my ANC visit',
];

export default function VoiceFAB({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSuggestion = (text) => {
    setOpen(false);
    if (text.includes('dizzy') || text.includes('feel')) onNavigate('voiceTriage');
    else if (text.includes('cook')) onNavigate('cookDelegation');
    else if (text.includes('ANC')) onNavigate('ancTracker');
    else if (text.includes('eat') || text.includes('meal')) onNavigate('nutrition');
    else if (text.includes('log')) onNavigate('scan');
  };

  return (
    <>
      <TouchableOpacity style={fab.btn} onPress={() => setOpen(true)} activeOpacity={0.85}>
        <Text style={fab.icon}>🎤</Text>
      </TouchableOpacity>

      {open && (
        <View style={fab.overlay}>
          <TouchableOpacity style={fab.backdrop} activeOpacity={1} onPress={() => setOpen(false)} />
          <View style={fab.sheet}>
            <View style={fab.handle} />
            <Text style={fab.sheetTitle}>Express Daily Intent</Text>
            <Text style={fab.sheetSub}>Speak or tap a suggestion</Text>

            <TouchableOpacity style={[fab.mic, listening && fab.micOn]}
              onPress={() => setListening(l => !l)}>
              <Text style={fab.micIcon}>{listening ? '⏹' : '🎤'}</Text>
              {listening && (
                <View style={fab.waveRow}>
                  {[1,2,3,4,5].map(i => (
                    <View key={i} style={[fab.wave, { height: 6 + (i%3)*10 }]} />
                  ))}
                </View>
              )}
            </TouchableOpacity>
            <Text style={fab.micHint}>{listening ? 'Listening…' : 'Tap to speak'}</Text>

            <View style={fab.suggestions}>
              {SUGGESTIONS.map((s, i) => (
                <TouchableOpacity key={i} style={fab.suggChip} onPress={() => handleSuggestion(s)}>
                  <Text style={fab.suggTxt}>"{s}"</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const fab = StyleSheet.create({
  btn:        { position:'absolute', bottom:100, right:20, width:56, height:56, borderRadius:28,
                backgroundColor: C.green, alignItems:'center', justifyContent:'center',
                shadowColor: C.green, shadowOpacity:0.45, shadowRadius:12,
                shadowOffset:{ width:0, height:4 }, elevation:10 },
  icon:       { fontSize:24 },
  overlay:    { position:'absolute', top:0, left:0, right:0, bottom:0, justifyContent:'flex-end' },
  backdrop:   { position:'absolute', top:0, left:0, right:0, bottom:0, backgroundColor:'rgba(0,0,0,0.4)' },
  sheet:      { backgroundColor: C.cardWhite, borderTopLeftRadius:28, borderTopRightRadius:28,
                padding:24, paddingBottom:40, gap:14 },
  handle:     { width:40, height:4, borderRadius:2, backgroundColor: C.divider, alignSelf:'center' },
  sheetTitle: { fontSize:20, fontWeight:'900', color: C.textDark, textAlign:'center' },
  sheetSub:   { fontSize:13, color: C.textMuted, textAlign:'center', marginTop:-8 },
  mic:        { width:72, height:72, borderRadius:36, backgroundColor: C.softGreen,
                alignSelf:'center', alignItems:'center', justifyContent:'center', gap:6 },
  micOn:      { backgroundColor: C.green },
  micIcon:    { fontSize:30 },
  waveRow:    { flexDirection:'row', gap:3, alignItems:'center' },
  wave:       { width:4, borderRadius:2, backgroundColor: C.cardWhite },
  micHint:    { fontSize:12, color: C.textMuted, textAlign:'center', marginTop:-6 },
  suggestions:{ gap:8 },
  suggChip:   { backgroundColor: C.bg, borderRadius:12, paddingHorizontal:14, paddingVertical:10,
                borderWidth:1, borderColor: C.divider },
  suggTxt:    { fontSize:13, color: C.green, fontWeight:'600' },
});
