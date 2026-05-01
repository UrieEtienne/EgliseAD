import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { MembreContext } from "../../context/MembreContext";

export default function AllMembersScreen() {
  
  const { membres = [], users = [], lierUtilisateur } = useContext(MembreContext);
  
  // 🔥 demandes = membres en attente
  const demandes = membres.filter(m => m.statut === "en_attente");

  return (
    <View style={{ flex: 1, padding: 10 }}>

      {/* ================= DEMANDES ================= */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        📥 Demandes d'accès
      </Text>

      <FlatList
        data={demandes}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Aucune demande</Text>}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: "#fff", marginBottom: 10 }}>

            <Text>{item.nom} {item.prenom}</Text>
            <Text>Église : {item.egliseNom}</Text>

            <TouchableOpacity
              onPress={() => lierUtilisateur(item.id, item.egliseId)}
            >
              <Text style={{ color: "green", marginTop: 5 }}>
                ✅ Valider
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

      {/* ================= UTILISATEURS ================= */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
        👤 Utilisateurs
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: "#eee", marginBottom: 10 }}>
            <Text>{item.nom}</Text>
            <Text>{item.email}</Text>
            <Text>Rôle : {item.role}</Text>
          </View>
        )}
      />

    </View>
  );
}