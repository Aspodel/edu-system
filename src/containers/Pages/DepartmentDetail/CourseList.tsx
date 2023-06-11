import * as React from "react";
import { ContainerLayout } from "containers";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  background,
  Button,
} from "@chakra-ui/react";
import { formatDate } from "utils/helper";
import { useParams } from "react-router-dom";
import { ICourse } from "interfaces";
import { CourseService } from "services";
import { useToast } from "hooks";
import { UploadButton } from "components";

function CourseList() {
  let { id } = useParams();
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      const courses = await CourseService().getByDepartment(Number(id));
      setCourses(courses);
    };
    fetchData();
  }, []);
  const handleUpload = async (file: File) => {
    const newCourses = await CourseService().createFromExcel(file);
    if (newCourses.length > 0) {
      toast({
        content: "Upload successfully",
        type: "Success",
      });
    }
    let updateCourses = [...courses];
    updateCourses.push(...newCourses);
    setCourses(updateCourses);
  };

  return (
    <ContainerLayout
      title="Course List"
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
              <Th>Code</Th>
              <Th>Course</Th>
              <Th>Credit</Th>
              <Th>Description</Th>
              <Th>Gpa Calculated</Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses.map((course) => (
              <Tr
                key={course.courseCode}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                role="group"
              >
                <Td>{course.courseCode}</Td>
                <Td>{course.name}</Td>
                <Td isNumeric w="95px">
                  {course.credits}
                </Td>
                <Td>{course.description}</Td>
                <Td w="162px">{course.gpaCalculated ? "Yes" : "No"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default CourseList;
