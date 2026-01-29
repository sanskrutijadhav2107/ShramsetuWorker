import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [mobile, setMobile] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to continue
          </Text>
        </View>

        {/* Mobile Input */}
        <View style={styles.inputBox}>
          <Text style={styles.code}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 10 digit number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* Voice Info */}
        <View style={styles.voiceBox}>
          <Text style={styles.voiceTitle}>🎤 Voice Input Available</Text>
          <Text style={styles.voiceSub}>
            Tap the mic icon to speak your number
          </Text>
        </View>

        {/* Create Account Link */}
        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => navigation.navigate("NameScreen")}
        >
          <Text style={styles.createText}>
            Not have an account?{" "}
            <Text style={styles.createLink}>Create new</Text>
          </Text>
        </TouchableOpacity>

        {/* Get OTP Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("OtpVerification", { mobile })
          }
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Get OTP</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  /* Header */
  header: {
    marginTop: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },

  /* Input */
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
  },
  code: {
    fontSize: 16,
    marginRight: 8,
    color: "#000",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  /* Voice box */
  voiceBox: {
    marginTop: 16,
    backgroundColor: "#EEF4FF",
    padding: 14,
    borderRadius: 12,
  },
  voiceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E5EFF",
  },
  voiceSub: {
    fontSize: 12,
    color: "#475569",
    marginTop: 4,
  },

  /* Create account link */
  createAccount: {
    marginTop: 16,
    alignItems: "center",
  },
  createText: {
    fontSize: 14,
    color: "#475569",
  },
  createLink: {
    color: "#1E5EFF",
    fontWeight: "600",
  },

  /* Button */
  button: {
    marginTop: "auto",
    marginBottom: 70,
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
