import React from "react";
import Review from "./Review";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import NumberFormat from "react-number-format";
import { addOrder } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Divider } from "@mui/material";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);
const PaymentForm = ({
  shippingData,
  backStep,
  onCaptureCheckout,
  nextStep,
}) => {
  const cart = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) console.log(error);
    else {
      let date = new Date();
      const orderData = {
        items: cart,
        userId: profile.result._id,
        date: date.toDateString(),
        customer: {
          firstname: shippingData.firstname,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          address: shippingData.address1,
          city: shippingData.city,
          zip: shippingData.zip,
        },

        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      console.log(orderData);
      dispatch(addOrder(orderData));

      onCaptureCheckout(orderData);
      nextStep();
    }
  };
  return (
    <div>
      <Review />
      <Divider />
      <Typography>payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  back
                </Button>
                <Button type="submit" variant="contained" disabled={!stripe}>
                  pay Rs.
                  <NumberFormat
                    displayType="text"
                    value={cart.total}
                    thousandSeparator={true}
                  />
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
