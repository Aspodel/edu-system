import * as React from "react";
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
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { IAssignment, IFileSubmission } from "interfaces";
import { useParams } from "react-router-dom";
import { AssignmentService, SubmissionService } from "services";
import { CheckIcon } from "@chakra-ui/icons";
import AddGroupSubmissionModal from "./AddGroupSubmissionModal";
import { FcFile } from "react-icons/fc";

interface IGroupSubmissionProps {
  groupId: number;
}

function GroupSubmission({ groupId }: IGroupSubmissionProps) {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignments, setAssignments] = React.useState<IAssignment[]>([]);
  const [submissions, setSubmissions] = React.useState<IFileSubmission[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await AssignmentService().getByClass(Number(id));
      const grAssignment = response.filter((item) => item.assignmentType === 0);
      setAssignments(grAssignment);

      const subResponse = await SubmissionService().getFileByGroup(groupId);
      setSubmissions(subResponse);
      // console.log(subResponse);
    };
    fetchData();
  }, [id, isOpen, groupId]);

  return (
    <Box>
      <Heading size="md" mb={5}>
        Group Submission
      </Heading>
      <Accordion /* defaultIndex={[0, 1]} */ allowMultiple>
        {assignments.map((item) => (
          <AccordionItem key={item.id}>
            <AccordionButton>
              <Heading as="span" size="sm" flex="1" textAlign="left">
                {item.title}
              </Heading>
              <Box
                w="25px"
                h="25px"
                borderRadius="50%"
                fontWeight="700"
                color={
                  submissions.filter((sub) => sub.assignmentId === item.id)
                    .length
                    ? "green.500"
                    : "gray.400"
                }
                bg={
                  submissions.filter((sub) => sub.assignmentId === item.id)
                    .length
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
                <Flex gap="20px" mt="10px">
                  <Heading size="sm">Your group submission:</Heading>
                  <Box>
                    {submissions.filter((sub) => sub.assignmentId === item.id)
                      .length ? (
                      submissions
                        .filter((sub) => sub.assignmentId === item.id)
                        .map((sub) => (
                          <Flex gap="10px" align="start" key={Math.random()}>
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
                      <Box mt="-2px">No submission</Box>
                    )}
                  </Box>
                </Flex>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <AddGroupSubmissionModal
        isOpen={isOpen}
        onClose={onClose}
        groupId={groupId}
        groupAssignment={assignments}
      />

      <Flex mt="40px" mb="-20px" w="100%">
        {/* <Button key={Math.random()} colorScheme="gray">
          {submissions.map((sub) => (
            <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" />
          ))}
          Download all
        </Button> */}
        <Button ml="auto" onClick={onOpen}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
}

export default GroupSubmission;
