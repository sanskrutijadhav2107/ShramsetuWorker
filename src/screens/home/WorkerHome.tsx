

import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import api from "../../services/api";

import BottomNavBar from "../../components/BottomNavBar";
import { useSignup } from "../../context/SignupContext";
import { getWorkerJobs } from "../../services/jobApi";
import { setAvailability } from "../../services/worker";

export default function HomeScreen({ navigation, route }: any) {
  const { signupData } = useSignup();

  /* ================= AADHAAR STATE ================= */

  const [isVerified, setIsVerified] = useState(
    signupData?.is_verified ?? false
  );

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* ================= WORK STATE ================= */

  const [onDuty, setOnDuty] = useState(false);
  const [jobStatus, setJobStatus] = useState<
    "AVAILABLE" | "ASSIGNED" | "WORKING"
  >("AVAILABLE");

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ================= STATUS UPDATE ================= */

  useEffect(() => {
    if (route?.params?.jobStatus) {
      setJobStatus(route.params.jobStatus);
    }
  }, [route?.params?.jobStatus]);

  /* ================= PICK ZIP ================= */

  const pickAadhaar = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/zip",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      setSelectedFile(result.assets[0]);
      setShowCodeModal(true);
    } catch {
      Alert.alert("Could not open file picker");
    }
  };

  /* ================= VERIFY ================= */

  const submitAadhaar = async () => {
    if (!selectedFile) {
      Alert.alert("Select Aadhaar ZIP file first");
      return;
    }

    if (shareCode.length !== 8) {
      Alert.alert("Enter valid 8 character share code");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", {
        uri: selectedFile.uri,
        name: selectedFile.name || "aadhaar.zip",
        type: "application/zip",
      } as any);

      formData.append("share_code", shareCode);

      const res = await api.post(
        `/aadhaar/verify/${signupData.user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.verified) {
        setIsVerified(true);
        setShowCodeModal(false);
        setShareCode("");
        Alert.alert("Verified ✅", "Your identity is successfully verified");
      } else {
        Alert.alert("Verification failed");
      }
    } catch (err: any) {
      console.log("VERIFY ERROR:", err?.response?.data || err);
      Alert.alert("Upload failed", "Check ZIP password and try again");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TOGGLE DUTY ================= */

  const toggleDuty = async (value: boolean) => {
    if (!isVerified) {
      Alert.alert("Verification Required", "Please verify Aadhaar first");
      return;
    }

    setOnDuty(value);

    if (!signupData.user_id) return;

    try {
      await setAvailability({
        user_id: signupData.user_id,
        is_available: value,
      });

      if (value) startPolling();
      else stopPolling();
    } catch {}
  };

  /* ================= POLLING ================= */

  const startPolling = () => {
    stopPolling();

    pollingRef.current = setInterval(async () => {
      try {
        const res = await getWorkerJobs(signupData.user_id!);

        if (res.jobs.length > 0) {
          const job = res.jobs[0];
          stopPolling();
          setJobStatus("ASSIGNED");
          navigation.navigate("IncomingJob", { job });
        }
      } catch {}
    }, 5000);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const getStepIndex = () => {
    if (jobStatus === "AVAILABLE") return 0;
    if (jobStatus === "ASSIGNED") return 1;
    return 2;
  };

  /* ================= UI ================= */

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.topContainer}>
          <View style={styles.profileRow}>
            <View style={styles.profileLeft}>
              <View style={styles.avatar}>
                <Text style={{ fontSize: 18 }}>👤</Text>
              </View>

              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.name}>
                    {signupData.name || "Worker"}
                  </Text>

                  {isVerified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✔ Verified</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.rating}>⭐ 0.0 (0)</Text>
              </View>
            </View>

            <View style={styles.toggleWrap}>
              <Switch value={onDuty} onValueChange={toggleDuty} />
              <Text style={styles.toggleText}>
                {onDuty ? "ON Duty" : "OFF Duty"}
              </Text>
            </View>
          </View>
        </View>

        {!isVerified && (
          <TouchableOpacity style={styles.verifyCard} onPress={pickAadhaar}>
            <Text style={styles.verifyTitle}>🪪 Verify Your Identity</Text>
            <Text style={styles.verifySub}>
              Upload Aadhaar ZIP to receive job requests
            </Text>
          </TouchableOpacity>
        )}




         
        <View style={styles.statsRow}>
          <View style={styles.statCardGreen}>
            <Text style={styles.statTitle}>Today&apos;s Jobs</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statCardBlue}>
            <Text style={styles.statTitle}>Today&apos;s Earnings</Text>
            <Text style={styles.statValue}>₹0</Text>
          </View>
        </View>

        {/* VOICE */}
        <TouchableOpacity style={styles.voiceCard}>
          <View>
            <Text style={styles.voiceTitle}>🎙 Voice Assistant</Text>
            <Text style={styles.voiceSub}>
              Speak to accept jobs, update duty & navigate
            </Text>
          </View>
        </TouchableOpacity>

        {/* PROCESS */}
        <View style={styles.processCard}>
          <Text style={styles.sectionTitle}>Current Work Status</Text>
          <View style={styles.processRow}>
            {["Available", "Assigned", "Working"].map((label, index) => (
              <View key={label} style={styles.processItem}>
                <View
                  style={[
                    styles.processDot,
                    getStepIndex() >= index && styles.processDotActive,
                  ]}
                />
                <Text
                  style={[
                    styles.processText,
                    getStepIndex() >= index && styles.processTextActive,
                  ]}
                >
                  {label}
                </Text>
                {index !== 2 && <View style={styles.processLine} />}
              </View>
            ))}
          </View>
        </View> 
      </ScrollView>

      {/* ================= MODAL ================= */}

      <Modal visible={showCodeModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Enter Aadhaar Share Code
            </Text>

            <TextInput
              keyboardType="default"
              autoCapitalize="characters"
              maxLength={8}
              value={shareCode}
              onChangeText={(text) =>
                setShareCode(text.toUpperCase())
              }
              placeholder="Example: RUGV2007"
              style={styles.codeInput}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#1E5EFF" />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={submitAadhaar}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    Verify
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    setShowCodeModal(false);
                    setShareCode("");
                  }}
                >
                  <Text style={{ color: "#555" }}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <BottomNavBar />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  topContainer: {
    backgroundColor: "#1E5EFF",
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 36,
  },

  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileLeft: { flexDirection: "row", alignItems: "center" },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  name: { color: "#FFFFFF", fontSize: 21, fontWeight: "800" },
  rating: { color: "#E0E7FF", fontSize: 12 },

  toggleWrap: { alignItems: "center" },
  toggleText: { color: "#E0E7FF", fontSize: 12, marginTop: 6 },

  verifyCard: {
    backgroundColor: "#10B981",
    margin: 16,
    padding: 18,
    borderRadius: 18,
  },

  verifyTitle: { color: "#fff", fontWeight: "800", fontSize: 16 },
  verifySub: { color: "#ECFDF5", marginTop: 6, fontSize: 12 },

  verifiedBadge: {
    marginLeft: 8,
    backgroundColor: "#22C55E",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  verifiedText: { color: "#fff", fontSize: 11, fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
  },

  modalTitle: { fontWeight: "700", marginBottom: 12, fontSize: 16 },

  codeInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 2,
  },

  submitBtn: {
    backgroundColor: "#1E5EFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  cancelBtn: {
    alignItems: "center",
    padding: 10,
  },



  statsRow: { flexDirection: "row", gap: 12, padding: 16 },

  statCardGreen: {
    flex: 1,
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 16,
  },

  statCardBlue: {
    flex: 1,
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    padding: 16,
  },

  statTitle: { color: "#6B7280" },
  statValue: { fontSize: 22, fontWeight: "700", marginTop: 8 },

  voiceCard: {
    backgroundColor: "#FF8A3D",
    borderRadius: 22,
    padding: 22,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  voiceTitle: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  voiceSub: { color: "#FFF3E8", fontSize: 13, marginTop: 6 },

  processCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },

  processRow: { flexDirection: "row", justifyContent: "space-between" },

  processItem: { alignItems: "center", flex: 1 },

  processDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#E5E7EB",
    marginBottom: 6,
  },

  processDotActive: { backgroundColor: "#22C55E" },

  processText: { fontSize: 12, color: "#9CA3AF" },

  processTextActive: {
    color: "#22C55E",
    fontWeight: "600",
  },

  processLine: {
    position: "absolute",
    top: 7,
    right: -40,
    width: 80,
    height: 2,
    backgroundColor: "#E5E7EB",
  },



  /* ---------- OTP ---------- */
  otpRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  otpButton: {
    flex: 1,
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  otpText: { color: "#FFF", fontWeight: "700" },

  /* ---------- JOB ---------- */
  recentTitle: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  jobCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },
  jobTitle: { fontWeight: "700" },
  jobLocation: { color: "#6B7280", marginTop: 2 },
  jobTime: { color: "#9CA3AF", fontSize: 12 },
  jobRight: { alignItems: "flex-end" },
  completed: { color: "#22C55E", fontSize: 12, fontWeight: "600" },
  amount: { fontWeight: "700", fontSize: 16 },

  /* ---------- OFF DUTY ---------- */

  offDutyOverlay: {
    position: "absolute",
    top: 190,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(248,250,252,0.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  offDutyText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E5EFF",
  },

  offDutySub: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
  },




});