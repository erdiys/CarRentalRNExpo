import { View, Text, StyleSheet, Pressable } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function index() {
  const [orderId, setOrderId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [payment, setPayment] = useState({
    name: null,
    method: null,
    number: null,
    user: null
  });
  const stepName = [
    "Pembayaran",
    `${payment.method}\nOrder ID: ${orderId}`,
    `Tiket\nOrder ID: ${orderId}`
  ];

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
            orderId={orderId}
            setOrderId={setOrderId}
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
            payment={payment}
            setPayment={setPayment}
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
