import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Rajesh Kumar</Text>
        <Text style={styles.skill}>Plumber</Text>

        <View style={styles.rating}>
          <Text>⭐ 4.8</Text>
          <Text style={styles.review}>(124 reviews)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logout}>
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
  name: { color: "#FFF", fontSize: 18, fontWeight: "700", marginTop: 12 },
  skill: { color: "#E0E7FF", marginTop: 4 },

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
    marginBottom:60,
  },
  logoutText: { color: "#DC2626", fontWeight: "700" },
});
