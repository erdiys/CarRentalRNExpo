import { Stack } from "expo-router";
import { View } from "react-native";
import Constants from "expo-constants";

export default function () {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
