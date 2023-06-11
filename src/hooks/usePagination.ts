import * as React from "react";

export const usePagination = (initPage: number, itemsPerPage: number) => {
  const [page, setPage] = React.useState(initPage);
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return {
    page,
    itemsPerPage,
    startIndex,
    endIndex,
    handlePageChange,
  };
};
