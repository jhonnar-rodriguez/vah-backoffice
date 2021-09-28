import { FC } from 'react';
import { TablePagination } from '@material-ui/core';

type PaginationProps = {
  page: number,
  rowsPerPage: number,
  totalElements: number,
  handleChangePage: Function,
  handleChangeRowsPerPage: Function,
};

const Pagination: FC<PaginationProps> = ({
  page,
  rowsPerPage,
  totalElements,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  return (
    <TablePagination
      page={page}
      count={totalElements}
      component="div"
      rowsPerPage={rowsPerPage}
      onPageChange={(event, page) => handleChangePage(event, page)}
      labelRowsPerPage='Registros por página'
      rowsPerPageOptions={[5, 10, 25, 100]}
      onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
    />
  )
};

export default Pagination;
