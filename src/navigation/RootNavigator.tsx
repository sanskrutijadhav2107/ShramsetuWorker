import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isLoggedIn = false;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
