import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

function MyComponent() {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d43fe624e6475cf504488fcfaa323dab7ef05c526e440a570f90f53a2539a479?",
          }}
          style={styles.image1}
        />
        <View style={styles.view3}>
          <Text>Minha carteira</Text>
        </View>
      </View>
      <View style={styles.view4}>
        <View style={styles.view5}>
          <View style={styles.view6}>
            <Text>
              Sua situação financeira está:
              <br />
              <br />
              <span style="font-weight: 700; color: rgba(255,255,255,1);">
                Muito boa!
              </span>
            </Text>
          </View>
          <View style={styles.view7}>
            <Text>|</Text>
          </View>
        </View>
        <View style={styles.view8}>
          <Text>Comprometimento de renda</Text>
        </View>
      </View>
      <View style={styles.view9}>
        <View style={styles.view10}>
          <Text>
            Saldo disponível
            <br />
            <span style="font-size: 6px;">.</span>
            <br />
            <span style="font-weight: 700; font-size: 12px; color: rgba(255,255,255,1);">
              R$ ***********
            </span>
          </Text>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/324019be5e8224c447e1e5af381595da667fa636235341bfafb45bc78aed496f?",
          }}
          style={styles.image2}
        />
      </View>
      <View style={styles.view11}>
        <Text>
          Gastos totais
          <br />
          <span style="font-size: 6px;">.</span>
          <br />
          <span style="font-weight: 700; font-size: 12px; color: rgba(255,255,255,1);">
            R$ ***********
          </span>
        </Text>
      </View>
      <View style={styles.view12}>
        <Text>
          Dívidas para o próximo mês
          <br />
          <span style="font-size: 6px;">.</span>
          <br />
          <span style="font-weight: 700; font-size: 12px; color: rgba(255,255,255,1);">
            R$ ***********
          </span>
        </Text>
      </View>
      <Image
        resizeMode="auto"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1798187da449264a8b67b39b65b2aa53e01698bab87627d73acaa0060a9e809b?",
        }}
        style={styles.image3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    backgroundColor: "#1D212B",
    display: "flex",
    maxWidth: 390,
    paddingBottom: 80,
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "400",
  },
  view2: {
    backgroundColor: "#0D0E17",
    alignSelf: "stretch",
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    fontSize: 18,
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    padding: "2px 20px 2px 0",
  },
  image1: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view3: {
    fontFamily: "Sahitya, sans-serif",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "auto",
    margin: "auto 0",
  },
  view4: {
    borderRadius: 10,
    backgroundColor: "#151212",
    display: "flex",
    marginTop: 26,
    width: "100%",
    maxWidth: 320,
    alignItems: "stretch",
    gap: 20,
    justifyContent: "space-between",
    padding: "9px 12px 19px",
  },
  view5: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    color: "#FFF",
  },
  view6: { font: "10px Roboto, sans-serif " },
  view7: {
    alignSelf: "end",
    margin: "32px 31px 0 0",
    font: "20px Roboto, sans-serif ",
  },
  view8: {
    color: "rgba(255, 255, 255, 0.60)",
    alignSelf: "end",
    marginTop: 77,
    font: "6px Roboto, sans-serif ",
  },
  view9: {
    borderRadius: 10,
    backgroundColor: "#151212",
    display: "flex",
    marginTop: 15,
    width: "100%",
    maxWidth: 320,
    alignItems: "stretch",
    gap: 20,
    fontSize: 10,
    color: "#FFF",
    justifyContent: "space-between",
    padding: "10px 13px",
  },
  view10: {
    fontFamily: "Roboto, sans-serif",
  },
  image2: {
    strokeWidth: 2,
    stroke: "#FFF",
    borderColor: "rgba(255, 255, 255, 1)",
    borderStyle: "solid",
    borderWidth: 2,
    position: "relative",
    width: 22,
    flexShrink: 0,
    margin: "auto 0",
    aspectRatio: "1.22",
  },
  view11: {
    borderRadius: 10,
    backgroundColor: "#151212",
    marginTop: 14,
    width: 320,
    maxWidth: "100%",
    alignItems: "start",
    color: "#FFF",
    justifyContent: "center",
    padding: "10px 12px",
    font: "10px Roboto, sans-serif ",
  },
  view12: {
    width: 320,
    borderRadius: 10,
    backgroundColor: "#151212",
    marginTop: 15,
    maxWidth: "100%",
    alignItems: "start",
    color: "#FFF",
    justifyContent: "center",
    padding: "10px 12px",
    font: "10px Roboto, sans-serif ",
  },
  image3: {
    borderRadius: 10,
    position: "relative",
    marginTop: 11,
    width: "100%",
    maxWidth: 320,
    aspectRatio: "1.06",
  },
});


