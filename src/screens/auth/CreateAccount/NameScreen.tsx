import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignup } from "../../../context/SignupContext";

const NameScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const { updateSignupData } = useSignup();

  const handleContinue = () => {
    if (name.trim().length < 2) {
      Alert.alert("Invalid name", "Please enter your full name");
      return;
    }

    // ✅ SAVE TO CONTEXT
    updateSignupData({ name: name.trim() });

    navigation.navigate("PhoneConfirm");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s your name?</Text>
      <Text style={styles.subtitle}>
        This will be shown to employers
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.voiceBox}>
        <Text style={styles.voiceText}>🎤 Tap to speak your name</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#FFF" },
  title: { fontSize: 22, fontWeight: "700", marginTop: 80 },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  voiceBox: {
    marginTop: 12,
    backgroundColor: "#EEF4FF",
    padding: 14,
    borderRadius: 12,
  },
  voiceText: {
    fontSize: 14,
    color: "#1E5EFF",
    fontWeight: "600",
  },
  button: {
    marginTop: "auto",
    marginBottom: 80,
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
