import { ChangeEvent, FC, ReactElement, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {
  Grid,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer,
} from "@material-ui/core";
import {
  EditOutlined as EditOutlinedIcon,
  LockOpenOutlined as LockOpenIcon,
  VisibilityOutlined as VisibilityIcon,
} from "@material-ui/icons";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import IColumn from "../../contracts/product/table/IColumn";
import AppAlert from "../alert/AppAlert";
import Pagination from "./partials/Pagination";
import ICustomerColumns from "../../contracts/customer/table/ICustomerColumns";
import IBaseTableColumns, { IBaseActionColumn } from "../../contracts/table/IBaseTableColumns";
import ICouponTableColumns from "../../contracts/coupon/table/ICouponTableColumns";
import IAllowedClientTableColumns from "../../contracts/security/allowedClient/table/IAllowedClientTableColumns";
import IOrderTableColumns from "../../contracts/general/order/table/IOrderTableColumns";
import IUserTableColumns from "../../contracts/security/user/table/IUserTableColumns";
import ISaleByProductTableColumn from "../../contracts/report/tables/ISaleByProductTable";
import ISaleByCustomerTableColumn from "../../contracts/report/tables/ISaleByCustomerTableColumn";


const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "75vh",
  },
  noFlexBasis: {
    flexBasis: "0",
  },
}));

type IApplicationTableColumns = IColumn[] |
  ICustomerColumns[] |
  ICouponTableColumns[] |
  IAllowedClientTableColumns[] |
  IOrderTableColumns[] |
  IUserTableColumns[] |
  ISaleByProductTableColumn[] |
  ISaleByCustomerTableColumn[];

type ApplicationTableProps = {
  columns: IApplicationTableColumns,
  elementType?: any,
  elements: any,
  actionButtons?: IBaseActionColumn[],
  handleViewAction?: any,
  handleEditAction?: any,
  handleConfirmDeleteAction?: any,
  handleChangePasswordAction?: any,
}

const ApplicationTable: FC<ApplicationTableProps> = ({
  columns,
  elements,
  actionButtons,
  handleEditAction,
  handleViewAction,
  handleConfirmDeleteAction,
  handleChangePasswordAction,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const generateActionButtons = (element: any): ReactElement => (
    <Grid container>
      {
        typeof handleEditAction === "function" &&
        <Grid
          item
          xs={6}
          className={classes.noFlexBasis}
        >
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              onClick={() => handleEditAction(element)}
              component="span"
              aria-label="Edit"
            >
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      }

      {
        typeof handleViewAction === "function" &&
        <Grid
          item
          xs={6}
          className={classes.noFlexBasis}
        >
          <Tooltip title="Ver Detale">
            <IconButton
              color="secondary"
              onClick={() => handleViewAction(element)}
              component="span"
              aria-label="View"
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      }

      {
        typeof handleChangePasswordAction === "function" &&
        <Grid
          item
          xs={6}
          className={classes.noFlexBasis}
        >
          <Tooltip title="Cambiar Contraseña">
            <IconButton
              style={{ color: '#889EAF' }}
              onClick={() => handleChangePasswordAction(element)}
              component="span"
              aria-label="Cambiar contraseña"
            >
              <LockOpenIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      }

      {
        typeof handleConfirmDeleteAction === "function" &&
        <Grid
          item
          xs={6}
          className={classes.noFlexBasis}
        >
          <ConfirmationDialog
            title={`Eliminar registro ${element.name}`}
            content={`Estás seguro de eliminar el registro ${element.name}`}
            handleOnConfirm={() => handleConfirmDeleteAction(element._id)}
          />
        </Grid>
      }
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
            column.format ?
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

              {
                typeof actionButtons !== "undefined" &&
                <TableCell
                  align="center"
                  style={{ minWidth: 50 }}
                >
                  Acciones
                </TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              elements.length === 0 ?
                displayNoProductsAvailable() :
                elements
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((element: any) => (
                    <TableRow
                      key={element._id}
                      hover
                      tabIndex={-1}
                    >
                      {columns.map((column: IBaseTableColumns) => generateCellValue(column, element))}
                    </TableRow>
                  ))
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
