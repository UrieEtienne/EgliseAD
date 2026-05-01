import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MembreContext = createContext();

const eglisesNationales = [
  { id: "1", nom: "Église Centrale Kankan" },
  { id: "2", nom: "Église Assemblée de Dieu Conakry" },
  { id: "3", nom: "Église Vie Nouvelle Kindia" },
];

export const MembreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [membres, setMembres] = useState([]);
  const [eglises, setEglises] = useState([]);

  // =========================
  // 🔁 LOAD DATA
  // =========================
  useEffect(() => {
    const loadData = async () => {
      try {
        const u = await AsyncStorage.getItem("users");
        const m = await AsyncStorage.getItem("membres");
        const e = await AsyncStorage.getItem("eglises");

        let usersData = u ? JSON.parse(u) : [];
        let membresData = m ? JSON.parse(m) : [];
        let eglisesData = e ? JSON.parse(e) : eglisesNationales;

        // 🔥 SUPER ADMIN AUTO
        const hasAdmin = usersData.some(
          (u) => u.role === "superAdmin"
        );

        if (!hasAdmin) {
          usersData.push({
            id: "admin-1",
            nom: "Super Admin",
            email: "admin@gmail.com",
            password: "1234",
            role: "superAdmin",
          });
        }

        setUsers(usersData);
        setMembres(membresData);
        setEglises(eglisesData);

        await AsyncStorage.setItem("users", JSON.stringify(usersData));
        await AsyncStorage.setItem("membres", JSON.stringify(membresData));
        await AsyncStorage.setItem("eglises", JSON.stringify(eglisesData));

      } catch (error) {
        console.log("Erreur chargement:", error);
      }
    };

    loadData();
  }, []);

  // =========================
  // 💾 SAVE AUTO
  // =========================
  useEffect(() => {
    AsyncStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    AsyncStorage.setItem("membres", JSON.stringify(membres));
  }, [membres]);

  useEffect(() => {
    AsyncStorage.setItem("eglises", JSON.stringify(eglises));
  }, [eglises]);

  // =========================
  // 👤 USERS (LOGIN)
  // =========================
  const ajouterUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  // =========================
  // 👥 MEMBRES (ÉGLISE)
  // =========================
  const ajouterMembre = (membre) => {
    setMembres((prev) => [...prev, membre]);
  };

  const supprimerMembre = (id) => {
    setMembres((prev) => prev.filter((m) => m.id !== id));
  };

  // =========================
  // ✅ VALIDATION PAR ADMIN
  // =========================
  const lierUtilisateur = (userId, egliseId) => {
    setMembres((prev) =>
      prev.map((m) =>
        m.id === userId
          ? {
              ...m,
              statut: "valide",
              isLinked: true,
              egliseId: egliseId
            }
          : m
      )
    );
  };

  // =========================
  // ⛪ EGLISE
  // =========================
  const addEglise = (eglise) => {
    setEglises((prev) => [...prev, eglise]);
  };

  return (
    <MembreContext.Provider
      value={{
        users,
        membres,
        eglises,
        eglisesNationales,

        ajouterUser,
        ajouterMembre,
        supprimerMembre,
        lierUtilisateur,
        addEglise,
      }}
    >
      {children}
    </MembreContext.Provider>
  );
};

export const useMembre = () => useContext(MembreContext);