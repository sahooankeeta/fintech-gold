import * as React from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import { deleteProduct } from "../../actions";
import { Button, CardActions } from "@mui/material";
const Product = ({ product, isAdmin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const viewProduct = () => history.push(`/view/${product._id}`);
  const editProduct = () => {
    history.push(`/form?id=${product._id}`);
  };
  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <Card className={classes.card}>
      <div onClick={viewProduct} className={classes.cardContent}>
        <img
          className={classes.media}
          alt=""
          component="img"
          src={product.image}
        />
        <CardContent className={classes.cardDetail}>
          <Typography gutterBottom style={{ fontWeight: "600" }}>
            {`gold ${product.category.slice(
              0,
              product.category.length - 1
            )} with
            ${product.description} of
            ${product.gram} gram 
            ${product.karat} karat`}
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
      {isAdmin && (
        <CardActions className={classes.cardAction}>
          <Button
            style={{ backgroundColor: "#212529", color: "white" }}
            onClick={() => editProduct()}
          >
            edit
          </Button>
          <Button
            style={{
              backgroundColor: "#212529",
              color: "white",
              border: "none",
              outline: "none",
            }}
            onClick={() => removeProduct(product._id)}
          >
            delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
export default Product;
