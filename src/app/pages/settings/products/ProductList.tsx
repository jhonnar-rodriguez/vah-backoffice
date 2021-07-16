import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import useLoadProducts from "../../../hooks/settings/products/useLoadProducts";
import { AppState } from '../../../../store';
import IProduct from "../../../contracts/product/IProduct";
import columns from "./TableColumns";
import IColumn from "../../../contracts/product/table/IColumn";
import AppAlert from "../../../components/alert/AppAlert";
import ConfirmationDialog from "../../../components/confirmation/ConfirmationDialog";
import { startResetStateAction } from "../../../../store/actions/httpRequest/HttpRequestActions";
import SnackBar from "../../../components/snackBar/SnackBar";
import { startRemoveProductAction } from "../../../../store/actions/product/ProductActions";
import { Button } from "@material-ui/core";
import ProductForm from "./partials/ProductForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
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

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formAction] = useState<string>('Crear');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProductAction = (productId: string) => {
    const dispatcher = () => dispatch(startRemoveProductAction(productId));
    dispatcher();
  };

  const resetSuccessMessage = () => {
    const dispatcher = () => dispatch(startResetStateAction());
    dispatcher();
  };

  const generateCellValue = (column: IColumn, product: IProduct): ReactElement => {
    const value = column.id !== "delete" ? product[column.id] : "prepare-to-delete";

    return (
      <TableCell
        key={column.id}
        align={column.align}
      >
        {
          value === "prepare-to-delete" ?
            <ConfirmationDialog
              title={`Eliminar producto ${product.name}`}
              content={`Estás seguro de eliminar el producto ${product.name}`}
              handleOnConfirm={() => handleDeleteProductAction(product._id)}
            /> :
            column.format && (typeof value === 'number' || typeof value === 'boolean') ?
              column.format(value) :
              column.generateLink === true ?
                <RouterLink to={`/settings/products/${product.sku.toLowerCase()}`}>
                  {value}
                </RouterLink> :
                value
        }
      </TableCell>
    );
  }

  const displayNoProductsAvailable = (): ReactElement => (
    <TableRow>
      <TableCell
        align="center"
        colSpan={columns.length}
        aria-colspan={columns.length}
      >
        <AppAlert
          message="No hay productos disponibles"
          severity="warning"
        />
      </TableCell>
    </TableRow>
  );

  const handleFormClose = () => {
    setOpenForm(false);
  }

  useLoadProducts();

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenForm(true)}
              className={classes.button}
            >
              Crear
            </Button>
          </div>

          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {
                  columns
                    .map((column: IColumn) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                products.length === 0 ?
                  displayNoProductsAvailable() :
                  products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product: IProduct) => {
                      return (
                        <TableRow
                          key={product._id}
                          hover
                          tabIndex={-1}
                        >
                          {columns.map((column: IColumn) => generateCellValue(column, product))}
                        </TableRow>
                      );
                    })
              }
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
        action={formAction}
        handleClose={handleFormClose}
      />
    </>
  );
}

export default ProductList;
