import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSignup } from "../../context/SignupContext";
import { acceptBookedJob, getBookedJob } from "../../services/workerJobApi";

const BookedJobScreen = () => {

  const navigation = useNavigation<any>();
  const { signupData } = useSignup();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* -------- Poll booked job -------- */
  useEffect(() => {

    const interval = setInterval(async () => {
      try {
        if (!signupData.user_id) return;

        const res = await getBookedJob(signupData.user_id);

        if (!res.has_job) {
          setJob(null);
          return;
        }

        setJob(res);

      } catch (e) {
        console.log("Polling error", e);
      }
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  /* -------- Worker reached location -------- */
  const handleAccept = async () => {

  if (!signupData?.user_id || !job?.job_id) {
    Alert.alert("Missing job or user");
    return;
  }

  try {

    await acceptBookedJob(
      job.job_id,
      signupData.user_id as number
    );

    Alert.alert(
      "Arrival Confirmed",
      "Customer will now enter Start OTP"
    );

    navigation.navigate("MapNavigation", {
      jobId: job.job_id
    });

  } catch (e) {
    Alert.alert("Failed to confirm arrival");
  }
};
  /* -------- No job -------- */
  if (!job) {
    return (
      <View style={styles.center}>
        <Text>No customer bookings yet</Text>
      </View>
    );
  }

  /* -------- UI -------- */
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Customer selected you 🎉</Text>

      <Text style={styles.label}>Service</Text>
      <Text style={styles.value}>{job.service_type}</Text>

      <Text style={styles.label}>Problem</Text>
      <Text style={styles.value}>{job.description}</Text>

      <TouchableOpacity style={styles.startBtn} onPress={handleAccept}>
        <Text style={styles.startText}>I Reached Location</Text>
      </TouchableOpacity>

    </View>
  );
};

export default BookedJobScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 30, color: "#1E5EFF" },
  label: { marginTop: 12, color: "#6B7280" },
  value: { fontSize: 16, fontWeight: "600" },
  startBtn: { marginTop: 40, backgroundColor: "#22C55E", padding: 16, borderRadius: 14, alignItems: "center" },
  startText: { color: "#fff", fontWeight: "700", fontSize: 16 }
});