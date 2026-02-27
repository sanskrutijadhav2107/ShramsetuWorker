
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

import { startLoginRecording, stopLoginRecording } from "../../utils/loginVoice";
import { parsePhoneNumber } from "../../utils/numberParser";
import { speak } from "../../utils/voiceAssistant";

const LoginScreen = ({ navigation }: any) => {
  const [mobile, setMobile] = useState("");
  const [listening, setListening] = useState(false);

  // 🔊 Speak when screen opens (CORRECT PLACE)
  useEffect(() => {
    speak(
      "Please press the microphone and say your mobile number",
      "माइक दबाकर अपना मोबाइल नंबर बोलिए",
      "माईक दाबून तुमचा मोबाईल नंबर सांगा"
    );
  }, []);

  

  // 🎤 MIC BUTTON LOGIC
  const handleVoicePress = async () => {
    if (!listening) {
      setListening(true);
      speak("Listening...");
      await startLoginRecording();
    } else {
      setListening(false);
      speak("Processing...");

      const transcript = await stopLoginRecording();

      if (!transcript) {
        speak("Could not hear clearly");
        return;
      }

      const number = parsePhoneNumber(transcript);

      if (number.length === 10) {
        setMobile(number);
        speak("Mobile number detected");
      } else {
        speak("Please say a 10 digit mobile number clearly");
      }
    }
  };
// CONTINUE BUTTON
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

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Worker Login</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to continue
          </Text>
        </View>

        {/* Phone Input */}
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

        {/* 🎤 Voice Button */}
        <TouchableOpacity
          style={[
            styles.micButton,
            { backgroundColor: listening ? "red" : "#1E5EFF" },
          ]}
          onPress={handleVoicePress}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            🎤 Speak Number
          </Text>
        </TouchableOpacity>

        {/* Create Account */}
        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => navigation.navigate("NameScreen")}
        >
          <Text style={styles.createText}>
            Don’t have an account?{" "}
            <Text style={styles.createLink}>Create new</Text>
          </Text>
        </TouchableOpacity>

        {/* Continue */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
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

  micButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },

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