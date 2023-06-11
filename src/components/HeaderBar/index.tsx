import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
// import { AiOutlineBell, AiOutlineMessage } from "react-icons/ai";
import { CiBellOn, CiChat2 } from "react-icons/ci";

function HeaderBar() {
  const color = useColorModeValue("white", "gray.800");

  return (
    <Flex
      justify="flex-end"
      align="center"
      p="24px 40px"
      gap="30px"
      boxShadow={useColorModeValue(
        "inset 1px 0px 0px #F4F4F4, inset 0 -1px 0px #EFEFEF",
        "inset 1px 0px 0px #111315, inset 0 -1px 0px #111315"
      )}
    >
      <Icon as={CiChat2} boxSize={7} />
      <Icon as={CiBellOn} boxSize={7} />
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
    </Flex>
  );
}

export default HeaderBar;
