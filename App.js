import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, ActivityIndicator } from "react-native";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import axios from "axios";
import Cotizaciones from "./components/Cotizaciones";

export default function App() {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);

        //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
        setCargando(true);

        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI]);

  const componente = cargando ? (
    //centrar la cargar
    <ActivityIndicator size='large' color='#5E49E2' style={{ marginTop: 50 }} />
  ) : (
    <Cotizaciones resultado={resultado} />
  );

  return (
    <>
      <Header />
      <Image
        style={styles.image}
        source={require("./assets/img/cryptomonedas.png")}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarAPI={setConsultarAPI}
        />

        {componente}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
});
