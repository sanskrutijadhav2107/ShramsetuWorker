

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useSignup } from "../../context/SignupContext";
import { getWorkerHistory } from "../../services/workerJobApi";

export default function JobHistory() {
  const { signupData } = useSignup();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      if (!signupData?.user_id) return;

      try {
        const res = await getWorkerHistory(signupData.user_id);
        setJobs(res.jobs || []);
      } catch (e) {
        console.log("Error loading history");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job History</Text>
      </View>

      {jobs.length === 0 && (
        <View style={styles.center}>
          <Text>No completed jobs yet</Text>
        </View>
      )}

      {jobs.map((job) => (
        <View key={job.job_id} style={styles.jobCard}>

          <View style={styles.jobTop}>
            <Text style={styles.jobTitle}>{job.service_type}</Text>
            <Text style={styles.status}>Completed</Text>
          </View>

          <Text style={styles.meta}>{job.description}</Text>

          <View style={styles.jobBottom}>
            <Text style={styles.amount}>₹{job.amount || 0}</Text>
            <Text style={styles.date}>
              {job.completed_at?.split("T")[0]}
            </Text>
          </View>

        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB" },

  header: {
    backgroundColor: "#4F46E5",
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

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

  jobBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  amount: { fontWeight: "700", fontSize: 16 },

  date: { color: "#6B7280" },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});


