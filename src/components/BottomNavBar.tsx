

import { Ionicons } from "@expo/vector-icons"; // ✅ REQUIRED IMPORT
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tabs = [
  {
    label: "Home",
    icon: "home-outline",
    activeIcon: "home",
    route: "WorkerHome",
  },
  {
    label: "History",
    icon: "time-outline",
    activeIcon: "time",
    route: "JobHistory",
  },
  {
    label: "otp verification",
    icon: "notifications-outline",
    activeIcon: "notifications",
    route: "WorkerActiveJob",
  },
  // {
  //   label: "Profile",
  //   icon: "person-outline",
  //   activeIcon: "person",
  //   route: "Profile",
  // },
  {
    label: "Active Job",
    icon: "person-outline",
    activeIcon: "person",
    route: "BookedJob",
  },
  {
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
    route: "Profile",
  },
];

export default function BottomNavBar() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map(tab => {
          const active = route.name === tab.route;

          return (
            <TouchableOpacity
              key={tab.route}
              style={styles.tab}
              activeOpacity={0.75}
             onPress={() => navigation.navigate("Auth", { screen: tab.route })}
            >
              <View style={[styles.iconWrap, active && styles.activeBg]}>
                <Ionicons
                  // name={active ? tab.activeIcon : tab.icon}
                  size={22}
                  color={active ? "#1E5EFF" : "#9CA3AF"}
                />
              </View>

              <Text style={[styles.label, active && styles.activeLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F8FAFC",
  },
  container: {
    flexDirection: "row",
    height: 72,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: Platform.OS === "ios" ? 20 : 12,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  activeBg: {
    backgroundColor: "#EEF4FF",
  },
  activeLabel: {
    color: "#1E5EFF",
    fontWeight: "800",
  },
});
