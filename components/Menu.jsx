import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Menu(props) {
  return (
    <TouchableOpacity
      style={styles.newButton}
      onPress={() => router.navigate(props.link)}
    >
      <View style={styles.image}>
        <Image source={props.icon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newButton: {
    borderRadius: 10,
    backgroundColor: Colors.common.primary,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  image: {
    padding: 10,
    width: 24,
    height: 24
  },
});
