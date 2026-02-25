import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignup } from "../../../context/SignupContext";
// import { speak } from "expo-speech";
import { speak } from "../../../utils/voiceAssistant";

const EnterPassword = ({ navigation }: any) => {
  const { signupData, updateSignupData } = useSignup();
  const [password, setPassword] = useState("");
useEffect(() => {
  speak(
    "Please enter your password to continue",
    "जारी रखने के लिए अपना पासवर्ड दर्ज करें",
    "पुढे जाण्यासाठी तुमचा पासवर्ड टाका"
  );
}, []);
  const mobile = signupData.phone_number; // ✅ from context

  const handleContinue = () => {
    if (!mobile) {
      Alert.alert(
        "Missing phone number",
        "Please enter your phone number first"
      );
      navigation.replace("PhoneConfirm");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak password",
        "Password must be at least 6 characters"
      );
      return;
    }

    updateSignupData({
      password,
      confirm_password: password,
    });

    navigation.navigate("WorkType");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Password</Text>
          <Text style={styles.subtitle}>
            Set a password for +91 {mobile ?? "your number"}
          </Text>
        </View>

        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgot}>Forgot password?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EnterPassword;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 24 },

  header: { marginTop: 80, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 12 },

  passwordInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  forgot: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    color: "#1E5EFF",
  },

  button: {
    marginTop: "auto",
    marginBottom: 80,
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
