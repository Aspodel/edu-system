import * as React from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { IStudentClass } from "interfaces";
import { BsThreeDotsVertical } from "react-icons/bs";

interface IGroupInforProps {
  projectName?: string;
  members?: IStudentClass[];
}

function GroupInfor({ projectName, members }: IGroupInforProps) {
  return (
    <Flex direction="column" gap="10px">
      <Flex align="start">
        <Heading mt="1px" mr="15px" size="md">
          Project:
        </Heading>
        <Text fontSize="lg">{projectName}</Text>
      </Flex>

      <Divider />

      <Heading size="md">Team member</Heading>
      {members?.map((member) => (
        <Flex
          gap="4"
          p="10px 10px"
          key={member.studentId}
          // _hover={{ bg: "gray.100", borderRadius: "5px" }}
        >
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={member.student?.fullName}
              src={member.student?.avatar}
            />

            <Flex align="start" direction="column" justify="center">
              <Heading size="sm">{member.student?.fullName}</Heading>
              <Text fontSize="sm" color="gray.500">
                {member.student?.idCard}
              </Text>
            </Flex>
          </Flex>

          <Flex align="center" gap="5px">
            <Heading size="sm">{"Member"}</Heading>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export default GroupInfor;
