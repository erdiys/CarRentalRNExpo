import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import CarList from "@/components/CarList";
import { Container } from "@/components/Grid";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { getCar, selectCar } from "@/redux/reducer/car/carSlice";

export default function List() {
  const { data, isLoading } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
      const signal = controller.signal; // UseEffect cleanup

      dispatch(getCar(signal));

      return () => {
        // cancel request sebelum component di close
        controller.abort();
      };
    },
    [] // untuk watch diisi, memonitor perubahan value dari state
  );

  const renderItem = useCallback(({ item }) => {
    const val = {};
    if (item.category === "small") {
      val.passengers = 4;
      val.baggage = 2;
    } else if (item.category === "medium") {
      val.passengers = 6;
      val.baggage = 3;
    } else if (item.category === "large" || item.category === "big") {
      val.passengers = 8;
      val.baggage = 4;
    }
    if (item.name == "Innova") {
      val.image =
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/4674690068575/6-Hours-INNOVA-REBORN-Car-Rental-Includes-Driver-32dfefb9-a283-44a5-a429-f7c7d62b4d44.png?tr=q-60,c-at_max,w-1280,h-720&_src=imagekit";
    }

    return (
      <CarList
        image={item.image ? item.image : val.image}
        carName={item.name}
        passengers={val.passengers}
        baggage={val.baggage}
        price={item.price}
        onPress={() =>
          router.navigate(`(carlist)/details/${item.id}`)
        }
      />
    );
  })

  return (
    <View>
      <Container style={styles.container}>
        <Text style={styles.textList}>Daftar Mobil</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
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
    paddingVertical: 15
  },
  textList: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10
  },
  listContainer: {
    paddingBottom: 80
  }
});
