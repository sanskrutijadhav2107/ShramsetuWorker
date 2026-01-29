import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";



import Experience from "../screens/auth/CreateAccount/Experience";
import NameScreen from "../screens/auth/CreateAccount/NameScreen";
import PhoneConfirm from "../screens/auth/CreateAccount/PhoneConfirm";
import WorkType from "../screens/auth/CreateAccount/WorkType";

import LanguageSelect from "../screens/auth/LanguageSelect";
import LocationPermission from "../screens/auth/LocationPermission";
import LoginScreen from "../screens/auth/LoginScreen";
import OtpVerification from "../screens/auth/OtpVerification";
import SplashScreen from "../screens/splash/SplashScreen";

import JobHistory from "../screens/history/ JobHistory";
import WorkerHome from "../screens/home/WorkerHome";
import EndJobOtp from "../screens/job/EndJobOtp";
import IncomingJob from "../screens/job/IncomingJob";
import MapNavigation from "../screens/job/MapNavigation";
import StartJobOtp from "../screens/job/StartJobOtp";
import Notifications from "../screens/notifications/Notifications";
import Profile from "../screens/profile/Profile";




const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="LocationPermission" component={LocationPermission} />
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="WorkType" component={WorkType} />
      <Stack.Screen name="PhoneConfirm" component={PhoneConfirm} />
      <Stack.Screen name="Experience" component={Experience} />
      <Stack.Screen name="WorkerHome" component={WorkerHome} />
      <Stack.Screen name="IncomingJob" component={IncomingJob} />
      <Stack.Screen name="MapNavigation" component={MapNavigation} />
      <Stack.Screen name="StartJobOtp" component={StartJobOtp} />

      <Stack.Screen name="EndJobOtp" component={EndJobOtp} />
      <Stack.Screen name="JobHistory" component={JobHistory} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />


     
    </Stack.Navigator>
  );
};

export default AuthNavigator;





