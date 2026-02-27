

import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EXPERIENCE_MAP } from "../../../constants/workerOptions";
import { useSignup } from "../../../context/SignupContext";
import { registerUser } from "../../../services/auth";
import { speak } from "../../../utils/voiceAssistant";

const experienceOptions = Object.keys(EXPERIENCE_MAP);

const Experience = ({ navigation }: any) => {
  const { signupData, resetSignupData } = useSignup();
  const [selected, setSelected] = useState("1–3 years");
  const [loading, setLoading] = useState(false);

  /* 🔊 Speak when screen opens */
  useEffect(() => {
    speak(
      "Please select your work experience",
      "कृपया अपना अनुभव चुनें",
      "कृपया तुमचा अनुभव निवडा"
    );
  }, []);

  /* 🔊 When user selects option */
  const handleSelect = (exp: string) => {
    setSelected(exp);

    // Make speech human friendly
    let speechText = exp
      .replace("–", " to ")
      .replace("+", " plus ");

    speak(
      `${speechText} selected`,
      `${speechText} चुना गया`,
      `${speechText} निवडले`
    );
  };

  /* 🔊 Create Account */
  const onCreateAccount = async () => {
    const payload = {
      ...signupData,
      experience: EXPERIENCE_MAP[selected],
      age: signupData.age ?? 25,
    };

    const required = [
      "phone_number",
      "name",
      "password",
      "confirm_password",
      "role",
      "language",
      "service_type",
      "experience",
      "age",
      "latitude",
      "longitude",
    ];

    for (const field of required) {
      if (!payload[field as keyof typeof payload]) {
        Alert.alert("Missing data", `${field} is required`);
        speak("Some information is missing");
        return;
      }
    }

    try {
      setLoading(true);

      speak(
        "Creating your account",
        "आपका खाता बनाया जा रहा है",
        "तुमचे खाते तयार होत आहे"
      );

      await registerUser(payload);

      resetSignupData();

      speak(
        "Account created successfully",
        "खाता सफलतापूर्वक बन गया",
        "खाते यशस्वीपणे तयार झाले"
      );

      setTimeout(() => {
        navigation.replace("Login");
      }, 1200);

    } catch (err) {
      Alert.alert("Registration failed", "Check backend logs");
      speak(
        "Registration failed",
        "पंजीकरण असफल हुआ",
        "नोंदणी अयशस्वी झाली"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Your experience?</Text>

      {experienceOptions.map(exp => (
        <TouchableOpacity
          key={exp}
          style={[
            styles.option,
            selected === exp && styles.selected,
          ]}
          onPress={() => handleSelect(exp)}
        >
          <Text
            style={[
              styles.optionText,
              selected === exp && styles.selectedText,
            ]}
          >
            {exp}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={onCreateAccount}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating account..." : "Create Account"}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Experience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFF"
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 80
  },

  option: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    marginBottom: 12
  },

  selected: {
    backgroundColor: "#1E5EFF"
  },

  optionText: {
    fontSize: 16
  },

  selectedText: {
    color: "#FFF",
    fontWeight: "600"
  },

  button: {
    marginTop: "auto",
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 80
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600"
  },
});