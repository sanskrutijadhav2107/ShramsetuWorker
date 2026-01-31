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

const PhoneConfirm = ({ navigation }: any) => {
  const [phone, setPhone] = useState("");
  const { updateSignupData } = useSignup();

  const handleContinue = () => {
    if (phone.length !== 10) {
      Alert.alert("Invalid number", "Please enter a valid 10-digit phone number");
      return;
    }

    // ✅ SAVE TO CONTEXT (BACKEND EXPECTS phone_number)
    updateSignupData({ phone_number: phone });

    navigation.navigate("CreatePassword");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your phone number</Text>
      <Text style={styles.subtitle}>
        This number will be shared with employers
      </Text>

      <View style={styles.phoneBox}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          placeholder="Enter phone number"
          keyboardType="number-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
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

export default PhoneConfirm;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#FFF" },
  title: { fontSize: 22, fontWeight: "700", marginTop: 80 },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  phoneBox: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  input: { fontSize: 18, fontWeight: "600", flex: 1 },
  button: {
    marginTop: "auto",
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 80,
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
