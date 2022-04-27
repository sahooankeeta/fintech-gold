import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Product from "./Product";
import { useLocation, useParams } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./../../actions";
const Shop = ({ isAdmin }) => {
  const { item } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const search = new URLSearchParams(useLocation().search);
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);
  const products = useSelector((state) => state.products);
  localStorage.setItem("products", JSON.stringify(products));

  const gram = search.get("gram");

  useEffect(() => {
    dispatch(getAll(item, gram));
  }, [dispatch, gram, item]);
  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading . . .</div>;
  if (products)
    return (
      <main className={classes.content}>
        <Grid container alignItems="stretch" spacing={3}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={12} md={6} lg={3}>
                <Product product={product} isAdmin={isAdmin} />
              </Grid>
            ))
          ) : (
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>
              No products found in this category yet :(
            </h2>
          )}
        </Grid>
      </main>
    );
};
export default Shop;
