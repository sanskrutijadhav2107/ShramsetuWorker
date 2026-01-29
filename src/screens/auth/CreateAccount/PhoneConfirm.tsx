import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PhoneConfirm = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your phone number</Text>
      <Text style={styles.subtitle}>
        This number will be shared with employers
      </Text>

      <View style={styles.phoneBox}>
        <Text style={styles.phone}>+91 98765 43210</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("WorkType")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneConfirm;

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
  phoneBox: {
    backgroundColor: "#F3F4F6",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  phone: {
    fontSize: 18,
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
