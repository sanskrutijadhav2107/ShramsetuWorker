

// // import React, { useCallback, useEffect, useRef, useState } from "react";
// // import {
// //   Alert,
// //   Animated,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";

// // import { useSignup } from "../../context/SignupContext";
// // import { acceptJob, rejectJob } from "../../services/jobApi";

// // const IncomingJob = ({ navigation, route }: any) => {
// //   const { signupData } = useSignup();
// //   const { job } = route.params;

// //   // 🔒 SAFETY: worker must exist
// //   if (!signupData.user_id) {
// //     throw new Error("Worker not logged in");
// //   }

// //   const scaleAnim = useRef(new Animated.Value(1)).current;

// //   /* ================= TIMER ================= */

// //   const calculateTimeLeft = useCallback(() => {
// //     const diff = new Date(job.expires_at).getTime() - Date.now();
// //     return Math.max(0, Math.floor(diff / 1000));
// //   }, [job.expires_at]);

// //   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       const remaining = calculateTimeLeft();

// //       if (remaining <= 0) {
// //         clearInterval(timer);
// //         Alert.alert("Job expired", "You did not respond in time");
// //         navigation.goBack();
// //         return;
// //       }

// //       setTimeLeft(remaining);
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, [calculateTimeLeft, navigation]);

// //   /* ================= PULSE ANIMATION ================= */

// //   useEffect(() => {
// //     Animated.loop(
// //       Animated.sequence([
// //         Animated.timing(scaleAnim, {
// //           toValue: 1.1,
// //           duration: 500,
// //           useNativeDriver: true,
// //         }),
// //         Animated.timing(scaleAnim, {
// //           toValue: 1,
// //           duration: 500,
// //           useNativeDriver: true,
// //         }),
// //       ]),
// //     ).start();
// //   }, [scaleAnim]);

// //   /* ================= ACTIONS ================= */

// //   const handleAccept = async () => {
// //     try {
// //       await acceptJob(job.id, signupData.user_id!);
// //       navigation.navigate("MapNavigation", { jobId: job.id });
// //     } catch (err: any) {
// //       if (err.response?.status === 410) {
// //         Alert.alert("Expired", "Job already expired");
// //       } else {
// //         Alert.alert("Error", "Unable to accept job");
// //       }
// //       navigation.goBack();
// //     }
// //   };

// //   const handleReject = async () => {
// //     try {
// //       await rejectJob(job.id, signupData.user_id!);
// //     } catch (err) {
// //       console.log("Reject failed:", err);
// //     }
// //     navigation.goBack();
// //   };

// //   /* ================= UI ================= */

// //   return (
// //     <View style={styles.container}>
// //       {/* JOB CARD */}
// //       <View style={styles.card}>
// //         <Text style={styles.title}>New Job Request</Text>

// //         <View style={styles.row}>
// //           <Text style={styles.label}>Job Type</Text>
// //           <Text style={styles.value}>{job.service_type}</Text>
// //         </View>

// //         <View style={styles.row}>
// //           <Text style={styles.label}>Description</Text>
// //           <Text style={styles.value}>{job.description}</Text>
// //         </View>
// //       </View>

// //       {/* TIMER */}
// //       <View style={styles.timerContainer}>
// //         <Animated.View
// //           style={[styles.timerCircle, { transform: [{ scale: scaleAnim }] }]}
// //         >
// //           <Text style={styles.timerText}>
// //             {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
// //           </Text>
// //           <Text style={styles.timerSub}>seconds left</Text>
// //         </Animated.View>
// //       </View>

// //       {/* ACTION BUTTONS */}
// //       <View style={styles.actions}>
// //         <TouchableOpacity style={styles.reject} onPress={handleReject}>
// //           <Text style={styles.rejectText}>Reject</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.accept} onPress={handleAccept}>
// //           <Text style={styles.acceptText}>Accept</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // export default IncomingJob;

// // /* ================= STYLES ================= */

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#F5F7FB",
// //     padding: 16,
// //   },

// //   card: {
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: 20,
// //     padding: 20,
// //     marginTop: 150,
// //     elevation: 4,
// //   },

// //   title: {
// //     fontSize: 18,
// //     fontWeight: "700",
// //     marginBottom: 16,
// //   },

// //   row: {
// //     marginBottom: 12,
// //   },

// //   label: {
// //     fontSize: 12,
// //     color: "#6B7280",
// //   },

// //   value: {
// //     fontSize: 15,
// //     fontWeight: "600",
// //     color: "#111827",
// //   },

// //   timerContainer: {
// //     alignItems: "center",
// //     marginVertical: 30,
// //   },

