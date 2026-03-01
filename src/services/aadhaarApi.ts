import * as DocumentPicker from "expo-document-picker";
import api from "./api";
import { Alert } from "react-native";

export const verifyAadhaar = async (userId: number) => {
  try {
    // pick ONLY zip
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/zip",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return null;

    const file = result.assets[0];

    // ask share code properly
    const shareCode = await new Promise<string | null>((resolve) => {
      Alert.prompt?.(
        "Aadhaar Share Code",
        "Enter 4-digit share code of your Aadhaar ZIP",
        (text) => resolve(text),
        "plain-text"
      );
    });

    if (!shareCode || shareCode.length !== 4) {
      Alert.alert("Invalid", "Share code must be 4 digits");
      return null;
    }

    const formData = new FormData();

    formData.append("file", {
      uri: file.uri,
      name: file.name || "aadhaar.zip",
      type: "application/zip",
    } as any);

    formData.append("share_code", shareCode);

    // DO NOT set multipart header manually
    const response = await api.post(
      `/aadhaar/verify/${userId}`,
      formData
    );

    return response.data;

  } catch (error) {
    console.log("AADHAAR VERIFY ERROR:", error);
    Alert.alert("Error", "Could not verify Aadhaar");
    return null;
  }
};