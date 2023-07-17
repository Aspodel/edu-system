import * as React from "react";
import {
  Button,
  Heading,
  VStack,
  Text,
  Flex,
  HStack,
  Box,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
  Tbody,
  Avatar,
  Table,
  Td,
  Tr,
} from "@chakra-ui/react";
import { ModalBox } from "components";
import DiscussionBoard from "../ClassDetail/Discussion/DiscussionBoard";
import GradeList from "../ClassDetail/GradeList";
import GroupList from "../ClassDetail/Group/GroupList";
import MemberList from "../ClassDetail/MemberList";
import { BsStarFill } from "react-icons/bs";

interface CourseProgram {
  courseCode: string;
  name: string;
  credit: number;
  gpaCalculate: boolean;
  department: string;
  prerequisite: string[];
  description?: string;
}

interface IProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseProgram: CourseProgram;
}

function ProgramModal({ isOpen, onClose, courseProgram }: IProgramModalProps) {
  return (
    <ModalBox
      title="Course Information"
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      footerButtons={[
        <Button onClick={onClose} colorScheme="gray">
          Close
        </Button>,
      ]}
    >
      <Tabs variant="solid-rounded">
        <TabList mb="14px">
          <Tab>Details</Tab>
          <Tab>Reviews</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid gridTemplateColumns={"120px 1fr"} gap={2} alignItems="center">
              <Heading size="sm">Code:</Heading>
              <Text>{courseProgram.courseCode}</Text>
              <Heading size="sm">Name:</Heading>
              <Text>{courseProgram.name}</Text>
              <Heading size="sm" alignSelf="start" mt="2px">
                Description:
              </Heading>
              <Text>{courseProgram.description}</Text>
              <Heading size="sm">Credit:</Heading>
              <Text>{courseProgram.credit}</Text>
              <Heading size="sm">Difficulty:</Heading>
              <Text>3/5</Text>
              <Heading size="sm">Advice:</Heading>
              <Text>
                This course should be studied in the first semester of the
                second year
              </Text>
              <Heading size="sm">Prerequisite:</Heading>
              <Text>{courseProgram.prerequisite.join(", ")} None</Text>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Flex direction="column">
              <Flex gap="50px" align="center">
                <Flex direction="column" gap="15px">
                  <Heading size="3xl">5</Heading>
                  <Flex gap="10px">
                    <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                    <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                    <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                    <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                    <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                  </Flex>
                  <Box color="gray.500">Based on 1 reviews</Box>
                </Flex>
                <Box>
                  <Flex align="center" gap="10px">
                    <Box>5</Box>
                    <Box
                      h="7px"
                      w="350px"
                      borderRadius="35px"
                      bg="yellow.400"
                    />
                  </Flex>
                  <Flex align="center" gap="10px">
                    <Box>4</Box>
                    <Box h="7px" w="350px" borderRadius="35px" bg="gray.300" />
                  </Flex>
                  <Flex align="center" gap="10px">
                    <Box>3</Box>
                    <Box h="7px" w="350px" borderRadius="35px" bg="gray.300" />
                  </Flex>
                  <Flex align="center" gap="10px">
                    <Box>2</Box>
                    <Box h="7px" w="350px" borderRadius="35px" bg="gray.300" />
                  </Flex>
                  <Flex align="center" gap="10px">
                    <Box>1</Box>
                    <Box h="7px" w="350px" borderRadius="35px" bg="gray.300" />
                  </Flex>
                </Box>
              </Flex>

              <Table mt="50px" variant="unstyled">
                <Tbody>
                  <Tr>
                    <Td alignContent="center">
                      <Flex gap="10px" align="center">
                        <Avatar src="" name="Peter Pan" />
                        <Box>
                          <Heading size="sm">Peter Pan</Heading>
                          <Text fontSize="sm">ITIT20001</Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td alignContent="center">
                      <Flex gap="10px">
                        <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                        <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                        <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                        <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                        <Icon color="yellow.400" as={BsStarFill} boxSize={4} />
                      </Flex>
                      <Text fontSize="md" mt="5px">
                        This course is very good
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ModalBox>
  );
}

export default ProgramModal;
