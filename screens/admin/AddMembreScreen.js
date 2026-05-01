import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { MembreContext } from "../../context/MembreContext";
import { useRoute } from "@react-navigation/native";

export default function AddMembreScreen({ navigation }) {

 const route = useRoute();

  const membreToEdit = route.params?.membre || null;
  const isEdit = !!membreToEdit;

  // ✅ IMPORTANT ICI
  const { membres, eglisesNationales, ajouterMembre, updateMembre } = useContext(MembreContext);

  // ✅ STATES ÉGLISE
  const [egliseId, setEgliseId] = useState("");
  const [egliseNom, setEgliseNom] = useState("");

  // =========================
  // STATES
  // =========================
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [numero, setNumero] = useState("");
  const [poste, setPoste] = useState("");
  const [ville, setVille] = useState("");
  const [quartier, setQuartier] = useState("");
  const [sexeValue, setSexeValue] = useState("");
  const [departementValue, setDepartementValue] = useState("");


  const [photo, setPhoto] = useState("");

  // =========================
  // PRELOAD EDIT
  // =========================
  useEffect(() => {
    if (membreToEdit) {
      setNom(membreToEdit.nom);
      setPrenom(membreToEdit.prenom);
      setNumero(membreToEdit.numero);
      setVille(membreToEdit.ville);
      setQuartier(membreToEdit.quartier);
      setSexeValue(membreToEdit.sexe);
      setDepartementValue(membreToEdit.departement);
      setPoste(membreToEdit.poste);
      setPhoto(membreToEdit.photo || "");

      setEgliseId(membreToEdit.egliseId || "");
      setEgliseNom(membreToEdit.egliseNom || "");
    }
  }, [membreToEdit]);


  // =========================
  // MATRICULE
  // =========================
  const genererMatricule = () => {
    const initialNom = nom ? nom.trim().charAt(0).toUpperCase() : "X";
    const initialPrenoms = prenom
      ? prenom.trim().split(" ").map(p => p.charAt(0).toUpperCase()).join("")
      : "X";

    const chiffres = Math.floor(1000 + Math.random() * 9000);

    return `${initialNom}${initialPrenoms}${chiffres}`;
  };

  // =========================
  // IMAGE
  // =========================
  const choisirImage = () => {
    Alert.alert("Photo", "Choisir une option", [
      { text: "📷 Caméra", onPress: prendrePhoto },
      { text: "🖼️ Galerie", onPress: choisirDepuisGalerie },
      { text: "Annuler", style: "cancel" },
    ]);
  };

  const prendrePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const choisirDepuisGalerie = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  // =========================
  // SAVE
  // =========================
  const handleSubmit = () => {

    if (!nom || !prenom || !numero) {
      Alert.alert("Erreur", "Nom, prénom et numéro sont obligatoires");
      return;
    }

    const selectedEglise = eglisesNationales.find(e => e.id === egliseId);

    if (!selectedEglise) {
      Alert.alert("Erreur", "Église introuvable");
      return;
    }
    // =========================
    // ✏️ MODIFIER
    // =========================
    if (isEdit) {
      const updated = {
        ...membreToEdit,
        photo,
        nom,
        prenom,
        numero,
        ville,
        quartier,
        sexe: sexeValue,
        departement: departementValue,
        poste,
        egliseId: selectedEglise.id,
        egliseNom: selectedEglise.nom,
      };


      updateMembre(updated);
      Alert.alert("Succès", "Membre modifié !");
      navigation.goBack();
      return;
    }

    // =========================
    // ➕ AJOUT
    // =========================
    const newMembre = {
      id: Date.now().toString(),
      matricule: genererMatricule(),
      nom,
      prenom,
      numero,
      ville,
      quartier,
      sexe: sexeValue,
      departement: departementValue,
      poste,
      photo,

      egliseId: selectedEglise.id,
      egliseNom: selectedEglise.nom,

      // 🔥 DEMANDE D’ACCÈS
      isLinked: false,
      statut: "en_attente",
      role: "membre",
    };

    ajouterMembre(newMembre);

    Alert.alert(
      "Demande envoyée",
      "Ton compte est en attente de validation par l’admin"
    );

    navigation.goBack();
  };

  
  return (
    <ScrollView style={styles.container}>

      {/* ================= ÉGLISE ================= */}
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
        Choisir une église
      </Text>

      <Picker
        selectedValue={egliseId}
        onValueChange={(value) => {
          setEgliseId(value);
          const e = eglisesNationales.find(x => x.id === value);
          setEgliseNom(e?.nom || "");
        }}
      >
        <Picker.Item label="-- Sélectionner église --" value="" />

        {eglisesNationales.map((e) => (
          <Picker.Item key={e.id} label={e.nom} value={e.id} />
        ))}
      </Picker>

  <Text style={styles.matricule}>
    Matricule : {genererMatricule()}
  </Text>

  {/* ========================= */}
  {/* 👤 INFOS DE BASE */}
  {/* ========================= */}
  <TextInput placeholder="Nom" style={styles.input} value={nom} onChangeText={setNom} />
  <TextInput placeholder="Prénom" style={styles.input} value={prenom} onChangeText={setPrenom} />
  <TextInput placeholder="Numéro" style={styles.input} value={numero} onChangeText={setNumero} />

  {/* 🏠 QUARTIER */}
  <TextInput placeholder="Quartier" style={styles.input} value={quartier} onChangeText={setQuartier} />

  {/* 🏙️ VILLE */}
<TextInput placeholder="Ville" style={styles.input} value={ville} onChangeText={setVille} />

  {/* ========================= */}
  {/* 👤 SEXE */}
  {/* ========================= */}
  <Picker selectedValue={sexeValue} onValueChange={setSexeValue}>
    <Picker.Item label="Sexe" value="" />
    <Picker.Item label="Homme" value="M" />
    <Picker.Item label="Femme" value="F" />
  </Picker>

  {/* ========================= */}
  {/* 🏢 DÉPARTEMENT */}
  {/* ========================= */}
  <Picker selectedValue={departementValue} onValueChange={setDepartementValue}>
    <Picker.Item label="Département" value="" />
    <Picker.Item label="Jeunesse" value="Jeunesse" />
    <Picker.Item label="Chorale" value="Chorale" />
    <Picker.Item label="Enfants" value="Enfants" />
    <Picker.Item label="Hommes" value="Hommes" />
    <Picker.Item label="Femmes" value="Femmes" />
    <Picker.Item label="Membre" value="Membre" />

  </Picker>

  {/* 💼 POSTE */}
<Picker selectedValue={poste} onValueChange={setPoste}>
  <Picker.Item label="Poste" value="" />
  <Picker.Item label="Membre" value="Membre" />
  <Picker.Item label="Président(e)" value="Président(e)" />
  <Picker.Item label="Secrétaire" value="Secrétaire" />
  <Picker.Item label="Trésorier(e)" value="Trésorier(e)" />
  <Picker.Item label="Logistique" value="Logistique" />
  <Picker.Item label="Organisation" value="Organisation" />
  <Picker.Item label="Conseillier(e)" value="Conseillier(e)" />
  <Picker.Item label="Vice-Président(e)" value="Vice-Président(e)" />
  <Picker.Item label="Affaires Sociales" value="Affaires Sociales" />

</Picker>

  {/* ========================= */}
  {/* 📸 PHOTO */}
  {/* ========================= */}
  <TouchableOpacity style={styles.photoBtn} onPress={choisirImage}>
    <Text>📸 Ajouter / Modifier photo</Text>
  </TouchableOpacity>

  {photo && (
    <Image source={{ uri: photo }} style={styles.image} />
  )}

  {/* ========================= */}
  {/* 💾 SAVE */}
  {/* ========================= */}
  <Button
    title={isEdit ? "Modifier membre" : "Enregistrer membre"}
    onPress={handleSubmit}
  />

</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  
  matricule: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#da0b0b",
  },

  photoBtn: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});