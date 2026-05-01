import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { MembreContext } from "../../context/MembreContext";
import { AuthContext } from "../../context/AuthContext";

export default function MembreHomeScreen() {
  const { membres } = useContext(MembreContext);
  const { user } = useContext(AuthContext);

  const myMembers = membres.filter(
    (m) => m.egliseId === user.egliseId
  );

  return (
    <View>
      <Text>Ma communauté</Text>

      <FlatList
        data={myMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={{ width: 60, height: 60 }} />
            <Text>{item.nom}</Text>
            <Text>{item.fonction}</Text>
          </View>
        )}
      />
    </View>
  );
}
// ================= STYLE =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#5e6994",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2c3e50",
  },
  card: {
    flex: 1,
    height: 150,
    margin: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  cardText: {
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  number: {
    marginTop: 5,
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
});