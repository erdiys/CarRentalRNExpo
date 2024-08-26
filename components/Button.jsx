import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function button({name, onPress, style }) {
  return (
    <Pressable style={{...styles.newButton, ...style}} onPress={onPress}>
      <Text style={styles.newButtonLink}>
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    newButton: {
      borderRadius: 10,
      backgroundColor: Colors.common.button,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
    },
    newButtonLink: {
      fontSize: 14,
      lineHeight: 25,
      fontFamily: 'PoppinsBold',
      color: 'white',
      padding: 5,
      width: '100%',
      textAlign: 'center',
    },
  });
  