import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Switch, TextInput,
} from 'react-native';
import { colors } from '../theme/colors';

const FOOD_PREFS = [
  'Pesarattu', 'Dalma', 'Ragi Java', 'Idli', 'Poha', 'Upma',
  'Sambar', 'Curd Rice', 'Khichdi', 'Palak Dal', 'Rajma', 'Roti',
];
const AVOID_LIST = ['Bitter Gourd', 'Raw Papaya', 'Spinach', 'Brinjal', 'Drumstick'];

const STEPS = ['welcome', 'preferences', 'avoid', 'budget', 'engine', 'plan'];

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('Savitri');
  const [week, setWeek] = useState('27');
  const [selected, setSelected] = useState(['Pesarattu', 'Khichdi', 'Ragi Java']);
  const [avoided, setAvoided] = useState(['Bitter Gourd']);
  const [budget, setBudget] = useState(1500);
  const [loading, setLoading] = useState(false);

  const toggleFood = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const toggleAvoid = (item) => {
    setAvoided(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const next = () => {
    if (step === STEPS.indexOf('engine')) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(s => s + 1); }, 2800);
    } else {
      setStep(s => s + 1);
    }
  };

  // STEP 0 — Welcome splash
  if (step === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.primary }]}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.logo}>🌿 MaayHealth</Text>
          <Text style={styles.welcomeTitle}>Namaste, {name}!</Text>
          <Text style={styles.welcomeSub}>Let's build your personalised health plan</Text>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.textMuted}
          />
          <Text style={styles.label}>Pregnancy Week</Text>
          <TextInput
            style={styles.nameInput}
            value={week}
            onChangeText={setWeek}
            keyboardType="numeric"
            placeholder="e.g. 27"
            placeholderTextColor={colors.textMuted}
          />
          <TouchableOpacity style={styles.goldBtn} onPress={next}>
            <Text style={styles.goldBtnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // STEP 1 — Food preferences
  if (step === 1) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.stepTitle}>What do you love to eat?</Text>
          <Text style={styles.stepSub}>Select your favourite regional dishes</Text>
          <View style={styles.foodGrid}>
            {FOOD_PREFS.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.foodChip, selected.includes(item) && styles.foodChipActive]}
                onPress={() => toggleFood(item)}
              >
                <Text style={[styles.foodChipText, selected.includes(item) && styles.foodChipTextActive]}>
                  {item}
                </Text>
                {selected.includes(item) && <Text style={styles.checkmark}> ✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.goldBtn} onPress={next}>
            <Text style={styles.goldBtnText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // STEP 2 — Avoid list
  if (step === 2) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.stepTitle}>Avoid these items?</Text>
          <Text style={styles.stepSub}>Toggle off anything you'd like to skip</Text>
          {AVOID_LIST.map(item => (
            <View key={item} style={styles.avoidRow}>
              <Text style={styles.avoidLabel}>{item}</Text>
              <Switch
                value={avoided.includes(item)}
                onValueChange={() => toggleAvoid(item)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={avoided.includes(item) ? colors.gold : colors.white}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.goldBtn} onPress={next}>
            <Text style={styles.goldBtnText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // STEP 3 — Budget
  if (step === 3) {
    const budgetOptions = [500, 750, 1000, 1500, 2000, 2500];
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.stepTitle}>Weekly Food Budget</Text>
          <Text style={styles.stepSub}>We'll plan meals that fit your budget</Text>
          <Text style={styles.budgetDisplay}>₹{budget.toLocaleString()}</Text>
          <View style={styles.budgetOptions}>
            {budgetOptions.map(b => (
              <TouchableOpacity
                key={b}
                style={[styles.budgetChip, budget === b && styles.budgetChipActive]}
                onPress={() => setBudget(b)}
              >
                <Text style={[styles.budgetChipText, budget === b && styles.budgetChipTextActive]}>
                  ₹{b.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.goldBtn} onPress={next}>
            <Text style={styles.goldBtnText}>Build My Plan</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // STEP 4 — AI Engine processing
  if (step === 4) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.aiDark }]}>
        <View style={styles.engineContainer}>
          <Text style={styles.engineTitle}>🧠 MaayHealth Engine</Text>
          <Text style={styles.engineSub}>Machine at Work</Text>
          <View style={styles.engineBubble}>
            <Text style={styles.engineBubbleText}>🍲 Regional Recipes{'\n'}1,200+ dishes</Text>
          </View>
          <View style={styles.engineBubble}>
            <Text style={styles.engineBubbleText}>💊 Nutrition Needs{'\n'}Week {week} — Iron, Folate, Protein</Text>
          </View>
          <View style={styles.engineBubble}>
            <Text style={styles.engineBubbleText}>💰 Budget ₹{budget.toLocaleString()} Weekly</Text>
          </View>
          {loading ? (
            <Text style={styles.engineStatus}>Curating 21 balanced meals...{'\n'}Balancing Iron & Folate...</Text>
          ) : (
            <TouchableOpacity style={styles.goldBtn} onPress={next}>
              <Text style={styles.goldBtnText}>View My Plan</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // STEP 5 — Meal plan confirmation
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.stepTitle}>Your Meal Plan</Text>
        <Text style={styles.stepSub}>7-day personalised plan • Week {week}</Text>
        {days.map((day, i) => (
          <View key={day} style={[styles.dayCard, i === 0 && styles.dayCardExpanded]}>
            <Text style={styles.dayLabel}>{day}</Text>
            {i === 0 && (
              <View style={styles.mealsExpanded}>
                <Text style={styles.mealRow}>🌅 Breakfast — Pesarattu</Text>
                <Text style={styles.mealRow}>☀️ Lunch — Palak Moong Dal, Brown Rice</Text>
                <Text style={styles.mealRow}>🍎 Snack — Roasted Chana & Apple</Text>
                <Text style={styles.mealRow}>🌙 Dinner — Vegetable Khichdi with Ghee</Text>
              </View>
            )}
            {i !== 0 && <Text style={styles.dayPreview}>3 meals + 1 snack planned</Text>}
          </View>
        ))}
        <TouchableOpacity
          style={styles.goldBtn}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.goldBtnText}>Confirm My Plan ✓</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  scrollContent: { padding: 24, paddingBottom: 48 },
  welcomeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  logo: { fontSize: 32, fontWeight: '700', color: colors.white, marginBottom: 16 },
  welcomeTitle: { fontSize: 26, fontWeight: '700', color: colors.white, textAlign: 'center' },
  welcomeSub: { fontSize: 15, color: colors.goldLight, marginTop: 8, textAlign: 'center', marginBottom: 32 },
  nameInput: {
    width: '100%', backgroundColor: colors.white, borderRadius: 12, padding: 14,
    fontSize: 16, color: colors.text, marginBottom: 12,
  },
  label: { color: colors.goldLight, fontSize: 14, alignSelf: 'flex-start', marginBottom: 6 },
  stepTitle: { fontSize: 24, fontWeight: '700', color: colors.primary, marginBottom: 6 },
  stepSub: { fontSize: 14, color: colors.textSecondary, marginBottom: 24 },
  foodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  foodChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 20, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.white,
  },
  foodChipActive: { borderColor: colors.primary, backgroundColor: colors.primary + '15' },
  foodChipText: { fontSize: 13, color: colors.text },
  foodChipTextActive: { color: colors.primary, fontWeight: '600' },
  checkmark: { color: colors.primary, fontWeight: '700' },
  avoidRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 10,
  },
  avoidLabel: { fontSize: 15, color: colors.text },
  budgetDisplay: {
    fontSize: 48, fontWeight: '800', color: colors.primary,
    textAlign: 'center', marginVertical: 20,
  },
  budgetOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' },
  budgetChip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.white,
  },
  budgetChipActive: { borderColor: colors.gold, backgroundColor: colors.gold },
  budgetChipText: { fontSize: 14, color: colors.text },
  budgetChipTextActive: { color: colors.white, fontWeight: '700' },
  engineContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  engineTitle: { fontSize: 24, fontWeight: '700', color: colors.gold, marginBottom: 8 },
  engineSub: { fontSize: 15, color: colors.goldLight, marginBottom: 32 },
  engineBubble: {
    backgroundColor: colors.primary + '40', borderRadius: 14, padding: 16,
    marginBottom: 14, width: '100%', borderWidth: 1, borderColor: colors.primaryLight,
  },
  engineBubbleText: { color: colors.white, fontSize: 14, lineHeight: 22 },
  engineStatus: { color: colors.goldLight, fontSize: 15, textAlign: 'center', marginTop: 24, lineHeight: 26 },
  dayCard: {
    backgroundColor: colors.white, borderRadius: 14, padding: 16,
    marginBottom: 10, borderWidth: 1, borderColor: colors.border,
  },
  dayCardExpanded: { borderColor: colors.primary, borderWidth: 2 },
  dayLabel: { fontSize: 13, fontWeight: '700', color: colors.primary, textTransform: 'uppercase', marginBottom: 8 },
  mealsExpanded: { gap: 6 },
  mealRow: { fontSize: 14, color: colors.text, lineHeight: 22 },
  dayPreview: { fontSize: 13, color: colors.textMuted },
  goldBtn: {
    backgroundColor: colors.gold, borderRadius: 14, padding: 18,
    alignItems: 'center', marginTop: 8,
  },
  goldBtnText: { fontSize: 16, fontWeight: '700', color: colors.white },
});
