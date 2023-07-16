import * as React from "react";
import {
  VStack,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { CourseService, DepartmentService } from "services";
import { ICourse, IDepartment } from "interfaces";
import { Pagination } from "components";
import { usePagination } from "hooks";

interface ICourseSelectionProps {
  onCourseSelect: (selectedList: number[]) => void;
}

function CourseSelection({ onCourseSelect }: ICourseSelectionProps) {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [deparments, setDepartments] = React.useState<IDepartment[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>("");

  const { page, itemsPerPage, handlePageChange, startIndex, endIndex } =
    usePagination(0, 8);

  React.useEffect(() => {
    const fetchData = async () => {
      const courses = await CourseService().get();
      const departments = await DepartmentService().get();
      setCourses(courses);
      setDepartments(departments);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredCourses = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(search.toLowerCase())
    );

    return filteredCourses;
  };

  const handleRowSelect = (courseId: string) => {
    let updatedList = [...selectedRows];

    if (updatedList.includes(courseId)) {
      updatedList = updatedList.filter((code) => code !== courseId);
    } else {
      updatedList.push(courseId);
    }
    setSelectedRows(updatedList);

    const selectedCourseIds = updatedList.map((id) => Number(id!));

    onCourseSelect(selectedCourseIds);
  };

  return (
    <VStack spacing="20px" w="100%">
      <Input
        placeholder="Search course"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer w="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox />
              </Th>
              <Th>Code</Th>
              <Th>Course</Th>
              <Th isNumeric>Classes</Th>
              <Th>Department</Th>
            </Tr>
          </Thead>

          <Tbody>
            {handleSearch()
              .slice(startIndex, endIndex)
              .map((course) => {
                let id = course.id!.toString();
                return (
                  <Tr
                    key={course.courseCode}
                    onClick={() => handleRowSelect(id)}
                    _hover={{ bg: "gray.100" }}
                    bgColor={selectedRows.includes(id) ? "gray.100" : ""}
                    cursor="pointer"
                  >
                    <Td>
                      <Checkbox isChecked={selectedRows.includes(id)} />
                    </Td>
                    <Td>{course.courseCode}</Td>
                    <Td w="460px">{course.name}</Td>
                    <Td w="160px" isNumeric>{course.classes?.length}</Td>
                    <Td>
                      {
                        deparments.find((dep) => dep.id == course.departmentId)
                          ?.name
                      }
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination
        onPageChange={handlePageChange}
        currentPage={page}
        totalItems={handleSearch().length}
        itemsPerPage={itemsPerPage}
      />
    </VStack>
  );
}

export default CourseSelection;
