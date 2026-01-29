import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const experienceOptions = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "More than 10 years",
];

const Experience = ({ navigation }: any) => {
  const [selected, setSelected] = useState("1–3 years");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your experience?</Text>
      <Text style={styles.subtitle}>
        How many years have you been working?
      </Text>

      {experienceOptions.map(exp => (
        <TouchableOpacity
          key={exp}
          style={[
            styles.option,
            selected === exp && styles.selected,
          ]}
          onPress={() => setSelected(exp)}
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
        style={styles.button}
        onPress={() => navigation.replace("WorkerHome")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Experience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    marginTop:80,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  selected: {
    backgroundColor: "#1E5EFF",
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "600",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom:80,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
