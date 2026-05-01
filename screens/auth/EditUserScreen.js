import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMembre } from "../../context/MembreContext";

export default function EditUserScreen({ route, navigation }) {
  const { user } = route.params;
  const { membres, setMembres } = useMembre();

  // 🔥 UTILISATEUR CONNECTÉ (TEMPORAIRE = principal)
  const currentUser = membres.find((m) => m.role === "superAdmin");

  // 🔐 Vérification
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // ✏️ Modification
  const [nom, setNom] = useState(user.nom || "");
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role || "membre");

  // =========================
  // ❌ SUPPRESSION
  // =========================
  const handleDelete = () => {
    if (!currentUser) return;

    // 🔐 seul principal
    if (currentUser.role !== "superAdmin") {
      Alert.alert("Erreur", "Seul le principal peut supprimer");
      return;
    }

    // ❌ auto suppression interdite
    if (currentUser.id === user.id) {
      Alert.alert("Erreur", "Tu ne peux pas te supprimer toi-même");
      return;
    }

    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cet utilisateur ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const updatedUsers = membres.filter(
              (m) => m.id !== user.id
            );

            setMembres(updatedUsers);

            await AsyncStorage.setItem(
              "membres",
              JSON.stringify(updatedUsers)
            );

            Alert.alert("Succès", "Utilisateur supprimé !");
            navigation.goBack();
          },
        },
      ]
    );
  };

  // =========================
  // ✏️ MODIFICATION
  // =========================
  const handleUpdate = async () => {
    if (!currentUser) return;

    // 🔐 seul principal
    if (currentUser.role !== "superAdmin") {
      Alert.alert("Erreur", "Seul le principal peut modifier");
      return;
    }

    // 🔐 vérification identité
    if (oldEmail !== user.email || oldPassword !== user.password) {
      Alert.alert("Erreur", "Ancien email ou mot de passe incorrect");
      return;
    }

    if (!nom || !email) {
      Alert.alert("Erreur", "Remplis tous les champs");
      return;
    }

    let updatedUsers = membres.map((m) => {
      if (m.id === user.id) {
        return {
          ...m,
          nom,
          email,
          role,
        };
      }
      return m;
    });

    // 🔥 garantir un seul principal
    if (role === "superAdmin") {
      updatedUsers = updatedUsers.map((m) =>
        m.id === user.id
          ? { ...m, role: "superAdmin" }
          : { ...m, role: "membre" }
      );
    }

    setMembres(updatedUsers);

    await AsyncStorage.setItem("membres", JSON.stringify(updatedUsers));

    Alert.alert("Succès", "Utilisateur modifié !");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier utilisateur</Text>

      {/* 🔐 Vérification */}
      <TextInput
        style={styles.input}
        placeholder="Ancien Email"
        value={oldEmail}
        onChangeText={setOldEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Ancien Mot de passe"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />

      {/* ✏️ Modification */}
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={styles.input}
        placeholder="Nouveau Email"
        value={email}
        onChangeText={setEmail}
      />

      {/* 🔄 ROLE */}
      <TouchableOpacity
        style={styles.roleBtn}
        onPress={() => {
          if (!currentUser || currentUser.role !== "superAdmin") {
            Alert.alert("Erreur", "Accès refusé");
            return;
          }

          const newRole =
            role === "superAdmin" ? "membre" : "superAdmin";
          setRole(newRole);
        }}
      >
        <Text style={styles.roleText}>
          Rôle : {role} (cliquer pour changer)
        </Text>
      </TouchableOpacity>

      {/* ✅ SAVE */}
      <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
        <Text style={styles.btnText}>Enregistrer</Text>
      </TouchableOpacity>

      {/* ❌ DELETE */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteText}>Supprimer utilisateur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#2c3e50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  roleBtn: {
    backgroundColor: "#9b59b6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  roleText: {
    color: "white",
    fontWeight: "bold",
  },
  // supprimer
  deleteBtn: {
  backgroundColor: "#e74c3c",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  marginTop: 10,
},
deleteText: {
  color: "white",
  fontWeight: "bold",
},
});