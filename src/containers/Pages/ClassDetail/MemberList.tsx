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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useToast } from "hooks";
import { BASE_URL } from "utils/constants";

interface IMemberListProps {
  students: IStudent[];
}

function MemberList({ students }: IMemberListProps) {
  let { id } = useParams<{ id: string }>();
  const toast = useToast();

  const handleExport = async () => {
    try {
      const response = await StudentService().exportExcelByClass(Number(id));

      if (response) {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          content: "Export successful",
          type: "Success",
        });
      }
    } catch (error) {
      // Handle error
      console.error("Export error:", error);
      toast({
        content: "Export failed",
        type: "Error",
      });
    }
  };

  return (
    <ContainerLayout
      title="Member List"
      btnList={[
        <Button key={Math.random()} colorScheme="gray">
          <a
            href={`${BASE_URL}student/export/class/${Number(id)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Export
          </a>
        </Button>,
      ]}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Full Name</Th>
              <Th>Date of birth</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
            </Tr>
          </Thead>

          <Tbody>
            {students.map((student) => (
              <Tr
                key={student.idCard}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
              >
                <Td>{student.idCard}</Td>
                <Td>{student.fullName}</Td>
                <Td>{formatDate(student.dateOfBirth)}</Td>
                <Td>{student.email}</Td>
                <Td>{student.phoneNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default MemberList;
