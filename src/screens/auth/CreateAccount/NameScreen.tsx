
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignup } from "../../../context/SignupContext";
import { startLoginRecording, stopLoginRecording } from "../../../utils/loginVoice";
import { speak } from "../../../utils/voiceAssistant";

const NameScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [listening, setListening] = useState(false);
  const { updateSignupData } = useSignup();

  useEffect(() => {
    speak(
      "Please tell me your full name after pressing the microphone",
      "माइक दबाकर अपना पूरा नाम बोलिए",
      "माईक दाबून तुमचे पूर्ण नाव सांगा"
    );
  }, []);

  const handleContinue = () => {
    if (name.trim().length < 2) {
      Alert.alert("Invalid name");
      return;
    }

    updateSignupData({ name: name.trim() });
    navigation.navigate("PhoneConfirm");
  };

  const handleVoice = async () => {
    if (!listening) {
      setListening(true);
      // speak("Listening");
      await startLoginRecording();
    } else {
      setListening(false);
      // speak("Processing");

      const text = await stopLoginRecording();
      if (!text) return;

      setName(text);

      speak(
        `Your name is ${text}. If correct press continue`,
        `आपका नाम ${text} है। सही है तो जारी रखें`,
        `तुमचे नाव ${text} आहे. बरोबर असेल तर पुढे जा`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s your name?</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.voiceBox} onPress={handleVoice}>
        <Text style={styles.voiceText}>
          {listening ? "Listening..." : "🎤 Tap to speak your name"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#FFF" },
  title: { fontSize: 22, fontWeight: "700", marginTop: 80 },
  input: { backgroundColor: "#F3F4F6", borderRadius: 12, padding: 16, fontSize: 16 },
  voiceBox: { marginTop: 12, backgroundColor: "#EEF4FF", padding: 14, borderRadius: 12 },
  voiceText: { fontSize: 14, color: "#1E5EFF", fontWeight: "600" },
  button: { marginTop: "auto", marginBottom: 80, backgroundColor: "#1E5EFF", paddingVertical: 16, borderRadius: 14, alignItems: "center" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});