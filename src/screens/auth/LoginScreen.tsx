import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [mobile, setMobile] = useState("");

  const handleContinue = () => {
    if (mobile.length !== 10) {
      Alert.alert("Invalid number", "Enter valid 10 digit mobile number");
      return;
    }

    navigation.navigate("PasswordVerification", {
      mobile,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to continue
          </Text>
        </View>

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

        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => navigation.navigate("NameScreen")}
        >
          <Text style={styles.createText}>
            Don’t have an account?{" "}
            <Text style={styles.createLink}>Create new</Text>
          </Text>
        </TouchableOpacity>

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

export default LoginScreen;

/* styles SAME as yours */


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










