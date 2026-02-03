// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import BottomNavBar from "../../components/BottomNavBar";
// import { useSignup } from "../../context/SignupContext";

// export default function HomeScreen({ navigation, route }: any) {
//   const [onDuty, setOnDuty] = useState(false);
//   const [jobStatus, setJobStatus] = useState<
//     "AVAILABLE" | "ASSIGNED" | "WORKING"
//   >("AVAILABLE");

//   // 👇 THIS IS IMPORTANT
//   useEffect(() => {
//     if (route?.params?.jobStatus) {
//       setJobStatus(route.params.jobStatus);
//     }
//   }, [route?.params?.jobStatus]);

//   const getStepIndex = () => {
//     if (jobStatus === "AVAILABLE") return 0;
//     if (jobStatus === "ASSIGNED") return 1;
//     return 2;
//   };

// const { signupData } = useSignup();

//   return (
//     <View style={{ flex: 1 }}>
//       {/* ================= CONTENT ================= */}
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 90 }} // 🔑 space for nav bar
//       >

//         {/* ================= TOP HEADER ================= */}
//         <View style={styles.topContainer}>
//           <View style={styles.profileRow}>
//             <View style={styles.profileLeft}>
//               <View style={styles.avatar}>
//                 <Text style={{ fontSize: 18 }}>👤</Text>
//               </View>
//               <View>
//                 <Text style={styles.name}>
//   {signupData.name || "Worker"}
// </Text>
// <Text style={styles.rating}>⭐ 0.0 (0)</Text>

//               </View>
//             </View>

//             <View style={styles.toggleWrap}>
//               <Switch
//                 value={onDuty}
//                 onValueChange={setOnDuty}
//                 trackColor={{ false: "#CBD5E1", true: "#86EFAC" }}
//                 thumbColor={onDuty ? "#22C55E" : "#9CA3AF"}
//               />
//               <Text style={styles.toggleText}>
//                 {onDuty ? "ON Duty" : "OFF Duty"}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* ================= STATS ================= */}
//         <View style={styles.statsRow}>
//           <View style={styles.statCardGreen}>
//             <Text style={styles.statTitle}>Today&apos;s Jobs</Text>
//             <Text style={styles.statValue}>0</Text>

//           </View>

//           <View style={styles.statCardBlue}>
//             <Text style={styles.statTitle}>Today&apos;s Earnings</Text>

//             <Text style={styles.statValue}>₹0</Text>

//           </View>
//         </View>

//         {/* ================= VOICE ASSISTANT ================= */}
//         <TouchableOpacity style={styles.voiceCard} activeOpacity={0.85}>
//           <View>
//             <Text style={styles.voiceTitle}>🎙 Voice Assistant</Text>
//             <Text style={styles.voiceSub}>
//               Speak to accept jobs, update duty & navigate
//             </Text>
//           </View>

//           <View style={styles.voiceMicOuter}>
//             <View style={styles.voiceMicInner}>
//               <Text style={{ fontSize: 22 }}>🎤</Text>
//             </View>
//           </View>
//         </TouchableOpacity>

//         {/* ================= PROCESS ================= */}
//         <View style={styles.processCard}>
//           <Text style={styles.sectionTitle}>Current Work Status</Text>

//           <View style={styles.processRow}>
//             {["Available", "Assigned", "Working"].map((label, index) => (
//               <View key={label} style={styles.processItem}>
//                 <View
//                   style={[
//                     styles.processDot,
//                     getStepIndex() >= index && styles.processDotActive,
//                   ]}
//                 />
//                 <Text
//                   style={[
//                     styles.processText,
//                     getStepIndex() >= index && styles.processTextActive,
//                   ]}
//                 >
//                   {label}
//                 </Text>
//                 {index !== 2 && <View style={styles.processLine} />}
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* ================= OTP BUTTONS ================= */}
//         <View style={styles.otpRow}>
//           <TouchableOpacity
//             style={styles.otpButton}
//             onPress={() => navigation.navigate("IncomingJob")}
//           >
//             <Text style={styles.otpText}>Start Job OTP</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.otpButton}
//             onPress={() => navigation.navigate("EndJobOtp")}
//           >
//             <Text style={styles.otpText}>End Job OTP</Text>
//           </TouchableOpacity>
//         </View>

//         {/* ================= RECENT JOB ================= */}
//         <Text style={styles.recentTitle}>Recent Jobs</Text>

//         <View style={styles.jobCard}>
//           <View>
//             <Text style={styles.jobTitle}>Plumbing Work</Text>
//             <Text style={styles.jobLocation}>Koramangala, Bangalore</Text>
//             <Text style={styles.jobTime}>2 hours ago</Text>
//           </View>

