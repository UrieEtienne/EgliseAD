import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MembreContext } from "../../context/MembreContext";

export default function EglisesScreen({ navigation }) {

  const { eglises } = useContext(MembreContext);

  return (
    <View style={styles.container}>

      {eglises.length === 0 ? (
        <Text style={{ textAlign: "center" }}>
          Aucune église pour le moment
        </Text>
      ) : (
        <FlatList
          data={eglises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
  style={styles.card}
  onPress={() =>
    navigation.navigate("Eglises", { eglise: item })
  }
>
  <Text style={styles.name}>{item.nom}</Text>

  {/*  bouton localisation */}
  <TouchableOpacity
    onPress={() => {
      if (item.latitude && item.longitude) {
        navigation.navigate("Map", {
          lat: item.latitude,
          lng: item.longitude,
        });
      } else {
        Alert.alert("Pas de localisation");
      }
    }}
  >
    <Text style={{ color: "blue" }}>📍 Voir localisation</Text>
  </TouchableOpacity>
</TouchableOpacity>

          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  card: {
    padding: 15,
    backgroundColor: "#3498db",
    borderRadius: 10,
    marginBottom: 10
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});