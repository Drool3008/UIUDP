import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { C } from '../../theme/colors';
import { weekPlan } from '../../data/meals';

const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const LABELS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default function WeeklyMealPlanScreen({ onBack }) {
  const [activeDay, setActiveDay] = useState('MON');
  const plan = weekPlan[activeDay];

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={s.backTxt}>←</Text></TouchableOpacity>
        <Text style={s.title}>Weekly Meal Plan</Text>
        <TouchableOpacity style={s.editBtn}><Text style={s.editTxt}>Edit</Text></TouchableOpacity>
      </View>

      {/* Day selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dayScroll}
        contentContainerStyle={s.dayRow}>
        {DAYS.map((d, i) => (
          <TouchableOpacity key={d} style={[s.dayPill, activeDay===d && s.dayPillOn]}
            onPress={() => setActiveDay(d)}>
            <Text style={[s.dayTxt, activeDay===d && s.dayTxtOn]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.dayLabel}>{LABELS[DAYS.indexOf(activeDay)]}</Text>

        {[
          { slot:'Breakfast', key:'breakfast', emoji:'🌅' },
          { slot:'Lunch',     key:'lunch',     emoji:'☀️'  },
          { slot:'Snack',     key:'snack',     emoji:'🍎'  },
          { slot:'Dinner',    key:'dinner',    emoji:'🌙'  },
        ].map(({ slot, key, emoji }) => {
          const meal = plan[key];
          return (
            <View key={key} style={s.mealCard}>
              <View style={s.mealCardLeft}>
                <Text style={s.mealSlot}>{emoji} {slot}</Text>
                <Text style={s.mealName}>{meal.name}</Text>
                <Text style={s.mealDesc}>{meal.desc}</Text>
                <View style={s.mealStats}>
                  <Text style={s.stat}>⚡ {meal.kcal} kcal</Text>
                  <Text style={s.stat}>🩸 Iron {meal.iron}mg</Text>
                  <Text style={s.stat}>🌿 Folate {meal.folate}µg</Text>
                </View>
              </View>
              <TouchableOpacity style={s.swapBtn}>
                <Text style={s.swapTxt}>↺</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={s.totalCard}>
          <Text style={s.totalLabel}>Day Total</Text>
          <Text style={s.totalKcal}>
            {Object.values(plan).reduce((a, m) => a + m.kcal, 0)} kcal
          </Text>
          <Text style={s.totalSub}>Goal: 2,100 kcal</Text>
        </View>

        <View style={{ height:32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:       { flex:1, backgroundColor: C.bg },
  header:     { flexDirection:'row', alignItems:'center', paddingHorizontal:20,
                paddingVertical:14, gap:12 },
  backTxt:    { fontSize:24, color: C.green, fontWeight:'700' },
  title:      { flex:1, fontSize:20, fontWeight:'800', color: C.textDark },
  editBtn:    { backgroundColor: C.softGreen, borderRadius:10, paddingHorizontal:12, paddingVertical:6 },
  editTxt:    { fontSize:12, color: C.green, fontWeight:'700' },
  dayScroll:  { maxHeight:56 },
  dayRow:     { paddingHorizontal:16, gap:8, alignItems:'center' },
  dayPill:    { borderRadius:20, paddingHorizontal:16, paddingVertical:8,
                backgroundColor: C.cardWhite, borderWidth:1.5, borderColor: C.divider },
  dayPillOn:  { backgroundColor: C.green, borderColor: C.green },
  dayTxt:     { fontSize:13, fontWeight:'700', color: C.textMuted },
  dayTxtOn:   { color: C.cardWhite },
  scroll:     { paddingHorizontal:20, paddingTop:16, paddingBottom:24 },
  dayLabel:   { fontSize:18, fontWeight:'800', color: C.textDark, marginBottom:14 },
  mealCard:   { backgroundColor: C.cardWhite, borderRadius:20, padding:16, marginBottom:12,
                flexDirection:'row', alignItems:'center',
                shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8, elevation:2 },
  mealCardLeft:{ flex:1 },
  mealSlot:   { fontSize:11, fontWeight:'700', color: C.textMuted, marginBottom:4 },
  mealName:   { fontSize:15, fontWeight:'800', color: C.textDark, marginBottom:2 },
  mealDesc:   { fontSize:12, color: C.textMuted, marginBottom:8 },
  mealStats:  { flexDirection:'row', gap:10, flexWrap:'wrap' },
  stat:       { fontSize:10, color: C.textMid, backgroundColor: C.bg,
                borderRadius:8, paddingHorizontal:6, paddingVertical:3 },
  swapBtn:    { width:36, height:36, borderRadius:18, backgroundColor: C.softGreen,
                alignItems:'center', justifyContent:'center' },
  swapTxt:    { fontSize:18, color: C.green, fontWeight:'700' },
  totalCard:  { backgroundColor: C.green, borderRadius:20, padding:20, alignItems:'center', gap:4 },
  totalLabel: { fontSize:12, color:'#A8D5BE', fontWeight:'700' },
  totalKcal:  { fontSize:32, fontWeight:'900', color: C.cardWhite },
  totalSub:   { fontSize:12, color:'#A8D5BE' },
});
