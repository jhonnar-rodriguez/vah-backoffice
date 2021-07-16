import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from "@material-ui/core";
import useLoadProducts from "../../../hooks/settings/products/useLoadProducts";
import { AppState } from '../../../../store';
import IProduct from "../../../contracts/product/IProduct";
import columns from "./TableColumns";
import { startResetStateAction } from "../../../../store/actions/httpRequest/HttpRequestActions";
import SnackBar from "../../../components/snackBar/SnackBar";
import { startCreateProductAction, startRemoveProductAction, startUpdateProductAction } from "../../../../store/actions/product/ProductActions";
import ProductForm from "./partials/ProductForm";
import { productInitialState } from "../../../data/products";
import ApplicationTable from "../../../components/table/ApplicationTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "75vh",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { productReducer, httpRequestReducer } = useSelector((state: AppState) => state)
  const { data: products } = productReducer;
  const { success } = httpRequestReducer;

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createProduct, setCreateProduct] = useState<boolean>(true);
  const [productToUpdate, setProductToUpdate] = useState<IProduct>(productInitialState);


  const handleDeleteProductAction = (productId: string) => {
    const dispatcher = () => dispatch(startRemoveProductAction(productId));
    dispatcher();
  };

  const resetSuccessMessage = () => {
    const dispatcher = () => dispatch(startResetStateAction());
    dispatcher();
  };

  const handleFormClose = (data?: IProduct) => {
    setOpenForm(false);
    setCreateProduct(true);
    setProductToUpdate(productInitialState);

    if (typeof data?.category === "undefined") {
      return;
    }

    let dispatcher = () => dispatch(startCreateProductAction(data));

    if (!createProduct) {
      dispatcher = () => dispatch(startUpdateProductAction(data));
    }

    dispatcher();
  };

  const handleEditProductForm = (product: IProduct) => {
    setCreateProduct(false);
    setProductToUpdate(product);
    setOpenForm(true);
  }

  useLoadProducts();

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.buttonContainer}>
          <Typography variant="h4" style={{ padding: "5px" }}>
            Listado de productos
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
            className={classes.button}
          >
            Crear
          </Button>
        </div>

        <ApplicationTable
          columns={columns}
          elements={products}
          handleEditAction={handleEditProductForm}
          handleConfirmDeleteAction={handleDeleteProductAction}
        />

        {
          typeof success !== 'undefined' &&
          success.message.length > 0 &&
          <SnackBar
            message={success.message}
            onDismiss={resetSuccessMessage}
          />
        }
      </Paper>

      <ProductForm
        open={openForm}
        action={createProduct ? "Crear" : "Actualizar"}
        handleClose={handleFormClose}
        productToUpdate={productToUpdate}
      />
    </>
  );
};

export default ProductList;
