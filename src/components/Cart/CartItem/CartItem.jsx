import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from 'react-router-dom';

import useStyles from "./Styles";

const CartItem = ({ item , onhandleUpdateQty,onhandleRemoveFromCart }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={item.media.source}
        alt={item.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={()=>onhandleUpdateQty(item.id , item.quantity - 1)}>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small" onClick={()=>onhandleUpdateQty(item.id , item.quantity + 1)}>
            +
          </Button>
        </div>
        <Button type='button' variant='contained' color='secondary' onClick={()=>onhandleRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
