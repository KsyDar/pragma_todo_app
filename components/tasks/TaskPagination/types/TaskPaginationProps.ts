/**
 * Тип пропсов пагинации задач
 */
export type TaskPaginationProps = {
  /** Является ли первой текущая страница */
  isFirstPage: boolean;
  /** Является ли последней текущая страница */
  isLastPage: boolean;
  /** Количество страниц */
  pageCount: number;
  /** Текущая страница */
  currentPage: number;
  /** Число элементов */
  total: number;
};
/**
 * Тип эмитов пагинации задач
 */
export type TaskPaginationEmits = {
  /** Переход к предыдущей странице */
  prev: [];
  /** Переход к следующей странице */
  next: [];
};
