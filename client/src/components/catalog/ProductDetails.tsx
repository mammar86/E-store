import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import agent from "../../agent";
import { Product } from "../../Models/product";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.details(parseInt(id))
      .then((productDetails) => setProduct(productDetails))
      .catch((error) => {
        console.log(error);
        toast.error(error.response.statusText);
      });

    // axios
    //   .get(`https://localhost:7076/api/Products/${id}`)
    //   .then((response) => setProduct(response.data))
    //   .catch((error) => console.log(error));
    // // .finally(() => setLoading(false));
  }, []);
  return (
    <>
      {product ? (
        <Grid container>
          <Grid item xs={6}>
            <img
              src={product.pictureUrl}
              alt={product.name}
              style={{ height: "75%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{ mb: 4 }} />
            <Typography variant="h4" color="secondary">
              ${(product.price / 100).toFixed(2)}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{product.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Quantity in stock</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <h1>...loading</h1>
      )}
    </>
  );
};

export default ProductDetails;
