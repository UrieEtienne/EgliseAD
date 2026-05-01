import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function ProfileScreen() {

  return (

    <ScrollView contentContainerStyle={styles.container}>

      {/* Photo du pasteur */}
      <Image
        source={require("../assets/pasteur.jpg")}
        style={styles.image}
      />

      {/* Nom */}
      <Text style={styles.name}>
        Pasteur Jean Baptiste
      </Text>

      {/* Fonction */}
      <Text style={styles.title}>
        Pasteur Principal
      </Text>

      {/* Message */}
      <Text style={styles.description}>
        Bienvenue dans notre église. Notre mission est de partager
        la parole de Dieu, d'encourager les croyants et d'apporter
        l'amour du Christ à toute la communauté.
      </Text>

      {/* Informations */}
      <View style={styles.infoBox}>

        <Text style={styles.info}>📞 Téléphone : +224 620 00 00 00</Text>

        <Text style={styles.info}>
          ✉️ Email : pasteur@eglise.com
        </Text>

        <Text style={styles.info}>
          📍 Adresse : Conakry, Guinée
        </Text>

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff"
  },

  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 15
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5
  },

  title: {
    fontSize: 18,
    color: "#777",
    marginBottom: 20
  },

  description: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 25
  },

  infoBox: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10
  },

  info: {
    fontSize: 16,
    marginBottom: 10
  }

});