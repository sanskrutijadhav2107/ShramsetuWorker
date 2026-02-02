import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WORK_TYPES } from "../../../constants/workerOptions";
import { useSignup } from "../../../context/SignupContext";

const WorkType = ({ navigation }: any) => {
  const { updateSignupData } = useSignup();
  const [selected, setSelected] = useState(WORK_TYPES[0]);

  const onContinue = () => {
    updateSignupData({
      role: "worker",
      service_type: selected.value,
    });

    navigation.navigate("Experience");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What work do you do?</Text>
      <Text style={styles.subtitle}>
        Select your primary skill
      </Text>

      {WORK_TYPES.map(job => (
        <TouchableOpacity
          key={job.value}
          style={[
            styles.option,
            selected.value === job.value && styles.selected,
          ]}
          onPress={() => setSelected(job)}
        >
          <Text
            style={[
              styles.optionText,
              selected.value === job.value && styles.selectedText,
            ]}
          >
            {job.label}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkType;




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
