import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CalculatorCardProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
  color?: string;
}

export function CalculatorCard({
  icon,
  title,
  description,
  onPress,
  color = '#FF6B35'
}: CalculatorCardProps): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialCommunityIcons name={icon as any} size={32} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center'
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4
  },
  description: {
    fontSize: 13,
    color: '#999'
  }
});
