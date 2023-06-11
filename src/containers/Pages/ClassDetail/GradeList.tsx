import * as React from "react";
import { ContainerLayout } from "containers";
import {
  Button,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { BsChevronRight } from "react-icons/bs";
import ColumnModal from "./ColumnModal";
import { IGradeColumn, IStudent } from "interfaces";
import { GradeColumnService } from "services";
import { useParams } from "react-router-dom";

interface IGradeListProps {
  students: IStudent[];
}

function GradeList({ students }: IGradeListProps) {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gradeColumns, setGradeColumns] = React.useState<IGradeColumn[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GradeColumnService().getByClass(Number(id));
      setGradeColumns(response);
      console.log(response);
    };
    fetchData();
  }, []);

  return (
    <ContainerLayout
      title="Grade List"
      btnList={[
        <Button variant="solid" colorScheme="gray" onClick={onOpen}>
          Edit column
        </Button>,
        <Button>Upload Excel</Button>,
      ]}
    >
      <ColumnModal isOpen={isOpen} onClose={onClose} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Student</Th>
              {gradeColumns.map((column) => (
                <Th isNumeric key={Math.random()}>
                  {column.name} ({column.percentage}%)
                </Th>
              ))}
              <Th isNumeric>Ave.</Th>
              <Th isNumeric>Grade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {students.map((student) => {
              let weightedSum = 0;
              let totalWeight = 0;

              // Calculate the weighted sum and total weight
              gradeColumns.forEach((column) => {
                const grade = (column.grades || []).find(
                  (grade) => grade.studentId === student.id
                );
                const percentage = column.percentage || 0;
                weightedSum += (grade ? grade.value : 0) * (percentage / 100);
                totalWeight += percentage;
              });

              // Calculate the average grade based on weighted sum and total weight
              const averageGrade =
                totalWeight !== 0 ? (weightedSum / totalWeight) * 100 : "-";

              return (
                <Tr
                  key={student.idCard}
                  _hover={{ bg: "gray.100" }}
                  cursor="pointer"
                  role="group"
                >
                  <Td>{student.idCard}</Td>
                  <Td>{student.firstName + " " + student.lastName}</Td>
                  {gradeColumns.map((column) => {
                    return (
                      <Td isNumeric key={Math.random()}>
                        {(column.grades || []).find(
                          (grade) => grade.studentId === student.id
                        )?.value ?? "-"}
                      </Td>
                    );
                  })}
                  <Td isNumeric>{averageGrade}</Td>
                  <Td isNumeric>-</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default GradeList;
