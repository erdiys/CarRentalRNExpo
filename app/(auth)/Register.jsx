import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";
import images from "@/assets/images";
import { Colors } from "@/constants/Colors.ts";

export default function Register() {
  return (
    <View style={styles.container}>
      <Image source={images.toyota} style={styles.image} />
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Name*</Text>
        <TextInput style={styles.formInput} placeholder="Full Name" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email*</Text>
        <TextInput
          style={styles.formInput}
          secureTextEntry={true}
          placeholder="Contoh: john.doe@domain.com"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Create Password</Text>
        <TextInput
          style={styles.formInput}
          secureTextEntry={true}
          placeholder="6+ character"
        />
      </View>

      <View style={styles.formContainer}>
        <Button title="Sign Up" color={Colors.common.button} />
        <Text style={styles.noteText}>
          Already have an account?{" "}
          <Link style={styles.linkText} href="./">
            Sign In here
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 5,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 40,
    fontFamily: "PoppinsBold",
    textAlign: "center"
  },
  image: {
    marginTop: 10,
    marginBottom: 30,
    height: 53,
    width: 135
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  formLabel: {
    fontSize: 14,
    fontFamily: "Poppins"
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  noteText: {
    alignSelf: "center",
    marginTop: 10
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline"
  }
});
