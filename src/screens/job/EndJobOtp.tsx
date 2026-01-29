// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const StartJobOtp = () => {
//   const [otp, setOtp] = useState("");

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>End Job</Text>
//       <Text style={styles.subtitle}>
//         Ask the customer for the OTP to end work
//       </Text>

//       <TextInput
//         style={styles.otp}
//         keyboardType="number-pad"
//         maxLength={4}
//         value={otp}
//         onChangeText={setOtp}
//       />

//       <TouchableOpacity style={styles.voice}>
//         <Text style={styles.voiceText}>🎤 Speak the OTP</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.start}>
//         <Text style={styles.startText}>End Work</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default StartJobOtp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "#FFF",
//   },
//   title: { fontSize: 22, fontWeight: "700" , marginTop:30,},
//   subtitle: { color: "#6B7280", marginVertical: 12 },

//   otp: {
//     backgroundColor: "#F3F4F6",
//     padding: 18,
//     borderRadius: 12,
//     textAlign: "center",
//     fontSize: 20,
//     letterSpacing: 12,
//   },
//   voice: {
//     backgroundColor: "#EEF4FF",
//     padding: 14,
//     borderRadius: 12,
//     marginTop: 16,
//     alignItems: "center",
//   },
//   voiceText: { color: "#4F46E5", fontWeight: "600" },

//   start: {
//     marginTop: "auto",
//     backgroundColor: "#22C55E",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginBottom:50,
//   },
//   startText: { color: "#FFF", fontWeight: "700" },
// });








import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EndJobOtp = ({ navigation }: any) => {
  const [otp, setOtp] = useState("");

  const handleEndWork = () => {
    // After OTP verification (assumed success)
    navigation.navigate("Home", {
      jobStatus: "AVAILABLE",
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>End Job</Text>
      <Text style={styles.subtitle}>
        Ask the customer for the OTP to complete work
      </Text>

      {/* OTP INPUT */}
      <TextInput
        style={styles.otp}
        keyboardType="number-pad"
        maxLength={4}
        value={otp}
        onChangeText={setOtp}
        placeholder="• • • •"
        placeholderTextColor="#9CA3AF"
      />

      {/* VOICE OTP */}
      <TouchableOpacity style={styles.voice}>
        <Text style={styles.voiceText}>🎤 Speak the OTP</Text>
      </TouchableOpacity>

      {/* END WORK BUTTON */}
      <TouchableOpacity style={styles.end} onPress={handleEndWork}>
        <Text style={styles.endText}>End Work</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndJobOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 30,
  },

  subtitle: {
    color: "#6B7280",
    marginVertical: 12,
    fontSize: 14,
  },

  otp: {
    backgroundColor: "#F3F4F6",
    padding: 18,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 12,
    marginTop: 12,
  },

  voice: {
    backgroundColor: "#EEF4FF",
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },

  voiceText: {
    color: "#4F46E5",
    fontWeight: "600",
  },

  end: {
    marginTop: "auto",
    backgroundColor: "#EF4444", // 🔴 End action
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 50,
  },

  endText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
