import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function ModifierBureauScreen({ route, navigation }) {

  const { membre, setBureau } = route.params;

  const [nom, setNom] = useState(membre.nom);
  const [prenom, setPrenom] = useState(membre.prenom);
  const [fonction, setFonction] = useState(membre.fonction);
  const [search, setSearch] = useState("");
  const filtered = membres.filter(m =>
    m.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    setBureau((prev) =>
      prev.map((item) =>
        item.id === membre.id
          ? { ...item, nom, prenom, fonction }
          : item
      )
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rechercher membre</Text>

      <TextInput
        placeholder="Rechercher par nom..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <Text style={styles.title}>Modifier Bureau</Text>

      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />

      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        style={styles.input}
      />

      <TextInput
        placeholder="Fonction"
        value={fonction}
        onChangeText={setFonction}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={{ color: "#fff" }}>💾 Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },

  btn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  }
});