import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MapNavigation = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* MAP PLACEHOLDER */}
      <View style={styles.map}>
        <Text style={styles.mapText}>[ Map View ]</Text>
      </View>

      {/* CUSTOMER CARD */}
      <View style={styles.bottomCard}>
        <Text style={styles.name}>Priya Sharma</Text>
        <Text style={styles.location}>HSR Layout, Bangalore</Text>

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate("StartJobOtp")}
        >
          <Text style={styles.navText}>Start Navigation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapNavigation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: { color: "#6B7280" },

  bottomCard: {
    padding: 20,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  name: { fontSize: 16, fontWeight: "700" },
  location: { color: "#6B7280", marginVertical: 4 },

  navBtn: {
    marginTop: 12,
    backgroundColor: "#4F46E5",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom:50,
  },

  navText: { color: "#FFF", fontWeight: "700" },
});
