import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { MembreContext } from "../../context/MembreContext";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { users } = useContext(MembreContext);
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      Alert.alert("Erreur", "Email ou mot de passe incorrect");
      return;
    }

    login(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Se connecter" onPress={handleLogin} />

      {/* 🔥 CREER COMPTE */}
      {users.length === 0 && (
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Créer un compte</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#2c3e50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#3498db",
    fontWeight: "bold",
  },
});