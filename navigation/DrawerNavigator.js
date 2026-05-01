import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Image, View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import PastorScreen from "../screens/PastorScreen";
import MessageScreen from "../screens/admin/SendMessageScreen";
import ProgrammeScreen from "../screens/ProgrammeScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DepartmentScreen from "../screens/DepartmentScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import BureauScreen from "../screens/BureauScreen";
import EgliseNationaleScreen from "../screens/EgliseNationaleScreen";
import EgliseDetailScreen from "../screens/EgliseDetailScreen";
import AddMembreScreen from '../screens/AddMembreScreen';
import AddEgliseScreen from "../screens/AddEgliseScreen";
import UsersScreen from "../screens/UsersScreen";
import AddBureauScreen from "../screens/AddBureauScreen";


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 30,
          backgroundColor: "#817ff0"
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={{ color: "white", marginTop: 10, fontWeight: "bold" }}>
          Eglise AD Guinée
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#71a6df" },
        headerTintColor: "#15181b",

        drawerStyle: {
          backgroundColor: "#817ff0",
          width: 230
        },

        drawerInactiveTintColor: "#ecf0f1",
        drawerActiveTintColor: "#1c0374",
        drawerActiveBackgroundColor: "#5d768f",

        drawerItemStyle: {
          marginVertical: 5,
          borderRadius: 8,
          paddingHorizontal: 10
        },

        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500"
        }
      }}
    >
      <Drawer.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="Ajouter Membre"
        component={AddMembreScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
      name="Bureau"
      component={BureauScreen}
      options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="EgliseNationale"
        component={EgliseNationaleScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="AddEglise"
        component={AddEgliseScreen}
        options={{ title: "Églises" }}
      />
      <Drawer.Screen
        name="EgliseDetail"
        component={EgliseDetailScreen}
        options={{ title: 'Détails Église' }}
      />
      <Drawer.Screen
        name="Profil Pasteur"
        component={PastorScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }}
      />

      <Drawer.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbox" color={color} size={size} />
          )
        }}
      />
      {user?.role === "superAdmin" && (
        <Drawer.Screen
          name="AddBureau"
          component={AddBureauScreen}
          options={{
            title: "Ajouter Bureau",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="add-circle" color={color} size={size} />
            )
          }}
        />
      )}
      <Drawer.Screen
        name="Programme"
        component={ProgrammeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          )
        }}
      />

      {/* Si utilisateur non connecté */}
      {!user && (
        <Drawer.Screen
          name="Connexion"
          component={LoginScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-in" color={color} size={size} />
            )
          }}
        />
      )}

      {/* Si utilisateur connecté */}
      {user && (
        <Drawer.Screen
          name="Mon Profil"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-circle" color={color} size={size} />
            )
          }}
        />
      )}
      <Drawer.Screen name="Users" component={UsersScreen} />
      {user && user.departement && (
        <Drawer.Screen
          name="Département"
          component={DepartmentScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="business" color={color} size={size} />
            )
          }}
        />
      )}

      <Drawer.Screen
        name="A propos"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}