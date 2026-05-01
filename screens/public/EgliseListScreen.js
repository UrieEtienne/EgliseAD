import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useMembre } from "../../context/MembreContext";

export default function EglisesScreen() {
  const { eglises } = useMembre();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⛪ Liste des Églises</Text>

      <FlatList
        data={eglises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nom}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune église trouvée</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#2c3e50",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});