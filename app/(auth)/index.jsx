import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import images from "@/assets/images";
import NewButton from "@/components/Button";
import ModalPopup from "@/components/Modal";
import { Row } from "@/components/Grid";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";

import { useSelector, useDispatch } from "react-redux";
import { login, selectLogin } from "../../redux/reducer/auth/authLoginSlice";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .required("Required")
});

export default function Login() {
  const { data, isError, errorMessage, state } = useSelector(selectLogin);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (isError === false && data.email) {
      setModalStatus({
        icon: "checkmark-circle",
        color: "green",
        comment: "Login Successful!",
        welcome: `Welcome ${formData.email}`
      });
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.replace("./(tabs)");
      }, 2000);
    } else if (isError) {
      setModalStatus({
        icon: "close-circle",
        color: "red",
        comment: "Login Failed!",
        welcome: errorMessage
      });
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }
  }, [isError, state]);

  const handleSubmit = (e) => {
    dispatch(login({ email: e.email, password: e.password }));
  };

  return (
    <View style={styles.container}>
      <Image source={images.toyota} style={styles.image} />
      <Text style={styles.heading}>Welcome Back!</Text>

      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setFormData(values);
          handleSubmit(values);
        }}
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
              <Text style={styles.formLabel}>Email</Text>
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
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                style={styles.formInput}
                secureTextEntry={true}
                placeholder="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {errors.password && touched.password ? (
                <Text style={styles.textError}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <NewButton onPress={handleSubmit} name="Sign In" />
              <Text style={styles.noteText}>
                Don't have account?{" "}
                <Link style={styles.linkText} href="./Register">
                  Sign Up for free
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
