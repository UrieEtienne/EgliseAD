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

export default function AddUserScreen({ navigation }) {
  const { ajouterMembre } = useContext(MembreContext);

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("membre");

  const handleCreate = () => {
    if (!nom || !email || !password) {
      Alert.alert("Erreur", "Remplis tous les champs");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      nom,
      email,
      password,
      role,
      isLinked: false,
    };

    ajouterMembre(newUser);

    Alert.alert("Succès", "Utilisateur créé !");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Créer un utilisateur</Text>

      <TextInput
        placeholder="Nom"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* ROLE SIMPLE */}
      <TouchableOpacity
        style={styles.roleBtn}
        onPress={() =>
          setRole(role === "membre" ? "admin" : "membre")
        }
      >
        <Text style={styles.roleText}>Rôle : {role}</Text>
      </TouchableOpacity>

      {/* CREATE */}
      <TouchableOpacity style={styles.btn} onPress={handleCreate}>
        <Text style={styles.btnText}>Créer utilisateur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  roleBtn: {
    backgroundColor: "#9b59b6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  roleText: {
    color: "#fff",
    fontWeight: "bold",
  },

  btn: {
    backgroundColor: "#2c3e50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});