import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import images from "@/assets/images";
import NewButton from "@/components/Button";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "../../components/Grid";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Required")
});

export default function Register() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState({
    icon: "",
    color: "",
    comment: "",
    welcome: ""
  });

  const handleSubmit = async (e) => {
    try {
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/register",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: e.email,
            password: e.password,
            role: "Customer"
          })
        }
      );
      const body = await req.json();

      if (req.status == 201) {
        setModalStatus({
          icon: "checkmark-circle",
          color: "green",
          comment: "Register Successful!",
          welcome: `${e.email} registered.`
        });
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          router.navigate("/");
        }, 2000);
      } else {
        if (!body.errors) {
          setModalStatus({
            icon: "close-circle",
            color: "red",
            comment: "Register Failed!",
            welcome: body.message
          });
        } else {
          setModalStatus({
            icon: "close-circle",
            color: "red",
            comment: "Register Failed!",
            welcome: String(
              body.errors.map((val, idx) => val.message).join(`\n`)
            )
          });
        }
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 4000);
      }
    } catch (e) {
      console.log("ini error", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.toyota} style={styles.image} />
      <Text style={styles.heading}>Sign Up</Text>

      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>
                Name
                <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                style={styles.formInput}
                placeholder="Full Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {errors.name && touched.name ? (
                <Text style={styles.textError}>{errors.name}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>
                Email
                <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                style={styles.formInput}
                placeholder="Contoh: john.doe@domain.com"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {errors.email && touched.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>
                Create Password
                <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                style={styles.formInput}
                secureTextEntry={true}
                placeholder="8+ character"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {errors.password && touched.password ? (
                <Text style={styles.textError}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <NewButton name="Sign Up" onPress={handleSubmit} />
              <Text style={styles.noteText}>
                Already have an account?{" "}
                <Link style={styles.linkText} href="./">
                  Sign In here
                </Link>
              </Text>
            </View>
          </>
        )}
      </Formik>

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
  },
  textError: {
    marginTop: 5,
    color: "red",
    fontSize: 16
  },
  star: {
    color: "red",
    fontSize: 16
  }
});
