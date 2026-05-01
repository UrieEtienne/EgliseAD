import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useMembre } from "../../context/MembreContext";

export default function RegisterScreen({ navigation }) {
  const { eglises, eglisesNationales, membres, ajouterMembre } = useMembre();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");

  // 🔥 fusion églises (utile si tu veux afficher)
  const allEglises = [...(eglisesNationales || []),...(eglises || [])];

    // ✅ MATRICULE
  const genererMatricule = () => {
    const initialNom = nom ? nom.charAt(0).toUpperCase() : "X";
    const initialPrenom =
      nom?.split(" ")[1]?.charAt(0).toUpperCase() || "X";

    const random = Math.floor(1000 + Math.random() * 9000);

    return `${initialNom}${initialPrenom}${random}`;
  };

  const handleRegister = () => {
  if (!nom || !email || !password) {
    Alert.alert("Erreur", "Remplis tous les champs");
    return;
  }
  // eviter le doublon
  const existe = membres.find(
    (m) =>
      m.email &&
      email &&
      m.email.toLowerCase() === email.toLowerCase()
  );
  if (existe) {
    Alert.alert("Erreur", "Ce compte existe déjà");
    return;
  }

  // 🔐 INTERDICTION DE CRÉER ADMIN
  const role = "membre"; // TOUJOURS membre

  if (role !== "superAdmin") {
    Alert.alert("Interdit !");
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    nom,
    email,
    password,
    telephone,
    role, 
    isLinked: false,
  };
  console.log("NEW USER:", newUser);

  ajouterMembre(newUser);

  Alert.alert("Succès", "Compte créé !");
  navigation.navigate("Login");
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro téléphone (+224...)"
        value={telephone}
        onChangeText={setTelephone}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 🔥 OPTIONNEL (lecture seule pour info) */}
      <View style={styles.box}>
        <Picker enabled={false}>
          <Picker.Item label="Église choisie par Admin" value="" />
          {allEglises.map((e) => (
            <Picker.Item key={e.id} label={e.nom} value={e.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Créer compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#2c3e50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});