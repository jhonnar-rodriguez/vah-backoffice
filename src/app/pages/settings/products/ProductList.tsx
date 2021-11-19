import { FormEvent, useState } from "react";
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
import { productInitialState, productsFilterableOptions } from "../../../data/products";
import ApplicationTable from "../../../components/table/ApplicationTable";
import SearchBar from "../../../components/searchBar/SearchBar";
import IProcessFilter from "../../../contracts/filter/IProcessFilter";

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
  const initialFilters: IProcessFilter = {
    page: 1,
    value: '',
    limit: 10,
    filterBy: '',
  }

  const { productReducer, httpRequestReducer } = useSelector((state: AppState) => state)
  const { data: products, totalItems, nextPage, prevPage } = productReducer;
  const { success } = httpRequestReducer;

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createProduct, setCreateProduct] = useState<boolean>(true);
  const [productToUpdate, setProductToUpdate] = useState<IProduct>(productInitialState);
  const [filtersApplied, setFiltersApplied] = useState<IProcessFilter>(initialFilters);

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

    const formattedData: IProduct = {
      ...data,
      price: Number(data.price),
      discount: Number(data.discount),
      position: Number(data.position),
      quantity: Number(data.quantity),
    }

    let dispatcher = () => dispatch(startCreateProductAction(formattedData));

    if (!createProduct) {
      dispatcher = () => dispatch(startUpdateProductAction(formattedData));
    }

    dispatcher();
  };

  const handleEditProductForm = (product: IProduct) => {
    setCreateProduct(false);
    setProductToUpdate(product);
    setOpenForm(true);
  }

  const [loadProducts] = useLoadProducts();

  const handleSearchSubmit = (filter: IProcessFilter, event?: FormEvent<HTMLFormElement>, resetFilters: boolean = false): void => {
    if (resetFilters) {
      loadProducts();
      setFiltersApplied(initialFilters);

      return;
    }

    if (typeof event !== "undefined") {
      event.preventDefault();
    }

    loadProducts(filter);
    setFiltersApplied(filter);
  }

  const handlePageChange = (gotForward: boolean | undefined, limit: number): void => {
    loadProducts({
      ...filtersApplied,
      page: typeof gotForward === 'undefined' ? 1 : gotForward ? nextPage : prevPage,
      limit,
    });
  }

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

        <SearchBar
          onSubmit={handleSearchSubmit}
          optionsToFilter={productsFilterableOptions}
        />

        <ApplicationTable
          columns={columns}
          elements={products}
          totalElements={totalItems}
          handlePageChange={handlePageChange}
          handleEditAction={handleEditProductForm}
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
