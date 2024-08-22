import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import images from "../../assets/images";
import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import NewButton from "@/components/Button";
import Menu from "@/components/Menu";
import { router } from "expo-router";
import { Row, Col } from "@/components/Grid";
import CarList from "../../components/CarList";

export default function HomeScreen() {
  const [cars, setCars] = useState([]);
  const carNameList = [
    {
      name: "Innova Zenix",
      passengers: 8,
      baggage: 4,
      price: 500000,
      image: "https://cdn-icons-png.flaticon.com/512/4662/4662005.png"
    },
    {
      name: "All New Avanza",
      passengers: 6,
      baggage: 3,
      price: 350000,
      image: "https://cdn-icons-png.flaticon.com/512/214/214280.png"
    },
    {
      name: "Yaris Cross",
      passengers: 4,
      baggage: 2,
      price: 400000,
      image: "https://cdn-icons-png.flaticon.com/512/5031/5031317.png"
    },
    {
      name: "Raize",
      passengers: 4,
      baggage: 2,
      price: 300000,
      image: "https://cdn-icons-png.flaticon.com/512/1819/1819526.png"
    }
  ];

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/car"
      );
      const body = await response.json();
      setCars(body);
    };
    getData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.common.primary,
        dark: Colors.common.primary
      }}
      headerImage={
        <View>
          <View style={styles.container}>
            <View>
              <Text style={styles.textName}>Hi, Name</Text>
              <Text style={styles.textLoc}>Your Location</Text>
            </View>
            <View>
              <Image source={images.avatar} style={styles.avatar} />
            </View>
          </View>
        </View>
      }
    >
      <View style={styles.banner}>
        <View style={styles.textBanner}>
          <Text style={styles.textTitle}>
            Sewa Mobil Berkualitas di kawasanmu
          </Text>
          <NewButton
            name="Sewa Mobil"
            onPress={() => router.navigate("../(auth)")}
          />
        </View>
        <Image source={images.zenix} style={styles.imgBanner} />
      </View>

      <View>
        <Row style={styles.menu}>
          <Col style={styles.menuButton}>
            <Menu
              icon="car-outline"
              style={styles.menuIcon}
              onPress={() => router.navigate("./car_list")}
            />
            <Text style={styles.textMenu}>Sewa Mobil</Text>
          </Col>

          <Col style={styles.menuButton}>
            <Menu
              icon="cube-outline"
              style={styles.menuIcon}
              onPress={() => router.navigate("./oleh_oleh")}
            />
            <Text style={styles.textMenu}>Oleh-Oleh</Text>
          </Col>

          <Col style={styles.menuButton}>
            <Menu
              icon="key-outline"
              color={"white"}
              onPress={() => router.navigate("./penginapan")}
            />
            <Text style={styles.textMenu}>Penginapan</Text>
          </Col>

          <Col style={styles.menuButton}>
            <Menu
              icon="camera-outline"
              color={"white"}
              onPress={() => router.navigate("./wisata")}
            />
            <Text style={styles.textMenu}>Wisata</Text>
          </Col>
        </Row>
      </View>

      <View>
        <Text style={styles.textList}>Daftar Mobil Pilihan</Text>
        {carNameList.length !== 0 &&
          carNameList.map((val, idx) => {
            if (val.category === "small") {
              val.passengers = 4;
              val.baggage = 2;
            } else if (val.category === "medium") {
              val.passengers = 6;
              val.baggage = 3;
            } else if (val.category === "large") {
              val.passengers = 8;
              val.baggage = 4;
            }
            if (val.name == "Innova") {
              val.image =
                "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/4674690068575/6-Hours-INNOVA-REBORN-Car-Rental-Includes-Driver-32dfefb9-a283-44a5-a429-f7c7d62b4d44.png?tr=q-60,c-at_max,w-1280,h-720&_src=imagekit";
            }

            return (
              <CarList
                key={idx}
                image={val.image}
                carName={val.name}
                passengers={val.passengers}
                baggage={val.baggage}
                price={val.price}
              />
            );
          })}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    color: "white"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15
  },
  avatar: {
    height: 32,
    width: 32
  },
  textName: {
    fontFamily: "PoppinsBold",
    fontSize: 12,
    color: "white"
  },
  textLoc: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    color: "white"
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.common.secondary,
    marginTop: -110,
    padding: 15,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "black",
    // android
    elevation: 10,
    // ios
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 1.5
  },
  textBanner: {
    width: "40%"
  },
  textTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "white"
  },
  imgBanner: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
  menu: {
    justifyContent: "space-between"
  },
  menuButton: {
    justifyContent: "center",
    alignItems: "center"
  },
  textMenu: {
    fontFamily: "PoppinsBold",
    fontSize: 12
  },
  textList: {
    fontFamily: "PoppinsBold",
    fontSize: 14
  }
});
