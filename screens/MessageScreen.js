import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

export default function MessageScreen() {
  const [message, setMessage] = useState("");

  const envoyer = () => {
    Alert.alert("Message envoyé à toute l'église");
  };

  return (
    <View>
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />

      <Button title="Envoyer" onPress={envoyer} />
    </View>
  );
}