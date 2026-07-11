import React from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CalculatorCard } from '@components/CalculatorCard';
import { useAuth } from '@context/AuthContext';

type RootStackParamList = {
  Home: undefined;
  FittingAllowance: undefined;
  Offset: undefined;
  RollingOffset: undefined;
  GasPipeSizing: undefined;
  FractionCalculator: undefined;
  UnitConverter: undefined;
  PipeCharts: undefined;
  SavedJobs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): JSX.Element {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, {user?.name || 'Tradesperson'}!</Text>
          <Text style={styles.subheading}>TradeForge Pro v1.0</Text>
        </View>

        <Text style={styles.sectionTitle}>Fabrication</Text>
        <CalculatorCard
          icon="pipe"
          title="Fitting Allowances"
          description="45° and 90° calculations"
          color="#FF6B35"
          onPress={() => navigation.navigate('FittingAllowance')}
        />
        <CalculatorCard
          icon="transit-connection-horizontal"
          title="Offset Calculator"
          description="Two-bend offsets"
          color="#F7931E"
          onPress={() => navigation.navigate('Offset')}
        />
        <CalculatorCard
          icon="vector-polyline"
          title="Rolling Offset"
          description="3D offset calculations"
          color="#FDB913"
          onPress={() => navigation.navigate('RollingOffset')}
        />

        <Text style={styles.sectionTitle}>Gas Work</Text>
        <CalculatorCard
          icon="gas-cylinder"
          title="Gas Pipe Sizing"
          description="Natural gas & propane"
          color="#088F8F"
          onPress={() => navigation.navigate('GasPipeSizing')}
        />

        <Text style={styles.sectionTitle}>Utilities</Text>
        <CalculatorCard
          icon="calculator-variant"
          title="Fraction Calculator"
          description="Fraction ↔ Decimal"
          color="#512DA8"
          onPress={() => navigation.navigate('FractionCalculator')}
        />
        <CalculatorCard
          icon="scale-balance"
          title="Unit Converter"
          description="Length, pressure, volume"
          color="#673AB7"
          onPress={() => navigation.navigate('UnitConverter')}
        />
        <CalculatorCard
          icon="table-large"
          title="Pipe Charts"
          description="ASME schedules & weights"
          color="#9C27B0"
          onPress={() => navigation.navigate('PipeCharts')}
        />
        <CalculatorCard
          icon="briefcase"
          title="Saved Jobs"
          description="Manage your projects"
          color="#3F51B5"
          onPress={() => navigation.navigate('SavedJobs')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 32
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4
  },
  subheading: {
    fontSize: 14,
    color: '#999'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginTop: 24,
    marginBottom: 12,
    textTransform: 'uppercase'
  }
});
