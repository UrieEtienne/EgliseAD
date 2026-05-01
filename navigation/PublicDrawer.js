import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";

import PublicHome from "../screens/public/PublicHome";
import ProgrammeScreen from "../screens/public/ProgrammeScreen";
import BureauScreen from "../screens/BureauScreen";
import DemandeAccesScreen from "../screens/DemandeAccesScreen";

const Drawer = createDrawerNavigator();

export default function PublicDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Accueil" component={PublicHome} />
      <Drawer.Screen name="Bureau National" component={BureauScreen} />
      <Drawer.Screen name="Demande d'accès" component={DemandeAccesScreen} />
      <Drawer.Screen name="Programmes" component={ProgrammeScreen} />
    </Drawer.Navigator>
  );
}