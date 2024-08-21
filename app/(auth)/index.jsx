import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import images from "@/assets/images";
import { Colors } from "@/constants/Colors.ts";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={images.toyota} style={styles.image} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Contoh: john.doe@domain.com"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          secureTextEntry={true}
          placeholder="password"
        />
      </View>

      <View style={styles.formContainer}>
        <Button
          onPress={() => router.navigate("../(tabs)")}
          title="Sign In"
          color={Colors.common.button}
        />
        <Text style={styles.noteText}>
          Don't have account?{" "}
          <Link style={styles.linkText} href="./Register">
            Sign Up for free
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
  },
});
