import React, { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
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
import { IconButton } from "@material-ui/core";
import { RemoveCircleOutline as RemoveCircleIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const ProductList = () => {
  const classes = useStyles();

  const { data: products } = useSelector((state: AppState) => state.productReducer)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            <label htmlFor="delete-product">
              <IconButton
                color="secondary"
                component="span"
                aria-label={`Delete product ${product.name}`}
              >
                <RemoveCircleIcon />
              </IconButton>
            </label> :
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

  useLoadProducts();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
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
    </Paper>
  );
}

export default ProductList;
