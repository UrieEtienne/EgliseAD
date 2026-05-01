import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PublicHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue 👋</Text>
      <Text>Plateforme Église Nationale</Text>
      <Text>Consultez les programmes et les églises</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});