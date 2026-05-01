import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from './src/theme/colors';

function HomeScreen({ navigate }) {
  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Ananya! 🌿</Text>
            <Text style={styles.subGreeting}>Week 32 · Monday</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn} onPress={() => navigate('home')}>
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.card} onPress={() => navigate('mealPlan')}>
          <Text style={styles.cardText}>📅 View Meal Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigate('cookHelper')}>
          <Text style={styles.cardText}>📲 Cook Helper</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigate('symptom')}>
          <Text style={styles.cardText}>🩺 Symptom Check</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function MealPlanScreen({ navigate }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('home')}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>7-Day Meal Plan</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>🌿 Week Plan Loaded</Text>
      </ScrollView>
    </View>
  );
}

function CookHelperScreen({ navigate }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('home')}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Cook Helper</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>📲 Notify Cook</Text>
      </ScrollView>
    </View>
  );
}

function SymptomScreen({ navigate }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('home')}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Symptom Check</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>🩺 How are you feeling?</Text>
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const navigateRef = useRef(setScreen);
  navigateRef.current = setScreen;
  
  const renderScreen = () => {
    switch(screen) {
      case 'mealPlan': return <MealPlanScreen navigate={navigateRef.current} />;
      case 'cookHelper': return <CookHelperScreen navigate={navigateRef.current} />;
      case 'symptom': return <SymptomScreen navigate={navigateRef.current} />;
      default: return <HomeScreen navigate={navigateRef.current} />;
    }
  };
  
  return renderScreen();
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 16 },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  back: { color: colors.goldLight, fontSize: 22 },
  greeting: { fontSize: 20, fontWeight: '700', color: colors.primary },
  subGreeting: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  avatarBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 20, marginBottom: 12 },
  cardText: { fontSize: 16, fontWeight: '600', color: colors.text },
});
