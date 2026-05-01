import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { todayNutrition, nutritionGoals, weekPlan } from '../data/meals';

function NutritionBar({ label, value, goal, color }) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <View style={styles.barContainer}>
      <View style={styles.barLabelRow}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barValue}>{Math.round(pct)}%</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const today = weekPlan.MON;
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Ananya! 🌿</Text>
            <Text style={styles.subGreeting}>Week 32 · Monday</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        </View>

        {/* ANC Reminder banner */}
        <View style={styles.reminderBanner}>
          <Text style={styles.reminderIcon}>💊</Text>
          <Text style={styles.reminderText}>Iron tablet due at 8:00 PM · Folic acid done ✓</Text>
        </View>

        {/* Today's Meal Card */}
        <View style={styles.mealCard}>
          <View style={styles.mealCardHeader}>
            <Text style={styles.mealCardLabel}>TODAY'S MEAL</Text>
            <Text style={styles.mealCardBadge}>Healthy & Energizing</Text>
          </View>
          <Text style={styles.mealCardName}>{today.breakfast.name}</Text>
          <Text style={styles.mealCardDesc}>Breakfast • {today.breakfast.kcal} kcal</Text>
          <View style={styles.mealCardActions}>
            <TouchableOpacity
              style={styles.notifyBtn}
              onPress={() => navigation.navigate('CookHelper')}
            >
              <Text style={styles.notifyBtnText}>📲 Notify Cook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewPlanBtn} onPress={() => navigation.navigate('MealPlan')}>
              <Text style={styles.viewPlanText}>View Full Plan →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nutrition Progress */}
        <View style={styles.nutritionCard}>
          <Text style={styles.sectionTitle}>Today's Nutrition Goals</Text>
          <NutritionBar label="Iron" value={todayNutrition.iron} goal={nutritionGoals.iron} color={colors.primary} />
          <NutritionBar label="Folate" value={todayNutrition.folate} goal={nutritionGoals.folate} color={colors.gold} />
          <NutritionBar label="Protein" value={todayNutrition.protein} goal={nutritionGoals.protein} color={colors.primaryLight} />
          <NutritionBar label="Calcium" value={todayNutrition.calcium} goal={nutritionGoals.calcium} color={colors.warning} />
          <Text style={styles.calorieText}>
            {todayNutrition.calories} / {nutritionGoals.calories} kcal consumed
          </Text>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('PhotoScan')}>
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionLabel}>Scan Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Symptom')}>
            <Text style={styles.actionIcon}>🩺</Text>
            <Text style={styles.actionLabel}>Symptom Check</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('MealPlan')}>
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={styles.actionLabel}>Meal Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>👩‍⚕️</Text>
            <Text style={styles.actionLabel}>Doctor Connect</Text>
          </TouchableOpacity>
        </View>

        {/* Week snapshot */}
        <Text style={styles.sectionTitle}>This Week</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
          {days.map((day, i) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayPill, i === 0 && styles.dayPillActive]}
              onPress={() => navigation.navigate('MealPlan')}
            >
              <Text style={[styles.dayPillText, i === 0 && styles.dayPillTextActive]}>{day}</Text>
              <Text style={[styles.dayPillMeal, i === 0 && styles.dayPillTextActive]}>
                {i === 0 ? 'Pesarattu' : '3 meals'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { padding: 20, paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 20, fontWeight: '700', color: colors.primary },
  subGreeting: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  avatarBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  reminderBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.warningLight, borderRadius: 12,
    padding: 12, marginBottom: 16, gap: 10,
    borderLeftWidth: 3, borderLeftColor: colors.warning,
  },
  reminderIcon: { fontSize: 18 },
  reminderText: { fontSize: 13, color: colors.warning, flex: 1 },
  mealCard: {
    backgroundColor: colors.primary, borderRadius: 20,
    padding: 20, marginBottom: 16,
  },
  mealCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  mealCardLabel: { fontSize: 11, fontWeight: '700', color: colors.goldLight, letterSpacing: 1 },
  mealCardBadge: {
    fontSize: 11, color: colors.primary, backgroundColor: colors.goldLight,
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8,
  },
  mealCardName: { fontSize: 26, fontWeight: '800', color: colors.white, marginBottom: 4 },
  mealCardDesc: { fontSize: 13, color: colors.goldLight, marginBottom: 16 },
  mealCardActions: { flexDirection: 'row', gap: 10 },
  notifyBtn: {
    flex: 1, backgroundColor: colors.gold, borderRadius: 12,
    padding: 12, alignItems: 'center',
  },
  notifyBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  viewPlanBtn: {
    flex: 1, backgroundColor: colors.white + '20', borderRadius: 12,
    padding: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.white + '40',
  },
  viewPlanText: { color: colors.white, fontWeight: '600', fontSize: 14 },
  nutritionCard: {
    backgroundColor: colors.white, borderRadius: 16, padding: 18, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 12 },
  barContainer: { marginBottom: 12 },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  barLabel: { fontSize: 13, color: colors.textSecondary },
  barValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  barTrack: { height: 8, backgroundColor: colors.offWhite, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  calorieText: { fontSize: 12, color: colors.textMuted, textAlign: 'right', marginTop: 4 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  actionCard: {
    width: '47%', backgroundColor: colors.white, borderRadius: 14,
    padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  actionIcon: { fontSize: 28, marginBottom: 8 },
  actionLabel: { fontSize: 13, fontWeight: '600', color: colors.text },
  weekScroll: { marginBottom: 10 },
  dayPill: {
    backgroundColor: colors.white, borderRadius: 14, padding: 14,
    marginRight: 10, minWidth: 90, alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  dayPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayPillText: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 4 },
  dayPillTextActive: { color: colors.white },
  dayPillMeal: { fontSize: 11, color: colors.textMuted },
});
