

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const StartJobOtp = ({ navigation }: any) => {
  const [otp, setOtp] = useState("");

  const handleStartWork = () => {
    // later you can validate OTP here
    navigation.navigate("WorkerHome", {
      jobStatus: "WORKING",
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Start Job</Text>
        <Text style={styles.subtitle}>
          Ask the customer for the OTP to begin work
        </Text>
      </View>

      {/* OTP Input */}
      <TextInput
        style={styles.otp}
        keyboardType="number-pad"
        maxLength={4}
        value={otp}
        onChangeText={setOtp}
        placeholder="• • • •"
        placeholderTextColor="#9CA3AF"
      />

      {/* Voice */}
      <TouchableOpacity style={styles.voice}>
        <Text style={styles.voiceText}>🎤 Speak OTP</Text>
      </TouchableOpacity>

      {/* CTA */}
      <TouchableOpacity style={styles.start} onPress={handleStartWork}>
        <Text style={styles.startText}>Start Work</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartJobOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },

  header: {
    marginTop: 50,
    marginBottom: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  otp: {
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingVertical: 18,
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 16,
    fontWeight: "600",
    color: "#111827",
  },

  voice: {
    marginTop: 20,
    backgroundColor: "#EEF4FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  voiceText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  },

  start: {
    marginTop: "auto",
    marginBottom: 50,
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  startText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
