import React, { useState, useEffect, useRef } from "react"; // Ajout de useState, useEffect, useRef
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  FlatList, 
  Dimensions, 
  StyleSheet 
} from "react-native";

const { width } = Dimensions.get("window");

// Données pour le carrousel d'images
const imagesPasteur = [
  { id: '1', uri: require("../assets/pasteur.jpg") }, // Utilisez l'image qui fonctionne
  { id: '2', uri: require("../assets/pasteur2.jpg") }, 
  { id: '3', uri: require("../assets/pasteur3.jpg") },
];

export default function PastorScreen() {
  // --- AJOUTS POUR CORRIGER L'ERREUR ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null); // Définition de la référence manquante

  // Logique du défilement automatique toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      
      if (nextIndex >= imagesPasteur.length) {
        nextIndex = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  // -------------------------------------

  return (
    <ScrollView style={styles.container}>
      <FlatList
        ref={flatListRef} // Maintenant cette variable existe !
        data={imagesPasteur}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => (
          { length: width, offset: width * index, index }
        )}
        renderItem={({ item }) => (
          <Image source={item.uri} style={styles.bannerImage} />
        )}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.nom}>Pasteur Robert Kolie</Text>
        <Text style={styles.role}>Pasteur Principal - Eglise AD Sangoyah</Text>
        
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Biographie</Text>
        <Text style={styles.description}>
          Le Pasteur Robert sert le Seigneur depuis plus de 20 ans. 
          Diplômé en théologie, il est passionné par l'enseignement de la parole 
          et le développement de la communauté locale.
        </Text>

        <Text style={styles.sectionTitle}>Contact & Horaires</Text>
        <Text style={styles.detail}>📍 Bureau : Salle B1, Lambagny</Text>
        <Text style={styles.detail}>📞 Téléphone : +224 622 19 65 09</Text>
        <Text style={styles.detail}>🗓️ Réception : Mardi et vendredi (10h - 17h)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  bannerImage: { width: width, height: 300, resizeMode: 'cover' },
  infoContainer: { padding: 20 },
  nom: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50' },
  role: { fontSize: 16, color: '#71a6df', marginBottom: 10 },
  divider: { height: 2, backgroundColor: '#f0f0f0', marginVertical: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#2c3e50' },
  description: { fontSize: 16, lineHeight: 24, color: '#555', textAlign: 'justify' },
  detail: { fontSize: 15, marginVertical: 5, color: '#333' },
});