import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';

const LANGUAGES = [
  { code: 'hi', name: 'हिन्दी',    english: 'Hindi',     flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు',   english: 'Telugu',    flag: '🌾' },
  { code: 'ta', name: 'தமிழ்',    english: 'Tamil',     flag: '🌺' },
  { code: 'kn', name: 'ಕನ್ನಡ',   english: 'Kannada',   flag: '🌻' },
  { code: 'ml', name: 'മലയാളം', english: 'Malayalam',  flag: '🥥' },
  { code: 'mr', name: 'मराठी',    english: 'Marathi',   flag: '🌿' },
  { code: 'bn', name: 'বাংলা',    english: 'Bengali',   flag: '🐯' },
  { code: 'or', name: 'ଓଡ଼ିଆ',    english: 'Odia',      flag: '🎭' },
  { code: 'en', name: 'English',  english: 'English',   flag: '📖' },
];

export default function LanguageScreen({ onNext }) {
  const [selected, setSelected] = React.useState('hi');

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.leaf}>🌿</Text>
        <Text style={s.title}>Choose your language</Text>
        <Text style={s.sub}>भाषा चुनें • మీ భాష ఎంచుకోండి</Text>
      </View>

      <ScrollView contentContainerStyle={s.grid} showsVerticalScrollIndicator={false}>
        {LANGUAGES.map(lang => {
          const on = selected === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[s.card, on && s.cardOn]}
              onPress={() => setSelected(lang.code)}
              activeOpacity={0.75}
            >
              <Text style={s.flag}>{lang.flag}</Text>
              <Text style={[s.langName, on && s.langNameOn]}>{lang.name}</Text>
              <Text style={s.langEn}>{lang.english}</Text>
              {on && <View style={s.checkBadge}><Text style={s.checkTxt}>✓</Text></View>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity style={s.btn} onPress={onNext}>
          <Text style={s.btnTxt}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: C.bg },
  header:     { alignItems: 'center', paddingTop: 24, paddingBottom: 16, gap: 6 },
  leaf:       { fontSize: 28 },
  title:      { fontSize: 22, fontWeight: '800', color: C.textDark },
  sub:        { fontSize: 12, color: C.textMuted },
  grid:       { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12,
                justifyContent: 'center', paddingBottom: 20 },
  card:       { width: 96, height: 96, borderRadius: 20, backgroundColor: C.cardWhite,
                alignItems: 'center', justifyContent: 'center', gap: 4,
                shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
                borderWidth: 2, borderColor: 'transparent', position: 'relative' },
  cardOn:     { borderColor: C.green, backgroundColor: C.softGreen },
  flag:       { fontSize: 26 },
  langName:   { fontSize: 13, fontWeight: '700', color: C.textDark },
  langNameOn: { color: C.green },
  langEn:     { fontSize: 10, color: C.textMuted },
  checkBadge: { position: 'absolute', top: 6, right: 6, width: 18, height: 18,
                borderRadius: 9, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' },
  checkTxt:   { color: C.cardWhite, fontSize: 10, fontWeight: '800' },
  footer:     { paddingHorizontal: 24, paddingBottom: 36 },
  btn:        { backgroundColor: C.green, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  btnTxt:     { color: C.cardWhite, fontSize: 16, fontWeight: '800' },
});
