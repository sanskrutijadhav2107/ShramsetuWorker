import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_KEY = "USER_LOCATION";

export const saveLocation = async (latitude: number, longitude: number) => {
  try {
    const value = JSON.stringify({ latitude, longitude });
    await AsyncStorage.setItem(LOCATION_KEY, value);
  } catch (error) {
    console.log("Error saving location", error);
  }
};

export const getSavedLocation = async () => {
  try {
    const value = await AsyncStorage.getItem(LOCATION_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log("Error reading location", error);
    return null;
  }
};