//           <View style={styles.jobRight}>
//             <Text style={styles.completed}>Completed</Text>
//             <Text style={styles.amount}>₹450</Text>
//           </View>
//         </View>

//       </ScrollView>

//       {/* ================= OFF DUTY OVERLAY ================= */}
//       {!onDuty && (
//         <View style={styles.offDutyOverlay}>
//           <Text style={styles.offDutyText}>You are OFF Duty</Text>
//           <Text style={styles.offDutySub}>
//             Turn ON duty to accept jobs and use voice assistant
//           </Text>
//         </View>
//       )}

//       {/* ================= BOTTOM NAV ================= */}
//       <BottomNavBar />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },

//   /* ---------- TOP ---------- */
//   topContainer: {
//     backgroundColor: "#4F46E5",
//     borderBottomLeftRadius: 28,
//     borderBottomRightRadius: 28,
//     paddingTop: 44,
//     paddingHorizontal: 16,
//     paddingBottom: 36,
//     elevation: 6,
//   },

//   profileRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   profileLeft: { flexDirection: "row", alignItems: "center" },

//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 14,
//   },

//   name: { color: "#FFFFFF", fontSize: 21, fontWeight: "800" },
//   rating: { color: "#E0E7FF", fontSize: 12 },

//   toggleWrap: {
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.15)",
//     padding: 8,
//     borderRadius: 14,
//   },
//   toggleText: {
//     color: "#E0E7FF",
//     fontSize: 12,
//     marginTop: 6,
//     fontWeight: "700",
//     letterSpacing: 0.6,
//   },

//   /* ---------- STATS ---------- */
//   statsRow: { flexDirection: "row", gap: 12, padding: 16 },
//   statCardGreen: {
//     flex: 1,
//     backgroundColor: "#ECFDF5",
//     borderRadius: 16,
//     padding: 16,
//   },
//   statCardBlue: {
//     flex: 1,
//     backgroundColor: "#EEF4FF",
//     borderRadius: 16,
//     padding: 16,
//   },
//   statTitle: { color: "#6B7280" },
//   statValue: { fontSize: 22, fontWeight: "700", marginTop: 8 },

//   /* ---------- VOICE ---------- */
//   voiceCard: {
//     backgroundColor: "#FF8A3D",
//     borderRadius: 22,
//     padding: 22,
//     marginHorizontal: 16,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     elevation: 4,
//   },
//   voiceTitle: { color: "#FFF", fontSize: 18, fontWeight: "800" },
//   voiceSub: { color: "#FFF3E8", fontSize: 13, marginTop: 6 },

//   voiceMicOuter: {
//     width: 68,
//     height: 68,
//     borderRadius: 34,
//     backgroundColor: "#FDBA74",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   voiceMicInner: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#F97316",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   /* ---------- PROCESS ---------- */
//   processCard: {
//     backgroundColor: "#F9FAFB",
//     borderRadius: 16,
//     padding: 16,
//     marginHorizontal: 16,
//     marginBottom: 20,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },

//   processRow: { flexDirection: "row", justifyContent: "space-between" },
//   processItem: { alignItems: "center", flex: 1 },
//   processDot: {
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: "#E5E7EB",
//     marginBottom: 6,
//   },
//   processDotActive: { backgroundColor: "#22C55E" },
//   processText: { fontSize: 12, color: "#9CA3AF" },
//   processTextActive: { color: "#22C55E", fontWeight: "600" },
//   processLine: {
//     position: "absolute",
//     top: 7,
//     right: -40,
//     width: 80,
//     height: 2,
//     backgroundColor: "#E5E7EB",
//   },

//   /* ---------- OTP ---------- */
//   otpRow: {
//     flexDirection: "row",
//     gap: 12,
//     paddingHorizontal: 16,
//     marginBottom: 20,
//   },
//   otpButton: {
//     flex: 1,
//     backgroundColor: "#4F46E5",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   otpText: { color: "#FFF", fontWeight: "700" },

//   /* ---------- JOB ---------- */
//   recentTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     paddingHorizontal: 16,
//     marginBottom: 12,
//   },

//   jobCard: {
//     backgroundColor: "#FFF",
//     borderRadius: 16,
//     padding: 16,
//     marginHorizontal: 16,
//     marginBottom: 24,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     elevation: 3,
//   },
//   jobTitle: { fontWeight: "700" },
//   jobLocation: { color: "#6B7280", marginTop: 2 },
//   jobTime: { color: "#9CA3AF", fontSize: 12 },
//   jobRight: { alignItems: "flex-end" },
//   completed: { color: "#22C55E", fontSize: 12, fontWeight: "600" },
//   amount: { fontWeight: "700", fontSize: 16 },

