import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EglisesScreen from "../screens/user/MyEglisesScreen";
import EgliseDetailScreen from "../screens/EgliseDetailScreen";
import MembresScreen from "../screens/MembresScreen";
import AddMembreScreen from "../screens/AddMembreScreen";
import ListeMembresScreen from "../screens/user/MembresScreen";
import EgliseNationaleScreen from "../screens/EgliseNationaleScreen";
import AddEgliseScreen from "../screens/AddEgliseScreen";

const Stack = createNativeStackNavigator();

export default function EglisesStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="ListeEglises"
        component={EglisesScreen}
        options={{ title: "Églises" }}
      />

      <Stack.Screen
        name="ListeMembres"
        component={ListeMembresScreen}
        options={{ title: "Membres" }}
      />

      <Stack.Screen
        name="EgliseNationale"
        component={EgliseNationaleScreen}
        options={{ title: "Église Nationale" }}
      />
      {/* CORRECT : un seul nom propre */}
      <Stack.Screen
        name="AddEgliseScreen"
        component={AddEgliseScreen}
        options={{ title: "Ajouter Église" }}
      />

      <Stack.Screen
        name="EgliseDetail"
        component={EgliseDetailScreen}
        options={({ route }) => ({
          title: route.params?.eglise?.nom || "Détails Église"
        })}
      />

      <Stack.Screen
        name="AjouterMembre"
        component={AddMembreScreen}
        options={{ title: "Ajouter un membre" }}
      />
      <Stack.Screen
        name="AddMembre"
        component={AddMembreScreen}
      />
      <Stack.Screen
        name="Membres"
        component={MembresScreen}
        options={{ title: "Membres du département" }}
      />
    </Stack.Navigator>
  );
}