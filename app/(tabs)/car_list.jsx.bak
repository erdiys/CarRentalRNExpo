import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import CarList from "@/components/CarList";
import { Container } from "@/components/Grid";

export default function List() {
  const [cars, setCars] = useState([]);

  useEffect(
    () => {
      const getData = async () => {
        const response = await fetch(
          "https://api-car-rental.binaracademy.org/customer/car"
        );
        const body = await response.json();
        setCars(body);
      };
      getData();
    },
    [] // untuk watch diisi, memonitor perubahan value dari state
  );

  return (
    <View>
      <Container style={styles.container}>
        <Text style={styles.textList}>Daftar Mobil</Text>
        <View>
          <FlatList
            data={cars}
            renderItem={(el) => {
              const val = el.item;
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
                  image={val.image}
                  carName={val.name}
                  passengers={val.passengers}
                  baggage={val.baggage}
                  price={val.price}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 15,
  },
  textList: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginVertical: 10
  }
});
