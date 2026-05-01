import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { MembreContext } from "../context/MembreContext";
import { AuthContext } from "../context/AuthContext";

export default function EgliseDetailScreen({ route, navigation }) {

  const { membres } = useContext(MembreContext);
  const { user } = useContext(AuthContext);

  const eglise = route.params?.eglise;

  if (!eglise) return null;

  // 👑 ADMIN
  const isAdmin = user?.role === "superAdmin";

  // ✅ MEMBRES VALIDÉS SEULEMENT
  const membresEglise = membres.filter(
    (m) =>
      m.egliseId === eglise.id &&
      m.isLinked === true
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>

      {item.photo && (
        <Image source={{ uri: item.photo }} style={styles.image} />
      )}

      <Text style={styles.name}>
        {item.prenom} {item.nom}
      </Text>

      <Text style={styles.poste}>{item.poste}</Text>
      <Text style={styles.departement}>{item.departement}</Text>

    </View>
  );

  return (
    <View style={styles.container}>

      {/* 🔥 INFOS EGLISE */}
      <Text style={styles.title}>{eglise.nom}</Text>

      {/* 👑 AJOUT MEMBRE */}
      {isAdmin && (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate("AddMembre", {
              egliseId: eglise.id,
              egliseNom: eglise.nom,
            })
          }
        >
          <Text style={styles.addText}>➕ Ajouter membre</Text>
        </TouchableOpacity>
      )}

      {/* 👥 LISTE MEMBRES */}
      <FlatList
        data={membresEglise}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Aucun membre validé
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f6fa",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  addBtn: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  poste: {
    color: "#2980b9",
  },

  departement: {
    color: "#555",
  },
});