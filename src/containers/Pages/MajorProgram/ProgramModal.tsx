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
} from "@chakra-ui/react";
import { ModalBox } from "components";
import DiscussionBoard from "../ClassDetail/DiscussionBoard";
import GradeList from "../ClassDetail/GradeList";
import GroupList from "../ClassDetail/GroupList";
import MemberList from "../ClassDetail/MemberList";

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
          <TabPanel>Updating</TabPanel>
        </TabPanels>
      </Tabs>
    </ModalBox>
  );
}

export default ProgramModal;
