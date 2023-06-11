import * as React from "react";
import { ContainerLayout, PageLayout } from "containers";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Icon,
} from "@chakra-ui/react";
import { DayOfWeek } from "utils/enum";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts";
import { IClass, ILecturer, IStudent } from "interfaces";
import { ClassService, LecturerService, StudentService } from "services";
import { set } from "react-hook-form";
import { WEEKDAYS } from "utils/constants";

function ClassPage() {
  const navigate = useNavigate();
  const { userInfor } = useAuth();
  const [studentDetail, setStudentDetail] = React.useState<IStudent>();
  const [classes, setClasses] = React.useState<IClass[]>([]);
  const [lecturers, setLecturers] = React.useState<ILecturer[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const student = await StudentService().getDetails(userInfor?.idCard!);
      const classes = await ClassService().get();
      const lecturers = await LecturerService().get();
      setStudentDetail(student);
      setClasses(classes);
      setLecturers(lecturers);
    };

    fetchData();
  }, []);

  // React.useEffect(() => {
  //   const fetchClassDetails = async () => {
  //     if (studentDetail && studentDetail.registeredClasses) {
  //       const details = await Promise.all(
  //         studentDetail.registeredClasses.map((classId) =>
  //           ClassService().getDetails(classId)
  //         )
  //       );
  //       setClassDetailsList(details);
  //     }
  //   };
  //   fetchClassDetails();
  // }, [studentDetail, ClassService()]);

  const handleClick = (classId: number) => {
    navigate(`${classId}`);
  };

  return (
    <PageLayout title="Classes">
      <ContainerLayout title="Class List">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Class</Th>
                <Th>Course</Th>
                <Th>Lecturer</Th>
                <Th isNumeric>Size</Th>
                <Th isNumeric>Start</Th>
                <Th isNumeric>End</Th>
                <Th>Day</Th>
                <Th>Room</Th>
                <Th isNumeric></Th>
              </Tr>
            </Thead>

            <Tbody>
              {classes
                .filter((x) =>
                  studentDetail?.registeredClasses?.includes(x.id!)
                )
                .map((cl) => (
                  <Tr
                    key={cl.classCode}
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                    role="group"
                    onClick={() => handleClick(cl.id!)}
                  >
                    <Td>{cl.classCode}</Td>
                    <Td>{cl.courseId}</Td>
                    <Td>
                      {
                        lecturers.find(
                          (lecturer) => lecturer.id === cl.lecturerId
                        )?.fullName
                      }
                    </Td>
                    <Td isNumeric>
                      {cl.students.length}/{cl.slot}
                    </Td>
                    <Td isNumeric>{cl.startTime}</Td>
                    <Td isNumeric>{cl.endTime}</Td>
                    <Td>{WEEKDAYS[cl.day - 1]}</Td>
                    <Td>{cl.roomId}</Td>
                    <Td isNumeric>
                      <Icon
                        as={BsChevronRight}
                        boxSize={5}
                        visibility="hidden"
                        _groupHover={{ visibility: "visible" }}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ContainerLayout>
    </PageLayout>
  );
}

export default ClassPage;
