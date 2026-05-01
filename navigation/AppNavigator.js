import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";

// AUTH
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// DRAWERS
import AdminDrawer from "./AdminDrawer";
import PublicDrawer from "./PublicDrawer";
import MembreDrawer from "./MembreDrawer";

// GLOBAL SCREENS
import AllMembersScreen from "../screens/admin/AllMembersScreen";
import AddMembreScreen from "../screens/admin/AddMembreScreen";
import SendSmsScreen from "../screens/admin/SendSmsScreen";
import AddEgliseScreen from "../screens/admin/AddEgliseScreen";
import EditUserScreen from "../screens/auth/EditUserScreen";
import EgliseListScreen from "../screens/public/EgliseListScreen";
import AddUserScreen from "../screens/auth/AddUserScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* ================= AUTH ================= */}
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          {/* ================= ROLE ================= */}

          {/* 👑 ADMIN */}
          {user.role === "superAdmin" && (
            <Stack.Screen name="Admin" component={AdminDrawer} />
          )}

          {/* 🌍 PUBLIC */}
          {user.role !== "superAdmin" && !user.isLinked && (
            <Stack.Screen name="Public" component={PublicDrawer} />
          )}

          {/* 👤 MEMBRE */}
          {user.role !== "superAdmin" && user.isLinked && (
            <Stack.Screen name="Membre" component={MembreDrawer} />
          )}

          {user?.role === "superAdmin" && (
            <Stack.Screen name="AddUser" component={AddUserScreen} />
          )}
       
            {/* ================= GLOBAL SCREENS ================= */}

          <Stack.Screen name="AllMembers" component={AllMembersScreen} />
          <Stack.Screen name="AddMembre" component={AddMembreScreen} />
          <Stack.Screen name="SendSms" component={SendSmsScreen} />
          <Stack.Screen name="AddEglise" component={AddEgliseScreen} />
          <Stack.Screen name="EditUser" component={EditUserScreen} />
          <Stack.Screen name="Eglises" component={EgliseListScreen} />
        </>
      )}

    </Stack.Navigator>
  );
}