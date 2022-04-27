import * as React from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import CartItem from "./CartItem/CartItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { emptyCart } from "./../../actions";
const Cart = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const products = useSelector((state) => state.cart.items);

  //CALCULATE BAG TOTAL

  const total = () => {
    let cartcount = 0;
    products.forEach((el) => (cartcount += el.price * el.qty));

    return cartcount;
  };
  const cartEmpty = () => {
    dispatch(emptyCart(profile.result._id));
  };

  return (
    <main container className={classes.content}>
      <Grid
        container
        alignItems="stretch"
        spacing={3}
        style={{ marginBottom: "20px" }}
      >
        {products.length > 0 ? (
          products.map((product, i) => (
            <Grid item key={product.id} xs={12} sm={12} md={6} lg={3}>
              <Paper elevation={3}>
                <CartItem
                  product={product}
                  cartTotal={total}
                  key={`cartItem-${i}`}
                />
              </Paper>
            </Grid>
          ))
        ) : (
          <h3 style={{ margin: "20px" }}>
            Your bag empty.Start shopping now :)
          </h3>
        )}
      </Grid>
      {products.length !== 0 && (
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <Typography variant="h3" style={{ textTransform: "capitalize" }}>
              bag total :
            </Typography>
            <Typography variant="h4">
              Rs .
              <NumberFormat
                value={total()}
                displayType="text"
                thousandSeparator={true}
              />
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={cartEmpty}
              style={{ backgroundColor: "#212529", color: "white" }}
            >
              empty cart
            </Button>
            <Button
              style={{
                marginLeft: "20px",
                backgroundColor: "#212529",
                color: "white",
              }}
              onClick={() => history.push("/checkout")}
              variant="contained"
            >
              checkout
            </Button>
          </div>
        </Grid>
      )}
    </main>
  );
};

export default Cart;
