interface IPagination {
  page: number,
  limit: number,
  nextPage: number,
  prevPage: number,
  totalItems: number,
  totalPages: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  pagingCounter: number,
}

export default IPagination;
