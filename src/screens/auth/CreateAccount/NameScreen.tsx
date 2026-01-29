// import { useRouter } from 'expo-router';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function NameScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>What's your name?</Text>
//       <Text style={styles.subtitle}>This will be shown to employers</Text>

//       <TextInput
//         placeholder="Enter your full name"
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.voiceBtn}>
//         <Text style={styles.voiceText}>🎤 Tap to speak your name</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.continueBtn}
//         onPress={() => router.push('./src/auth/CreateAccount/WorkType')}
//       >
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex:1, padding: 24, justifyContent:'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginTop:80},
//   subtitle: { fontSize: 14, color:'#666', marginBottom: 24 },
//   input: {
//     borderWidth: 1,
//     borderColor:'#ddd',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     marginBottom: 16
//   },
//   voiceBtn: {
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//     borderWidth:1,
//     borderColor:'#0A7AFF',
//     padding:14,
//     borderRadius:12,
//     marginBottom:32
//   },
//   voiceText: { color:'#0A7AFF', fontWeight:'500' },
//   continueBtn: {
//     backgroundColor:'#0A7AFF',
//     padding:16,
//     borderRadius:12
//   },
//   continueText: { color:'#fff', textAlign:'center', fontSize:16, fontWeight:'bold' }
// });




















import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const NameScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s your name?</Text>
      <Text style={styles.subtitle}>
        This will be shown to employers
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.voiceBox}>
        <Text style={styles.voiceText}>🎤 Tap to speak your name</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PhoneConfirm")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    marginTop:80,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  voiceBox: {
    marginTop: 12,
    backgroundColor: "#EEF4FF",
    padding: 14,
    borderRadius: 12,
  },
  voiceText: {
    fontSize: 14,
    color: "#1E5EFF",
    fontWeight: "600",
  },
  button: {
    marginTop: "auto",
    marginBottom:80,
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
