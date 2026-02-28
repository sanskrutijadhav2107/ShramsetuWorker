

import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignup } from "../../../context/SignupContext";
import { startLoginRecording, stopLoginRecording } from "../../../utils/loginVoice";
import { parsePhoneNumber } from "../../../utils/numberParser";
import { speak } from "../../../utils/voiceAssistant";

const PhoneConfirm = ({ navigation }: any) => {
  const [phone, setPhone] = useState("");
  const [recording, setRecording] = useState(false);
  const { updateSignupData } = useSignup();

  // 🔊 Instruction when screen opens
  useEffect(() => {
    speak(
      "Hold the microphone button and say your mobile number slowly digit by digit",
      "माइक दबाकर अपना मोबाइल नंबर धीरे-धीरे एक एक अंक बोलिए",
      "माईक दाबून तुमचा मोबाईल नंबर हळू हळू अंकानुसार बोला"
    );
  }, []);

  // Continue button
  const handleContinue = () => {
    if (phone.length !== 10) {
      Alert.alert("Invalid number", "Please enter a valid 10 digit phone number");
      return;
    }

    updateSignupData({ phone_number: phone });
    navigation.navigate("CreatePassword");
  };

  // 🎤 START (hold)
  const startSpeak = async () => {
    setRecording(true);
    await startLoginRecording();
  };

  // 🎤 STOP (release)
  const stopSpeak = async () => {
    setRecording(false);

    const text = await stopLoginRecording();
    if (!text) {
      speak(
        "I could not hear properly. Please try again",
        "मैं ठीक से सुन नहीं पाया, फिर से बोलिए",
        "मला नीट ऐकू आले नाही, पुन्हा बोला"
      );
      return;
    }

    // extract only digits
    const number = parsePhoneNumber(text);

    if (number.length === 10) {
      setPhone(number);

      speak(
        "Mobile number captured",
        "मोबाइल नंबर मिल गया",
        "मोबाईल नंबर मिळाला"
      );
    } else {
      speak(
        "Please speak a full 10 digit mobile number",
        "कृपया पूरा 10 अंकों का नंबर बोलिए",
        "कृपया पूर्ण 10 अंकी नंबर बोला"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your phone number</Text>
      <Text style={styles.subtitle}>This number will be shared with employers</Text>

      {/* Phone input */}
      <View style={styles.phoneBox}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          placeholder=""
          keyboardType="number-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
      </View>

      {/* 🎤 HOLD TO SPEAK BUTTON */}
      <TouchableOpacity
        style={[styles.micButton, recording && styles.recording]}
        onPressIn={startSpeak}
        onPressOut={stopSpeak}
      >
        <Text style={styles.micText}>
          {recording ? "🎙️ Speaking..." : "🎤 Hold & Speak Number"}
        </Text>
      </TouchableOpacity>

      {/* Continue */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
  countryCode: { fontSize: 18, fontWeight: "600", marginRight: 8 },
  input: { fontSize: 18, fontWeight: "600", flex: 1 },

  micButton: {
    marginTop: 30,
    backgroundColor: "#1E5EFF",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  recording: {
    backgroundColor: "#FF3B30",
  },

  micText: {
    color: "#FFF",
    fontSize: 16,
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
