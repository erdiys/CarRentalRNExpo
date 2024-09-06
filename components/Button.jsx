import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function button({ name, onPress, style, invert, disabled }) {
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{
        ...styles.newButton,
        ...style,
        opacity: disabled ? 1 : opacity,
        backgroundColor: disabled
          ? "#C9E7CA"
          : invert
          ? "white"
          : Colors.common.button,
        borderColor: disabled ? "#C9E7CA" : Colors.common.button
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          ...styles.newButtonLink,
          color: disabled ? "white" : invert ? Colors.common.button : "white"
        }}
      >
        {name}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  newButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.common.button,
    backgroundColor: Colors.common.button,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  newButtonLink: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: "PoppinsBold",
    color: "white",
    padding: 5,
    width: "100%",
    textAlign: "center"
  }
});
