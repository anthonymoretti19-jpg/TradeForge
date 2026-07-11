import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({
  label,
  error,
  ...props
}: CustomInputProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#666"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444'
  },
  inputError: {
    borderColor: '#FF6B35'
  },
  errorText: {
    color: '#FF6B35',
    fontSize: 12,
    marginTop: 4
  }
});
