import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";

export default function CustomDrawerContent(props) {
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      
      {/* MENU */}
      {props.state.routeNames.map((name, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => props.navigation.navigate(name)}
          style={{ padding: 15 }}
        >
          <Text style={{ fontSize: 16 }}>{name}</Text>
        </TouchableOpacity>
      ))}

      {/* LOGOUT */}
      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 20,
          // backgroundColor: "red",
          padding: 12,
          borderRadius: 8,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: "red", textAlign: "left", fontWeight: "bold", fontSize: 20, paddingTop: 480, }}>
         Déconnexion
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}