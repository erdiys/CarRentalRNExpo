import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Col, Row } from "./Grid";
import { Ionicons } from "@expo/vector-icons";

const formatCurrency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
})

export default function CarList({
  image,
  carName,
  passengers,
  baggage,
  price
}) {
  return (
    <View style={styles.container}>
      <Row style={styles.rowContainer}>
        <Col>
          <Image source={{uri: image}} style={styles.image} />
        </Col>
        <Col>
          <Text style={styles.textName}>{carName}</Text>
          <Row>
            <Row style={styles.rowDetail}>
              <Ionicons size={14} name="people-outline" color="#8A8A8A" />
              <Text style={styles.textDetail}>{passengers}</Text>
            </Row>
            <Row style={styles.rowDetail}>
              <Ionicons size={14} name="bag-handle-outline" color="#8A8A8A" />
              <Text style={styles.textDetail}>{baggage}</Text>
            </Row>
          </Row>
          <Text style={styles.textPrice}>{formatCurrency.format(price)}</Text>
        </Col>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: .5,
    borderRadius: 8,
    borderColor: "#8A8A8A",
    backgroundColor: "white",
    overflow: "hidden",
    marginVertical: 10,
    padding: 12,
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
  rowContainer: {
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 45,
    height: 45,
    marginHorizontal: 20,
    objectFit: 'contain',
  },
  textName: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "black"
  },
  rowDetail: {
    alignItems: "stretch"
  },
  textDetail: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#8A8A8A",
    marginLeft: 4,
    marginRight: 15
  },
  textPrice: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#5CB85F"
  }
});
