// import { initializeApp } from "firebase/app";
// import { 
//   initializeAuth,
//   getReactNativePersistence
// } from "firebase/auth";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "TON_API_KEY",
//   authDomain: "TON_DOMAIN",
//   projectId: "TON_PROJECT_ID",
//   storageBucket: "TON_BUCKET",
//   messagingSenderId: "TON_ID",
//   appId: "TON_APP_ID",
// };

// const app = initializeApp(firebaseConfig);

// // 🔐 AUTH PRO (persistant)
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// export const db = getFirestore(app);