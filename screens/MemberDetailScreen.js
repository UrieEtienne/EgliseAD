import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  Linking,
} from "react-native";
import { MembreContext } from "../context/MembreContext";

export default function MemberDetailScreen({ route, navigation }) {

  const { supprimerMembre } = useContext(MembreContext);

  // ✅ sécurité (évite crash)
  const membre = route?.params?.membre;

  if (!membre) {
    return (
      <View style={styles.container}>
        <Text>Membre introuvable</Text>
      </View>
    );
  }

  // 📞 appeler
  const appeler = () => {
    if (membre.numero) {
      Linking.openURL(`tel:${membre.numero}`);
    }
  };

  // 🗑️ supprimer
  const handleDelete = () => {
    Alert.alert("Supprimer", "Confirmer la suppression ?", [
      { text: "Annuler" },
      {
        text: "Oui",
        onPress: () => {
          supprimerMembre(membre.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>

      {/* 📸 PHOTO */}
      {membre.photo ? (
        <Image source={{ uri: membre.photo }} style={styles.photo} />
      ) : (
        <View style={styles.noPhoto}>
          <Text>Pas de photo</Text>
        </View>
      )}

      {/* 👤 NOM */}
      <Text style={styles.title}>
        {membre.nom} {membre.prenom}
      </Text>

      {/*  INFOS */}
      <View style={styles.infoBox}>
        <Text style={styles.title}> Église: {membre.egliseNom || "-"}</Text>
        <Text style={styles.matricule}>🆔 Matricule: {membre.matricule || "-"}</Text>
        <Text  style={styles.name}>📞 Numéro: {membre.numero || "-"}</Text>
        <Text  style={styles.name}>🏠 Quartier: {membre.quartier || "-"}</Text>
        <Text  style={styles.name}>🏙️ Ville: {membre.ville || "-"}</Text>
        <Text  style={styles.name}>👤 Sexe: {membre.sexe || "-"}</Text>
        <Text  style={styles.name}>🏢 Département: {membre.departement || "-"}</Text>
        <Text  style={styles.name}>💼 Poste: {membre.poste || "-"}</Text>
      </View>

      {/*  ACTIONS */}
      <View style={styles.actions}>

        <Button title="📞 Appeler" color="#07a83d" onPress={appeler} />

        <Button
          title="✏️ Modifier" color= "#0630a3"
          onPress={() =>
            navigation.navigate("AddMembre", {
              membre: membre,
              egliseId: membre.egliseId,
              egliseNom: membre.egliseNom,
            })
          }
        />

        <Button title="🗑️ Supprimer" color="red" onPress={handleDelete} />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
  },

  noPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#010613",
  },
  matricule: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#da0b0b",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  infoBox: {
    backgroundColor: "#f2f2f2",
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  actions: {
    gap: 10,
  },
});