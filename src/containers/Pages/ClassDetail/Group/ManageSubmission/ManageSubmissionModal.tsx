import * as React from "react";
import { ModalBox } from "components";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  useDisclosure,
  Link,
  Table,
  Td,
  Tr,
  Tbody,
} from "@chakra-ui/react";
import AddGroupAssignment from "./AddGroupAssignment";
import { IAssignment, IFileSubmission, IGroup, ISubmission } from "interfaces";
import { useParams } from "react-router-dom";
import { AssignmentService, GroupService, SubmissionService } from "services";
import { CheckIcon } from "@chakra-ui/icons";
import { FcFile } from "react-icons/fc";

interface IManageSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ManageSubmissionModal({
  isOpen,
  onClose,
}: IManageSubmissionModalProps) {
  const { id } = useParams<{ id: string }>();
  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();
  const [assignments, setAssignments] = React.useState<IAssignment[]>([]);
  const [submissions, setSubmissions] = React.useState<IFileSubmission[]>([]);
  const [groups, setGroups] = React.useState<IGroup[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await AssignmentService().getByClass(Number(id));
      const grAssignment = response.filter((item) => item.assignmentType === 0);
      setAssignments(grAssignment);
      // console.log("grAssignment", grAssignment);

      const subResponse = await SubmissionService().getFileByClass(Number(id));
      setSubmissions(subResponse);
      // console.log("subResponse", subResponse);

      const groupResponse = await GroupService().getByClass(Number(id));
      setGroups(groupResponse);
      // console.log("groupResponse", groupResponse);
    };
    fetchData();
  }, [id, isOpen, isOpenAddModal]);

  return (
    <ModalBox
      title="Manage Submission"
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={[<Button onClick={onOpenAddModal}>Add</Button>]}
    >
      <AddGroupAssignment isOpen={isOpenAddModal} onClose={onCloseAddModal} />
      <Accordion allowMultiple>
        {assignments.map((item) => (
          <AccordionItem key={item.id}>
            <AccordionButton>
              <Heading as="span" size="md" flex="1" textAlign="left">
                {item.title}
              </Heading>
              <Box
                w="25px"
                h="25px"
                borderRadius="50%"
                fontWeight="700"
                color={
                  groups.every((group) =>
                    submissions.some(
                      (sub) =>
                        sub.groupId === group.id && sub.assignmentId === item.id
                    )
                  )
                    ? "green.500"
                    : "gray.400"
                }
                bg={
                  groups.every((group) =>
                    submissions.some(
                      (sub) =>
                        sub.groupId === group.id && sub.assignmentId === item.id
                    )
                  )
                    ? "green.100"
                    : "gray.100"
                }
              >
                <CheckIcon p="2px" />
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box>
                <Box>{item.description}</Box>
                <Heading mt="20px" size="sm">
                  Group submissions:
                </Heading>
                <Table mt="15px" variant="unstyled">
                  <Tbody>
                    {groups.map((group, index) => (
                      <Tr key={group.id}>
                        <Td>{`Group ${index + 1} - ${group.name}:`}</Td>
                        <Td>
                          {submissions.filter(
                            (sub) =>
                              sub.assignmentId === item.id &&
                              sub.groupId === group.id
                          ).length ? (
                            submissions
                              .filter(
                                (sub) =>
                                  sub.assignmentId === item.id &&
                                  sub.groupId === group.id
                              )
                              .map((sub) => (
                                <Flex
                                  gap="10px"
                                  align="start"
                                  key={Math.random()}
                                >
                                  <Icon as={FcFile} boxSize={5} />
                                  <Link
                                    href={sub.fileUrl}
                                    isExternal
                                    color="blue.500"
                                  >
                                    {sub.fileName}
                                  </Link>
                                </Flex>
                              ))
                          ) : (
                            <Box>No submission</Box>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </ModalBox>
  );
}

export default ManageSubmissionModal;
