// import { NavigationContainer } from "@react-navigation/native";
// import React from "react";
// import RootNavigator from "./src/navigation/RootNavigator";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }




import { NavigationContainer } from "@react-navigation/native";
import { SignupProvider } from "./src/context/SignupContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <SignupProvider>
        <RootNavigator />
      </SignupProvider>
    </NavigationContainer>
  );
}

