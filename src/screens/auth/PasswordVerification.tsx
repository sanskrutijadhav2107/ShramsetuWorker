import React, { useState } from "react";
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


const EnterPassword = ({ route, navigation }: any) => {
  const { mobile } = route.params;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateSignupData } = useSignup();


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
            Enter your password for +91 {mobile}
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





