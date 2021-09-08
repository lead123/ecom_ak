import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { NextWeek } from "@material-ui/icons";

const AddressForm = ({ checkOutToken ,nextPage}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState();
  const methods = useForm();


  // Countries
  const fetchShippingCountries = async (checkOutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkOutTokenId
    );
    setShippingCountries(countries);
  };

  const countries = Object.entries(shippingCountries).map(([code, item]) => ({
    id: code,
    label: item,
  }));

  // Subdivisions
  const fetchshippingSubdivisions = async (countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
  
  };

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, item]) => ({
      id: code,
      label: item,
    })
  );

// Options
const fetchShippingOptions = async(checkOutTokenId,country , region=null)=>{
  const options = await commerce.checkout.getShippingOptions(checkOutTokenId, {country , region})
  setShippingOptions(options)
  console.log(options)
}

const options = shippingOptions.map((item)=>({id:item.id,label:`${item.description} - ${item.price.formatted_with_symbol}`}))
console.log(options)
  useEffect(() => {
    fetchShippingCountries(checkOutToken.id);
  }, []);

  // every time the country changes it goes if and call Fetchshipsubdivs
 useEffect(()=>{
    if (shippingCountry) fetchshippingSubdivisions(shippingCountry)
  },[shippingCountry])

 useEffect(()=>{
    if (shippingSubdivision) fetchShippingOptions(checkOutToken.id,shippingCountry,shippingSubdivision)
  },[shippingSubdivision])


// console.log(shippingCountry)
// console.log(shippingSubdivisions);

  return ( 
    <>
      <Typography variant="h6" gutterbottom>
        Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=> nextPage({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shiping Country</InputLabel>
              <Select
              required
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>State</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} >
                    <InputLabel>Option</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={e=>setShippingOption(e.target.value)}>
                    {options.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
                    </Select>
            </Grid>
          </Grid>
          <div style={{display:'flex',justifyContent:'space-evenly',  alignItems: 'flex-end' ,margin:'10px'}}>
          
          <Button
               component={Link}
               to="/cart"
            // className={classes.emptyButton}
            size="large"
            type="button"
            variant="outlined"
            color="secondary"


          >
            Back To Cart
          </Button>
          <Button
       
           
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>

          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
