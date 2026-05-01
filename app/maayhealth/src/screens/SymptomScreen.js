import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';

const FOLLOW_UPS = [
  'How long has this been happening?',
  'Have you eaten in the last 2 hours?',
  'Are you experiencing any chest pain or shortness of breath?',
];

const HIGH_RISK_KEYWORDS = ['dizzy', 'dizziness', 'headache', 'bleed', 'chest pain', 'faint', 'vision', 'swelling', 'pressure'];

export default function SymptomScreen({ navigation }) {
  const [stage, setStage] = useState('input'); // input | followup | analyzing | emergency | safe
  const [symptom, setSymptom] = useState('');
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [currentA, setCurrentA] = useState('');

  const isHighRisk = HIGH_RISK_KEYWORDS.some(k => symptom.toLowerCase().includes(k));

  const handleSubmitSymptom = () => {
    if (!symptom.trim()) return;
    setStage('followup');
  };

  const handleAnswer = () => {
    const updated = [...answers, currentA];
    setAnswers(updated);
    setCurrentA('');
    if (currentQ < FOLLOW_UPS.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      setStage('analyzing');
      setTimeout(() => setStage(isHighRisk ? 'emergency' : 'safe'), 3000);
    }
  };

  if (stage === 'input') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>Symptom Check</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.voicePrompt}>
            <Text style={styles.waveEmoji}>🎙️</Text>
            <Text style={styles.voiceLabel}>Tell us how you're feeling</Text>
          </View>
          <TextInput
            style={styles.symptomInput}
            value={symptom}
            onChangeText={setSymptom}
            placeholder="e.g. I feel very dizzy after my walk..."
            placeholderTextColor={colors.textMuted}
            multiline
          />
          <View style={styles.quickSymptoms}>
            {['Dizziness', 'Headache', 'Nausea', 'Fatigue', 'Swelling', 'Back Pain'].map(s => (
              <TouchableOpacity key={s} style={styles.symChip} onPress={() => setSymptom(s.toLowerCase())}>
                <Text style={styles.symChipText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.ctaBtn, !symptom.trim() && styles.ctaBtnDisabled]}
            onPress={handleSubmitSymptom}
            disabled={!symptom.trim()}
          >
            <Text style={styles.ctaBtnText}>Check Symptoms →</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (stage === 'followup') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Follow-Up Questions</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.aiCard}>
            <Text style={styles.aiLabel}>🧠 MaayHealth AI</Text>
            <Text style={styles.aiQuestion}>{FOLLOW_UPS[currentQ]}</Text>
          </View>
          <TextInput
            style={styles.symptomInput}
            value={currentA}
            onChangeText={setCurrentA}
            placeholder="Your answer..."
            placeholderTextColor={colors.textMuted}
            multiline
          />
          <Text style={styles.progressText}>Question {currentQ + 1} of {FOLLOW_UPS.length}</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleAnswer}>
            <Text style={styles.ctaBtnText}>Next →</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (stage === 'analyzing') {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <Text style={styles.analyzeEmoji}>🔬</Text>
        <Text style={styles.analyzeTitle}>Analyzing Clinical Probability...</Text>
        <Text style={styles.analyzeStep}>Cross-referencing dietary logs</Text>
        <Text style={styles.analyzeStep}>Week 32 lifecycle status — checked</Text>
        <Text style={styles.analyzeStep}>Symptom database — running</Text>
      </SafeAreaView>
    );
  }

  if (stage === 'emergency') {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.redLight }]}>
        <ScrollView contentContainerStyle={[styles.content, styles.center]}>
          <View style={styles.emergencyCard}>
            <Text style={styles.emergencyIcon}>⚠️</Text>
            <Text style={styles.emergencyLabel}>Risk Detected · Triage Complete</Text>
            <TouchableOpacity style={styles.emergencyBtn}>
              <Text style={styles.emergencyBtnText}>EMERGENCY: CALL DOCTOR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logBtn}>
              <Text style={styles.logBtnText}>Log symptom data</Text>
            </TouchableOpacity>
            <View style={styles.doctorAlert}>
              <Text style={styles.doctorAlertText}>
                📡 Your doctor's dashboard has been alerted with your triage data.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
            <Text style={styles.backLinkText}>← Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // safe outcome
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.successLight }]}>
      <ScrollView contentContainerStyle={[styles.content, styles.center]}>
        <View style={styles.safeCard}>
          <Text style={styles.safeIcon}>✅</Text>
          <Text style={styles.safeTitle}>No Immediate Risk Detected</Text>
          <Text style={styles.safeMsg}>Based on your symptoms and Week 32 profile:</Text>
          <View style={styles.safeRec}>
            <Text style={styles.safeRecText}>• Rest for 20 minutes and drink water</Text>
            <Text style={styles.safeRecText}>• Your next meal should include iron-rich foods</Text>
            <Text style={styles.safeRecText}>• Monitor and log again if symptoms worsen</Text>
          </View>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.ctaBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
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
  back: { color: colors.goldLight, fontSize: 22 },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  content: { padding: 24, paddingBottom: 80 },
  voicePrompt: { alignItems: 'center', marginBottom: 24 },
  waveEmoji: { fontSize: 52, marginBottom: 8 },
  voiceLabel: { fontSize: 18, fontWeight: '700', color: colors.primary },
  symptomInput: {
    backgroundColor: colors.white, borderRadius: 14, padding: 16,
    fontSize: 15, color: colors.text, minHeight: 100, textAlignVertical: 'top',
    borderWidth: 1.5, borderColor: colors.border, marginBottom: 16,
  },
  quickSymptoms: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  symChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border,
  },
  symChipText: { fontSize: 13, color: colors.text },
  ctaBtn: {
    backgroundColor: colors.primary, borderRadius: 14, padding: 18, alignItems: 'center',
  },
  ctaBtnDisabled: { backgroundColor: colors.textMuted },
  ctaBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  aiCard: {
    backgroundColor: colors.primary, borderRadius: 16, padding: 20, marginBottom: 20,
  },
  aiLabel: { fontSize: 12, color: colors.goldLight, fontWeight: '700', marginBottom: 8 },
  aiQuestion: { fontSize: 18, color: colors.white, fontWeight: '600', lineHeight: 26 },
  progressText: { textAlign: 'center', color: colors.textMuted, fontSize: 13, marginBottom: 16 },
  analyzeEmoji: { fontSize: 52, marginBottom: 16 },
  analyzeTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 20, textAlign: 'center' },
  analyzeStep: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  emergencyCard: {
    backgroundColor: colors.white, borderRadius: 20, padding: 28,
    alignItems: 'center', width: '100%', marginBottom: 16,
  },
  emergencyIcon: { fontSize: 52, marginBottom: 12 },
  emergencyLabel: { fontSize: 14, color: colors.red, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  emergencyBtn: {
    backgroundColor: colors.red, borderRadius: 14, padding: 20,
    alignItems: 'center', width: '100%', marginBottom: 12,
  },
  emergencyBtnText: { color: colors.white, fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  logBtn: {
    borderWidth: 2, borderColor: colors.red, borderRadius: 14, padding: 14,
    alignItems: 'center', width: '100%', marginBottom: 16,
  },
  logBtnText: { color: colors.red, fontSize: 14, fontWeight: '700' },
  doctorAlert: {
    backgroundColor: colors.redLight, borderRadius: 10, padding: 12,
    borderLeftWidth: 3, borderLeftColor: colors.red,
  },
  doctorAlertText: { fontSize: 13, color: colors.red, lineHeight: 20 },
  backLink: { marginTop: 8 },
  backLinkText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  safeCard: {
    backgroundColor: colors.white, borderRadius: 20, padding: 28,
    alignItems: 'center', width: '100%',
  },
  safeIcon: { fontSize: 52, marginBottom: 16 },
  safeTitle: { fontSize: 20, fontWeight: '700', color: colors.success, textAlign: 'center', marginBottom: 12 },
  safeMsg: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: 16 },
  safeRec: { width: '100%', marginBottom: 24 },
  safeRecText: { fontSize: 14, color: colors.text, marginBottom: 6 },
});
