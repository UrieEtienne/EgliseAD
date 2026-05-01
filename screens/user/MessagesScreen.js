import React, { useContext, useState, useMemo } from "react";
import { View, Text, FlatList, Image, StyleSheet, TextInput } from "react-native";
import { MembreContext } from "../../context/MembreContext";

export default function ListeMembresScreen({ route }) {

  const { membres } = useContext(MembreContext);

  const { egliseId, departement } = route.params || {};

  const [search, setSearch] = useState("");

  if (!egliseId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aucune église sélectionnée</Text>
      </View>
    );
  }

  //  Filtre église + département
  const membresFiltresBase = useMemo(() => {
    return membres.filter((m) => {
      const appartientEglise = m.eglise === egliseId;
      if (departement === "TOUS") {
        return appartientEglise;
      }
      return appartientEglise && m.departement === departement;
    });
  }, [membres, egliseId, departement]);

  // 🔍 2. Recherche globale
  const membresFiltres = useMemo(() => {
  const query = (search || "").toLowerCase();

  return membresFiltresBase.filter((m) => {
    return (
      m.matricule?.toLowerCase().includes(query) ||
      m.nom?.toLowerCase().includes(query) ||
      m.prenom?.toLowerCase().includes(query) ||
      m.quartier?.toLowerCase().includes(query) ||
      m.poste?.toLowerCase().includes(query) ||
      String(m.numero || "").toLowerCase().includes(query)
    );
  });
}, [membresFiltresBase, search]);

  // 📊 3. Compteur par département
  const compteurDepartement = useMemo(() => {
    const compteur = {};

    membresFiltresBase.forEach((m) => {
      const dep = m.departement || "Inconnu";

      compteur[dep] = (compteur[dep] || 0) + 1;
    });

    return compteur;
  }, [membresFiltresBase]);

  return (
    <View style={styles.container}>

      {/* TITRE */}
      <Text style={styles.title}>
        {departement === "TOUS" ? "Tous les membres" : departement}
      </Text>

      {/* 🔍 BARRE DE RECHERCHE */}
      <TextInput
        placeholder="Rechercher (nom, matricule, téléphone...)"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />
      {/* LISTE */}
      <FlatList
        data={membresFiltres}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
              source={{ uri: item.photo || "https://via.placeholder.com/60" }}
              style={styles.photo}
            />

            <View style={{ marginLeft: 10, flex: 1 }}>

              <Text style={styles.name}>
                {item.nom} {item.prenom}
              </Text>
                <Text style={styles.texte}>Matricule : {item.matricule || "-"}</Text>
                <Text style={styles.texte}>📞 Contact : {item.numero || "-"}</Text>
                <Text style={styles.texte}>🏠 Quartier : {item.quartier || "-"}</Text>
                <Text style={styles.texte}>🏠 Eglise : {item.eglise || "-"}</Text>
                <Text style={styles.texte}>🧑‍💼 Poste : {item.poste || "-"}</Text>
                <Text style={styles.texte}>🏛 Département : {item.departement || "-"}</Text>
                <Text style={styles.texte}>👤 Sexe : {item.sexe || "-"}</Text>
                <Text style={styles.texte}>🌍 Nationalité : {item.nationalite || "-"}</Text>
            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  card: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#626f81",
    borderRadius: 10,
    marginBottom: 10
  },

  photo: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  name: {
    fontWeight: "bold",
    fontSize: 26,
    color:"#f7f7fa"
  },
  texte:{
    fontWeight: "impact",
    fontSize: 18,
    color:"#f7f7fa"
  },
  search:{
    borderColor:"#020714",
    borderRadius: 20,
  }

});