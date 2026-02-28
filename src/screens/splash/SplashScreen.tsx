


// import * as Location from "expo-location";
// import React, { useEffect } from "react";
// import { Alert, StyleSheet, View } from "react-native";
// import { useSignup } from "../../context/SignupContext";

// const SplashScreen = ({ navigation }: any) => {
//   const { updateSignupData } = useSignup(); // ✅ CONTEXT

//   useEffect(() => {
//     handleLocation();
//   }, []);

//   const handleLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status === "granted") {
//         const location = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });

//         const latitude = location.coords.latitude;
//         const longitude = location.coords.longitude;

//         console.log("Latitude:", latitude);
//         console.log("Longitude:", longitude);

//         // ✅ SAVE INTO SIGNUP CONTEXT
//         updateSignupData({
//           latitude,
//           longitude,
//         });

//         goNext();
//       } else {
//         Alert.alert(
//           "Location Access",
//           "Location helps us show nearby work opportunities",
//           [{ text: "Continue", onPress: goNext }]
//         );
//       }
//     } catch (error) {
//       console.log("Location error:", error);
//       goNext();
//     }
//   };

//   const goNext = () => {
//     navigation.replace("LanguageSelect");
//   };

//   return (
//     <View style={styles.container}>
//       {/* UI unchanged */}
//     </View>
//   );
// };

// export default SplashScreen;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1E5EFF",
//     justifyContent: "space-between",
//     paddingVertical: 80,
//     alignItems: "center",
//   },
//   center: {
//     alignItems: "center",
//   },
//   logo: {
//     width: 72,
//     height: 72,
//     marginBottom: 16,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 26,
//     fontWeight: "700",
//   },
//   subtitle: {
//     color: "#E6ECFF",
//     fontSize: 14,
//     marginTop: 6,
//   },
//   footer: {
//     color: "#E6ECFF",
//     fontSize: 14,
//   },
// });









import * as Location from "expo-location";
import React, { useEffect } from "react";
import {
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useSignup } from "../../context/SignupContext";

const SplashScreen = ({ navigation }: any) => {
  const { updateSignupData } = useSignup(); // ✅ CONTEXT

  // --- ANIMATION VALUES ---
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.85)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  useEffect(() => {
    startAnimation();
    handleLocation();
  }, []);

  // --- ANIMATION FUNCTION ---
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  };

  // --- LOCATION LOGIC (UNCHANGED) ---
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
      <View style={styles.center}>

        <Animated.Image
          source={require("../../assets/images/ShramsetuLogoWhite.png")}
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>ShramSetu</Text>
          <Text style={styles.subtitle}>
            Connecting workers to opportunities
          </Text>
        </Animated.View>

      </View>

      <Animated.Text style={[styles.footer, { opacity: fadeAnim }]}>
        Preparing nearby jobs...
      </Animated.Text>
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
    width: 90,
    height: 90,
    marginBottom: 18,
    borderRadius: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
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
