import React from "react";
import { View, Text } from "react-native";

export default function ProgrammeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Programme de la Semaine</Text>
      <Text>Dimanche: Culte à 9h00</Text>
    </View>
  );
}