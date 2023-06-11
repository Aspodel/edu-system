import * as React from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import { ContainerLayout } from "containers";
import { IStudent } from "interfaces";
import { useParams } from "react-router-dom";
import { StudentService } from "services";
import { formatDate } from "utils/helper";
import { UploadButton } from "components";
import { useToast } from "hooks";

function StudentList() {
  let { id } = useParams();
  const [students, setStudents] = React.useState<IStudent[]>([]);
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      const students = await StudentService().getByDepartment(Number(id));
      setStudents(students);
    };
    fetchData();
  }, []);

  const handleUpload = async (file: File) => {
    const newStudents = await StudentService().createFromExcel(file);
    if (newStudents.length > 0) {
      toast({
        content: "Upload successfully",
        type: "Success",
      });
    }
    let updateStudents = [...students];
    updateStudents.push(...newStudents);
    setStudents(updateStudents);
  };

  return (
    <ContainerLayout
      title="Student List"
      btnList={[
        <Button colorScheme="gray" variant="outline">
          Add
        </Button>,
        <UploadButton onUpload={handleUpload} />,
      ]}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Full Name</Th>
              <Th>Birthdate</Th>
              <Th>Email</Th>
              <Th>Address</Th>
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
                <Td>{student.fullName}</Td>
                <Td>{formatDate(student.dateOfBirth)}</Td>
                <Td>{student.email}</Td>
                <Td>{student.address}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default StudentList;
