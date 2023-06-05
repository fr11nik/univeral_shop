export const GRID_DEFAULT_LOCALE_TEXT_RU = {
 
  noRowsLabel: 'Нет данных',
  errorOverlayDefaultLabel: 'Произошла ошибка',
  columnMenuLabel: 'Меню столбца',
  columnMenuShowColumns: 'Показать столбцы',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть столбец',
  columnMenuUnsort: 'Сбросить сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',
  columnsPanelTextFieldLabel: 'Выберите столбцы',
  columnsPanelTextFieldPlaceholder: 'Столбцы',
  pageSizeOptionsLabel: 'Строк на странице',
  paginationFirstPageLabel: 'Первая страница',
  paginationLastPageLabel: 'Последняя страница',
  paginationNextPageLabel: 'Следующая страница',
  paginationPreviousPageLabel: 'Предыдущая страница',
  toolbarDensity: 'Плотность',
  toolbarDensityLabel: 'Плотность',
  toolbarDensityCompact: 'Компактная',
  toolbarDensityStandard: 'Стандартная',
  toolbarDensityComfortable: 'Комфортная',
  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равно',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается на',
  filterOperatorIs: 'является',
  filterOperatorNot: 'не является',
  filterOperatorAfter: 'после',
  filterOperatorOnOrAfter: 'на или после',
  filterOperatorBefore: 'до',
  filterOperatorOnOrBefore: 'на или до',
  filterOperatorIsEmpty: 'пусто',
  filterOperatorIsNotEmpty: 'не пусто',
    // Rows selected footer text
    footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} rows selected`
      : `${count.toLocaleString()} row selected`,

  // Total row amount footer text
  footerTotalRows: 'Total Rows:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

}
