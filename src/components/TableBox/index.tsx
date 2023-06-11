import * as React from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";

interface ITableBoxProps<T> {
  data: T[];
}

function TableBox({
  data,
}: ITableBoxProps<any> & { children?: React.ReactNode }) {
  const headers = Object.keys(data[0]);

  const tableHead = (
    <Tr>
      {headers.map((header) => (
        <Th>{header}</Th>
      ))}
    </Tr>
  );

  const tableBody = data.map((obj) => (
    <Tr>
      {headers.map((header) => (
        <Td>{obj[header]}</Td>
      ))}
    </Tr>
  ));

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>{tableHead}</Thead>
        <Tbody>{tableBody}</Tbody>
      </Table>
    </TableContainer>
  );
}
export default TableBox;
