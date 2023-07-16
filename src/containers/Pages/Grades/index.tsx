import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ContainerLayout, PageLayout } from "containers";
import { useAuth } from "contexts";
import { IStudentGrades } from "interfaces";
import * as React from "react";
import { GradeService } from "services";

function GradesPage() {
  const { userInfor } = useAuth();
  const [studentGrades, setStudentGrades] = React.useState<IStudentGrades[]>(
    []
  );

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GradeService().getByStudent(userInfor?.id ?? "");
      setStudentGrades(response);
    };
    fetchData();
  }, [userInfor]);

  return (
    <PageLayout title="Grades">
      <ContainerLayout title="Third Semester (2022-2023)">
        <TableContainer display="flex" flexDir="column" gap="20px">
          {studentGrades.map((studentGrade) => (
            <Table key={studentGrade.course}>
              <Thead bgColor="gray.200">
                <Tr>
                  <Th>Course</Th>
                  {Object.keys(studentGrade.grades).map((gradeKey) => (
                    <Th key={gradeKey}>
                      {gradeKey} ({studentGrade.grades[gradeKey].percentage}%)
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td w="300px">{studentGrade.course}</Td>
                  {Object.values(studentGrade.grades).map((grade, index) => (
                    <Td key={index}>{grade.value ?? "-"}</Td>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          ))}
        </TableContainer>
      </ContainerLayout>
    </PageLayout>
  );
}

export default GradesPage;
