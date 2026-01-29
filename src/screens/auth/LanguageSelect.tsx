import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const languages = ["हिंदी", "English", "मराठी", "తెలుగు", "தமிழ்"];

const LanguageSelect = ({ navigation }: any) => {
  const [selected, setSelected] = useState("हिंदी");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Language</Text>
          <Text style={styles.subtitle}>अपनी भाषा चुनें</Text>
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
              onPress={() => setSelected(lang)}
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
          onPress={() => navigation.navigate("Login")}
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

  /* Header */
  header: {
    marginTop: 80,        // pushes "Choose Language" down
    marginBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },

  /* Language list */
  list: {
    flex: 1,              // auto adjusts spacing on all phones
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

  /* Button */
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
