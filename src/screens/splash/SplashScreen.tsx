


import * as Location from "expo-location";
import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSignup } from "../../context/SignupContext";

const SplashScreen = ({ navigation }: any) => {
  const { updateSignupData } = useSignup(); // ✅ CONTEXT

  useEffect(() => {
    handleLocation();
  }, []);

  const handleLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // ✅ SAVE INTO SIGNUP CONTEXT
        updateSignupData({
          latitude,
          longitude,
        });

        goNext();
      } else {
        Alert.alert(
          "Location Access",
          "Location helps us show nearby work opportunities",
          [{ text: "Continue", onPress: goNext }]
        );
      }
    } catch (error) {
      console.log("Location error:", error);
      goNext();
    }
  };

  const goNext = () => {
    navigation.replace("LanguageSelect");
  };

  return (
    <View style={styles.container}>
      {/* UI unchanged */}
    </View>
  );
};

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E5EFF",
    justifyContent: "space-between",
    paddingVertical: 80,
    alignItems: "center",
  },
  center: {
    alignItems: "center",
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#E6ECFF",
    fontSize: 14,
    marginTop: 6,
  },
  footer: {
    color: "#E6ECFF",
    fontSize: 14,
  },
});
