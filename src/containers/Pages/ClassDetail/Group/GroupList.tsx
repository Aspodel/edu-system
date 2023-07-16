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
  useDisclosure,
} from "@chakra-ui/react";
import { ContainerLayout } from "containers";
import { GroupService } from "services";
import { IGroup } from "interfaces";
import GroupDetailModal from "./GroupDetailModal";
import { useParams } from "react-router-dom";
import EditGroupListModal from "./EditGroupListModal";
import ManageSubmissionModal from "./ManageSubmission/ManageSubmissionModal";

function GroupList() {
  let { id } = useParams<{ id: string }>();
  const [groups, setGroups] = React.useState<IGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSubModal,
    onOpen: onOpenSubModal,
    onClose: onCloseSubModal,
  } = useDisclosure();

  const {
    isOpen: isOpenGroupList,
    onOpen: onOpenGroupList,
    onClose: onCloseGroupList,
  } = useDisclosure();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GroupService().getByClass(Number(id));
      setGroups(response);
      // console.log(response);
    };
    fetchData();
  }, [id, isOpenGroupList]);

  return (
    <ContainerLayout
      title="Group List"
      btnList={[
        // <Button colorScheme="gray" variant="ghost">
        //   Export
        // </Button>,
        <Button variant="outline" onClick={onOpenSubModal}>
          Submission
        </Button>,
        <Button onClick={onOpenGroupList}>Add</Button>,
      ]}
    >
      <GroupDetailModal
        isOpen={isOpen}
        onClose={onClose}
        groupId={selectedGroup}
      />
      <EditGroupListModal isOpen={isOpenGroupList} onClose={onCloseGroupList} />
      <ManageSubmissionModal
        isOpen={isOpenSubModal}
        onClose={onCloseSubModal}
      />

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Group</Th>
              <Th>Project Name</Th>
              <Th>Members</Th>
            </Tr>
          </Thead>

          <Tbody>
            {groups.map((group, index) => (
              <Tr
                key={group.id}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                role="group"
                onClick={() => {
                  setSelectedGroup(group.id!);
                  onOpen();
                }}
              >
                <Td>{index + 1}</Td>
                <Td>{group.name}</Td>
                <Td>{group.projectName}</Td>
                <Td>
                  {group.students
                    .map((student) => student.student?.fullName)
                    .join(", ")}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default GroupList;
