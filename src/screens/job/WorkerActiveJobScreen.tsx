





// import React, { useEffect, useRef, useState } from "react";
// import {
//     Alert,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useSignup } from "../../context/SignupContext";
// import { completeJob, getActiveJob, startJob } from "../../services/workerJobApi";

// const WorkerActiveJobScreen = () => {

//   const { signupData } = useSignup();
//   const [job, setJob] = useState<any>(null);

//   // 4 digit OTP state
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputs = useRef<Array<TextInput | null>>([]);

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

//   /* ---------- Handle OTP typing ---------- */
//   const handleChange = (text: string, index: number) => {
//     if (!/^\d*$/.test(text)) return;

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     // auto next focus
//     if (text && index < 3) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   // backspace support
//   const handleKeyPress = (e: any, index: number) => {
//     if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const getOtpString = () => otp.join("");

//   /* ---------- Verify OTP ---------- */
//   const verifyOtp = async () => {

//     const enteredOtp = getOtpString();

//     if (enteredOtp.length !== 4) {
//       Alert.alert("Enter 4 digit OTP");
//       return;
//     }

//     try {

//       if (job.status === "ACCEPTED") {
//         await startJob(job.job_id, enteredOtp);
//         Alert.alert("Work Started ✅");
//       }

//       else if (job.status === "WORKING") {
//         await completeJob(job.job_id, enteredOtp);
//         Alert.alert("Job Completed 🎉");
//         setJob(null);
//       }

//       setOtp(["", "", "", ""]);

//     } catch {
//       Alert.alert("Invalid OTP");
//     }
//   };

//   if (!job) {
//     return (
//       <View style={styles.center}>
//         <Text>No Active Job</Text>
//       </View>
//     );
//   }

//   const isStart = job.status === "ACCEPTED";

//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>
//         {isStart ? "Enter Start OTP" : "Enter End OTP"}
//       </Text>

//       <Text style={styles.subtitle}>
//         {isStart
//           ? "Ask customer for the START OTP"
//           : "Ask customer for the END OTP"}
//       </Text>

//       {/* OTP BOXES */}
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={(ref) => (inputs.current[index] = ref)}
//             style={styles.otpBox}
//             keyboardType="numeric"
//             maxLength={1}
//             value={digit}
//             onChangeText={(text) => handleChange(text, index)}
//             onKeyPress={(e) => handleKeyPress(e, index)}
//           />
//         ))}
//       </View>

//       <TouchableOpacity style={styles.verifyBtn} onPress={verifyOtp}>
//         <Text style={styles.btnText}>
//           {isStart ? "Start Work" : "Complete Job"}
//         </Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default WorkerActiveJobScreen;

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 25,
//     backgroundColor: "#F4F6FB",
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   subtitle: {
//     textAlign: "center",
//     color: "#6B7280",
//     marginBottom: 35,
//   },

//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 10,
//   },

//   otpBox: {
//     width: 60,
//     height: 65,
//     borderRadius: 12,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     textAlign: "center",
//     fontSize: 24,
//     fontWeight: "bold",
//     elevation: 2,
//   },

//   verifyBtn: {
//     marginTop: 40,
//     backgroundColor: "#4F46E5",
//     padding: 18,
//     borderRadius: 14,
//     alignItems: "center",
//   },

//   btnText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });

















import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSignup } from "../../context/SignupContext";
import { completeJob, getActiveJob, startJob } from "../../services/workerJobApi";

import { startWorkerTracking, stopWorkerTracking } from "../../utils/workerLocationTracker";
const WorkerActiveJobScreen = () => {









  
const { signupData } = useSignup();
const [job, setJob] = useState<any>(null);

/* ---------- OTP ---------- */
const [otp, setOtp] = useState(["", "", "", ""]);
const inputs = useRef<Array<TextInput | null>>([]);




useEffect(() => {
  if (!signupData?.user_id || !job) return;

  if (job.status === "ACCEPTED" || job.status === "WORKING") {
    startWorkerTracking(signupData.user_id);
  }

  return () => {
    stopWorkerTracking();
  };
}, [job]);


/* ---------- Poll Job ---------- */
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

/* ---------- OTP INPUT ---------- */
const handleChange = (text: string, index: number) => {
if (!/^\d*$/.test(text)) return;

const newOtp = [...otp];
newOtp[index] = text;
setOtp(newOtp);

if (text && index < 3) inputs.current[index + 1]?.focus();
};

const handleKeyPress = (e: any, index: number) => {
if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
inputs.current[index - 1]?.focus();
}
};

const getOtpString = () => otp.join("");

/* ---------- VERIFY ---------- */
// const verifyOtp = async () => {
// const enteredOtp = getOtpString();

