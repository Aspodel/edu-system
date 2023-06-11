import * as React from "react";
import { ContainerLayout, PageLayout } from "containers";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import ProgramModal from "./ProgramModal";

const data = [
  {
    courseCode: "IT001",
    name: "Object Oriented Programming",
    credit: 4,
    gpaCalculate: true,
    department: "IT",
    prerequisite: [],
    description:
      "This course is about object oriented programming. This course is prerequisite for Data Structure and Algorithm and many other courses.",
  },
  {
    courseCode: "IT014",
    name: "Data Structure and Algorithm",
    credit: 4,
    gpaCalculate: true,
    department: "IT",
    prerequisite: ["Object Oriented Programming", "Discrete Mathematics"],
    description: "This course is about data structure and algorithm",
  },
  {
    courseCode: "IT015",
    name: "Web Application Development",
    credit: 4,
    gpaCalculate: true,
    department: "IT",
    prerequisite: ["Object Oriented Programming", "Database Management System"],
  },
  {
    courseCode: "PH001",
    name: "Physics 1",
    credit: 3,
    gpaCalculate: true,
    department: "Physics",
    prerequisite: [],
  },
  {
    courseCode: "PH001",
    name: "Physics 2",
    credit: 3,
    gpaCalculate: true,
    department: "Physics",
    prerequisite: [],
  },
];

function MajorProgramPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <PageLayout title="Major Program">
      <ContainerLayout title="Computer Science Major">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Code</Th>
                <Th>Name</Th>
                <Th isNumeric>Credits</Th>
                <Th>Department</Th>
                <Th>Prerequisite</Th>
                <Th>Gpa Calculate</Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.map((item) => (
                <Tr key={item.courseCode} onClick={onOpen} cursor="pointer">
                  <Td>{item.courseCode}</Td>
                  <Td>{item.name}</Td>
                  <Td isNumeric>{item.credit}</Td>
                  <Td>{item.department}</Td>
                  <Td maxW="485px">{item.prerequisite.join(", ")}</Td>
                  <Td textAlign="center">{item.gpaCalculate ? "Yes" : "No"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ContainerLayout>

      <ProgramModal isOpen={isOpen} onClose={onClose} courseProgram={data[0]} />
    </PageLayout>
  );
}

export default MajorProgramPage;
