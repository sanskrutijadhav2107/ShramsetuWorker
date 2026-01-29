import * as Location from "expo-location";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const LocationPermission = ({ navigation }: any) => {
const handleAllowLocation = async () => {
  await Location.requestForegroundPermissionsAsync();

  // Go to Home after permission (even if denied)
  navigation.replace("WorkerHome");
};


  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📍</Text>
        </View>
      </View>

      {/* Text */}
      <Text style={styles.title}>Enable Location</Text>
      <Text style={styles.subtitle}>
        We need your location to show nearby jobs and help you navigate
      </Text>

      {/* Allow Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleAllowLocation}
      >
        <Text style={styles.primaryText}>
          Allow Location Access
        </Text>
      </TouchableOpacity>

      {/* Skip */}
      <TouchableOpacity
        onPress={() => navigation.replace("WorkerHome")}
      >
        <Text style={styles.skipText}>Skip for Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginBottom: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: "#1E5EFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  skipText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
