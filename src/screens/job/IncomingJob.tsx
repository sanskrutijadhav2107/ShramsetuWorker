// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   Animated,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";

// // const IncomingJob = ({ navigation }: any) => {
// //   const [timeLeft, setTimeLeft] = useState(30);
// //   const scaleAnim = useRef(new Animated.Value(1)).current;

// //   useEffect(() => {
// //     // Countdown
// //     const timer = setInterval(() => {
// //       setTimeLeft((prev) => {
// //         if (prev <= 1) {
// //           clearInterval(timer);
// //           navigation.goBack();
// //           return 0;
// //         }
// //         return prev - 1;
// //       });
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   useEffect(() => {
// //     // Alarm pulse animation
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
// //       ])
// //     ).start();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       {/* Job Card (UP) */}
// //       <View style={styles.card}>
// //         <Text style={styles.title}>New Job Request</Text>

// //         <View style={styles.row}>
// //           <Text style={styles.label}>Job Type</Text>
// //           <Text style={styles.value}>Kitchen Sink Repair</Text>
// //         </View>

// //         <View style={styles.row}>
// //           <Text style={styles.label}>Location</Text>
// //           <Text style={styles.value}>HSR Layout, Bangalore</Text>
// //           <Text style={styles.subText}>2.3 km away</Text>
// //         </View>

// //         <View style={styles.row}>
// //           <Text style={styles.label}>Payment</Text>
// //           <Text style={styles.pay}>₹500</Text>
// //         </View>

// //         <View style={styles.row}>
// //           <Text style={styles.label}>Customer</Text>
// //           <Text style={styles.value}>Priya Sharma</Text>
// //           <Text style={styles.subText}>⭐ 4.9 (45 reviews)</Text>
// //         </View>
// //       </View>

// //       {/* BIG CIRCULAR TIMER (DOWN) */}
// //       <View style={styles.timerContainer}>
// //         <Animated.View
// //           style={[
// //             styles.timerCircle,
// //             { transform: [{ scale: scaleAnim }] },
// //           ]}
// //         >
// //           <Text style={styles.timerText}>
// //             {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
// //           </Text>
// //           <Text style={styles.timerSub}>seconds left</Text>
// //         </Animated.View>
// //       </View>

// //       {/* Actions */}
// //       <View style={styles.actions}>
// //         <TouchableOpacity
// //         style={styles.reject}
// //         onPress={() => navigation.navigate("WorkerHome")}>

// //           <Text style={styles.rejectText}>Reject</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.accept}
// //           onPress={() => navigation.navigate("MapNavigation")}
// //         >
// //           <Text style={styles.acceptText}>Accept</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // export default IncomingJob;

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

// //   subText: {
// //     fontSize: 12,
// //     color: "#9CA3AF",
// //   },

// //   pay: {
// //     fontSize: 18,
// //     fontWeight: "700",
// //   },

// //   /* TIMER */
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
// //     marginBottom: 40,
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
// //     marginBottom: 40,
// //   },

// //   acceptText: {
// //     color: "#FFFFFF",
// //     fontWeight: "700",
// //   },
// // });

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Animated,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { useSignup } from "../../context/SignupContext";
// import { acceptJob, rejectJob } from "../../services/jobApi";

// const IncomingJob = ({ navigation, route }: any) => {
//   const { signupData } = useSignup();
//   const { job } = route.params; // 👈 JOB COMES FROM HOMESCREEN

//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   // 🔑 time left from backend expiry
//   const calculateTimeLeft = () => {
//     const diff = new Date(job.expires_at).getTime() - Date.now();
//     return Math.max(0, Math.floor(diff / 1000));
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const remaining = calculateTimeLeft();

//       if (remaining <= 0) {
//         clearInterval(timer);
//         Alert.alert("Job expired", "You did not respond in time");
//         navigation.goBack();
//         return;
//       }

//       setTimeLeft(remaining);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   /* ================= PULSE ANIMATION ================= */
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(scaleAnim, {
//           toValue: 1.1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scaleAnim, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ]),
//     ).start();
//   }, []);

//   /* ================= ACTIONS ================= */

//   const handleAccept = async () => {
//     try {
//       await acceptJob(job.id, signupData.user_id);
//       navigation.navigate("MapNavigation", { jobId: job.id });
//     } catch (err: any) {
//       if (err.response?.status === 410) {
//         Alert.alert("Expired", "Job already expired");
//       } else {
//         Alert.alert("Error", "Unable to accept job");
//       }
//       navigation.goBack();
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await rejectJob(job.id, signupData.user_id);
//     } catch (err) {
//       // backend already handles cleanup
//     }
//     navigation.goBack();
//   };

//   /* ================= UI ================= */

//   return (
//     <View style={styles.container}>
//       {/* JOB CARD */}
//       <View style={styles.card}>
//         <Text style={styles.title}>New Job Request</Text>

//         <View style={styles.row}>
//           <Text style={styles.label}>Job Type</Text>
//           <Text style={styles.value}>{job.service_type}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Description</Text>
//           <Text style={styles.value}>{job.description}</Text>
//         </View>
//       </View>

//       {/* TIMER */}
//       <View style={styles.timerContainer}>
//         <Animated.View
//           style={[styles.timerCircle, { transform: [{ scale: scaleAnim }] }]}
//         >
//           <Text style={styles.timerText}>
//             {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
//           </Text>
//           <Text style={styles.timerSub}>seconds left</Text>
//         </Animated.View>
//       </View>

//       {/* ACTIONS */}
//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.reject} onPress={handleReject}>
//           <Text style={styles.rejectText}>Reject</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.accept} onPress={handleAccept}>
//           <Text style={styles.acceptText}>Accept</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default IncomingJob;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7FB",
//     padding: 16,
//   },

//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 150,
//     elevation: 4,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 16,
//   },

//   row: {
//     marginBottom: 12,
//   },

//   label: {
//     fontSize: 12,
//     color: "#6B7280",
//   },

//   value: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#111827",
//   },

//   subText: {
//     fontSize: 12,
//     color: "#9CA3AF",
//   },

//   pay: {
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   /* TIMER */
//   timerContainer: {
//     alignItems: "center",
//     marginVertical: 30,
//   },

//   timerCircle: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     backgroundColor: "#4472efff",
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 6,
//   },

//   timerText: {
//     color: "#FFFFFF",
//     fontSize: 36,
//     fontWeight: "800",
//   },

//   timerSub: {
//     color: "#FEE2E2",
//     fontSize: 12,
//   },

//   actions: {
//     flexDirection: "row",
//     marginTop: "auto",
//     marginBottom: 40,
//   },

//   reject: {
//     flex: 1,
//     backgroundColor: "#FEE2E2",
//     paddingVertical: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginRight: 8,
//     marginBottom: 40,
//   },

//   rejectText: {
//     color: "#DC2626",
//     fontWeight: "700",
//   },

//   accept: {
//     flex: 1,
//     backgroundColor: "#22C55E",
//     paddingVertical: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginLeft: 8,
//     marginBottom: 40,
//   },

//   acceptText: {
//     color: "#FFFFFF",
//     fontWeight: "700",
//   },
// });

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSignup } from "../../context/SignupContext";
import { acceptJob, rejectJob } from "../../services/jobApi";

const IncomingJob = ({ navigation, route }: any) => {
  const { signupData } = useSignup();
  const { job } = route.params;

  // 🔒 SAFETY: worker must exist
  if (!signupData.user_id) {
    throw new Error("Worker not logged in");
  }

  const scaleAnim = useRef(new Animated.Value(1)).current;

  /* ================= TIMER ================= */

  const calculateTimeLeft = useCallback(() => {
    const diff = new Date(job.expires_at).getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  }, [job.expires_at]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();

      if (remaining <= 0) {
        clearInterval(timer);
        Alert.alert("Job expired", "You did not respond in time");
        navigation.goBack();
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, navigation]);

  /* ================= PULSE ANIMATION ================= */

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  /* ================= ACTIONS ================= */

  const handleAccept = async () => {
    try {
      await acceptJob(job.id, signupData.user_id!);
      navigation.navigate("MapNavigation", { jobId: job.id });
    } catch (err: any) {
      if (err.response?.status === 410) {
        Alert.alert("Expired", "Job already expired");
      } else {
        Alert.alert("Error", "Unable to accept job");
      }
      navigation.goBack();
    }
  };

  const handleReject = async () => {
    try {
      await rejectJob(job.id, signupData.user_id!);
    } catch (err) {
      console.log("Reject failed:", err);
    }
    navigation.goBack();
  };

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      {/* JOB CARD */}
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
      </View>

      {/* TIMER */}
      <View style={styles.timerContainer}>
        <Animated.View
          style={[styles.timerCircle, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.timerText}>
            {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </Text>
          <Text style={styles.timerSub}>seconds left</Text>
        </Animated.View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.reject} onPress={handleReject}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accept} onPress={handleAccept}>
          <Text style={styles.acceptText}>Accept</Text>
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
    marginTop: 150,
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

  timerContainer: {
    alignItems: "center",
    marginVertical: 30,
  },

  timerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#4472efff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  timerText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
  },

  timerSub: {
    color: "#FEE2E2",
    fontSize: 12,
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
