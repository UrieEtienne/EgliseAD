import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useMembre } from "../context/MembreContext";

export default function UsersScreen({ navigation }) {
  const { membres } = useMembre();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des utilisateurs</Text>

      {/* ➕ AJOUT UTILISATEUR */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddUser")}
      >
        <Text style={styles.addText}>➕ Ajouter utilisateur</Text>
      </TouchableOpacity>

      <FlatList
        data={membres}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Aucun utilisateur
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("EditUser", { user: item })
            }
          >
            <View>
              <Text style={styles.text}>
                {item.nom || "Sans nom"}
              </Text>
              <Text style={{ color: "#777", fontSize: 12 }}>
                {item.email}
              </Text>
            </View>

            <Text style={styles.btn}>Modifier</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#2c3e50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  btn: {
    color: "#3498db",
    fontWeight: "bold",
  },
});