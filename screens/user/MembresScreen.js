import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useMembre } from "../context/MembreContext";

export default function MembersScreen() {
  const { user } = useContext(AuthContext);
  const { membres } = useMembre();

  const myMembers = membres.filter(
    (m) => m.egliseId === user?.egliseId
  );

  return (
    <FlatList
      data={myMembers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item.nom}</Text>
        </View>
      )}
    />
  );
}