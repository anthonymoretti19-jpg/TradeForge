import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '@context/AuthContext';
import { HomeScreen } from '@screens/HomeScreen';
import { FittingAllowanceScreen } from '@screens/calculators/FittingAllowanceScreen';
import { OffsetScreen } from '@screens/calculators/OffsetScreen';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [isReady, setIsReady] = useState(true);

  if (!isReady) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2a2a2a'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600'
            }
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FittingAllowance"
            component={FittingAllowanceScreen}
            options={{ title: 'Fitting Allowances' }}
          />
          <Stack.Screen
            name="Offset"
            component={OffsetScreen}
            options={{ title: 'Offset Calculator' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </AuthProvider>
  );
}
