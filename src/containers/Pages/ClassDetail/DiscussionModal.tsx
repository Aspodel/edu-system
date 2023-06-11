import * as React from "react";
import { ModalBox } from "components";
import {
  VStack,
  Text,
  Heading,
  Button,
  Input,
  HStack,
  Tag,
  Avatar,
} from "@chakra-ui/react";

interface Discussion {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

interface IDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  discussion?: Discussion;
}

function DiscussionModal({
  isOpen,
  onClose,
  discussion,
}: IDiscussionModalProps) {
  return (
    <ModalBox
      title="Discussion"
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      footerButtons={[
        <Input w="100%" variant="outline" mr="15px" />,
        <Button>Send</Button>,
      ]}
    >
      <VStack spacing="10px" align="stretch" mb="40px">
        <Heading size="xl">{discussion?.title}</Heading>
        <HStack spacing="10px">
          <Tag borderRadius="full" variant="solid" fontWeight="semibold">
            question
          </Tag>
          <Tag borderRadius="full" variant="solid" fontWeight="semibold">
            code
          </Tag>
        </HStack>
        <HStack spacing="10px" align="start" pt="15px">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <VStack spacing="5px" align="start">
            <HStack spacing="5px" align="center">
              <Text fontWeight="semibold">{discussion?.createdBy}</Text>
              <Text fontSize="xs">Today at 15:30</Text>
            </HStack>
            <Text>{discussion?.content}</Text>
          </VStack>
        </HStack>
      </VStack>
    </ModalBox>
  );
}

export default DiscussionModal;
