import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Row, Col } from "@/components/Grid";
import { Ionicons } from "@expo/vector-icons";
import NewButton from "@/components/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarDetails,
  selectCarDetails
} from "../../../../redux/reducer/car/carDetailsSlice";

export default function details() {
  const { data, isLoading, errorMessage } = useSelector(selectCarDetails);
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const include = [
    "Apa saja yang termasuk dalam paket misal durasi max 12 jam",
    "Sudah termasuk bensin selama 12 jam",
    "Sudah termasuk Tiket Wisata",
    "Sudah termasuk pajak"
  ];
  const exclude = [
    "Tidak termasuk biaya makan sopir Rp 75.000/hari",
    "Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam",
    "Tidak termasuk akomodasi penginapan"
  ];

  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  });

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCarDetails({ payload: id, signal: signal }));

    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, [id]);

  const dataGen = {};
  if (data) {
    if (data.category === "small") {
      dataGen.passengers = 4;
      dataGen.baggage = 2;
    } else if (data.category === "medium") {
      dataGen.passengers = 6;
      dataGen.baggage = 3;
    } else if (data.category === "large") {
      dataGen.passengers = 8;
      dataGen.baggage = 4;
    }
    if (data.name == "Innova") {
      dataGen.image =
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/4674690068575/6-Hours-INNOVA-REBORN-Car-Rental-Includes-Driver-32dfefb9-a283-44a5-a429-f7c7d62b4d44.png?tr=q-60,c-at_max,w-1280,h-720&_src=imagekit";
    }
  }

  return (
    <View style={styles.container}>
      <Col style={styles.colContainer}>
        <Row style={styles.rowContainer}>
          <Text style={styles.textName}>{data.name}</Text>
        </Row>
        <Row style={styles.rowContainer}>
          <Row style={styles.rowDetail}>
            <Ionicons size={14} name="people-outline" color="black" />
            <Text style={styles.textDetail}>{dataGen.passengers}</Text>
          </Row>
          <Row style={styles.rowDetail}>
            <Ionicons size={14} name="bag-handle-outline" color="black" />
            <Text style={styles.textDetail}>{dataGen.baggage}</Text>
          </Row>
        </Row>
        <Row style={styles.rowContainer}>
          <Image
            source={{ uri: data.image !== null ? data.image : dataGen.image }}
            style={styles.image}
          />
        </Row>
      </Col>

      <ScrollView style={styles.descContainer}>
        <Text style={styles.textDestTitle}>Tentang Paket</Text>
        <Text style={styles.textDestTitle}>Include</Text>
        <Col>
          {include.map((val, idx) => (
            <Row key={idx} style={styles.rowDest}>
              <Ionicons size={8} name="ellipse" color={"#8A8A8A"} />
              <Text key={idx} style={styles.textDest}>
                {val}
              </Text>
            </Row>
          ))}
        </Col>
        <Text style={styles.textDestTitle}>Exclude</Text>
        <Col>
          {exclude.map((val, idx) => (
            <Row key={idx} style={styles.rowDest}>
              <Ionicons size={8} name="ellipse" color={"#8A8A8A"} />
              <Text style={styles.textDest}>{val}</Text>
            </Row>
          ))}
        </Col>
      </ScrollView>

      <View style={styles.bayarContainer}>
        <Text style={styles.textPrice}>
          {formatCurrency.format(data.price)}
        </Text>
        <NewButton
          name="Lanjutkan Pembayaran"
          onPress={() => router.navigate("../../../(order)")}
        />
      </View>

      <Pressable
        style={styles.arrow}
        onPress={() => router.replace("../../../(tabs)")}
      >
        <Ionicons size={30} name="arrow-back" />
      </Pressable>
    </View>
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
  rowContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20
  },
  colContainer: {
    alignItems: "center"
  },
  descContainer: {
    borderWidth: 0.5,
    borderColor: "#8A8A8A",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
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
  bayarContainer: {
    marginTop: 10,
    width: "100%"
  },
  image: {
    width: 190,
    height: 190,
    objectFit: "contain",
    marginVertical: 10
  },
  textName: {
    fontFamily: "Poppins",
    fontSize: 14
  },
  rowDetail: {
    alignItems: "stretch"
  },
  textDetail: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginLeft: 4
  },
  textPrice: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    paddingLeft: 5
  },
  textDestTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 14
  },
  textDest: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    color: "#8A8A8A",
    // paddingBottom: 5,
    textAlignVertical: "center"
  },
  rowDest: {
    alignItems: "center",
    paddingBottom: 5,
    paddingRight: 10,
    gap: 10
    // justifyContent: 'center',
  },
  arrow: {
    position: "absolute",
    top: 15,
    left: 20
  }
});
