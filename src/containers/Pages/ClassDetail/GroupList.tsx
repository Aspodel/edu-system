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
} from "@chakra-ui/react";
import { ContainerLayout } from "containers";
import { group } from "console";

const data = [
  {
    id: 1,
    name: "Group 1",
    projectName: "Library Management System",
    members: ["Harry Potter", "Ronald Weasley", "Hermione Granger"],
  },
  {
    id: 2,
    name: "Group 2",
    projectName: "Hospital Management System",
    members: ["Teddy Lupin", "Luna Lovegood", "Neville Longbottom"],
  },
];

function GroupList() {
  return (
    <ContainerLayout
      title="Group List"
      btnList={[
        <Button colorScheme="gray" variant="ghost">
          Export Excel
        </Button>,
        <Button colorScheme="gray" variant="ghost">
          Edit
        </Button>,
        <Button>Add</Button>,
      ]}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Group</Th>
              <Th>Project Name</Th>
              <Th>Members</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((group) => (
              <Tr
                key={group.id}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                role="group"
              >
                <Td>{group.id}</Td>
                <Td>{group.name}</Td>
                <Td>{group.projectName}</Td>
                <Td>{group.members.join(", ")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default GroupList;
