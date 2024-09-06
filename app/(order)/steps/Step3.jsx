import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "../../../components/Grid";
import Button from "../../../components/Button";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import {
  selectOrder,
  deleteOrder
} from "../../../redux/reducer/order/orderSlice";

export default function step3({ setActiveStep, payment, setPayment }) {
  const orderData = useSelector(selectOrder);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderData.data.slip && order === null) {
      setOrder(orderData.data);
    }
  }, [order]);

  console.log(order);

  return (
    <Container style={styles.container}>
      <ScrollView>
        <Col style={styles.childContainer}>
          <View style={styles.boxBayar}>
            <Text style={styles.textBayar}>Invoice</Text>
            <Row style={styles.boxRek}>
              <Text style={styles.textRek}>INV/xx/xx-xxxx/</Text>
              <Ionicons size={24} name="download-outline" />
            </Row>
          </View>
          <View style={styles.boxBayar}>
            <Text style={styles.textBayar}>E-ticket</Text>
            <View style={styles.pdf}>
              {orderData.data.slip ? (
                <>
                  <Image
                    source={{ uri: orderData.data.slip }}
                    style={styles.uploadImage}
                  />
                  <Text>{orderData.data.slip}</Text>
                </>
              ) : (
                <Row style={{ alignItems: "center", gap: 20 }}>
                  <Ionicons name="image-outline" size={30} />
                  <Text>PDF Viewer</Text>
                </Row>
              )}
            </View>
            <Text style={styles.note}>
              Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
            </Text>
          </View>
        </Col>
      </ScrollView>
      <View style={styles.bayarContainer}>
        <Button
          name="Hapus Pesanan"
          invert={false}
          onPress={() => {
            dispatch(deleteOrder(orderData.data.id));
          }}
        />
        <Button
          name="Lihat Daftar Pesanan"
          invert={true}
          onPress={() => {
            setActiveStep(3);
            router.replace("../../(tabs)/profile");
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    alignItems: "center",
    height: "100%"
  },
  childContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  bayarContainer: {
    marginTop: 10,
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0
  },
  textBayar: {
    fontFamily: "Poppins",
    fontSize: 12
  },
  boxBayar: {
    marginVertical: 10,
    gap: 5,
    width: "100%"
  },
  boxRek: {
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  textRek: {
    fontFamily: "PoppinsBold",
    fontSize: 14
  },
  note: {
    fontFamily: "Poppins",
    fontSize: 10
  },
  pdf: {
    maxWidth: Dimensions.get("window").width - 40,
    height: 200,
    width: "100%",
    objectFit: "contain",
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
    borderStyle: "dashed",
    borderColor: "#D0D0D0",
    marginBottom: 10
  },
  uploadImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain"
  }
});
