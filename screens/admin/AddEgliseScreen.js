import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MembreContext } from "../../context/MembreContext";
import { AuthContext } from "../../context/AuthContext";

export default function AddEgliseScreen({ navigation }) {
  const { addEglise } = useContext(MembreContext);
  const { user } = useContext(AuthContext);

  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [zone, setZone] = useState("");
  const [responsable, setResponsable] = useState("");

  if (user?.role !== "superAdmin") {
    return (
      <View style={styles.center}>
        <Text>⛔ Accès refusé</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!nom) {
      Alert.alert("Erreur", "Nom obligatoire");
      return;
    }

    const newEglise = {
      id: Date.now().toString(),
      nom,
      ville,
      zone,
      responsable,
    };

    addEglise(newEglise);

    Alert.alert("Succès", "Église ajoutée");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Ajouter Église</Text>

      <TextInput
        placeholder="Nom"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        placeholder="Ville"
        style={styles.input}
        value={ville}
        onChangeText={setVille}
      />

      <TextInput
        placeholder="Zone"
        style={styles.input}
        value={zone}
        onChangeText={setZone}
      />

      <TextInput
        placeholder="Responsable"
        style={styles.input}
        value={responsable}
        onChangeText={setResponsable}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});