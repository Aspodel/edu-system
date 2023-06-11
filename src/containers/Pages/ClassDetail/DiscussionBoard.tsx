import * as React from "react";
import { ContainerLayout } from "containers";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Tag,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DiscussionModal from "./DiscussionModal";
import {
  sendMessage,
  sendToSpecificUser,
  startConnection,
  stopConnection,
} from "services";
import { useAuth } from "contexts";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const data = [
  {
    id: "1",
    title: "How to use this framework?",
    createdAt: "3 minutes ago",
    createdBy: "Harry Potter",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
  },
  {
    id: "2",
    title: "Where is the main function?",
    createdAt: "5 minutes ago",
    createdBy: "Ronald Weasley",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
  },
];

function DiscussionBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userInfor = useAuth().userInfor;

  // const [connection, setConnection] = React.useState<HubConnection | undefined>(
  //   undefined
  // );

  // React.useEffect(() => {
  //   if (userInfor) {
  //     console.log(userInfor);
  //     setConnection(startConnection(userInfor.accessToken));
  //   }
  // }, [userInfor]);

  // const handleSendMessage = (message: string) => {
  //   sendMessage(connection, message);
  // };

  // const handleSendToSpecificUser = (userId: string, message: string) => {
  //   sendToSpecificUser(connection, userId, message);
  // };

  // React.useEffect(() => {
  //   if (connection) {
  //     connection.on("ReceiveMessage", (message) => {
  //       console.log(message);
  //     });
  //   }
  // }, [connection]);

  // React.useEffect(() => {
  //   return () => {
  //     stopConnection(connection);
  //   };
  // }, [connection]);

  return (
    <ContainerLayout
      title="Discussion Board"
      btnList={[<Button key={Math.random()}>Add</Button>]}
    >
      <DiscussionModal isOpen={isOpen} onClose={onClose} discussion={data[0]} />
      {/* <button
        onClick={() => {
          handleSendMessage("Testing on the way");
        }}
      >
        Send Message
      </button> */}

      {data.map((discussion) => (
        <VStack
          spacing="8px"
          key={discussion.id}
          p="16px"
          align="stretch"
          bgColor="gray.100"
          mb="18px"
          borderRadius="10px"
          cursor="pointer"
          onClick={onOpen}
        >
          <HStack spacing="10px">
            <Tag borderRadius="full" variant="solid" fontWeight="semibold">
              question
            </Tag>
            <Tag borderRadius="full" variant="solid" fontWeight="semibold">
              code
            </Tag>
          </HStack>
          <Heading size="md">
            <HStack spacing="10px">
              <Text>{discussion.title}</Text>
              <Tag
                fontWeight="semibold"
                variant="solid"
                colorScheme="blue"
                size="lg"
              >
                New
              </Tag>
            </HStack>
          </Heading>
          <Text color="GrayText" fontSize="sm">
            {discussion.createdAt} by {discussion.createdBy}
          </Text>
        </VStack>
      ))}
    </ContainerLayout>
  );
}

export default DiscussionBoard;
