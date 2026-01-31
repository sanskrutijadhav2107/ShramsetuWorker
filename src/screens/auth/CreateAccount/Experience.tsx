// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { EXPERIENCE_MAP } from "../../../constants/workerOptions";

// import { useSignup } from "../../../context/SignupContext";
// import { registerUser } from "../../../services/auth";

// const experienceOptions = Object.keys(EXPERIENCE_MAP);

// const Experience = ({ navigation }: any) => {
//   const { signupData, updateSignupData, resetSignupData } = useSignup();
//   const [selected, setSelected] = useState("1–3 years");
//   const [loading, setLoading] = useState(false);

//   const onCreateAccount = async () => {
//     const experienceValue = EXPERIENCE_MAP[selected];

//     updateSignupData({ experience: experienceValue });

//     const payload = {
//       ...signupData,
//       experience: experienceValue,
//     };

//     console.log("REGISTER PAYLOAD:", payload);

//     try {
//       setLoading(true);
//       await registerUser(payload);
//       resetSignupData();
//       navigation.replace("WorkerHome");
//     } catch (error) {
//       console.log("Register error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your experience?</Text>
//       <Text style={styles.subtitle}>
//         How many years have you been working?
//       </Text>

//       {experienceOptions.map(exp => (
//         <TouchableOpacity
//           key={exp}
//           style={[
//             styles.option,
//             selected === exp && styles.selected,
//           ]}
//           onPress={() => setSelected(exp)}
//         >
//           <Text
//             style={[
//               styles.optionText,
//               selected === exp && styles.selectedText,
//             ]}
//           >
//             {exp}
//           </Text>
//         </TouchableOpacity>
//       ))}

//       <TouchableOpacity
//         style={styles.button}
//         onPress={onCreateAccount}
//         disabled={loading}
//       >
//         <Text style={styles.buttonText}>
//           {loading ? "Creating..." : "Create Account"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Experience;

// /* styles SAME as your existing ones */


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "#FFF",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 6,
//     marginTop:80,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginBottom: 24,
//   },
//   option: {
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: "#F3F4F6",
//     marginBottom: 12,
//   },
//   selected: {
//     backgroundColor: "#1E5EFF",
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   selectedText: {
//     color: "#FFF",
//     fontWeight: "600",
//   },
//   button: {
//     marginTop: "auto",
//     backgroundColor: "#1E5EFF",
//     paddingVertical: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginBottom:80,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });













import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EXPERIENCE_MAP } from "../../../constants/workerOptions";
import { useSignup } from "../../../context/SignupContext";
import { registerUser } from "../../../services/auth";

const experienceOptions = Object.keys(EXPERIENCE_MAP);

const Experience = ({ navigation }: any) => {
  const { signupData, resetSignupData } = useSignup();
  const [selected, setSelected] = useState("1–3 years");
  const [loading, setLoading] = useState(false);

  const onCreateAccount = async () => {
    const payload = {
      ...signupData,
      experience: EXPERIENCE_MAP[selected],
      age: signupData.age ?? 25,
    };

    // 🔒 Required backend fields check
    const required = [
        "phone_number",
    "name",
    "password",
    "confirm_password",
    "role",
    "language",
    "service_type",
    "experience",
    "age",
    "latitude",
    "longitude",
    ];

    for (const field of required) {
      if (!payload[field as keyof typeof payload]) {
        Alert.alert("Missing data", `${field} is required`);
        return;
      }
    }

    console.log("REGISTER PAYLOAD:", payload);

    try {
      setLoading(true);
      await registerUser(payload);
      resetSignupData();
      navigation.replace("WorkerHome");
    } catch (err) {
      Alert.alert("Registration failed", "Check backend logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your experience?</Text>

      {experienceOptions.map(exp => (
        <TouchableOpacity
          key={exp}
          style={[
            styles.option,
            selected === exp && styles.selected,
          ]}
          onPress={() => setSelected(exp)}
        >
          <Text
            style={[
              styles.optionText,
              selected === exp && styles.selectedText,
            ]}
          >
            {exp}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={onCreateAccount}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating account..." : "Create Account"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Experience;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#FFF" },
  title: { fontSize: 22, fontWeight: "700", marginTop: 80 },
  option: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  selected: { backgroundColor: "#1E5EFF" },
  optionText: { fontSize: 16 },
  selectedText: { color: "#FFF", fontWeight: "600" },
  button: {
    marginTop: "auto",
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 80,
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
