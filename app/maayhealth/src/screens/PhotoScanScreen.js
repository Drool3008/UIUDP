import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';

const AI_RESULTS = {
  name: '2 Vegetable Samosas',
  confidence: '94%',
  kcal: 480,
  nutrients: [
    { label: 'Iron', value: 8, max: 27, color: colors.primary },
    { label: 'Protein', value: 6, max: 71, color: colors.gold },
    { label: 'Fat', value: 18, max: 65, color: colors.warning },
    { label: 'Carbs', value: 42, max: 130, color: colors.primaryLight },
  ],
  nudge: 'You need a bit more calcium at dinner. Consider adding curd or a glass of milk.',
};

export default function PhotoScanScreen({ navigation }) {
  const [stage, setStage] = useState('camera'); // camera | identifying | confirm | result

  if (stage === 'camera') {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: '#1A1A1A' }]}>
        <View style={styles.cameraHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cameraBack}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.cameraTitle}>Scan Your Plate</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.cameraViewport}>
          <View style={styles.cameraFrame} />
          <Text style={styles.cameraHint}>Centre your meal within the frame</Text>
        </View>
        <TouchableOpacity style={styles.captureBtn} onPress={() => setStage('identifying')}>
          <View style={styles.captureInner} />
        </TouchableOpacity>
        <Text style={styles.cameraSub}>Tap to scan your plate</Text>
      </SafeAreaView>
    );
  }

  if (stage === 'identifying') {
    return (
      <SafeAreaView style={[styles.safe, styles.center, { backgroundColor: '#1A1A1A' }]}>
        <Text style={styles.aiEmoji}>🔍</Text>
        <Text style={styles.identifyTitle}>Identifying your meal...</Text>
        <Text style={styles.identifyStep}>Applying Satisficing recognition</Text>
        <Text style={styles.identifyStep}>Estimating portion size</Text>
        <Text style={styles.identifyStep}>Calculating nutritional values</Text>
        {setTimeout(() => setStage('confirm'), 2500) && null}
        <TouchableOpacity onPress={() => setStage('confirm')} style={{ marginTop: 32 }}>
          <Text style={{ color: colors.gold }}>Continue →</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (stage === 'confirm') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStage('camera')}>
            <Text style={styles.backText}>← Retake</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Meal</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.resultBanner}>
            <Text style={styles.resultLabel}>ANALYSIS COMPLETE</Text>
            <Text style={styles.resultMeal}>{AI_RESULTS.name}</Text>
            <Text style={styles.resultConf}>AI Confidence: {AI_RESULTS.confidence}</Text>
            <Text style={styles.resultKcal}>~{AI_RESULTS.kcal} kcal</Text>
          </View>
          {AI_RESULTS.nutrients.map(n => (
            <View key={n.label} style={styles.nutriRow}>
              <Text style={styles.nutriLabel}>{n.label}</Text>
              <Text style={styles.nutriGrams}>{n.value}g</Text>
            </View>
          ))}
          <View style={styles.confirmActions}>
            <TouchableOpacity style={styles.confirmBtn} onPress={() => setStage('result')}>
              <Text style={styles.confirmBtnText}>✓  Add to Today's Log</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.retakeBtn} onPress={() => setStage('camera')}>
              <Text style={styles.retakeBtnText}>Retake Photo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // result stage
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nutrition Updated</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successBanner}>
          <Text style={styles.successEmoji}>🟡</Text>
          <Text style={styles.successText}>Samosas Added!</Text>
          <Text style={styles.successSub}>Your nutrition bars have been updated</Text>
        </View>
        {AI_RESULTS.nutrients.map(n => {
          const pct = Math.min((n.value / n.max) * 100, 100);
          return (
            <View key={n.label} style={styles.barRow}>
              <Text style={styles.barLabel}>{n.label}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: n.color }]} />
              </View>
              <Text style={styles.barPct}>{Math.round(pct)}%</Text>
            </View>
          );
        })}
        <View style={styles.nudgeBox}>
          <Text style={styles.nudgeIcon}>💡</Text>
          <Text style={styles.nudgeText}>{AI_RESULTS.nudge}</Text>
        </View>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backText: { color: colors.goldLight, fontSize: 14 },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  cameraHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  cameraBack: { color: colors.white, fontSize: 22 },
  cameraTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  cameraViewport: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cameraFrame: {
    width: 260, height: 260, borderRadius: 20,
    borderWidth: 2, borderColor: colors.gold, borderStyle: 'dashed',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cameraHint: { color: colors.textMuted, fontSize: 13, marginTop: 16 },
  captureBtn: {
    alignSelf: 'center', width: 70, height: 70, borderRadius: 35,
    backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center',
    marginBottom: 8, borderWidth: 4, borderColor: colors.gold,
  },
  captureInner: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.white },
  cameraSub: { color: colors.textMuted, textAlign: 'center', fontSize: 14, marginBottom: 32 },
  content: { padding: 24, paddingBottom: 80 },
  aiEmoji: { fontSize: 52, marginBottom: 16 },
  identifyTitle: { color: colors.white, fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  identifyStep: { color: colors.textMuted, fontSize: 14, marginBottom: 8 },
  resultBanner: { backgroundColor: colors.primary, borderRadius: 16, padding: 20, marginBottom: 20 },
  resultLabel: { fontSize: 10, color: colors.goldLight, fontWeight: '700', letterSpacing: 2 },
  resultMeal: { fontSize: 22, color: colors.white, fontWeight: '800', marginTop: 4 },
  resultConf: { fontSize: 12, color: colors.goldLight, marginTop: 2 },
  resultKcal: { fontSize: 16, color: colors.white, fontWeight: '700', marginTop: 8 },
  nutriRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: 10, padding: 14, marginBottom: 8,
    borderWidth: 1, borderColor: colors.border,
  },
  nutriLabel: { fontSize: 15, color: colors.text },
  nutriGrams: { fontSize: 15, fontWeight: '700', color: colors.primary },
  confirmActions: { marginTop: 16 },
  confirmBtn: { backgroundColor: colors.primary, borderRadius: 14, padding: 18, alignItems: 'center', marginBottom: 10 },
  confirmBtnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  retakeBtn: { borderWidth: 2, borderColor: colors.border, borderRadius: 14, padding: 16, alignItems: 'center' },
  retakeBtnText: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
  successBanner: { alignItems: 'center', backgroundColor: colors.gold, borderRadius: 16, padding: 24, marginBottom: 20 },
  successEmoji: { fontSize: 40, marginBottom: 8 },
  successText: { fontSize: 24, fontWeight: '800', color: colors.white },
  successSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  barLabel: { width: 60, fontSize: 13, color: colors.text },
  barTrack: { flex: 1, height: 10, backgroundColor: colors.offWhite, borderRadius: 5, overflow: 'hidden', marginHorizontal: 10 },
  barFill: { height: '100%', borderRadius: 5 },
  barPct: { width: 36, fontSize: 12, color: colors.textSecondary, textAlign: 'right' },
  nudgeBox: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.warningLight,
    borderRadius: 12, padding: 16, gap: 10, marginTop: 10, marginBottom: 20,
    borderLeftWidth: 3, borderLeftColor: colors.warning,
  },
  nudgeIcon: { fontSize: 18 },
  nudgeText: { flex: 1, fontSize: 14, color: colors.warning, lineHeight: 20 },
  homeBtn: { backgroundColor: colors.primary, borderRadius: 14, padding: 18, alignItems: 'center' },
  homeBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
