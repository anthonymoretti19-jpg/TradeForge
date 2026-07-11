import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { Input } from '@components/Input';
import { calculateOffset } from '@utils/calculations';

export function OffsetScreen(): JSX.Element {
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCalculate = (): void => {
    if (!rise || !run) {
      setError('Please enter both rise and run');
      return;
    }

    const riseNum = parseFloat(rise);
    const runNum = parseFloat(run);

    if (isNaN(riseNum) || isNaN(runNum) || riseNum <= 0 || runNum <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    setError('');
    const calculation = calculateOffset(riseNum, runNum);
    setResult(calculation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Offset Calculator</Text>
        <Text style={styles.description}>Two-bend offset calculations</Text>

        <Input
          label="Rise (inches)"
          placeholder="Enter rise distance"
          value={rise}
          onChangeText={setRise}
          keyboardType="decimal-pad"
          error={error && rise ? error : undefined}
        />

        <Input
          label="Run (inches)"
          placeholder="Enter run distance"
          value={run}
          onChangeText={setRun}
          keyboardType="decimal-pad"
          error={error && run ? error : undefined}
        />

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultsContainer}>
            <ResultRow
              label="Center-to-Center"
              value={`${result.centerLine.toFixed(3)}"`}
            />
            <ResultRow
              label="Center Line (45°)"
              value={`${result.center45.toFixed(3)}"`}
            />
            <ResultRow
              label="Cut Length (45°)"
              value={`${result.cutLength45.toFixed(3)}"`}
            />
            <ResultRow
              label="Center Line (90°)"
              value={`${result.center90.toFixed(3)}"`}
            />
            <ResultRow
              label="Cut Length (90°)"
              value={`${result.cutLength90.toFixed(3)}"`}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ResultRow({
  label,
  value
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24
  },
  calculateButton: {
    backgroundColor: '#F7931E',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  resultsContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    overflow: 'hidden'
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a'
  },
  resultLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500'
  },
  resultValue: {
    fontSize: 14,
    color: '#F7931E',
    fontWeight: '600'
  }
});
