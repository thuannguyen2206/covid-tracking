import { useEffect, useState } from "react";
import CountrySelector from "./components/CountrySelecter";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import { getCountries, getReportByCountry } from "./apis";
import { sortBy } from "lodash";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";
import "moment/locale/vi";
import "@fontsource/roboto";

moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      if (res.status === 200) {
        const countries = sortBy(res.data, "Country");
        setCountries(countries);

        // đặt mặc định là việt nam
        setSelectedCountryId("vn");
      }
    });
  }, []);

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );
      getReportByCountry(Slug).then((res) => {
        if (res.status === 200) {
          setReport(res.data);
        }
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{marginTop: 20}}>
      <Typography variant="h2" component="h2">Số liệu COVID-19</Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} countryId={selectedCountryId} />
    </Container>
  );
}

export default App;
