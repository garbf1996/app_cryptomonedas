import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";

import axios from "axios";

const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarAPI,
}) => {
  //state del listado de criptomonedas
  const [criptomonedas, setCriptomonedas] = useState([]);

  //octener la moneda
  const getMoneda = (moneda) => {
    setMoneda(moneda);
  };

  //octener la criptomoneda
  const getCriptomoneda = (criptomoneda) => {
    setCriptomoneda(criptomoneda);
  };
  //verificar que el usuario llene ambos campos
  const cotizarPrecio = () => {
    if (moneda.trim() === "" || criptomoneda.trim() === "") {
      mostarAlerta();
      return;
    }
    setConsultarAPI(true);
  };

  //muestra una alerta si falla la validacion
  const mostarAlerta = () => {
    Alert.alert("Error...", "Ambos campos son obligatorios", [{ text: "OK" }]);
  };

  //llamado a la api
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD";
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  return (
    <View style={styles.contenido}>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => getMoneda(moneda)}
      >
        <Picker.Item label='- Seleccione -' value='' />
        <Picker.Item label='Dolar de Estados Unidos' value='USD' />
        <Picker.Item label='Peso Mexicano' value='MXN' />
        <Picker.Item label='Euro' value='EUR' />
        <Picker.Item label='Libra Esterlina' value='GBP' />
        <Picker.Item label='Peso Dominicano' value='DOP' />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={(criptomoneda) => getCriptomoneda(criptomoneda)}
      >
        <Picker.Item label='- Seleccione -' value='' />
        {criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
  btnCotizar: {
    backgroundColor: "#5E49E2",
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: "#FFF",
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Formulario;
