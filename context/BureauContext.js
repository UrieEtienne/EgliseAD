import React, { createContext, useState } from "react";

export const BureauContext = createContext();

export const BureauProvider = ({ children }) => {
  const [bureau, setBureau] = useState([]);

  // ✅ Ajouter
  const ajouterBureau = (data) => {
    setBureau((prev) => [...prev, { id: Date.now().toString(), ...data }]);
  };

  // ✅ Modifier
  const modifierBureau = (id, data) => {
    setBureau((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...data } : item
      )
    );
  };

  // ✅ Supprimer
  const supprimerBureau = (id) => {
    setBureau((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BureauContext.Provider
      value={{ bureau, ajouterBureau, modifierBureau, supprimerBureau }}
    >
      {children}
    </BureauContext.Provider>
  );
};