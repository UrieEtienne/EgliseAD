import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function VerifyCodeScreen({ route, navigation }) {
  const { login } = useContext(AuthContext);

  const { nom, telephone, email, code } = route.params;
  const [inputCode, setInputCode] = useState("");

  const verify = () => {
    if (inputCode === code) {
      login({
        nom,
        telephone,
        email,
        role: "membre",
      });

      Alert.alert("Succès", "Compte créé avec succès");
    } else {
      Alert.alert("Erreur", "Code incorrect");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Vérification du code</Text>

      <TextInput
        placeholder="Entrer le code"
        value={inputCode}
        onChangeText={setInputCode}
      />

      <TouchableOpacity onPress={verify}>
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}