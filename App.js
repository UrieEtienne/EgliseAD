import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./context/AuthContext";
import { MembreProvider } from "./context/MembreContext";
import { BureauProvider } from "./context/BureauContext";

import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <MembreProvider>
        <BureauProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </BureauProvider>
      </MembreProvider>
    </AuthProvider>
  );
}