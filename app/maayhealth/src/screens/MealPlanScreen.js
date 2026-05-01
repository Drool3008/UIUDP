import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { weekPlan } from '../data/meals';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', snack: '🍎', dinner: '🌙' };

export default function MealPlanScreen({ navigation }) {
  const [expanded, setExpanded] = useState('MON');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>7-Day Meal Plan</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {DAYS.map(day => {
          const meals = weekPlan[day];
          const isOpen = expanded === day;
          return (
            <View key={day} style={[styles.dayCard, isOpen && styles.dayCardOpen]}>
              <TouchableOpacity style={styles.dayHeader} onPress={() => setExpanded(isOpen ? null : day)}>
                <Text style={[styles.dayLabel, isOpen && styles.dayLabelOpen]}>{day}</Text>
                <Text style={styles.dayPreview}>
                  {isOpen ? '▲' : `${meals.breakfast.name} · ${meals.lunch.name}`}
                </Text>
              </TouchableOpacity>
              {isOpen && (
                <View style={styles.mealsContainer}>
                  {['breakfast', 'lunch', 'snack', 'dinner'].map(type => {
                    const meal = meals[type];
                    return (
                      <View key={type} style={styles.mealRow}>
                        <Text style={styles.mealIcon}>{MEAL_ICONS[type]}</Text>
                        <View style={styles.mealInfo}>
                          <Text style={styles.mealType}>{type.toUpperCase()}</Text>
                          <Text style={styles.mealName}>{meal.name}</Text>
                          <Text style={styles.mealKcal}>{meal.kcal} kcal · Iron {meal.iron}% · Protein {meal.protein}%</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.confirmBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.confirmBtnText}>✓  Confirm My Plan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 16,
  },
  back: { color: colors.goldLight, fontSize: 22 },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 100 },
  dayCard: {
    backgroundColor: colors.white, borderRadius: 14, marginBottom: 10,
    borderWidth: 1.5, borderColor: colors.border, overflow: 'hidden',
  },
  dayCardOpen: { borderColor: colors.primary },
  dayHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16,
  },
  dayLabel: { fontSize: 16, fontWeight: '700', color: colors.textSecondary },
  dayLabelOpen: { color: colors.primary },
  dayPreview: { fontSize: 12, color: colors.textMuted, flex: 1, textAlign: 'right', marginLeft: 8 },
  mealsContainer: { borderTopWidth: 1, borderTopColor: colors.border, padding: 12 },
  mealRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.offWhite },
  mealIcon: { fontSize: 22, marginRight: 12, marginTop: 2 },
  mealInfo: { flex: 1 },
  mealType: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1 },
  mealName: { fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 2 },
  mealKcal: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  confirmBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: colors.gold, borderRadius: 14, padding: 18, alignItems: 'center',
  },
  confirmBtnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
});
