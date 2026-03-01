import PropTypes from 'prop-types';
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import VerifyAadhaarCard from "../../components/VerifyAadhaarCard";
import { useSignup } from "../context/SignupContext";
import { verifyAadhaar } from "../services/aadhaarApi";

export default function VerifyAadhaarCard({ onVerified }) {
  const { signupData } = useSignup();

  const handleVerify = async () => {
    if (!signupData?.user_id) {
      Alert.alert("Please login first");
      return;
    }

    const res = await verifyAadhaar(signupData.user_id);

    if (res?.verified) {
      Alert.alert("Verified", "Government ID successfully verified");
      onVerified?.();   // 🔥 let parent decide what to do
    } else {
      Alert.alert("Failed", "Verification failed");
    }
  };

  if (signupData?.aadhaar_verified) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={handleVerify}>
      <Text style={styles.title}>🪪 Verify Government ID</Text>
      <Text style={styles.sub}>
        Verified workers get more job priority and customer trust
      </Text>
    </TouchableOpacity>
  );
}

VerifyAadhaarCard.propTypes = {
  onVerified: PropTypes.func,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#10B981",
    borderRadius: 18,
    padding: 18,
    margin: 16,
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  sub: {
    color: "#ECFDF5",
    marginTop: 6,
    fontSize: 12,
  },
});