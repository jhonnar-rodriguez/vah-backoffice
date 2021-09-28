import IPagination from "../../../contracts/table/IPagination";

export const paginationInitialState: IPagination = {
  page: 0,
  limit: 0,
  nextPage: 0,
  prevPage: 0,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
  pagingCounter: 0,
}
