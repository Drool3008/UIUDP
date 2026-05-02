import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { C } from '../../theme/colors';

export default function WelcomeScreen({ onNext }) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.body}>
        <View style={s.logoWrap}>
          <Text style={s.leaf}>🌿</Text>
          <Text style={s.brand}>MaaHealth</Text>
          <Text style={s.tagline}>Your maternal nutrition companion</Text>
        </View>

        <View style={s.illustrationWrap}>
          <View style={s.circle}>
            <Text style={s.illustrationEmoji}>🤰</Text>
          </View>
          <View style={s.floatCard}>
            <Text style={s.floatTxt}>Nutrition • Care • Community</Text>
          </View>
        </View>

        <View style={s.textBlock}>
          <Text style={s.headline}>Healthy pregnancy,{'\n'}one meal at a time.</Text>
          <Text style={s.sub}>
            Personalised meal plans, symptom guidance, and a cook who cares — all in your language.
          </Text>
        </View>
      </View>

      <View style={s.footer}>
        <TouchableOpacity style={s.btn} onPress={onNext}>
          <Text style={s.btnTxt}>Get Started →</Text>
        </TouchableOpacity>
        <Text style={s.hint}>Takes 2 minutes to set up</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: C.bg },
  body:            { flex: 1, alignItems: 'center', justifyContent: 'space-evenly', paddingHorizontal: 24 },
  logoWrap:        { alignItems: 'center', gap: 6 },
  leaf:            { fontSize: 36 },
  brand:           { fontSize: 28, fontWeight: '900', color: C.green, letterSpacing: 0.5 },
  tagline:         { fontSize: 13, color: C.textMuted },
  illustrationWrap:{ alignItems: 'center', position: 'relative' },
  circle:          { width: 200, height: 200, borderRadius: 100, backgroundColor: C.softGold,
                     alignItems: 'center', justifyContent: 'center' },
  illustrationEmoji: { fontSize: 100 },
  floatCard:       { position: 'absolute', bottom: -12, backgroundColor: C.cardWhite,
                     borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8,
                     shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  floatTxt:        { fontSize: 12, color: C.green, fontWeight: '600' },
  textBlock:       { alignItems: 'center', gap: 10 },
  headline:        { fontSize: 26, fontWeight: '800', color: C.textDark, textAlign: 'center', lineHeight: 34 },
  sub:             { fontSize: 14, color: C.textMid, textAlign: 'center', lineHeight: 21 },
  footer:          { paddingHorizontal: 24, paddingBottom: 36, gap: 10, alignItems: 'center' },
  btn:             { width: '100%', backgroundColor: C.green, borderRadius: 16,
                     paddingVertical: 16, alignItems: 'center' },
  btnTxt:          { color: C.cardWhite, fontSize: 16, fontWeight: '800' },
  hint:            { fontSize: 12, color: C.textMuted },
});
