import { View, Text, StyleSheet, Pressable } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useSelector, useDispatch } from "react-redux";
import {
  selectOrder,
  deleteOrder,
  resetState,
  setStateByName,
  postOrder,
  putOrder,
  setCarId
} from "../../redux/reducer/order/orderSlice";
import { selectCarDetails } from "../../redux/reducer/car/carDetailsSlice";
import { selectLogin } from "../../redux/reducer/auth/authLoginSlice";

export default function index() {
  const user = useSelector(selectLogin);
  const car = useSelector(selectCarDetails);
  const { activeStep, status, errorMessage, data, imageDimension } =
    useSelector(selectOrder);
  const [uploadButton, setUploadButton] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [activeStep, setActiveStep] = useState(0);
  const [payment, setPayment] = useState({
    name: null,
    method: null,
    number: null,
    user: null
  });
  const dispatch = useDispatch();

  const getDate = () => {
    const date = new Date();
    const dateFinish = new Date(date.getTime() + 24 * 3600000);

    return {
      start: date.toISOString(),
      finish: dateFinish.toISOString()
    };
  };

  const setActiveStep = (val) => {
    dispatch(setStateByName({ name: "activeStep", value: val }));
  };

  const setImageDimension = (dim) => {
    dispatch(setStateByName({ name: "imageDimension", value: dim }));
  };

  const handleBayar = () => {
    const date = getDate();
    dispatch(
      postOrder({
        token: user.data.access_token,
        formData: { start: date.start, finish: date.finish, id: car.data.id }
      })
    );
    dispatch(setCarId(car.data.id));
  };

  const handleUpload = () => {
    if (image !== null && data.id !== null) {
      const formData = new FormData();
      formData.append("slip", image.objFormData);
      setUploadButton(true);
      dispatch(
        putOrder({
          token: user.data.access_token,
          formData: formData,
          id: data.id
        })
      );
    } else {
      alert("Tolong upload bukti pembayaran");
    }
  };

  const stepName = [
    "Pembayaran",
    `${payment.method}\nOrder ID: ${data.id}`,
    `Tiket\nOrder ID: ${data.id}`
  ];

  useEffect(() => {
    if (status === "success") {
      setActiveStep(1);
    } else if (status === "upload-success") {
      if (data.slip !== null && data.id) {
        setTimeout(() => {
          setModalVisible(false);
          setActiveStep(2);
          setUploadButton(false);
        }, 2000);
      }
    } else if (status === "error") {
      console.log(errorMessage);
    }
  }, [status]);

  useEffect(() => {
    if (image !== null) {
      setImageDimension(image.dimension);
    }
  }, [image]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        style={styles.arrow}
        onPress={() =>
          activeStep === 0 ? router.back() : setActiveStep(activeStep - 1)
        }
      >
        <Ionicons size={30} name="arrow-back" />
        <Text style={styles.textBack}>{stepName[activeStep]}</Text>
      </Pressable>
      <ProgressSteps activeStep={activeStep}>
        <ProgressStep
          label="Pilih Metode"
          nextBtnStyle={{ display: "none" }}
          removeBtnRow={true}
          scrollable={false}
        >
          <Step1
            setActiveStep={setActiveStep}
            payment={payment}
            setPayment={setPayment}
            bayar={handleBayar}
          />
        </ProgressStep>
        <ProgressStep
          label="Bayar"
          nextBtnStyle={{ display: "none" }}
          removeBtnRow={true}
          scrollable={false}
        >
          <Step2
            setActiveStep={setActiveStep}
            payment={payment}
            setPayment={setPayment}
            image={image}
            setImage={setImage}
            imageDimension={imageDimension}
            upload={handleUpload}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            uploadable={uploadButton}
          />
        </ProgressStep>
        <ProgressStep
          label="Tiket"
          nextBtnStyle={{ display: "none" }}
          removeBtnRow={true}
          scrollable={false}
        >
          <Step3
            setActiveStep={setActiveStep}
            imageDimension={imageDimension}
            user={user}
          />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    // width: '100%',
    flexDirection: "row",
    gap: 10,
    paddingTop: 10,
    paddingLeft: 20,
    alignItems: "center"
  },
  textBack: {
    fontFamily: "PoppinsBold",
    fontSize: 14
  }
});
