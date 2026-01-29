import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const OtpVerification = ({ route, navigation }: any) => {
  const { mobile } = route.params;
  const [otp, setOtp] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to +91 {mobile}
          </Text>
        </View>

        <TextInput
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />

        <Text style={styles.resend}>Didn’t receive code? Resend</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("LocationPermission")}
        >
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 24 },
  header: { marginTop: 80, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 12 },
  otpInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    fontSize: 20,
    letterSpacing: 12,
    paddingVertical: 14,
    textAlign: "center",
  },
  resend: {
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
