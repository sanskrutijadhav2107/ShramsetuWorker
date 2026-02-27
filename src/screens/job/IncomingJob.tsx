

import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSignup } from "../../context/SignupContext";
import { rejectJob } from "../../services/jobApi";
import { sendQuotation } from "../../services/quotationApi";

const IncomingJob = ({ navigation, route }: any) => {
  const { signupData } = useSignup();
  const { job } = route.params;

  if (!signupData.user_id) {
    throw new Error("Worker not logged in");
  }

  const [quote, setQuote] = useState("");

  /* ================= ACTIONS ================= */

  const handleReject = async () => {
    try {
      await rejectJob(job.id, signupData.user_id!);
    } catch (err) {
      console.log("Reject failed:", err);
    }
    navigation.goBack();
  };

  const handleSendQuote = async () => {
    if (!quote.trim()) {
      Alert.alert("Enter quotation message");
      return;
    }

    try {
      await sendQuotation(job.id, signupData.user_id!, quote);

      Alert.alert("Quotation sent to customer");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to send quotation");
    }
  };

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>New Job Request</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Job Type</Text>
          <Text style={styles.value}>{job.service_type}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{job.description}</Text>
        </View>

        {/* QUOTATION INPUT */}
        <Text style={styles.quoteTitle}>
          Send quotation to customer
        </Text>

        <TextInput
          value={quote}
          onChangeText={setQuote}
          placeholder="Example: I can repair it for ₹250"
          multiline
          style={styles.input}
        />
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.reject} onPress={handleReject}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accept} onPress={handleSendQuote}>
          <Text style={styles.acceptText}>Send Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncomingJob;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 120,
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  row: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  quoteTitle: {
    marginTop: 20,
    fontWeight: "700",
    fontSize: 14,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },

  actions: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 40,
  },

  reject: {
    flex: 1,
    backgroundColor: "#FEE2E2",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 8,
  },

  rejectText: {
    color: "#DC2626",
    fontWeight: "700",
  },

  accept: {
    flex: 1,
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 8,
  },

  acceptText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});