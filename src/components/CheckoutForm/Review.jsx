import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkOutToken }) => {
  console.log(checkOutToken);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {checkOutToken.live.line_items.map((item) => (
          <ListItem key={item.name} style={{ padding: "10px 0" }}>
            <ListItemText
              primary={item.name}
              secondary={`Qty: ${item.quantity}`}
            />
            <Typography variant="body2">
              {item.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText
            primary='Total'
       
          />
        
        </ListItem>
        <Typography variant="subtitle1" style={{fontWeight:700}}>
            {checkOutToken.live.subtotal.formatted_with_symbol}
          </Typography>
      </List>
    </>
  );
};

export default Review;
