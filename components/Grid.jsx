import { View, Text, StyleSheet } from "react-native";
import React from "react";

export function Container({ children, style={}, gap=0 }) {
  return <View style={{ gap, ...style, ...styles.container }}>{children}</View>;
}

export function Row({ children, style={}, gap=0 }) {
  return <View style={{ gap, ...style, ...styles.row }}>{children}</View>;
}

export function Col({ children, style={}, gap=0 }) {
  return <View style={{ gap, ...style, ...styles.column }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row"
  },
  column: {}
});
