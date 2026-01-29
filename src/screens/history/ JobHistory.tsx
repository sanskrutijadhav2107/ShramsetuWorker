// import React from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";

// export default function JobHistory() {
//   return (
//     <ScrollView style={styles.container}>
//       {/* STATS */}
//       <View style={styles.stats}>
//         <View>
//           <Text style={styles.statValue}>47</Text>
//           <Text style={styles.statLabel}>Total Jobs</Text>
//         </View>
//         <View>
//           <Text style={styles.statValue}>12</Text>
//           <Text style={styles.statLabel}>This Month</Text>
//         </View>
//         <View>
//           <Text style={styles.statValue}>₹18K</Text>
//           <Text style={styles.statLabel}>Earnings</Text>
//         </View>
//       </View>

//       {/* JOB CARD */}
//       <View style={styles.jobCard}>
//         <Text style={styles.jobTitle}>Kitchen Sink Repair</Text>
//         <Text style={styles.meta}>HSR Layout, Bangalore</Text>
//         <Text style={styles.completed}>Completed</Text>
//         <Text style={styles.amount}>₹500</Text>
//       </View>

//       <View style={styles.jobCard}>
//         <Text style={styles.jobTitle}>Bathroom Repair</Text>
//         <Text style={styles.meta}>Indiranagar, Bangalore</Text>
//         <Text style={styles.completed}>Completed</Text>
//         <Text style={styles.amount}>₹600</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F5F7FB", padding: 16 },

//   stats: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#4F46E5",
//     padding: 20,
//     borderRadius: 18,
//     marginTop:50,
//   },
//   statValue: { color: "#FFF", fontSize: 18, fontWeight: "700" },
//   statLabel: { color: "#E0E7FF", fontSize: 12 },

//   jobCard: {
//     backgroundColor: "#FFF",
//     padding: 16,
//     borderRadius: 16,
//     marginTop: 16,
//   },
//   jobTitle: { fontWeight: "700" },
//   meta: { color: "#6B7280", marginVertical: 4 },
//   completed: {
//     color: "#16A34A",
//     fontWeight: "600",
//     marginVertical: 4,
//   },
//   amount: { fontWeight: "700" },
// });













import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function JobHistory() {
  const [filter, setFilter] = useState("ALL");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Job History</Text>

          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.iconText}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Total Jobs</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹18K</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>
      </View>

      {/* ================= FILTERS ================= */}
      <View style={styles.filterRow}>
        {["ALL", "COMPLETED", "CANCELLED"].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterBtn,
              filter === item && styles.filterActive,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.filterTextActive,
              ]}
            >
              {item === "ALL" ? "All" : item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================= JOB CARD ================= */}
      <View style={styles.jobCard}>
        <View style={styles.jobTop}>
          <Text style={styles.jobTitle}>Kitchen Sink Repair</Text>
          <Text style={styles.status}>Completed</Text>
        </View>

        <Text style={styles.meta}>HSR Layout, Bangalore</Text>

        <View style={styles.jobMetaRow}>
          <Text style={styles.metaSmall}>Today, 2:30 PM</Text>
          <Text style={styles.metaSmall}>0.15 hrs</Text>
        </View>

        <View style={styles.jobBottom}>
          <Text style={styles.amount}>₹500</Text>
          <Text style={styles.view}>View Details</Text>
        </View>
      </View>

      <View style={styles.jobCard}>
        <View style={styles.jobTop}>
          <Text style={styles.jobTitle}>Bathroom Repair</Text>
          <Text style={styles.status}>Completed</Text>
        </View>

        <Text style={styles.meta}>Indiranagar, Bangalore</Text>

        <View style={styles.jobMetaRow}>
          <Text style={styles.metaSmall}>Today, 10:00 AM</Text>
          <Text style={styles.metaSmall}>2 hrs</Text>
        </View>

        <View style={styles.jobBottom}>
          <Text style={styles.amount}>₹600</Text>
          <Text style={styles.view}>View Details</Text>
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
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: { color: "#FFF", fontSize: 16 },

  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  statsCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statItem: { alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  /* ---------- FILTER ---------- */
  filterRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 20,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  filterActive: { backgroundColor: "#4F46E5" },
  filterText: { fontSize: 13, color: "#374151", fontWeight: "600" },
  filterTextActive: { color: "#FFF" },

  /* ---------- JOB CARD ---------- */
  jobCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
  },

  jobTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  jobTitle: { fontWeight: "700", fontSize: 15 },

  status: {
    backgroundColor: "#DCFCE7",
    color: "#16A34A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: "600",
  },

  meta: { color: "#6B7280", marginTop: 6 },

  jobMetaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },

  metaSmall: { color: "#9CA3AF", fontSize: 12 },

  jobBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  amount: { fontWeight: "700", fontSize: 16 },
  view: { color: "#4F46E5", fontWeight: "600", fontSize: 13 },
});
