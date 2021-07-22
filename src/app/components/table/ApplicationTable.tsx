import { ChangeEvent, FC, ReactElement, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, IconButton } from "@material-ui/core";
import { EditOutlined as EditOutlinedIcon } from "@material-ui/icons";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import IColumn from "../../contracts/product/table/IColumn";
import AppAlert from "../alert/AppAlert";
import Pagination from "./partials/Pagination";
import ICustomerColumns from "../../contracts/customer/table/ICustomerColumns";
import IBaseTableColumns from "../../contracts/table/IBaseTableColumns";
import ICouponTableColumns from "../../contracts/coupon/table/ICouponTableColumns";
import IAllowedClientTableColumns from "../../contracts/security/allowedClient/table/IAllowedClientTableColumns";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "75vh",
  },
}));

type IApplicationTableColumns = IColumn[] | ICustomerColumns[] | ICouponTableColumns[] | IAllowedClientTableColumns[];

type ApplicationTableProps = {
  columns: IApplicationTableColumns,
  elementType?: any,
  elements: any,
  handleEditAction: any,
  handleConfirmDeleteAction: any,
}

const ApplicationTable: FC<ApplicationTableProps> = ({
  columns,
  elements,
  handleEditAction,
  handleConfirmDeleteAction,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const generateActionButtons = (element: any) => (
    <Grid container>
      <Grid
        item
        xs={6}
      >
        <IconButton
          color="primary"
          onClick={() => handleEditAction(element)}
          component="span"
          aria-label="Edit"
        >
          <EditOutlinedIcon />
        </IconButton>
      </Grid>

      <Grid
        item
        xs={6}
      >
        <ConfirmationDialog
          title={`Eliminar registro ${element.name}`}
          content={`Estás seguro de eliminar el registro ${element.name}`}
          handleOnConfirm={() => handleConfirmDeleteAction(element._id)}
        />
      </Grid>
    </Grid>
  );

  const generateCellValue = (column: IBaseTableColumns, element: any): ReactElement => {
    const value = column.id !== "actions" ? element[column.id] : "generate-action-buttons";

    return (
      <TableCell
        key={column.id}
        align={column.align}
      >
        {
          value === "generate-action-buttons" ?
            generateActionButtons(element)
            :
            column.format && (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') ?
              column.format(value) :
              column.generateLink === true ?
                <RouterLink
                  to="#"
                  onClick={() => handleEditAction(element)}
                >
                  {value}
                </RouterLink> :
                value
        }
      </TableCell>
    );
  };

  const displayNoProductsAvailable = (): ReactElement => (
    <TableRow>
      <TableCell
        align="center"
        colSpan={columns.length}
        aria-colspan={columns.length}
      >
        <AppAlert
          message="No hay registros disponibles"
          severity="warning"
        />
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {
                columns
                  .map((column: IBaseTableColumns) => (
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
              elements.length === 0 ?
                displayNoProductsAvailable() :
                elements
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((element: any) => {
                    return (
                      <TableRow
                        key={element._id}
                        hover
                        tabIndex={-1}
                      >
                        {columns.map((column: IBaseTableColumns) => generateCellValue(column, element))}
                      </TableRow>
                    );
                  })
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        page={page}
        rowsPerPage={rowsPerPage}
        totalElements={elements.length}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

export default ApplicationTable;
