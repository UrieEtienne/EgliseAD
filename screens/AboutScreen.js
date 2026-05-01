import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Image
          source={require("../assets/eglise.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Église Assemblée de Dieu</Text>
        <Text style={styles.subtitle}>
          Une communauté chrétienne dédiée à la prière,
          l'adoration et l'enseignement de la parole de Dieu.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👨‍💼 Pasteur</Text>
        <Text style={styles.text}>Pasteur Jean Dupont</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Adresse</Text>
        <Text style={styles.text}>Conakry - Guinée</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Contact</Text>
        <Text style={styles.text}>+224 620 00 00 00</Text>
        <Text style={styles.text}>contact@eglise.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌐 Réseaux sociaux</Text>
        <Text style={styles.text}>Facebook : Église AD</Text>
        <Text style={styles.text}>YouTube : AD Conakry</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 Application Église
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#fff",
    padding:20
  },

  header:{
    alignItems:"center",
    marginBottom:20
  },

  logo:{
    width:120,
    height:120,
    borderRadius:60,
    marginBottom:10
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    textAlign:"center"
  },

  subtitle:{
    textAlign:"center",
    color:"gray",
    marginTop:10
  },

  section:{
    marginTop:20
  },

  sectionTitle:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:5
  },

  text:{
    fontSize:16,
    color:"#333"
  },

  footer:{
    marginTop:40,
    alignItems:"center"
  },

  footerText:{
    color:"gray"
  }

});