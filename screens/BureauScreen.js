import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";

import { BureauContext } from "../context/BureauContext";
import { AuthContext } from "../context/AuthContext";

export default function BureauScreen({ navigation }) {

  const { bureau, supprimerBureau } = useContext(BureauContext);
  const { user } = useContext(AuthContext);

  // 🔐 PROTECTION ÉCRAN
  if (!user) return null;

  const isAdmin = user?.role === "superAdmin";

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      
      {item.photo && (
        <Image source={{ uri: item.photo }} style={styles.image} />
      )}

      <Text style={styles.name}>
        {item.prenom} {item.nom}
      </Text>

      <Text style={styles.fonction}>
        {item.fonction}
      </Text>

      {/* 👑 ACTIONS ADMIN */}
      {isAdmin && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddBureau", { bureau: item })
            }
          >
            <Text style={styles.edit}>✏️ Modifier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert("Supprimer", "Confirmer ?", [
                { text: "Annuler" },
                {
                  text: "Oui",
                  onPress: () => supprimerBureau(item.id),
                },
              ])
            }
          >
            <Text style={styles.delete}>🗑️ Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Bureau National</Text>

      {/* 👑 BOUTON AJOUT ADMIN */}
      {isAdmin && (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddBureau")}
        >
          <Text style={styles.addText}>➕ Ajouter un membre</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={bureau}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Aucun membre du bureau
          </Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f6fa"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },

  addBtn: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center"
  },

  addText: {
    color: "#fff",
    fontWeight: "bold"
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
    elevation: 4
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10
  },

  name: {
    fontSize: 16,
    fontWeight: "bold"
  },

  fonction: {
    fontSize: 14,
    color: "#555",
    marginTop: 5
  },

  actions: {
    marginTop: 10,
    alignItems: "center"
  },

  edit: {
    color: "blue",
    marginBottom: 5
  },

  delete: {
    color: "red"
  }
});