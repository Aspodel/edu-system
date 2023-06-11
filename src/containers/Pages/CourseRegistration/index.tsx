import * as React from "react";
import { ContainerLayout, PageLayout } from "containers";
import {
  Button,
  Checkbox,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { ModalBox, Pagination } from "components";
import { IClass, ICourse, ILecturer } from "interfaces";
import { ClassService, CourseService, LecturerService } from "services";
import { WEEKDAYS } from "utils/constants";
import ScheduleRecommendation from "./ScheduleRecommendation";
import { usePagination, useToast } from "hooks";
import { useAuth } from "contexts";
import { StudentService } from "services/StudentService";
import { set } from "react-hook-form";

function CourseRegistrationPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [classes, setClasses] = React.useState<IClass[]>([]);
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [lecturers, setLecturers] = React.useState<ILecturer[]>([]);
  const [originalClasses, setOriginalClasses] = React.useState<string[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const { userInfor } = useAuth();
  const studentService = StudentService();

  const { get: getClasses } = ClassService();
  const { get: getCourses } = CourseService();
  const { get: getLecturer } = LecturerService();

  const { page, itemsPerPage, handlePageChange, startIndex, endIndex } =
    usePagination(0, 8);
  const showToast = useToast();

  React.useEffect(() => {
    const getData = async () => {
      const res = await getClasses();
      const res1 = await studentService.getDetails(userInfor?.idCard!);
      const res2 = await getCourses();
      const res3 = await getLecturer();
      setClasses(res);
      setCourses(res2);
      setLecturers(res3);
      setSelectedRows(
        res1.registeredClasses!.map((classId) => classId.toString())
      );
      setOriginalClasses(
        res1.registeredClasses!.map((classId) => classId.toString())
      );
    };
    getData();
  }, []);

  const handleRowSelect = (classId: string) => {
    if (selectedRows.includes(classId)) {
      return setSelectedRows(selectedRows.filter((id) => id !== classId));
    } else if (!isCourseDuplicate(Number(classId))) {
      return setSelectedRows([...selectedRows, classId]);
    }

    showToast({ content: "Course is duplicated" });
  };

  const isCourseDuplicate = (classId: number) => {
    const selected = classes.find((cla) => cla.id === classId)?.courseId;
    const selectedCourseIds = selectedRows.map((classId) => {
      const cla = classes.find((cla) => cla.id === Number(classId));
      if (!cla) return null;
      return cla.courseId;
    });

    return selectedCourseIds.includes(selected!);
  };

  const handleSearch = () => {
    const filteredCourses = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(search.toLowerCase())
    );

    const filterClasses = classes.filter((cla) =>
      filteredCourses.some((course) => course.id === cla.courseId)
    );

    return filterClasses;
  };

  const handleSave = async () => {
    const selectedClasses = selectedRows.map((id) => Number(id));
    try {
      await studentService.registerCourses({
        registeredClasses: selectedClasses,
        idCard: userInfor?.idCard!,
      });
      showToast({ content: "Saved successfully", type: "Success" });
      setOriginalClasses(selectedRows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoad = () => {
    const load = localStorage.getItem("saved");
    console.log(JSON.parse(load!));
    setSelectedRows(JSON.parse(load!));
  };

  return (
    <PageLayout title="Course Registration">
      <ContainerLayout
        title="Course List"
        btnList={[
          <Input
            key="searchInput"
            w="300px"
            placeholder="Search course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />,
          <Button key="recommendBtn" onClick={onOpen}>
            Recommend
          </Button>,
        ]}
      >
        <TableContainer overflow="hidden">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Code</Th>
                <Th>Course</Th>
                <Th isNumeric>Credits</Th>
                <Th>Lecturer</Th>
                <Th isNumeric>Slots</Th>
                <Th isNumeric>Start</Th>
                <Th isNumeric>End</Th>
                <Th>Room</Th>
                <Th>Day</Th>
              </Tr>
            </Thead>

            <Tbody>
              {handleSearch()
                .slice(startIndex, endIndex)
                .map((cla) => {
                  let id = cla.id!.toString();
                  return (
                    <Tr
                      key={cla.id + cla.classCode}
                      onClick={() => handleRowSelect(id)}
                      _hover={{ bg: "gray.100" }}
                      bgColor={selectedRows.includes(id) ? "gray.100" : ""}
                      cursor="pointer"
                    >
                      <Td>
                        <Checkbox
                          size="lg"
                          isChecked={selectedRows.includes(id)}
                          // onChange={() => handleRowSelect(id)}
                        />
                      </Td>
                      <Td>
                        {
                          courses.find((course) => course.id == cla.courseId)
                            ?.courseCode
                        }
                      </Td>
                      <Td w="300px">
                        {
                          courses.find((course) => course.id == cla.courseId)
                            ?.name
                        }
                      </Td>
                      <Td isNumeric>
                        {
                          courses.find((course) => course.id == cla.courseId)
                            ?.credits
                        }
                      </Td>
                      <Td w="185px">
                        {
                          lecturers.find((lec) => lec.id == cla.lecturerId)
                            ?.fullName
                        }
                      </Td>
                      <Td isNumeric>
                        {cla.slot - cla.students.length}/{cla.slot}
                      </Td>
                      <Td isNumeric>{cla.startTime}</Td>
                      <Td isNumeric>{cla.endTime}</Td>
                      <Td>{cla.roomId ?? "A.123"}</Td>
                      <Td w="125px">{WEEKDAYS[cla.day - 1]}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>

        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={handleSearch().length}
        />
      </ContainerLayout>

      <ContainerLayout
        title="Selected courses"
        btnList={[
          <Button colorScheme="gray" onClick={handleLoad}>
            Load
          </Button>,
          <React.Fragment key="btnContainer">
            {selectedRows.length > 0 ? (
              <Button
                key="clearBtn"
                colorScheme="gray"
                onClick={() => setSelectedRows([])}
              >
                Clear
              </Button>
            ) : null}
          </React.Fragment>,
          <React.Fragment key="btnContainer2">
            {JSON.stringify(originalClasses) != JSON.stringify(selectedRows) ? (
              <Button key="saveBtn" onClick={handleSave}>
                Save
              </Button>
            ) : null}
          </React.Fragment>,
        ]}
        minHeight="250px"
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Code</Th>
                <Th w="470px">Course</Th>
                <Th isNumeric>Credits</Th>
                <Th isNumeric>Slots</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {selectedRows.map((classId) => {
                const cla = classes.find((cla) => cla.id == Number(classId));
                if (!cla) return null;

                return (
                  <Tr
                    key={cla.classCode + cla.courseId}
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                  >
                    <Td>
                      {
                        courses.find((course) => course.id == cla.courseId)
                          ?.courseCode
                      }
                    </Td>
                    <Td w="470px">
                      {
                        courses.find((course) => course.id == cla.courseId)
                          ?.name
                      }
                    </Td>
                    <Td isNumeric>
                      {
                        courses.find((course) => course.id == cla.courseId)
                          ?.credits
                      }
                    </Td>
                    <Td isNumeric>{cla.slot}</Td>
                    <Td>
                      {originalClasses.includes(classId) ? "Saved" : "Unsaved"}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </ContainerLayout>

      <ModalBox
        title="Recommending Appropriate Schedule"
        isOpen={isOpen}
        onClose={onClose}
        footerButtons={[<Button>Save</Button>]}
      >
        Hello
      </ModalBox>

      <ScheduleRecommendation isOpen={isOpen} onClose={onClose} />
    </PageLayout>
  );
}

export default CourseRegistrationPage;
