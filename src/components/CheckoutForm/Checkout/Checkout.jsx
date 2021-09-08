import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./Styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

const Checkout = ({ cart, order, onCaptureCheckOut, err }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkOutToken, setCheckOutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const step = ["Shipping Address", "Billing Address"];

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckOutToken(token);
        // console.log("tokens", token);
      } catch (err) {}
    };
    generateToken();
  }, []);
  console.log("Checkout", checkOutToken);
  const Confirmation = () => <div>Confirmation</div>;
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const nextPage = (data) => {
    setShippingData(data);
    nextStep();
    console.log(shippingData);
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkOutToken={checkOutToken} nextPage={nextPage} />
    ) : (
      <PaymentForm
        checkOutToken={checkOutToken}
        nextStep={nextStep}
        onCaptureCheckOut={onCaptureCheckOut}
        prevStep={prevStep}
        shippingData={shippingData}
      />
    );

  // Render JSX => useEffect

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {step.map((item) => (
              <Step key={item}>
                <StepLabel>{item}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === step.length ? (
            <Confirmation />
          ) : (
            checkOutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
