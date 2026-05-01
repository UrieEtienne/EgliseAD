import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const ajouterMembre = async (egliseId, membre) => {
  try {

    await addDoc(
      collection(db, "eglises", egliseId, "membres"),
      membre
    );

    console.log("Membre ajouté");

  } catch (error) {

    console.log(error);

  }
};