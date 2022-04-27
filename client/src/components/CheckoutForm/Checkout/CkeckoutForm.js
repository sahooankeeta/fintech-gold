import React, { useState} from "react";
import {
  
  Stepper,
  Step,
  StepLabel,
  Typography,
  
} from "@mui/material";
import AdressForm from "./../AddressForm";
import PaymentForm from "./../PaymentForm";
import { emptyCart } from "../../../actions";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
const CheckoutForm = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const steps = ["Shipping address", "Payment Details"];
  // const [checkoutToken, setCheckoutToken] = useState("1254");
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState({});
  const nextStep = () => setActiveStep((prev) => prev + 1);
  const backStep = () => setActiveStep((prev) => prev - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  const Confirmation = () => {
    return (
      <div style={{ margin: "20px" }}>Thank you for placing your order :)</div>
    );
  };
  const handleCaptureCheckout = (newOrder) => {
    // console.log(newOrder);
    setOrder(newOrder);
    dispatch(emptyCart(newOrder.userId));
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <main
        className={classes.layout}
        style={{ width: "70%", margin: "0 auto" }}
      >
        <div style={{ padding: "15px 10px" }}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {activeStep === steps.length ? (
          <Confirmation />
        ) : activeStep === 0 ? (
          //  <AdressForm checkoutToken={`1252`} next={next} />
          <AdressForm next={next} />
        ) : (
          <PaymentForm
            backStep={backStep}
            shippingData={shippingData}
            onCaptureCheckout={handleCaptureCheckout}
            nextStep={nextStep}
          />
        )}
      </main>
    </div>
  );
};
export default CheckoutForm;
