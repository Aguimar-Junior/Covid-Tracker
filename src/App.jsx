import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import image from "./img/corona-transparente.png";
import { Cards, CountryPicker, Charts } from "./components";

import { fetchData } from "./api";

const App = () => {
  const [carregando, setCarregando] = useState(true)
  const [data, setData] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    const load = async () => {
      const data = await fetchData();
      setData(data);
      setCarregando(false)
    };
    load();
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
    
  };

  return (
    <div className={styles.container}>
      {carregando && <span>Carregando Informações...</span>}
      <img className={styles.image} src={image} alt="COVID-19" />
      
      {data && (
        <>
          <Cards dataCards={data} />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Charts data={data} country={country} />
        </>
      )}
    </div>
  );
};

export default App;
