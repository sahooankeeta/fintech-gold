import React from "react";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import NumberFormat from "react-number-format";

import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { updateCartItem, removeCart } from "./../../../actions";

import { CardActions } from "@mui/material";
const CartItem = ({ product, cartTotal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.result._id);

  //INCREASE ITEM QUANTITY
  const increaseQuantity = () => {
    dispatch(updateCartItem(user, product.id, 1));
  };
  //DECREASE ITEM QUANTITY
  const decreaseQuantity = () => {
    dispatch(updateCartItem(user, product.id, -1));
  };
  //REMOVE ITEM FROM CART
  const deleteItem = (item) => {
    dispatch(removeCart(user, product.id));
  };
  return (
    <Card className={classes.card}>
      <div className={classes.cardAction}>
        <CardMedia
          className={classes.media}
          alt=""
          component="img"
          image={product.image}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom style={{ fontWeight: "600" }}>
            {product.category} {product.description}
            {product.gram}
            {product.karat}
          </Typography>

          <Typography style={{ fontWeight: "600" }}>
            Rs .
            <NumberFormat
              value={product.price}
              displayType="text"
              thousandSeparator={true}
            />
          </Typography>
        </CardContent>
      </div>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={classes.cartItemActions}>
          <Button
            variant="contained"
            style={{
              margin: "0 10px",
              backgroundColor: "#212529",
              color: "white",
            }}
            onClick={() => decreaseQuantity()}
          >
            -
          </Button>
          <div> {product.qty}</div>
          <Button
            variant="contained"
            style={{
              margin: "0 10px",
              backgroundColor: "#212529",
              color: "white",
            }}
            onClick={() => increaseQuantity()}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "#212529", color: "white" }}
          startIcon={<DeleteIcon />}
          onClick={() => deleteItem(product.id)}
        >
          del
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
