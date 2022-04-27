import React from "react";
import NumberFormat from "react-number-format";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { fetchOrders } from "../../actions";
import useStyles from "./styles";
const OrdersPage = ({ user, isAdmin }) => {
  const classes = useStyles();
  const { orders, isLoading, error } = useSelector((state) => state);
  //console.log(user, orders);
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    if (user) {
      if (isAdmin) dispatch(fetchOrders("-1"));
      else dispatch(fetchOrders(user));
    }
  }, [dispatch, user]);
  if (error) return <div>{error}</div>;
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  return (
    <main className={classes.content}>
      <Grid container alignItems="stretch" spacing={3}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Grid item key={order._id} xs={12} sm={12} md={6} lg={4}>
              <Paper
                elevation={3}
                style={{ padding: "10px" }}
                onClick={() => history.push(`/order/${order._id}`)}
              >
                <div>
                  order ref :<br />
                  <h4>{order._id}</h4>
                </div>
                <Divider variant="middle" />
                <h4>
                  {order.customer.firstname} {order.customer.lastname}
                </h4>
                {order.date}
                <h4>
                  Bag total : Rs .
                  <NumberFormat
                    value={order.items.total}
                    displayType="text"
                    thousandSeparator={true}
                  />
                </h4>
              </Paper>
            </Grid>
          ))
        ) : (
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>
            No orders have been placed yet :(
          </h2>
        )}
      </Grid>
    </main>
  );
};
export default OrdersPage;
