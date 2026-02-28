import { speak } from "@/src/utils/voiceAssistant";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignup } from "../../context/SignupContext";
import { loginWithPassword } from "../../services/auth";

// import { speak } from "../../utils/voiceAssistant";

const EnterPassword = ({ route, navigation }: any) => {
  const { mobile } = route.params;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateSignupData } = useSignup();
  
useEffect(() => {
  speak(
    "Please enter your password to continue",
    "जारी रखने के लिए अपना पासवर्ड दर्ज करें",
    "पुढे जाण्यासाठी तुमचा पासवर्ड टाका"
  );
}, []);

  const handleLogin = async () => {
    if (password.length < 6) {
      Alert.alert("Invalid password", "Password too short");
      return;
    }

    // try {
    //   setLoading(true);

    //   const res = await loginWithPassword(mobile, password);
    //   console.log("LOGIN SUCCESS:", res);

    //   // TODO: store token / user_id later
    //   navigation.replace("WorkerHome");
    // } catch (error: any) {
    //   Alert.alert(
    //     "Login failed",
    //     error?.response?.data?.detail || "Invalid credentials"
    //   );
    // } finally {
    //   setLoading(false);
    // }




    try {
  setLoading(true);

  const res = await loginWithPassword(mobile, password);

  console.log("LOGIN RAW RESPONSE:", JSON.stringify(res, null, 2));

  // 🔍 Try extracting name safely
  const userName =
    res?.name ||
    res?.user?.name ||
    res?.data?.name ||
    res?.data?.full_name ||
    res?.user?.full_name;

  const userId =
    res?.user_id ||
    res?.user?.id ||
    res?.data?.id;

  console.log("PARSED NAME:", userName);
  console.log("PARSED ID:", userId);

  updateSignupData({
    name: userName,
    user_id: userId,
  });

  navigation.replace("WorkerHome");
} catch (error: any) {
  Alert.alert(
    "Login failed",
    error?.response?.data?.detail || "Invalid credentials"
  );
} finally {
  setLoading(false);
}


  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter Password</Text>
          <Text style={styles.subtitle}>
            
          </Text>
        </View>

        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgot}>Forgot password?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EnterPassword;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 24 },

  header: { marginTop: 80, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 12 },

  passwordInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  forgot: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    color: "#1E5EFF",
  },

  button: {
    marginTop: "auto",
    marginBottom: 80,
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});






// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import {
//   Alert,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useSignup } from "../../context/SignupContext";

// export default function Profile() {
//   const { signupData, resetSignupData } = useSignup();
//   const navigation = useNavigation<any>();

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: () => {
//             resetSignupData();
//             navigation.replace("LoginScreen");
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* HEADER (Identity Section) */}
//       <View style={styles.header}>
//         <Image
//           source={{ uri: "https://i.pravatar.cc/150" }}
//           style={styles.avatar}
//         />

//         <Text style={styles.name}>
//           {signupData?.name || "Worker"}
//         </Text>

//         <Text style={styles.skill}>
//           {signupData?.service_type
//             ? signupData.service_type.charAt(0).toUpperCase() +
//               signupData.service_type.slice(1)
//             : "Skilled Worker"}
//         </Text>

//         {/* <Text style={styles.mobile}>
//           +91 {signupData?.mobile || "XXXXXXXXXX"}
//         </Text> */}
//       </View>

//       {/* INFO SECTION */}
//       <View style={styles.infoSection}>
//         <View style={styles.ratingBox}>
//           <Text style={styles.ratingText}>⭐ 0.0</Text>
//           <Text style={styles.review}>(0 reviews)</Text>
//         </View>
//       </View>

//       {/* LOGOUT */}
//       <TouchableOpacity style={styles.logout} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7FB",
//   },

//   /* ---------- HEADER ---------- */
//   header: {
//     backgroundColor: "#1E5EFF",
//     alignItems: "center",
//     paddingTop: 60,
//     paddingBottom: 40,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },

//   avatar: {
//     width: 96,
//     height: 96,
//     borderRadius: 50,
//     borderWidth: 4,
//     borderColor: "#FFFFFF",
//     marginBottom: 10,
//   },

//   name: {
//     color: "#FFFFFF",
//     fontSize: 22,
//     fontWeight: "700",
//     marginTop: 6,
//   },

//   skill: {
//     color: "#DCE6FF",
//     fontSize: 14,
//     marginTop: 2,
//   },

//   mobile: {
//     color: "#EAF0FF",
//     fontSize: 13,
//     marginTop: 6,
//   },

//   /* ---------- INFO ---------- */
//   infoSection: {
//     alignItems: "center",
//     marginTop: 30,
//   },

//   ratingBox: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 22,

//     // Android shadow
//     elevation: 3,

//     // iOS shadow
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   ratingText: {
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   review: {
//     marginLeft: 6,
//     color: "#6B7280",
//   },

//   /* ---------- LOGOUT ---------- */
//   logout: {
//     marginTop: "auto",
//     marginBottom: 50,
//     alignSelf: "center",
//   },

//   logoutText: {
//     color: "#EF4444",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

