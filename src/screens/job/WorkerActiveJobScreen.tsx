// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useSignup } from "../../context/SignupContext";
// import { getActiveJob, startJob, completeJob } from "../../services/workerActiveApi";

// const WorkerActiveJobScreen = () => {

//   const { signupData } = useSignup();
//   const [job, setJob] = useState<any>(null);
//   const [otp, setOtp] = useState("");

//   /* ---------- Poll active job ---------- */
//   useEffect(() => {

//     const load = async () => {
//       if (!signupData?.user_id) return;

//       const res = await getActiveJob(signupData.user_id);

//       if (res.has_job) setJob(res);
//       else setJob(null);
//     };

//     load();
//     const interval = setInterval(load, 3000);

//     return () => clearInterval(interval);

//   }, []);

//   /* ---------- START WORK ---------- */
//   const handleStart = async () => {
//     try {
//       await startJob(job.job_id, otp);
//       Alert.alert("Work Started ✅");
//       setOtp("");
//     } catch {
//       Alert.alert("Wrong Start OTP");
//     }
//   };

//   /* ---------- COMPLETE WORK ---------- */
//   const handleComplete = async () => {
//     try {
//       await completeJob(job.job_id, otp);
//       Alert.alert("Job Completed 🎉");
//       setOtp("");
//       setJob(null);
//     } catch {
//       Alert.alert("Wrong End OTP");
//     }
//   };

//   if (!job) {
//     return (
//       <View style={styles.center}>
//         <Text>No Active Job</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>{job.service_type}</Text>
//       <Text style={styles.desc}>{job.description}</Text>

//       <TextInput
//         placeholder="Enter OTP"
//         keyboardType="numeric"
//         style={styles.input}
//         value={otp}
//         onChangeText={setOtp}
//       />

//       {job.status === "ACCEPTED" && (
//         <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
//           <Text style={styles.btnText}>Verify Start OTP</Text>
//         </TouchableOpacity>
//       )}

//       {job.status === "WORKING" && (
//         <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
//           <Text style={styles.btnText}>Verify End OTP</Text>
//         </TouchableOpacity>
//       )}

//     </View>
//   );
// };

// export default WorkerActiveJobScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: "center" },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },

//   title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
//   desc: { color: "#555", marginBottom: 30 },

//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 20,
//   },

//   startBtn: {
//     backgroundColor: "#22C55E",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   completeBtn: {
//     backgroundColor: "#EF4444",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   btnText: { color: "#fff", fontWeight: "700" },
// });




























import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSignup } from "../../context/SignupContext";
import { completeJob, getActiveJob, startJob } from "../../services/workerJobApi";

const WorkerActiveJobScreen = () => {

  const { signupData } = useSignup();
  const [job, setJob] = useState<any>(null);

  // 4 digit OTP state
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  /* ---------- Poll active job ---------- */
  useEffect(() => {

    const load = async () => {
      if (!signupData?.user_id) return;

      const res = await getActiveJob(signupData.user_id);

      if (res.has_job) setJob(res);
      else setJob(null);
    };

    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);

  }, []);

  /* ---------- Handle OTP typing ---------- */
  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // auto next focus
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  // backspace support
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const getOtpString = () => otp.join("");

  /* ---------- Verify OTP ---------- */
  const verifyOtp = async () => {

    const enteredOtp = getOtpString();

    if (enteredOtp.length !== 4) {
      Alert.alert("Enter 4 digit OTP");
      return;
    }

    try {

      if (job.status === "ACCEPTED") {
        await startJob(job.job_id, enteredOtp);
        Alert.alert("Work Started ✅");
      }

      else if (job.status === "WORKING") {
        await completeJob(job.job_id, enteredOtp);
        Alert.alert("Job Completed 🎉");
        setJob(null);
      }

      setOtp(["", "", "", ""]);

    } catch {
      Alert.alert("Invalid OTP");
    }
  };

  if (!job) {
    return (
      <View style={styles.center}>
        <Text>No Active Job</Text>
      </View>
    );
  }

  const isStart = job.status === "ACCEPTED";

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {isStart ? "Enter Start OTP" : "Enter End OTP"}
      </Text>

      <Text style={styles.subtitle}>
        {isStart
          ? "Ask customer for the START OTP"
          : "Ask customer for the END OTP"}
      </Text>

      {/* OTP BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyBtn} onPress={verifyOtp}>
        <Text style={styles.btnText}>
          {isStart ? "Start Work" : "Complete Job"}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default WorkerActiveJobScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F4F6FB",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 35,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  otpBox: {
    width: 60,
    height: 65,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    elevation: 2,
  },

  verifyBtn: {
    marginTop: 40,
    backgroundColor: "#4F46E5",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});