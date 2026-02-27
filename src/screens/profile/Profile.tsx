
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignup } from "../../context/SignupContext";

export default function Profile() {
  const { signupData, resetSignupData } = useSignup();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            resetSignupData();          // ✅ clear user session
            navigation.replace("Login"); // ✅ go to login screen
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        {/* ✅ NAME */}
        <Text style={styles.name}>
          {signupData.name || "Worker"}
        </Text>

        {/* ✅ WORK TYPE */}
        <Text style={styles.skill}>
          {signupData.service_type
            ? signupData.service_type.charAt(0).toUpperCase() +
              signupData.service_type.slice(1)
            : "Skilled Worker"}
        </Text>

        {/* ⭐ RATING (static for now) */}
        <View style={styles.rating}>
          <Text>⭐ 0.0</Text>
          <Text style={styles.review}>(0 reviews)</Text>
        </View>
      </View>

      {/* 🚪 LOGOUT */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4F46E5" },

  header: {
    alignItems: "center",
    paddingTop: 60,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },
  skill: {
    color: "#E0E7FF",
    marginTop: 4,
  },

  rating: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  review: { marginLeft: 4 },

  logout: {
    marginTop: "auto",
    backgroundColor: "#FFF",
    margin: 24,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 60,
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 16,
  },
});





