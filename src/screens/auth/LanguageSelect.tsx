
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignup } from "../../context/SignupContext";
import { setAppLanguage, speak } from "../../utils/voiceAssistant";

const languages = ["हिंदी", "English", "मराठी", "తెలుగు", "தமிழ்"];

const LANGUAGE_MAP: Record<string, "hi" | "en" | "mr" | "te" | "ta"> = {
  "हिंदी": "hi",
  "English": "en",
  "मराठी": "mr",
  "తెలుగు": "te",
  "தமிழ்": "ta",
};

const LanguageSelect = ({ navigation }: any) => {
  const [selected, setSelected] = useState("हिंदी");
  const { updateSignupData } = useSignup();

  // 🔊 speak when screen opens
  useEffect(() => {
    // start in Hindi because first‑time rural user
    setAppLanguage("hi");

    speak(
      "Please choose your language",
      "कृपया अपनी भाषा चुनें",
      "कृपया तुमची भाषा निवडा"
    );
  }, []);

  // 🔊 speak option name when user taps
  const handleLanguageTap = (lang: string) => {
    setSelected(lang);

    const code = LANGUAGE_MAP[lang];

    setAppLanguage(code as any);

    if (code === "hi")
      speak("Hindi selected", "हिंदी चुनी गई", "हिंदी निवडली");
    else if (code === "mr")
      speak("Marathi selected", "मराठी चुनी गई", "मराठी निवडली");
    else if (code === "en")
      speak("English selected", "अंग्रेजी चुनी गई", "इंग्रजी निवडली");
    else
      speak("Language selected", "भाषा चुनी गई", "भाषा निवडली");
  };

  const handleContinue = () => {
    const languageCode = LANGUAGE_MAP[selected];

    // save in signup context (for backend)
    updateSignupData({
      language: languageCode,
    });

    // 🔊 speak before moving
    setAppLanguage(languageCode as any);

    speak(
      "Continuing to login screen",
      "लॉगिन स्क्रीन पर जा रहे हैं",
      "लॉगिन स्क्रीनकडे जात आहोत"
    );

    // small delay so speech completes
    setTimeout(() => {
      navigation.replace("Login");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.maintitle}>Shramsetu Worker</Text>
          <Text style={styles.title}>Choose Your Language</Text>
          
        </View>

        {/* Language List */}
        <View style={styles.list}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.option,
                selected === lang && styles.selected,
              ]}
              onPress={() => handleLanguageTap(lang)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.optionText,
                  selected === lang && styles.selectedText,
                ]}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default LanguageSelect;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    marginTop: 80,
    marginBottom: 28,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  maintitle: {
    fontSize: 22,
    fontWeight: "700",
    paddingBottom:10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },

  list: {
    flex: 1,
  },
  option: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#F2F4F7",
    marginBottom: 12,
  },
  selected: {
    backgroundColor: "#1E5EFF",
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },

  button: {
    marginBottom: 70,
    backgroundColor: "#1E5EFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});