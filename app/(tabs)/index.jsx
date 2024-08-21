import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import images from "../../assets/images";
import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import NewButton from "@/components/Button";
import Constants from "expo-constants";
import Menu from "../../components/menu";

export default function HomeScreen() {
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
          <NewButton name="Sewa Mobil" link="../(auth)" />
        </View>
        <Image source={images.zenix} style={styles.imgBanner} />
      </View>

      <View style={styles.menu}>
        <View>
          <Menu icon={images.icoTruck} link="./explore" />
          <Text style={styles.textMenu}>Sewa Mobil</Text>
        </View>

        <View>
          <Menu icon={images.icoBox} link="./explore" />
          <Text style={styles.textMenu}>Oleh-Oleh</Text>
        </View>

        <View>
          <View></View>
          <Text style={styles.textMenu}>Penginapan</Text>
        </View>

        <View>
          <View></View>
          <Text style={styles.textMenu}>Wisata</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
    // justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.common.secondary,
    marginTop: -110,
    padding: 15,
    borderRadius: 10,
    overflow: "hidden"
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
    flexDirection: "row",
    justifyContent: "space-around"
  },
  textMenu: {
    fontFamily: "PoppinsBold",
    fontSize: 12
  }
});
