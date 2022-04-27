import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
const Review = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div>
      <Typography>order summary</Typography>
      <List>
        {cart.items.map((item) => (
          <ListItem key={item.description}>
            <ListItemText
              primary={item.description}
              secondary={`qty:${item.qty}`}
            />
            <Typography>
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
            <NumberFormat
              displayType="text"
              value={cart.total}
              thousandSeparator={true}
            />
          </Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default Review;
