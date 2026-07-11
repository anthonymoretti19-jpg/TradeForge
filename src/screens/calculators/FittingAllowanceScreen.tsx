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
import { getFittingAllowance, getAllPipeSizes } from '@utils/calculations';
import { Picker } from '@react-native-picker/picker';

export function FittingAllowanceScreen(): JSX.Element {
  const [pipeSize, setPipeSize] = useState(1);
  const [angle, setAngle] = useState<45 | 90>(90);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (): void => {
    const allowance = getFittingAllowance(pipeSize, angle);
    setResult(allowance);
  };

  const pipeSizes = getAllPipeSizes();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Fitting Allowances</Text>
        <Text style={styles.description}>
          Calculate center-to-end measurements for 45° and 90° fittings
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pipe Size (inches)</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={pipeSize}
              onValueChange={setPipeSize}
              style={styles.picker}
              itemStyle={{ color: '#fff' }}
            >
              {pipeSizes.map((size) => (
                <Picker.Item key={size} label={size.toString()} value={size} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Angle</Text>
          <View style={styles.angleContainer}>
            <TouchableOpacity
              style={[
                styles.angleButton,
                angle === 45 && styles.angleButtonActive
              ]}
              onPress={() => setAngle(45)}
            >
              <Text style={styles.angleButtonText}>45°</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.angleButton,
                angle === 90 && styles.angleButtonActive
              ]}
              onPress={() => setAngle(90)}
            >
              <Text style={styles.angleButtonText}>90°</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Fitting Allowance</Text>
            <Text style={styles.resultValue}>{result.toFixed(3)}"</Text>
            <Text style={styles.resultDescription}>
              Center to end of {angle}° fitting for {pipeSize}" pipe
            </Text>
          </View>
        )}
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
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8
  },
  pickerContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    overflow: 'hidden'
  },
  picker: {
    color: '#fff'
  },
  angleContainer: {
    flexDirection: 'row',
    gap: 12
  },
  angleButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center'
  },
  angleButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35'
  },
  angleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  calculateButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  resultContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35'
  },
  resultLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8
  },
  resultDescription: {
    fontSize: 13,
    color: '#666'
  }
});
