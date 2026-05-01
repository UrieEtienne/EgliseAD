import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MembresScreen from '../screens/MembresScreen';
import ProfilMembreScreen from '../screens/ProfilMembreScreen';

const Stack = createNativeStackNavigator();

export default function ProfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Membres"
        component={MembresScreen}
        options={{ title: "Membres" }}
      />
      <Stack.Screen
        name="ProfilMembre"
        component={ProfilMembreScreen}
        options={{ title: "Profil du membre" }}
      />
    </Stack.Navigator>
  );
}