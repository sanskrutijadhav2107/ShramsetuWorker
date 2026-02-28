// import { useNavigation } from "@react-navigation/native";
// import { useEffect, useState } from "react";
// import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useSignup } from "../../context/SignupContext";
// import { acceptBookedJob, getBookedJob } from "../../services/workerJobApi";

// const BookedJobScreen = () => {

//   const navigation = useNavigation<any>();
//   const { signupData } = useSignup();
//   const [job, setJob] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   /* -------- Poll booked job -------- */
//   useEffect(() => {

//     const interval = setInterval(async () => {
//       try {
//         if (!signupData.user_id) return;

//         const res = await getBookedJob(signupData.user_id);

//         if (!res.has_job) {
//           setJob(null);
//           return;
//         }

//         setJob(res);

//       } catch (e) {
//         console.log("Polling error", e);
//       }
//     }, 3000);

//     return () => clearInterval(interval);

//   }, []);

//   /* -------- Worker reached location -------- */
//   const handleAccept = async () => {

//   if (!signupData?.user_id || !job?.job_id) {
//     Alert.alert("Missing job or user");
//     return;
//   }

//   try {

//     await acceptBookedJob(
//       job.job_id,
//       signupData.user_id as number
//     );

//     Alert.alert(
//       "Arrival Confirmed",
//       "Customer will now enter Start OTP"
//     );

//     navigation.navigate("MapNavigation", {
//       jobId: job.job_id
//     });

//   } catch (e) {
//     Alert.alert("Failed to confirm arrival");
//   }
// };
//   /* -------- No job -------- */
//   if (!job) {
//     return (
//       <View style={styles.center}>
//         <Text>No customer bookings yet</Text>
//       </View>
//     );
//   }

//   /* -------- UI -------- */
//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Customer selected you 🎉</Text>

//       <Text style={styles.label}>Service</Text>
//       <Text style={styles.value}>{job.service_type}</Text>

//       <Text style={styles.label}>Problem</Text>
//       <Text style={styles.value}>{job.description}</Text>

//       <TouchableOpacity style={styles.startBtn} onPress={handleAccept}>
//         <Text style={styles.startText}>I Reached Location</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default BookedJobScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "700", marginBottom: 30, color: "#1E5EFF" },
//   label: { marginTop: 12, color: "#6B7280" },
//   value: { fontSize: 16, fontWeight: "600" },
//   startBtn: { marginTop: 40, backgroundColor: "#22C55E", padding: 16, borderRadius: 14, alignItems: "center" },
//   startText: { color: "#fff", fontWeight: "700", fontSize: 16 }
// });














import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSignup } from "../../context/SignupContext";
import { acceptBookedJob, getBookedJob } from "../../services/workerJobApi";

const BookedJobScreen = () => {

const navigation = useNavigation<any>();
const { signupData } = useSignup();
const [job, setJob] = useState<any>(null);

/* -------- Poll booked job -------- */
useEffect(() => {

const interval = setInterval(async () => {
try {
if (!signupData.user_id) return;

const res = await getBookedJob(signupData.user_id);

if (!res.has_job) {
setJob(null);
return;
}

setJob(res);

} catch (e) {
console.log("Polling error", e);
}
}, 3000);

return () => clearInterval(interval);

}, []);

/* -------- Worker reached location -------- */
const handleAccept = async () => {

if (!signupData?.user_id || !job?.job_id) {
Alert.alert("Missing job or user");
return;
}

try {

await acceptBookedJob(
job.job_id,
signupData.user_id as number
);

Alert.alert(
"Arrival Confirmed",
"Customer will now enter Start OTP"
);

navigation.navigate("MapNavigation", {
jobId: job.job_id
});

} catch (e) {
Alert.alert("Failed to confirm arrival");
}
};

/* -------- No job -------- */
if (!job) {
return (
<View style={styles.center}>
<Text style={styles.noJob}>No customer bookings yet</Text>
</View>
);
}

/* -------- UI -------- */
return (
<View style={styles.container}>

{/* JOB CARD */}
<View style={styles.card}>

<Text style={styles.header}>📢 YOUR QUOTATION IS ACCPETED BY CUSTOMER</Text>

<View style={styles.divider} />

<Text style={styles.label}>Service Requested</Text>
<Text style={styles.service}>{job.service_type}</Text>

<Text style={styles.label}>Customer Problem</Text>
<Text style={styles.problem}>
{job.description || "No description provided"}
</Text>

<View style={styles.infoBox}>
<Text style={styles.infoText}>
Go to customer location and press the button once you arrive.
</Text>
</View>

{/* ACCEPT BUTTON */}
<TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
<Text style={styles.acceptText}>ACCEPT</Text>
</TouchableOpacity>

</View>

</View>
);
};

export default BookedJobScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({

container: {
flex: 1,
backgroundColor: "#EEF2FF",
justifyContent: "center",
padding: 18
},

center: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#fff"
},

noJob:{
fontSize:16,
color:"#6B7280"
},

card: {
backgroundColor: "#fff",
borderRadius: 18,
padding: 22,
elevation: 5,
shadowColor: "#000",
shadowOpacity: 0.15,
shadowRadius: 8
},

header:{
fontSize:22,
fontWeight:"800",
color:"#1E5EFF",
textAlign:"center",
marginBottom:10
},

divider:{
height:1,
backgroundColor:"#E5E7EB",
marginVertical:12
},

label:{
fontSize:13,
color:"#6B7280",
marginTop:10
},

service:{
fontSize:18,
fontWeight:"700",
color:"#111827"
},

problem:{
fontSize:15,
marginTop:4,
color:"#374151"
},

infoBox:{
backgroundColor:"#EFF6FF",
padding:12,
borderRadius:12,
marginTop:18
},

infoText:{
color:"#1E40AF",
fontSize:13,
textAlign:"center"
},

acceptBtn:{
marginTop:25,
backgroundColor:"#22C55E",
padding:18,
borderRadius:14,
alignItems:"center"
},

acceptText:{
color:"#fff",
fontSize:16,
fontWeight:"800",
letterSpacing:1
}

});