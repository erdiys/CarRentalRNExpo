import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import images from "@/assets/images";
import NewButton from "@/components/Button";
import ModalPopup from "@/components/Modal";
import { Row } from "@/components/Grid";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStored from "expo-secure-store";

async function save(key, value) {
  await SecureStored.setItemAsync(key, value);
}

export default function Login() {
  const [token, setToken] = useState({});
  const [modalStatus, setModalStatus] = useState({
    icon: "xmark-circle",
    color: "red",
    comment: "Login Failed!",
    welcome: ""
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text
    });
  };

  const handleSubmit = async () => {
    try {
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/login",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      );
      const body = await req.json();

      if (req.ok) {
        setToken(body.access_token);
        setModalStatus({
          icon: "checkmark-circle",
          color: "green",
          comment: "Login Successful!",
          welcome: `Welcome ${formData.email}`
        });
        save("user", JSON.stringify(body));
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          router.navigate("./(tabs)");
        }, 2000);
      } else {
        setModalStatus({
          icon: "close-circle",
          color: "red",
          comment: "Login Failed!",
          welcome: body.message
        });
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.toyota} style={styles.image} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Contoh: john.doe@domain.com"
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          secureTextEntry={true}
          placeholder="password"
          onChangeText={(text) => handleChange("password", text)}
        />
      </View>

      <View style={styles.formContainer}>
        <NewButton onPress={() => handleSubmit()} name="Sign In" />
        <Text style={styles.noteText}>
          Don't have account?{" "}
          <Link style={styles.linkText} href="./Register">
            Sign Up for free
          </Link>
        </Text>
      </View>

      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBg}>
          <Row style={styles.modalContent}>
            <Ionicons
              size={34}
              name={modalStatus.icon}
              color={modalStatus.color}
            />
            <Text style={styles.textModal}>{modalStatus.comment}</Text>
            <Ionicons
              size={34}
              name={modalStatus.icon}
              color={modalStatus.color}
            />
          </Row>
          <Text style={styles.textModal}>{modalStatus.welcome}</Text>
        </View>
      </ModalPopup>
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
  modalBg: {
    width: "90%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "rgba(0,0,0,.5)",
    // android
    elevation: 2,
    // ios
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 1.5
  },
  modalContent: {
    alignSelf: "center",
    justifyContent: "center"
  },
  textModal: {
    fontFamily: "Poppins",
    fontSize: 14,
    textAlignVertical: "center",
    textAlign: "center",
    margin: 10
  }
});
