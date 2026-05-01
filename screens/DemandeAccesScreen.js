import React from "react";
import { View, Text, Button, Alert } from "react-native";

export default function DemandeAccesScreen() {

  const demander = () => {
    Alert.alert(
      "Demande envoyée",
      "Le superAdmin va valider votre compte"
    );
  };

  return (
    <View>
      <Text>Demande d'accès à une église</Text>

      <Button title="Demander accès" onPress={demander} />
    </View>
  );
}