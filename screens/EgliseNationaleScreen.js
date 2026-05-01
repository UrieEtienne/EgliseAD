import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MembreContext } from "../context/MembreContext";
import { AuthContext } from "../context/AuthContext";

export default function EgliseNationaleScreen() {
  const navigation = useNavigation();

  const { eglises, eglisesNationales } = useContext(MembreContext);

  const allEglises = [...eglisesNationales, ...eglises];
  const { user } = useContext(AuthContext);
  if (!user) return null;
  const [search, setSearch] = useState("");

  const role = user?.role;
  const userEgliseId = user?.egliseId;

  const filteredEglises = allEglises.filter((e) =>
    e.nom.toLowerCase().includes(search.toLowerCase())
  );

  // 📍 ouverture maps
  const ouvrirCarte = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    Linking.openURL(url);
  };

  // 📩 SMS (tu amélioreras plus tard avec membres filtrés)
  const envoyerSMS = () => {
    Alert.alert("SMS", "Fonction à connecter avec membres");
  };

  const renderItem = ({ item }) => {
    const isOwnChurch = item.id === userEgliseId;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          // 🔐 accès membres selon rôle
          if (role === "membre" && !isOwnChurch) {
            Alert.alert(
              "Accès refusé",
              "Tu ne peux voir que ton église"
            );
            return;
          }

          navigation.navigate("Eglises", { eglise: item });
        }}
      >
        <Text style={styles.nom}>{item.nom}</Text>
        <Text>📍 Ville : {item.ville}</Text>
        <Text>📌 Zone : {item.zone}</Text>
        <Text>👤 Responsable : {item.responsable}</Text>

        <Text style={styles.mapBtn}>📍 Voir localisation</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔥 ACTIONS */}
      <View style={styles.topActions}>

          {/* 🔐 SEUL PRINCIPAL */}
        {role === "superAdmin" && (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddEglise")}
        >
          <Text style={styles.btnText}>➕ Ajouter Église</Text>
        </TouchableOpacity>
          )}

        <TouchableOpacity style={styles.smsBtn} onPress={envoyerSMS}>
          <Text style={styles.btnText}>📩 SMS</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.title}>Église Nationale</Text>

      <TextInput
        style={styles.search}
        placeholder="Rechercher..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredEglises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f5f6fa" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  topActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 10,
  },
  smsBtn: {
    backgroundColor: "#2980b9",
    padding: 10,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  nom: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  mapBtn: { marginTop: 10, color: "#2980b9", fontWeight: "bold" },
});