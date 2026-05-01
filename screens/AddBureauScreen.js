import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BureauContext } from "../context/BureauContext";

export default function AddBureauScreen({ route, navigation }) {
  const { ajouterBureau, modifierBureau } = useContext(BureauContext);

  const bureauEdit = route.params?.bureau || null;
  const isEdit = !!bureauEdit;

  const [nom, setNom] = useState(bureauEdit?.nom || "");
  const [prenom, setPrenom] = useState(bureauEdit?.prenom || "");
  const [fonction, setFonction] = useState(bureauEdit?.fonction || "");
  const [photo, setPhoto] = useState(bureauEdit?.photo || null);

  // 📸 CAMERA
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission refusée", "Autorise la caméra");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // 🖼️ GALERIE
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // 🔥 CHOIX CAMERA OU GALERIE
  const pickImage = () => {
    Alert.alert("Choisir une photo", "Sélectionne une option", [
      {
        text: "📷 Caméra",
        onPress: openCamera,
      },
      {
        text: "🖼️ Galerie",
        onPress: openGallery,
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  };

  const handleSave = () => {
    const data = { nom, prenom, fonction, photo };

    if (isEdit) {
      modifierBureau(bureauEdit.id, data);
    } else {
      ajouterBureau(data);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEdit ? "Modifier membre" : "Ajouter membre"}
      </Text>

      <TextInput
        placeholder="Nom"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        placeholder="Prénom"
        style={styles.input}
        value={prenom}
        onChangeText={setPrenom}
      />

      <TextInput
        placeholder="Fonction"
        style={styles.input}
        value={fonction}
        onChangeText={setFonction}
      />

      <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
        <Text style={{ color: "#fff" }}>📸 Ajouter une photo</Text>
      </TouchableOpacity>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>
          {isEdit ? "Modifier" : "Ajouter"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#2c3e50",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },

  photoBtn: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#2c3e50",
  },

  saveBtn: {
    backgroundColor: "#2c3e50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});