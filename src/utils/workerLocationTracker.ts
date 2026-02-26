import * as Location from "expo-location";
import { updateWorkerLocation } from "../services/workerJobApi";

let locationInterval: any = null;

export const startWorkerTracking = async (workerId: number) => {
  // ask permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Location permission denied");
    return;
  }

  // start loop every 5 seconds
  locationInterval = setInterval(async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const latitude = loc.coords.latitude;
      const longitude = loc.coords.longitude;

      console.log("Sending location:", latitude, longitude);

      await updateWorkerLocation(workerId, latitude, longitude);

    } catch (err) {
      console.log("Location error", err);
    }
  }, 5000);
};

export const stopWorkerTracking = () => {
  if (locationInterval) {
    clearInterval(locationInterval);
    locationInterval = null;
    console.log("Tracking stopped");
  }
};