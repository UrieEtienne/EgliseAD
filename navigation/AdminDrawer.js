import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";

import BureauScreen from "../screens/BureauScreen";
import AddBureauScreen from "../screens/AddBureauScreen";
import UsersScreen from "../screens/UsersScreen";
import EgliseNationaleScreen from "../screens/EgliseNationaleScreen";
import AdminDashboard from "../screens/admin/AdminDashboard";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#2c3e50" },
        headerTintColor: "#fff",
        drawerActiveBackgroundColor: "#2c3e50",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="Dashboard" component={AdminDashboard} />
      <Drawer.Screen name="Bureau" component={BureauScreen} />
      <Drawer.Screen name="AddBureau" component={AddBureauScreen} />
      <Drawer.Screen name="Utilisateurs" component={UsersScreen} />
      <Drawer.Screen name="Eglises" component={EgliseNationaleScreen} />
    </Drawer.Navigator>
  );
}