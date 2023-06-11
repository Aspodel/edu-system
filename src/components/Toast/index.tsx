import * as React from "react";
import {
  ToastProps,
  HStack,
  Circle,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineCheck,
  AiOutlineExclamation,
  AiOutlineInfo,
} from "react-icons/ai";

interface IToastProps extends ToastProps {
  title?: string;
  type?: "Success" | "Error" | "Warning" | "Info";
  duration?: number;
  content?: string;
}

function Toast({
  title,
  content,
  duration = 5000,
  type = "Info",
}: IToastProps) {
  const renderType = (toastType: string) => {
    let toastInfor = { icon: <AiOutlineInfo />, color: "blue.500" };

    if (toastType == "Error") {
      toastInfor = { icon: <AiOutlineExclamation />, color: "red.500" };
    } else if (toastType == "Success") {
      toastInfor = { icon: <AiOutlineCheck />, color: "green.500" };
    } else if (toastType == "Warning") {
      toastInfor = { icon: <AiOutlineExclamation />, color: "yellow.500" };
    } else {
      toastInfor = { icon: <AiOutlineInfo />, color: "blue.500" };
    }

    return toastInfor;
  };

  return (
    <Box
      p={3}
      bg="white"
      borderRadius="base"
      boxShadow="xl"
      padding="5"
      borderLeft="5px solid"
      borderLeftColor={renderType(type).color}
      mt="10px"
      mr="10px"
      minW="300"
    >
      <HStack spacing={5} alignItems="start">
        <Circle size="20px" bg={renderType(type).color} color="white" p="1">
          {renderType(type).icon}
        </Circle>
        <Box>
          <Heading size="sm">{title ?? type}</Heading>
          <Text>{content}</Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default Toast;
