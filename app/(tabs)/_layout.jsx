import { Tabs, useSegments } from "expo-router";
import React from "react";
import Constants from "expo-constants";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="(carlist)"
          options={{
            title: "Daftar Mobil",
            tabBarStyle: {
              display: segments.includes("details") ? "none" : "flex"
            },
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "list" : "list-outline"}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Akun",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            )
          }}
        />
      </Tabs>
    </View>
  );
}
