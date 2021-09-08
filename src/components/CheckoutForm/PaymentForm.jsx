import React from "react";
import { Typography, Divider, Button } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkOutToken, prevStep,shippingData, onCaptureCheckOut ,nextStep}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const orderData = {
        line_items: checkOutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckOut(checkOutToken.id, orderData);

      nextStep();
    }
  };
  return (
    <>
      <Review checkOutToken={checkOutToken} />
      <Divider />
      <Typography style={{ margin: "20px 0" }} variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!stripe}
                >
                  Pay {checkOutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>

      {/* <Review checkOutToken={checkOutToken} />
<Divider />
<Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
<Elements stripe={stripePromise}>
  <ElementsConsumer>{({ elements, stripe }) => (
    <form onSubmit="{(e) => handleSubmit(e, elements, stripe)}">
      <CardElement />
      <br /> <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button type="submit" variant="contained" disabled={!stripe}>
          Pay {checkOutToken.live.subtotal.formatted_with_symbol}
        </Button>
      </div>
    </form>
  )}
  </ElementsConsumer>
</Elements> */}
    </>
  );
};

export default PaymentForm;
