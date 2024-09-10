import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "../../../components/Grid";
import Button from "../../../components/Button";
import CarList from "../../../components/CarList";
import { Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";
import ModalPopup from "@/components/Modal";
import * as ImagePicker from "expo-image-picker";

import { useSelector, useDispatch } from "react-redux";
import { selectCarDetails } from "@/redux/reducer/car/carDetailsSlice";
import { selectOrder, putOrder } from "../../../redux/reducer/order/orderSlice";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR"
});

const getDate24 = () => {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return date24;
};

export default function step2({
  setActiveStep,
  payment,
  setPayment,
  image,
  setImage,
  imageDimension,
  upload,
  modalVisible,
  setModalVisible,
  uploadable
}) {
  const orderData = useSelector(selectOrder);
  const [copy, setCopy] = useState(false);
  const [date, setDate] = useState(getDate24());
  const { data } = useSelector(selectCarDetails);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.5
    });

    if (result.assets[0].uri) {
      setImage({
        src: { uri: result.assets[0].uri },
        dimension: {
          width: result.assets[0].width,
          height: result.assets[0].height
        },
        objFormData: {
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].mimeType
        },
        size: result.assets[0].fileSize
      });
    }
  };

  const maxHeightRasio = () => {
    const windowWidth = Dimensions.get("window").width;
    const width = windowWidth - 40;
    const heightR = image.dimension.height / width;
    const widthR = image.dimension.width / width;
    const result = Math.round((width / widthR) * heightR);
    return result;
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text.toString());
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const dataGen = { ...data };
  if (!data.passengers) {
    if (data.category === "small") {
      dataGen.passengers = 4;
      dataGen.baggage = 2;
    } else if (data.category === "medium") {
      dataGen.passengers = 6;
      dataGen.baggage = 3;
    } else if (data.category === "large" || data.category === "big") {
      dataGen.passengers = 8;
      dataGen.baggage = 4;
    }
    if (data.name == "Innova") {
      dataGen.image =
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/4674690068575/6-Hours-INNOVA-REBORN-Car-Rental-Includes-Driver-32dfefb9-a283-44a5-a429-f7c7d62b4d44.png?tr=q-60,c-at_max,w-1280,h-720&_src=imagekit";
    }
  }

  return (
    <Container style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Row style={styles.boxCount}>
          <Text style={styles.textTitle}>Selesaikan pembayaran sebelum</Text>
          <CountDown
            until={86400}
            digitStyle={{ backgroundColor: "#FA2C5A" }}
            digitTxtStyle={{ color: "white", fontSize: 16 }}
            onFinish={() => {
              setPayment({ name: null });
              setActiveStep(0);
              alert("Your payment is expired");
            }}
            size={12}
            timeToShow={["H", "M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </Row>
        <Text style={styles.textTime}>{`${date}`}</Text>
        <CarList
          image={dataGen.image}
          carName={dataGen.name}
          passengers={dataGen.passengers}
          baggage={dataGen.baggage}
          price={dataGen.price}
          // onPress={() => {
          //   router.navigate(`/`);
          // }}
          style={{ width: "90%" }}
        />
        <Text style={styles.textTitle}>Lakukan transfer ke</Text>
        <View style={styles.bankRow}>
          <View style={{ ...styles.bankIcon, width: "25%" }}>
            <Text style={styles.textBank}>{payment.name}</Text>
          </View>
          <View style={{ width: "75%" }}>
            <Text style={styles.textBank}>{payment.method}</Text>
            <Text style={styles.textBank}>a.n {payment.user}</Text>
          </View>
        </View>

        <View>
          <View style={styles.boxBayar}>
            <Text style={styles.textBayar}>Nomor Rekening</Text>
            <Row style={styles.boxRek}>
              <Text style={styles.textRek}>{payment.number}</Text>
              <Pressable
                onPress={() => {
                  copyToClipboard(payment.number);
                  setCopy(true);
                }}
              >
                <Ionicons size={24} name="copy-outline" />
              </Pressable>
            </Row>
          </View>
          <View style={styles.boxBayar}>
            <Text style={styles.textBayar}>Total Bayar</Text>
            <Row style={styles.boxRek}>
              <Text style={styles.textRek}>
                {formatCurrency.format(orderData?.data.total_price)}
              </Text>
              <Pressable
                onPress={() => {
                  copyToClipboard(dataGen.price);
                  setCopy(true);
                }}
              >
                <Ionicons size={24} name="copy-outline" />
              </Pressable>
            </Row>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bayarContainer}>
        <Text style={styles.textConfirm}>
          {`Klik konfirmasi pembayaran untuk\nmempercepat proses pengecekan`}
        </Text>
        <Button
          disabled={payment.name === null ? true : false}
          onPress={() => {
            setModalVisible(true);
          }}
          name="Konfirmasi Pembayaran"
        />
        <Button
          disabled={false}
          onPress={() => {
            setActiveStep(2);
          }}
          name="Lihat Daftar Pesanan"
          invert={true}
        />
      </View>

      <ModalPopup visible={copy} style={{ backgroundColor: "rgba(0,0,0,.2)" }}>
        <View style={styles.boxCopy}>
          <Text style={styles.textCopy}>Copied to Clipboard!</Text>
        </View>
      </ModalPopup>

      <Modal visible={modalVisible} animationType="slide">
        <Container style={styles.modalContainer}>
          <ScrollView>
            <Col style={styles.childContainer}>
              <Text style={styles.textModal}>Konfirmasi Pembayaran</Text>
              <Text style={styles.textModal}>
                Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
                akan segera kami cek tunggu kurang lebih 10 menit untuk
                mendapatkan konfirmasi.
              </Text>
              <View style={styles.textModal}>
                <CountDown
                  until={600}
                  digitStyle={{ backgroundColor: "#FA2C5A" }}
                  digitTxtStyle={{ color: "white", fontSize: 16 }}
                  onFinish={() => {
                    setModalVisible(false);
                  }}
                  size={12}
                  timeToShow={["M", "S"]}
                  timeLabels={{ m: null, s: null }}
                  showSeparator
                />
              </View>
              <Text style={styles.textModal}>Upload Bukti Pembayaran</Text>
              <Text style={styles.textModal}>
                Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa
                upload bukti bayarmu
              </Text>
              <View
                style={
                  image !== null
                    ? {
                        maxHeight: maxHeightRasio(),
                        ...styles.pict,
                        ...imageDimension
                      }
                    : styles.pict
                }
              >
                {image !== null ? (
                  <Image source={image.src} style={styles.uploadImage} />
                ) : (
                  <Pressable
                    onPress={pickImage}
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Ionicons name="image-outline" size={30} />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    ...styles.closeImage,
                    display: image !== null ? "flex" : "none"
                  }}
                  onPress={() => setImage(null)}
                >
                  <Ionicons size={40} name="close-circle" color="red" />
                </Pressable>
              </View>
            </Col>
          </ScrollView>
          <View style={styles.bayarContainer}>
            <Button
              name="Upload"
              onPress={() => {
                upload();
              }}
              disabled={uploadable}
            />
            <Button
              name="Lihat Daftar Pesanan"
              invert={true}
              onPress={() => {
                setActiveStep(2);
                setModalVisible(false);
              }}
            />
          </View>
        </Container>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: "center"
  },
  modalContainer: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  childContainer: {
    justifyContent: "flex-start",
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
  textConfirm: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    paddingLeft: 5,
    textAlign: "center"
  },
  bankRow: {
    alignItems: "center",
    paddingVertical: 10,
    flexDirection: "row"
  },
  bankIcon: {
    borderWidth: 0.5,
    borderRadius: 4,
    padding: 10,
    width: 80,
    margin: 2,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  textBank: {
    fontFamily: "Poppins",
    fontSize: 12
  },
  textTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 14
  },
  textTime: {
    fontFamily: "PoppinsBold",
    fontSize: 16
  },
  textBayar: {
    fontFamily: "Poppins",
    fontSize: 12
  },
  boxBayar: {
    marginVertical: 10,
    gap: 5
  },
  textRek: {
    fontFamily: "PoppinsBold",
    fontSize: 14
  },
  boxRek: {
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  textModal: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10
  },
  boxCount: {
    alignItems: "center",
    gap: 5
  },
  boxCopy: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 20
  },
  textCopy: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  pict: {
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
  },
  closeImage: {
    borderRadius: 100,
    backgroundColor: "white",
    position: "absolute",
    top: 10,
    right: 10
  }
});
