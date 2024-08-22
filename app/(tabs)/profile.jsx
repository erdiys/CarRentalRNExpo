import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import images from "../../assets/images";
import { Container, Col } from "../../components/Grid";
import NewButton from "@/components/Button";
import { router } from "expo-router";

export default function profile() {
  return (
    <View>
      <Container style={styles.container}>
        <Col style={styles.column}>
          <View style={styles.image}>
            <Image source={images.park} />
          </View>
          <Text style={styles.textNA}>
            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
            TMMIN Car Rental lebih mudah
          </Text>
          <View style={styles.buttonContainer}>
            <NewButton
              name="Register"
              onPress={() => router.navigate("../(auth)/Register")}
            />
          </View>
        </Col>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  column: {
    justifyContent: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center"
  },
  textNA: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 30,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '50%',
  },
});
