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
  deleteOrder,
  resetState
} from "../../../redux/reducer/order/orderSlice";

export default function step3({ setActiveStep, imageDimension, user }) {
  const { data } = useSelector(selectOrder);
  const dispatch = useDispatch();

  const maxHeightRasio = () => {
    const windowWidth = Dimensions.get("window").width;
    const width = windowWidth - 40;
    const heightR = imageDimension.height / width;
    const widthR = imageDimension.width / width;
    const result = Math.round((width / widthR) * heightR);
    return result;
  };

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
            <View
              style={
                data.slip
                  ? {
                      maxHeight: maxHeightRasio(),
                      ...styles.pdf,
                      ...imageDimension
                    }
                  : styles.pdf
              }
            >
              {data.slip ? (
                <>
                  <Image
                    source={{ uri: data.slip }}
                    style={styles.uploadImage}
                    onError={(e) => console.log("displaying slip error", e)}
                  />
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
            dispatch(
              deleteOrder({ id: data.id, token: user.data.access_token })
            );
            dispatch(resetState());
            setActiveStep(0);
          }}
        />
        <Button
          name="Lihat Daftar Pesanan"
          invert={true}
          onPress={() => {
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
    alignItems: "center"
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
