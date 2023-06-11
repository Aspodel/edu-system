import * as React from "react";
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import ContainerLayout from "containers/Layouts/ContainerLayout";
import { IStudent, IStudentClass } from "interfaces";
import { StudentService } from "services";
import { formatDate } from "utils/helper";

interface IMemberListProps {
  students: IStudent[];
}

function MemberList({ students }: IMemberListProps) {
  return (
    <ContainerLayout
      title="Member List"
      btnList={[
        <Button key={Math.random()} colorScheme="gray">
          Export Excel
        </Button>,
      ]}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Date of birth</Th>
            </Tr>
          </Thead>

          <Tbody>
            {students.map((student) => (
              <Tr
                key={student.idCard}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                role="group"
              >
                <Td>{student.idCard}</Td>
                <Td>{student.firstName}</Td>
                <Td>{student.lastName}</Td>
                <Td>{formatDate(student.dateOfBirth)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default MemberList;
