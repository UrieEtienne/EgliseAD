import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfilMembreScreen({ route }) {
  // Récupère le membre depuis les params
  const { membre } = route.params || {};

  if (!membre) {
    return (
      <View style={styles.container}>
        <Text>Aucun membre sélectionné</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: membre.photo }}
        style={styles.photo}
      />
      <Text style={styles.nom}>
        {membre.nom} {membre.prenom}
      </Text>
      <Text>Département : {membre.departement}</Text>
      <Text>Quartier : {membre.quartier}</Text>
      <Text>Téléphone : {membre.telephone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20
  },
  nom: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  }
});