// if (enteredOtp.length !== 4) {
// Alert.alert("Enter 4 digit OTP");
// return;
// }

// try {
// if (job.status === "ACCEPTED") {
// await startJob(job.job_id, enteredOtp);
// Alert.alert("Work Started ✅");
// }

// else if (job.status === "WORKING") {
// await completeJob(job.job_id, enteredOtp);
// Alert.alert("Job Completed 🎉");
// setJob(null);
// }

// setOtp(["", "", "", ""]);
// } catch {
// Alert.alert("Invalid OTP");
// }
// };




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

      stopWorkerTracking();   // ⭐ STEP 13 (STOP GPS HERE)

      Alert.alert("Job Completed 🎉");
      setJob(null);
    }

    setOtp(["", "", "", ""]);

  } catch {
    Alert.alert("Invalid OTP");
  }
};

/* ---------- CALL ---------- */
const callCustomer = () => {
if (!job?.customer_phone) {
Alert.alert("Customer phone not available");
return;
}
Linking.openURL(`tel:${job.customer_phone}`);
};

/* ---------- NAVIGATION ---------- */
const openMaps = () => {
if (!job?.latitude || !job?.longitude) {
Alert.alert("Location not available");
return;
}

const url = `https://www.google.com/maps/dir/?api=1&destination=${job.latitude},${job.longitude}`;
Linking.openURL(url);
};

/* ---------- MESSAGE ---------- */
const sendInstruction = () => {
Alert.alert(
"Send Instruction",
"Customer has been asked to keep OTP ready (translated automatically)."
);
};

if (!job) {
return (
<View style={styles.center}>
<Text>No Active Job</Text>
</View>
);
}

const isStart = job.status === "ACCEPTED";

/* ================= UI ================= */

return (
<View style={styles.container}>

{/* -------- JOB CARD -------- */}
<View style={styles.card}>

<Text style={styles.service}>{job.service_type}</Text>
<Text style={styles.desc}>{job.description}</Text>

<Text style={styles.label}>Customer Address</Text>
<Text style={styles.address}>{job.address ?? "Location Shared"}</Text>

</View>

{/* -------- ACTION BUTTONS -------- */}
<View style={styles.actionRow}>

<TouchableOpacity style={styles.actionBtn} onPress={sendInstruction}>
<Text style={styles.actionText}>📩 Message</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.actionBtn} onPress={openMaps}>
<Text style={styles.actionText}>🧭 Navigate</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.actionBtn} onPress={callCustomer}>
<Text style={styles.actionText}>📞 Call</Text>
</TouchableOpacity>

</View>

{/* -------- OTP SECTION -------- */}
<View style={styles.otpCard}>

<Text style={styles.otpTitle}>
{isStart ? "Enter START OTP" : "Enter END OTP"}
</Text>

<Text style={styles.otpSubtitle}>
{isStart
? "Ask customer for START OTP"
: "Ask customer for END OTP"}
</Text>

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

</View>
);
};

export default WorkerActiveJobScreen;



const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F1F5F9",
padding:20
},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

/* JOB CARD */
card:{
backgroundColor:"#fff",
padding:18,
borderRadius:16,
elevation:3,
marginBottom:18
},

service:{
fontSize:20,
fontWeight:"700",
color:"#1E3A8A",
marginBottom:6
},

desc:{
color:"#374151",
marginBottom:12
},

label:{
fontWeight:"600",
color:"#6B7280"
},

address:{
marginTop:4,
fontSize:14
},

/* ACTIONS */
actionRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:20
},

actionBtn:{
backgroundColor:"#EEF2FF",
padding:12,
borderRadius:12,
width:"31%",
alignItems:"center"
},

actionText:{
fontWeight:"600",
color:"#3730A3"
},

/* OTP CARD */
otpCard:{
backgroundColor:"#fff",
padding:20,
borderRadius:18,
elevation:3
},

otpTitle:{
fontSize:22,
fontWeight:"700",
textAlign:"center"
},

otpSubtitle:{
textAlign:"center",
color:"#6B7280",
marginBottom:20
},

otpContainer:{
flexDirection:"row",
justifyContent:"space-between",
marginHorizontal:10
},

otpBox:{
width:60,
height:65,
borderRadius:12,
borderWidth:1,
borderColor:"#E5E7EB",
textAlign:"center",
fontSize:24,
fontWeight:"bold"
},

verifyBtn:{
marginTop:25,
backgroundColor:"#4F46E5",
padding:16,
borderRadius:14,
alignItems:"center"
},

btnText:{
color:"#fff",
fontWeight:"700",
fontSize:16
}

});