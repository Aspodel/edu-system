import * as React from "react";
import { Stack, HStack, IconButton, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface IPaginationProps {
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  size?: "xs" | "sm" | "md" | "lg";
}

function Pagination({
  onPageChange,
  totalItems,
  itemsPerPage,
  currentPage,
  size = "md",
}: IPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (i: number) => {
    let newPage = i;
    if (i >= totalPages - 1) {
      newPage = totalPages - 1;
    } else if (i <= 0) {
      newPage = 0;
    }
    onPageChange(newPage);
  };

  const shouldRender = (idx: number) =>
    idx == currentPage ||
    Math.abs(idx - currentPage) <= 1 ||
    idx === totalPages - 1 ||
    idx === 0;

  const shouldRenderEllipsis = (idx: number) =>
    idx == currentPage || Math.abs(idx - currentPage) === 1 + 1;

  return (
    <Stack p={2} mt={10}>
      <HStack m="auto">
        <IconButton
          size={size}
          variant="outline"
          aria-label="previous"
          icon={<ChevronLeftIcon />}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          colorScheme="gray"
        />
        {Array(totalPages)
          .fill(0)
          .map((_, i) => {
            return shouldRender(i) ? (
              <Button
                key={i}
                size={size}
                variant={currentPage == i ? "solid" : "outline"}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i);
                }}
                colorScheme="gray"
              >
                {i + 1}
              </Button>
            ) : shouldRenderEllipsis(i) ? (
              <Button
                key={i}
                size={size}
                variant="outline"
                pointerEvents="none"
                colorScheme="gray"
              >
                ...
              </Button>
            ) : (
              <React.Fragment key={i}></React.Fragment>
            );
          })}
        <IconButton
          aria-label="next"
          icon={<ChevronRightIcon />}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          size={size}
          variant="outline"
          colorScheme="gray"
        />
      </HStack>
    </Stack>
  );
}

export default Pagination;
