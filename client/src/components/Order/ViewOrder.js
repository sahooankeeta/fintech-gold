import React from "react";

import NumberFormat from "react-number-format";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, deleteOrder } from "./../../actions";
import {
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import useStyles from "./styles";
import CircularProgress from "@mui/material/CircularProgress";
const ViewOrder = () => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  // console.log("order", order);
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);
  React.useEffect(() => {
    //console.log("in");
    if (id) {
      dispatch(fetchOrder(id));
    }
  }, [dispatch, id]);
  const removeOrder = () => {
    console.log("in");
    dispatch(deleteOrder(id, history));
  };
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  if (error) <div>{error.message}</div>;
  if (order)
    return (
      <Grid container justifyContent="center">
        <Grid item sm={12} lg={8} md={8}>
          <div>
            <div>
              <h2>Order ref:{order._id}</h2>
              <h3>{order.date}</h3>
              <h3>
                {order.customer.firstname} {order.customer.lastname}
              </h3>
              <h3>{order.customer.email}</h3>
            </div>
            <List>
              {order.items.items.map((item) => (
                <ListItem key={item.description}>
                  <ListItemText
                    primary={item.description}
                    secondary={`qty:${item.qty}`}
                  />
                  <Typography>
                    Rs.{" "}
                    <NumberFormat
                      displayType="text"
                      value={item.qty * item.price}
                      thousandSeparator={true}
                    />
                  </Typography>
                </ListItem>
              ))}
              <ListItem>
                <ListItemText primary="Total:" />
                <Typography>
                  Rs.{" "}
                  <NumberFormat
                    displayType="text"
                    value={order.items.total}
                    thousandSeparator={true}
                  />
                </Typography>
              </ListItem>
            </List>
            <Button variant="contained" color="secondary" onClick={removeOrder}>
              Delete Order
            </Button>
          </div>
        </Grid>
      </Grid>
    );
};
export default ViewOrder;
