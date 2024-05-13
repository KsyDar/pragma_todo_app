export type TaskPaginationProps = {
  isFirstPage: boolean;
  isLastPage: boolean;
  pageCount: number;
  currentPage: number;
  total: number;
};

export type TaskPaginationEmits = {
  prev: [];
  next: [];
};
