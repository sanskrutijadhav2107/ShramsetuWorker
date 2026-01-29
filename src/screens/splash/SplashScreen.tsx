import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("LanguageSelect");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image
          source={require("../../assets/images/Shramsetulogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>ShramSetu</Text>
        <Text style={styles.subtitle}>आपका काम, आपकी पहचान</Text>
      </View>

      <Text style={styles.footer}>Connecting work nearby…</Text>
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
