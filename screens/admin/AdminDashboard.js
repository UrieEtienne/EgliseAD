import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AdminDashboard({ navigation }) {

  const goTo = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (error) {
      Alert.alert("Erreur navigation", `Screen '${screen}' introuvable`);
      console.log("NAV ERROR:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Page  Dashboard Admin</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => goTo("AddEglise")}
      >
        <Text style={styles.text}>⛪ Gérer Églises</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => goTo("AddMembre")}
      >
        <Text style={styles.text}>👤 Ajouter Membre</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => goTo("SendSms")}
      >
        <Text style={styles.text}>📩 Envoyer Message</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => goTo("AllMembers")}
      >
        <Text style={styles.text}>📋 Voir tous les membres</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#2c3e50",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});