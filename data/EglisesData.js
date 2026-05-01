import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const { width } = Dimensions.get("window");

const departements = [
  { id: "1", nom: "Chorale", icon: "musical-notes", color: "#3498db" },
  { id: "2", nom: "Jeunesse", icon: "people", color: "#2ecc71" },
  { id: "3", nom: "Femmes", icon: "woman", color: "#e91e63" },
  { id: "4", nom: "Hommes", icon: "man", color: "#34495e" },
  { id: "5", nom: "Évangélisation", icon: "megaphone", color: "#e67e22" },
  { id: "6", nom: "Intercession", icon: "hand-left", color: "#9b59b6" },

];

export const eglises = [
  {
    id: '1',
    nom: 'Église Bethel',
    localite: 'Conakry, Kaloum',
    responsable: 'Pasteur Mamadou Diallo',
    membres: ['Aliou', 'Fatou', 'Moussa'],
    departements: ['Jeunesse', 'Musique', 'Caritas'],
  },
  {
    id: '2',
    nom: 'Église du Bon Berger',
    localite: 'Kindia, Fria',
    responsable: 'Pasteur Aissatou Keita',
    membres: ['Oumar', 'Salif', 'Mariama'],
    departements: ['Enfants', 'Adulte', 'Mission'],
  },
  // ajouter d'autres églises
];