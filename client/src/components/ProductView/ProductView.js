import * as React from "react";

import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import useStyles from "./styles.js";
import { getProduct, addCart, removeCart } from "./../../actions";
const ProductView = ({ isAdmin }) => {
  const history = useHistory();
  const { id } = useParams();
  //console.log(id);
  const [inBag, setInBag] = React.useState(false);
  const classes = useStyles();
  const { isLoading, product, cart } = useSelector((state) => state);
  const user = useSelector((state) => state?.profile?.result?._id);
  if (!user) history.push("/auth");
  // console.log("cart", cart);
  const dispatch = useDispatch();
  React.useEffect(() => {
    //console.log("in");
    if (id) {
      dispatch(getProduct(id));
      if (cart.items.some((item) => item.id === id)) setInBag(true);
      else setInBag(false);
    }
  }, [dispatch, id]);

  //console.log(isLoading, product);
  const products = useSelector((state) => {
    if (state.products?.length === 0)
      return JSON.parse(localStorage.getItem("products"));
    else return state.products;
  });

  const toggleCart = () => {
    if (inBag) {
      setInBag(false);
      dispatch(removeCart(user, product._id));
    } else {
      const obj = {
        id: product._id,
        user,
        price: +product.price,
        description: product.description,
        gram: product.gram,
        karat: product.karat,
        qty: 1,
        image: product.image,
      };

      dispatch(addCart(obj));
      setInBag(true);
    }
  };
  let recommendedProducts = products?.filter((item) => item._id !== id);
  recommendedProducts = recommendedProducts.slice(0, 4);

  if (!product) return null;
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );

  return (
    <main>
      <Grid container alignItems="stretch" spacing={5}>
        <Grid item sm={12}>
          <Grid container>
            <Grid item sm={12} lg={6} position="realtive">
              <img src={product.image} alt={`${product.description}`} />
            </Grid>
            <Grid item sm={12} lg={4} padding="15px">
              <Grid container spacing={2}>
                <Grid item lg={12} sm={12} md={12}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {product.gram} gram {product.karat} karat gold with{" "}
                    {product.description}
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item lg={12} sm={12} md={12}>
                  <Typography variant="h4">
                    Rs.
                    <NumberFormat
                      displayType="text"
                      value={product.price}
                      thousandSeparator={true}
                    />
                  </Typography>
                  <Typography variant="h6">*inclusive of all taxes*</Typography>
                  <Typography style={{ color: "grey" }}>
                    *Weight and Price may vary subject to the stock available.
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={12}
                  sm={12}
                  md={12}
                  style={{ display: "flex", alignItems: "column" }}
                >
                  {!isAdmin && (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#212529", color: "white" }}
                      onClick={toggleCart}
                    >
                      {inBag ? "remove from bag" : "add to bag"}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {recommendedProducts.length > 0 && (
          <Grid item sm={12} style={{ marginBottom: "20px" }}>
            <Typography variant="h3" gutterBottom>
              Recommended Products
            </Typography>
            <Grid container alignItems="stretch" spacing={3}>
              {recommendedProducts.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Paper elevation={6}>
                    <Card
                      className={classes.card}
                      onClick={() => history.push(`/view/${item._id}`)}
                    >
                      <div className={classes.cardContent}>
                        <img
                          className={classes.media}
                          alt=""
                          component="img"
                          src={item.image}
                        />
                        <CardContent className={classes.cardDetail}>
                          <Typography
                            gutterBottom
                            style={{ fontWeight: "600" }}
                          >
                            {`gold ${item.category.slice(
                              0,
                              item.category.length - 1
                            )} with
                          ${item.description} of
                          ${item.gram} gram 
                          ${item.karat} karat`}
                          </Typography>
                          <Typography style={{ fontWeight: "600" }}>
                            Rs .
                            <NumberFormat
                              value={item.price}
                              displayType="text"
                              thousandSeparator={true}
                            />
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </main>
  );
};
export default ProductView;
