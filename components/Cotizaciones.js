import React from "react";

//react native
import { StyleSheet, View, Text } from "react-native";

const Cotizaciones = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = resultado;

  return (
    <View style={styles.contenido}>
      <Text style={styles.label}>
        <Text style={styles.precio}>{PRICE}</Text>
      </Text>
      <Text style={styles.label}>
        Precio más alto del día:{""} <Text style={styles.texto}>{HIGHDAY}</Text>
      </Text>
      <Text style={styles.label}>
        Precio más bajo del día:{""} <Text style={styles.texto}>{LOWDAY}</Text>
      </Text>
      <Text style={styles.label}>
        Variación últimas 24 horas:{" "}
        <Text style={styles.texto}>{CHANGEPCT24HOUR}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    marginHorizontal: "2.5%",
    backgroundColor: "#FFF",
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  texto: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  precio: {
    fontSize: 38,
  },
});

export default Cotizaciones;
