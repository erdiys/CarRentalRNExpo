import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import images from "../../assets/images";
import { Container, Col } from "../../components/Grid";
import NewButton from "@/components/Button";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import * as SecureStored from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { login, selectLogin, logout } from "../../redux/reducer/auth/authLoginSlice";

export default function profile() {
  const { data } = useSelector(selectLogin);
  const dispatch = useDispatch();

  return (
    <View>
      <Container style={styles.container}>
        <Col style={styles.column}>
          <View style={styles.image}>
            <Image source={images.park} />
          </View>
          <Text style={styles.textNA}>Welcome back {`\n${data.email}`}</Text>
          <View style={styles.buttonContainer}>
            <NewButton
              name="Logout"
              style={{
                backgroundColor: "darkred"
              }}
              onPress={() => {
                dispatch(logout());
                router.navigate("../(auth)");
              }}
            />
          </View>
        </Col>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white"
  },
  column: {
    justifyContent: "center"
  },
  image: {
    justifyContent: "center",
    alignItems: "center"
  },
  textNA: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 30
  },
  buttonContainer: {
    justifyContent: "center",
    alignSelf: "center",
    width: "50%"
  }
});
