import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import {  Link , useLocation } from 'react-router-dom';
import { ShoppingCart } from "@material-ui/icons";
import { BsFillEggFill } from "react-icons/bs";
import useStyles from "./Styles";

const Navbar = ({ totalItems }) => {
  const classes = new useStyles();
 const location = useLocation();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to='/' variant="h4" className={classes.title} color="primary">
            <BsFillEggFill className={classes.image} height="25px" />
            {/* <img src='' alt='' height='25px' className={classes.image} /> */}
            Kirisame
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            {location.pathname === '/' && (
            <IconButton component={Link} to='/cart' aria-label="Show Cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>)}
          </div>
        </Toolbar>
      </AppBar>

      {/* ------------------------ */}

      {/* <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Commerce.js
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar> */}
    </>
  );
};

export default Navbar;
