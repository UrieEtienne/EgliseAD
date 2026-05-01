import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";

import MembreHomeScreen from "../screens/membre/MembreHomeScreen";
import MessagesScreen from "../screens/MessageScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/membre/HomeScreen";
import ProgrammeScreen from "../screens/membre/ProgrammeScreen";
import BureauScreen from "../screens/BureauScreen";

const Drawer = createDrawerNavigator();

export default function MembreDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Accueil" component={HomeScreen} />
      <Drawer.Screen name="Bureau" component={BureauScreen} />
      <Drawer.Screen name="Mon Église" component={MembreHomeScreen} />
      <Drawer.Screen name="Messages" component={MessagesScreen} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
      <Drawer.Screen name="Programme" component={ProgrammeScreen} />
    </Drawer.Navigator>
  );
}