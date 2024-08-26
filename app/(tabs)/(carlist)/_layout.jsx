import { Stack } from "expo-router";
import Constants from "expo-constants";
import { View } from "react-native";

export default function ListCarLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}
