import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Notifications() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notifications</Text>

          <TouchableOpacity>
            <Text style={styles.clear}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= NOTIFICATION CARD ================= */}
      <View style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: "#E0E7FF" }]}>
          <Text style={styles.icon}>🧰</Text>
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.title}>New Job Request</Text>
          <Text style={styles.desc}>
            Kitchen sink repair in HSR Layout. ₹500 payment.
          </Text>
          <Text style={styles.time}>2 minutes ago</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: "#DCFCE7" }]}>
          <Text style={styles.icon}>✔</Text>
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.title}>Payment Received</Text>
          <Text style={styles.desc}>
            ₹600 credited for bathroom repair job.
          </Text>
          <Text style={styles.time}>1 hour ago</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: "#FEF3C7" }]}>
          <Text style={styles.icon}>⭐</Text>
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.title}>New Review</Text>
          <Text style={styles.desc}>
            Priya Sharma rated you 5 stars for excellent work!
          </Text>
          <Text style={styles.time}>2 hours ago</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: "#FFEDD5" }]}>
          <Text style={styles.icon}>🎁</Text>
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.title}>Bonus Unlocked!</Text>
          <Text style={styles.desc}>
            Complete 5 more jobs this week to earn ₹500 bonus.
          </Text>
          <Text style={styles.time}>Yesterday</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  /* ---------- HEADER ---------- */
  header: {
    backgroundColor: "#4F46E5",
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  clear: {
    color: "#E0E7FF",
    fontSize: 13,
    fontWeight: "600",
  },

  /* ---------- CARD ---------- */
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  icon: {
    fontSize: 18,
  },

  textWrap: {
    flex: 1,
  },

  title: {
    fontWeight: "700",
    fontSize: 14,
  },

  desc: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 13,
  },

  time: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 6,
  },
});
