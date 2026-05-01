import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useMembre } from "../../context/MembreContext";

export default function SendSmsScreen() {
  const { membres } = useMembre();
  const [message, setMessage] = useState("");

  const sendSms = async () => {
    if (!message.trim()) {
      Alert.alert("Erreur", "Écris un message");
      return;
    }

    const recipients = membres
      .filter((m) => m.telephone)
      .map((m) => m.telephone);

    if (recipients.length === 0) {
      Alert.alert("Erreur", "Aucun numéro trouvé");
      return;
    }

    console.log("📱 NUMÉROS:", recipients);

    try {
      const res = await fetch("http://192.168.1.116:5000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          recipients,
        }),
      });

      const data = await res.json();

      console.log("✅ RESPONSE:", data);

      if (data.success) {
        Alert.alert("Succès", "SMS envoyés 📩");
        setMessage("");
      } else {
        Alert.alert("Erreur", data.error || "Échec envoi");
      }

    } catch (error) {
      console.log("❌ ERREUR:", error);
      Alert.alert("Erreur serveur");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📩 Envoyer SMS</Text>

      <TextInput
        style={styles.input}
        placeholder="Écris ton message..."
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={sendSms}>
        <Text style={styles.btnText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    minHeight: 100,
    textAlignVertical: "top",
  },
  btn: {
    backgroundColor: "#2c3e50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});