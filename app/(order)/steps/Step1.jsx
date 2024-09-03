import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView
} from "react-native";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCarDetails } from "@/redux/reducer/car/carDetailsSlice";
import { Ionicons } from "@expo/vector-icons";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Col, Container, Row } from "../../../components/Grid";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR"
});

const paymentMethod = [
  "BCA",
  "BNI",
  "Mandiri",
  "BSI",
  "BTN",
  "Permata",
  "OVO",
  "DANA",
  "Shoppe",
  "Flip"
];

export default function step1({ setActiveStep, payment, setPayment }) {
  const { data } = useSelector(selectCarDetails);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  const dataGen = { ...data };
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
    <Container style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <CarList
          image={dataGen.image}
          carName={dataGen.name}
          passengers={dataGen.passengers}
          baggage={dataGen.baggage}
          price={dataGen.price}
          onPress={() => {
            router.navigate(`/`);
          }}
          style={{ width: "90%" }}
        />

        <Col style={styles.bankContainer}>
          <Text style={styles.textDesc}>Pilih Bank Transfer</Text>
          <Text style={styles.textDesc}>
            Kamu bisa membayar dengan transfer melalui ATM, Internet Banking
            atau Mobile Banking
          </Text>
          {paymentMethod.map((e, idx) => {
            return (
              <Pressable
                key={idx}
                style={styles.bankRow}
                onPress={() => (payment === e ? setPayment("") : setPayment(e))}
              >
                <View style={{ ...styles.bankIcon, width: "25%" }}>
                  <Text style={styles.textBank}>{e}</Text>
                </View>
                <View style={{ width: "45%" }}>
                  <Text style={styles.textBank}>{e} Transfer</Text>
                </View>
                <View style={{ width: "20%", alignItems: "flex-end" }}>
                  <Ionicons
                    size={30}
                    name="checkmark"
                    style={{ display: payment === e ? "flex" : "none" }}
                    color="#5CB85F"
                  />
                </View>
              </Pressable>
            );
          })}
        </Col>
        <View style={styles.promoContainer}>
          <Text style={styles.textPromo}>% Pakai Kode Promo</Text>
          <Row style={styles.boxPromo}>
            <TextInput
              placeholder="Tulis promomu disini"
              style={styles.inputPromo}
            />
            <Button
              name={"Terapkan"}
              style={{ borderRadius: 0, width: "30%" }}
              disabled={true}
            />
          </Row>
        </View>
      </ScrollView>
      <View style={styles.bayarContainer}>
        <Text style={styles.textPrice}>{formatIDR(data.price || 0)}</Text>
        <Button
          disabled={payment === "" ? true : false}
          onPress={() => {
            setActiveStep(1);
          }}
          name="Bayar"
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  boxPromo: {
    justifyContent: "center",
    alignItems: "center"
  },
  btnPromo: {},
  inputPromo: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    paddingLeft: 10
  },
  textPromo: {
    fontFamily: "PoppinsBold",
    fontSize: 16
  },
  promoContainer: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#D0D0D0",
    width: "100%"
  },
  container: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 15,
    alignItems: "center",
    alignItems: "center",
    height: "100%"
  },
  rowContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5
  },
  bayarContainer: {
    marginTop: 10,
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0
  },
  textPrice: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    paddingLeft: 5
  },
  bankContainer: {
    gap: 10,
    paddingBottom: 10
  },
  bankRow: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    paddingBottom: 10,
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
  textDesc: {
    fontFamily: "PoppinsBold",
    fontSize: 14
  },
  textBank: {
    fontFamily: "Poppins",
    fontSize: 12
  }
});