//   /* ---------- OFF DUTY ---------- */
//   offDutyOverlay: {
//     position: "absolute",
//     top: 190,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(248,250,252,0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 24,
//   },
//   offDutyText: {
//     fontSize: 22,
//     fontWeight: "800",
//     color: "#1E5EFF",
//     paddingBottom:40,
//   },
//   offDutySub: {
//     marginTop: 8,
//     fontSize: 14,
//     color: "#475569",
//     textAlign: "center",
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavBar from "../../components/BottomNavBar";
import { useSignup } from "../../context/SignupContext";
import { getWorkerJobs } from "../../services/jobApi";
import { setAvailability } from "../../services/worker";

export default function HomeScreen({ navigation, route }: any) {
  const { signupData } = useSignup();

  const [onDuty, setOnDuty] = useState(false);
  const [jobStatus, setJobStatus] = useState<
    "AVAILABLE" | "ASSIGNED" | "WORKING"
  >("AVAILABLE");

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // update job status if coming from other screen
  useEffect(() => {
    if (route?.params?.jobStatus) {
      setJobStatus(route.params.jobStatus);
    }
  }, [route?.params?.jobStatus]);

  const getStepIndex = () => {
    if (jobStatus === "AVAILABLE") return 0;
    if (jobStatus === "ASSIGNED") return 1;
    return 2;
  };

  // 🔁 toggle duty
  const toggleDuty = async (value: boolean) => {
    setOnDuty(value);

    if (!signupData.user_id) {
      console.log("No user_id found");
      return;
    }

    try {
      await setAvailability({
        user_id: signupData.user_id,
        is_available: value,
      });

      if (value) {
        startPolling();
      } else {
        stopPolling();
        setJobStatus("AVAILABLE");
      }
    } catch (err) {
      console.log("Availability error:", err);
    }
  };

  // 🔁 poll jobs
  const startPolling = () => {
    stopPolling();

    pollingRef.current = setInterval(async () => {
      try {
        const res = await getWorkerJobs(signupData.user_id!);

        if (res?.jobs?.length > 0) {
          const job = res.jobs[0];
          stopPolling();
          setJobStatus("ASSIGNED");
          navigation.navigate("IncomingJob", { job });
        }
      } catch (err) {
        console.log("Polling error:", err);
      }
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* ================= TOP HEADER ================= */}
        <View style={styles.topContainer}>
          <View style={styles.profileRow}>
            <View style={styles.profileLeft}>
              <View style={styles.avatar}>
                <Text style={{ fontSize: 18 }}>👤</Text>
              </View>
              <View>
                <Text style={styles.name}>{signupData.name || "Worker"}</Text>
                <Text style={styles.rating}>⭐ 0.0 (0)</Text>
              </View>
            </View>

            <View style={styles.toggleWrap}>
              <Switch
                value={onDuty}
                onValueChange={toggleDuty}
                trackColor={{ false: "#CBD5E1", true: "#86EFAC" }}
                thumbColor={onDuty ? "#22C55E" : "#9CA3AF"}
              />
              <Text style={styles.toggleText}>
                {onDuty ? "ON Duty" : "OFF Duty"}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= STATS ================= */}
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

        {/* ================= VOICE ================= */}
        <TouchableOpacity style={styles.voiceCard}>
          <View>
            <Text style={styles.voiceTitle}>🎙 Voice Assistant</Text>
            <Text style={styles.voiceSub}>
              Speak to accept jobs, update duty & navigate
            </Text>
          </View>
        </TouchableOpacity>

        {/* ================= PROCESS ================= */}
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

      {/* ✅ FIX: allow touches to pass */}
      {!onDuty && (
        <View style={styles.offDutyOverlay} pointerEvents="none">
          <Text style={styles.offDutyText}>You are OFF Duty</Text>
          <Text style={styles.offDutySub}>
            Turn ON duty to accept jobs and use voice assistant
          </Text>
        </View>
      )}

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  /* ---------- TOP ---------- */
  topContainer: {
    backgroundColor: "#4F46E5",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: 44,
    paddingHorizontal: 160,
    paddingBottom: 36,
    elevation: 6,
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

  toggleWrap: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 14,
  },
  toggleText: {
    color: "#E0E7FF",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  /* ---------- STATS ---------- */
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

  /* ---------- VOICE ---------- */
  voiceCard: {
    backgroundColor: "#FF8A3D",
    borderRadius: 22,
    padding: 22,
    marginHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  voiceTitle: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  voiceSub: { color: "#FFF3E8", fontSize: 13, marginTop: 6 },

  voiceMicOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FDBA74",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceMicInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ---------- PROCESS ---------- */
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
  processTextActive: { color: "#22C55E", fontWeight: "600" },
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
    paddingBottom: 40,
  },
  offDutySub: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
  },
});
