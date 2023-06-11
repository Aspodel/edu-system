import * as React from "react";
import { ContainerLayout } from "containers";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatDate } from "utils/helper";
import { useParams } from "react-router-dom";
import { ILecturer } from "interfaces";
import { LecturerService } from "services";
import { UploadButton } from "components";
import { useToast } from "hooks";

function LecturerList() {
  let { id } = useParams();
  const [lecturers, setLecturers] = React.useState<ILecturer[]>([]);
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      const lecturers = await LecturerService().getByDepartment(Number(id));
      setLecturers(lecturers);
    };
    fetchData();
  }, []);

  const handleUpload = async (file: File) => {
    const newLecturers = await LecturerService().createFromExcel(file);
    if (newLecturers.length > 0) {
      toast({
        content: "Upload successfully",
        type: "Success",
      });
    }
    let updateLecturers = [...lecturers];
    updateLecturers.push(...newLecturers);
    setLecturers(updateLecturers);
  };

  return (
    <ContainerLayout
      title="Lecturer List"
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
            </Tr>
          </Thead>

          <Tbody>
            {lecturers.map((lecturer) => (
              <Tr
                key={lecturer.idCard}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                role="group"
              >
                <Td>{lecturer.idCard}</Td>
                <Td>{lecturer.fullName}</Td>
                <Td>{formatDate(lecturer.dateOfBirth)}</Td>
                <Td>{lecturer.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default LecturerList;
