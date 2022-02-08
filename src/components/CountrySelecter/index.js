import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  NativeSelect,
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme)=>({
  FormControl:{
    margin: `${theme.spacing(3)}px 0`,
  }
}))


export default function CountrySelector({ value, handleOnChange, countries }) {

  const styles = useStyle();

  return (
    <FormControl className={styles.FormControl}>
      <InputLabel htmlFor="country-selector" shrink>
        Quốc gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{ name: "country", id: "country-selector" }}
      >
        {countries &&
          countries.map((item) => {
            return (
              <option value={item.ISO2.toLowerCase()} key={item.ISO2}>
                {item.Country}
              </option>
            );
          })}
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}
