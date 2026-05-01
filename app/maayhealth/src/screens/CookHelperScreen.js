import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Linking,
} from 'react-native';
import { colors } from '../theme/colors';
import { weekPlan } from '../data/meals';

const INGREDIENTS = [
  { qty: '250g', item: 'Green Moong Dal' },
  { qty: '2', item: 'Green Chillies' },
  { qty: '1 inch', item: 'Ginger' },
  { qty: '¼ tsp', item: 'Turmeric' },
  { qty: '1 tsp', item: 'Cumin Seeds' },
  { qty: '1 tbsp', item: 'Ghee' },
  { qty: '½ tsp', item: 'Salt' },
];

export default function CookHelperScreen({ navigation }) {
  const [stage, setStage] = useState('preview'); // preview | processing | success
  const meal = weekPlan.MON.breakfast;

  const handleNotify = () => {
    setStage('processing');
    setTimeout(() => {
      setStage('success');
      const msg = `Laxmi, ${meal.name} is planned for today.\n\nPlease buy:\n${INGREDIENTS.map(i => `• ${i.qty} ${i.item}`).join('\n')}\n\n– MaayHealth`;
      const url = `whatsapp://send?phone=&text=${encodeURIComponent(msg)}`;
      Linking.canOpenURL(url).then(ok => { if (ok) Linking.openURL(url); });
    }, 2200);
  };

  if (stage === 'processing') {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <Text style={styles.processingEmoji}>🧠</Text>
        <Text style={styles.processingTitle}>Processing Recipe...</Text>
        {['Scaling ingredients for your needs...', 'Querying regional recipe database...', 'Formatting WhatsApp message...'].map(t => (
          <Text key={t} style={styles.processingStep}>⚙ {t}</Text>
        ))}
      </SafeAreaView>
    );
  }

  if (stage === 'success') {
    return (
      <SafeAreaView style={[styles.safe, styles.center, { backgroundColor: colors.cream }]}>
        <View style={styles.successCard}>
          <View style={styles.checkCircle}><Text style={styles.checkMark}>✓</Text></View>
          <Text style={styles.successTitle}>Success!</Text>
          <Text style={styles.successMsg}>Laxmi has been notified.</Text>
          <Text style={styles.successSub}>Ingredient list sent via WhatsApp</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cook Helper</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mealBanner}>
          <Text style={styles.mealLabel}>TODAY'S MEAL</Text>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.mealDesc}>{meal.desc}</Text>
        </View>
        <Text style={styles.sectionTitle}>AI-Extracted Ingredients</Text>
        <Text style={styles.sectionSub}>Scaled for Week 32 • Single household</Text>
        {INGREDIENTS.map((ing, i) => (
          <View key={i} style={styles.ingRow}>
            <View style={styles.qtyBadge}><Text style={styles.qtyText}>{ing.qty}</Text></View>
            <Text style={styles.ingName}>{ing.item}</Text>
          </View>
        ))}
        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>📲 WhatsApp Preview</Text>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              Laxmi, {meal.name} is planned.{'\n\n'}
              {INGREDIENTS.map(i => `• ${i.qty} ${i.item}`).join('\n')}{'\n\n'}– MaayHealth
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.ctaBtn} onPress={handleNotify}>
        <Text style={styles.ctaBtnText}>📲  Notify Cook via WhatsApp</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  center: { alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 16,
  },
  backArrow: { color: colors.goldLight, fontSize: 22 },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  content: { padding: 20, paddingBottom: 100 },
  mealBanner: { backgroundColor: colors.primary, borderRadius: 16, padding: 20, marginBottom: 20 },
  mealLabel: { fontSize: 10, fontWeight: '700', color: colors.goldLight, letterSpacing: 2 },
  mealName: { fontSize: 22, fontWeight: '800', color: colors.white, marginTop: 4 },
  mealDesc: { fontSize: 13, color: colors.goldLight, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 4 },
  sectionSub: { fontSize: 12, color: colors.textMuted, marginBottom: 14 },
  ingRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 10, padding: 12, marginBottom: 8,
    borderWidth: 1, borderColor: colors.border,
  },
  qtyBadge: { backgroundColor: colors.primaryLight, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 12 },
  qtyText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  ingName: { fontSize: 15, color: colors.text },
  previewBox: { marginTop: 20 },
  previewLabel: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
  bubble: { backgroundColor: '#DCF8C6', borderRadius: 12, padding: 16 },
  bubbleText: { fontSize: 13, color: '#1A1A1A', lineHeight: 22 },
  ctaBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: colors.primary, borderRadius: 14, padding: 18, alignItems: 'center',
  },
  ctaBtnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  processingEmoji: { fontSize: 52, marginBottom: 16 },
  processingTitle: { fontSize: 20, fontWeight: '700', color: colors.primary, marginBottom: 20 },
  processingStep: { fontSize: 14, color: colors.textSecondary, marginBottom: 6 },
  successCard: {
    backgroundColor: colors.white, borderRadius: 20, padding: 36,
    margin: 24, alignItems: 'center',
  },
  checkCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  checkMark: { fontSize: 36, color: colors.white, fontWeight: '900' },
  successTitle: { fontSize: 28, fontWeight: '800', color: colors.text },
  successMsg: { fontSize: 18, fontWeight: '700', color: colors.primary, marginTop: 6 },
  successSub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  backBtn: { marginTop: 24, backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 28, paddingVertical: 14 },
  backBtnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
});
