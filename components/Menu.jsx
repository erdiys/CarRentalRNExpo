import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Menu({ onPress, icon, ...rest }) {
  return (
    <View style={styles.newButton}>
      <Pressable onPress={onPress}>
        <Ionicons name={icon} size={26} {...rest} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  newButton: {
    borderRadius: 8,
    backgroundColor: Colors.common.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    padding: 5,
    height: 50,
    width: 50,
  }
});
