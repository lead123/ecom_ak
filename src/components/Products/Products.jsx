import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import useStyle from "./Styles";

const Products = ({product, onAddToCart }) => {
  const classes = useStyle();

  // const product = [
  //   {
  //     id: 1,
  //     name: "Aube",
  //     image: "http://dummyimage.com/114x100.png/dddddd/000000",
  //     price: 46,
  //     description: "aesposita0@illinois.edu",
  //   },
  //   {
  //     id: 2,
  //     name: "Lindi",
  //     image: "http://dummyimage.com/239x100.png/cc0000/ffffff",
  //     price: 91,
  //     description: "lmatchitt1@forbes.com",
  //   },
  //   {
  //     id: 3,
  //     name: "Karlotte",
  //     image: "http://dummyimage.com/103x100.png/5fa2dd/ffffff",
  //     price: 77,
  //     description: "kjeandel2@ucoz.ru",
  //   },
  //   {
  //     id: 4,
  //     name: "Irwin",
  //     image: "http://dummyimage.com/169x100.png/5fa2dd/ffffff",
  //     price: 36,
  //     description: "iburke3@fastcompany.com",
  //   },
  //   {
  //     id: 5,
  //     name: "Gennifer",
  //     image: "http://dummyimage.com/240x100.png/cc0000/ffffff",
  //     price: 87,
  //     description: "gkilmartin4@narod.ru",
  //   },
  //   {
  //     id: 6,
  //     name: "Brande",
  //     image: "http://dummyimage.com/197x100.png/cc0000/ffffff",
  //     price: 77,
  //     description: "bbyars5@vk.com",
  //   },
  //   {
  //     id: 7,
  //     name: "Isabel",
  //     image: "http://dummyimage.com/177x100.png/5fa2dd/ffffff",
  //     price: 56,
  //     description: "iembra6@china.com.cn",
  //   },
  //   {
  //     id: 8,
  //     name: "Justus",
  //     image: "http://dummyimage.com/241x100.png/5fa2dd/ffffff",
  //     price: 16,
  //     description: "jlithgow7@weebly.com",
  //   },
  //   {
  //     id: 9,
  //     name: "Derwin",
  //     image: "http://dummyimage.com/144x100.png/cc0000/ffffff",
  //     price: 62,
  //     description: "dmattielli8@marketwatch.com",
  //   },
  //   {
  //     id: 10,
  //     name: "Shayne",
  //     image: "http://dummyimage.com/101x100.png/5fa2dd/ffffff",
  //     price: 43,
  //     description: "sswafford9@howstuffworks.com",
  //   },
  // ];

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {product.map((value) => (
          // <div>
          // <h2>{value.id}</h2>
          // <h1>{value.name}</h1>
          // </div>
          <Grid item key={value.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={value} onAddToCart2={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