// //   timerCircle: {
// //     width: 140,
// //     height: 140,
// //     borderRadius: 70,
// //     backgroundColor: "#4472efff",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     elevation: 6,
// //   },

// //   timerText: {
// //     color: "#FFFFFF",
// //     fontSize: 36,
// //     fontWeight: "800",
// //   },

// //   timerSub: {
// //     color: "#FEE2E2",
// //     fontSize: 12,
// //   },

// //   actions: {
// //     flexDirection: "row",
// //     marginTop: "auto",
// //     marginBottom: 40,
// //   },

// //   reject: {
// //     flex: 1,
// //     backgroundColor: "#FEE2E2",
// //     paddingVertical: 16,
// //     borderRadius: 14,
// //     alignItems: "center",
// //     marginRight: 8,
// //   },

// //   rejectText: {
// //     color: "#DC2626",
// //     fontWeight: "700",
// //   },

// //   accept: {
// //     flex: 1,
// //     backgroundColor: "#22C55E",
// //     paddingVertical: 16,
// //     borderRadius: 14,
// //     alignItems: "center",
// //     marginLeft: 8,
// //   },

// //   acceptText: {
// //     color: "#FFFFFF",
// //     fontWeight: "700",
// //   },
// // });














// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { useSignup } from "../../context/SignupContext";
// import {  sendQuotation } from "../../services/quotationApi";
// import { getWorkerJobs } from "../../services/jobApi";

// const IncomingJob = () => {

//   const { signupData } = useSignup();

//   const [job, setJob] = useState<any>(null);
//   const [quotation, setQuotation] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* 🔁 Poll every 3 sec for new job */
//   useEffect(() => {

//     const interval = setInterval(async () => {
//       try {

//         if (!signupData?.user_id) return;

//         const res = await getWorkerJobs(signupData.user_id);

//         if (!res.has_job) {
//           setJob(null);
//           setLoading(false);
//           return;
//         }

//         setJob(res.job);
//         setLoading(false);

//       } catch (e) {
//         console.log("Polling pending job error");
//       }

//     }, 3000);

//     return () => clearInterval(interval);

//   }, []);

//   /* 📤 SEND QUOTATION */
//   const handleSendQuotation = async () => {

//     if (!quotation) {
//       Alert.alert("Enter quotation message");
//       return;
//     }

//     if (!signupData?.user_id || !job?.id) {
//       Alert.alert("Missing job or user");
//       return;
//     }

//     try {

//       await sendQuotation(
//         job.id,
//         signupData.user_id,
//         quotation
//       );

//       Alert.alert("Quotation Sent!");

//       setJob(null);
//       setQuotation("");

//     } catch (e) {
//       Alert.alert("Failed to send quotation");
//     }
//   };

//   /* ⏳ Loading */
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#1E5EFF" />
//         <Text style={{ marginTop: 20 }}>Searching for nearby jobs...</Text>
//       </View>
//     );
//   }

//   /* 🚫 No Job */
//   if (!job) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.noJob}>No incoming requests</Text>
//         <Text style={styles.sub}>Stay online to receive jobs</Text>
//       </View>
//     );
//   }

//   /* 🧾 JOB UI */
//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>New Customer Request 🔔</Text>

//       <Text style={styles.label}>Service</Text>
//       <Text style={styles.value}>{job.service_type}</Text>

//       <Text style={styles.label}>Problem Description</Text>
//       <Text style={styles.value}>{job.description}</Text>

//       <Text style={styles.label}>Your Message / Price</Text>

//       <TextInput
//         placeholder="Example: I will come in 20 mins. Charges ₹250"
//         style={styles.input}
//         multiline
//         value={quotation}
//         onChangeText={setQuotation}
//       />

//       <TouchableOpacity
//         style={styles.sendBtn}
//         onPress={handleSendQuotation}
//       >
//         <Text style={styles.sendText}>Send Quotation</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default IncomingJob;

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff"
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 30,
//     color: "#1E5EFF"
//   },

//   label: {
//     marginTop: 14,
//     color: "#6B7280"
//   },

//   value: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 4
//   },

//   input: {
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 12,
//     padding: 14,
//     minHeight: 90,
//     textAlignVertical: "top"
//   },

//   sendBtn: {
//     marginTop: 30,
//     backgroundColor: "#1E5EFF",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center"
//   },

//   sendText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 16
//   },

//   noJob: {
//     fontSize: 20,
//     fontWeight: "700"
//   },

//   sub: {
//     marginTop: 8,
//     color: "#6B7280"
//   }

// });

















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