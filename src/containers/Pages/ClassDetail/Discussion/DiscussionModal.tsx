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
  Box,
  Flex,
} from "@chakra-ui/react";
import { IDiscussion, IMessage } from "interfaces";
import { useSignalR } from "hooks";
import { DiscussionService, MessageService } from "services";
import { useAuth } from "contexts";
import { formatDateToAMPM } from "utils/helper";

interface IDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  discussionId: IDiscussion | null;
}

function DiscussionModal({
  isOpen,
  onClose,
  discussionId,
}: IDiscussionModalProps) {
  const [discussionDetail, setDiscussionDetail] = React.useState<IDiscussion>();
  const {
    connection,
    setConnection,
    messages,
    sendMessage,
    hasNewMessages,
    setHasNewMessages,
  } = useSignalR(2);
  const { userInfor } = useAuth();
  const [message, setMessage] = React.useState<string>("");
  const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    console.log("first");
    if (discussionId) {
      console.log("run", discussionId);
      const fetchData = async () => {
        const discussion = await DiscussionService().getDetails(
          discussionId?.id!
        );
        setDiscussionDetail(discussion);
        console.log(discussion, "discussionDetail");
      };
      fetchData();
    }
  }, [discussionId]);

  React.useEffect(() => {
    const fetchData = async () => {
      const dis = await DiscussionService().getDetails(discussionDetail?.id!);
      setDiscussionDetail(dis);
      console.log(dis, "discussionDetail", "id", discussionId);
    };

    if (hasNewMessages && discussionDetail?.id) {
      fetchData();
      setHasNewMessages(false);
    }
  }, [hasNewMessages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let newMessage: IMessage = {
      content: message,
      discussionId: discussionId?.id!,
      senderId: userInfor?.id!,
    };
    const response = await MessageService().create(newMessage);

    if (response) {
      setMessage("");
    }
  };

  React.useEffect(() => {
    let connectionStopped = false;

    if (isOpen && discussionId) {
      // If the modal is open, start or restart the SignalR connection
      if (connection && connection.state === "Disconnected") {
        connection
          .start()
          .then(() => {
            console.log("SignalR connection established.");
            connection.invoke("JoinDiscussionGroup", 2);
          })
          .catch((error) =>
            console.error("Error connecting to SignalR hub: ", error)
          );
      }
    } else if (!isOpen && discussionId) {
      // If the modal is closed, stop the SignalR connection and clean up
      if (connection && connection.state === "Connected") {
        connection
          .invoke("LeaveDiscussionGroup", 2)
          .then(() => {
            console.log("Left discussion group in SignalR hub.");
            connectionStopped = true; // Mark the connection as stopped after leaving the group
            connection.stop(); // Stop the connection after leaving the group
          })
          .catch((error) =>
            console.error("Error leaving discussion group: ", error)
          );
      }
    }

    return () => {
      // Cleanup function to stop the connection if it wasn't stopped in the previous effect
      if (
        connection &&
        connection.state === "Connected" &&
        !connectionStopped
      ) {
        connection
          .stop()
          .then(() => {
            console.log("SignalR connection stopped (cleanup).");
          })
          .catch((error) => {
            console.error(
              "Error stopping SignalR connection (cleanup): ",
              error
            );
          });
      }
    };
  }, [connection, isOpen, discussionId]);

  React.useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [discussionDetail]);

  if (!discussionId) return <></>;
  return (
    <ModalBox
      title="Discussion"
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      footerButtons={[
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
            placeholder="Enter your comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>,
      ]}
    >
      <VStack spacing="10px" align="stretch" mb="40px">
        <Heading size="xl">{discussionDetail?.title}</Heading>
        <HStack spacing="10px">
          <Tag borderRadius="full" variant="solid" fontWeight="semibold">
            question
          </Tag>
          <Tag
            borderRadius="full"
            colorScheme="blue"
            variant="solid"
            fontWeight="semibold"
          >
            new
          </Tag>
        </HStack>
        <HStack spacing="10px" align="start" pt="15px">
          <Avatar
            name={discussionDetail?.creator?.fullName}
            src={discussionDetail?.creator?.avatar}
          />
          <VStack spacing="5px" align="start">
            <HStack spacing="5px" align="center">
              <Text fontWeight="semibold">
                {discussionDetail?.creator?.fullName}
              </Text>
              <Text fontSize="xs">
                at{" "}
                {discussionDetail?.createdAt
                  ? new Date(discussionDetail?.createdAt).toLocaleDateString(
                      "en-CA"
                    )
                  : ""}
              </Text>
            </HStack>
            <Text>{discussionDetail?.description}</Text>
          </VStack>
        </HStack>

        <Box
          ref={chatContainerRef} // Attach the ref to the scrollable container
          h="400px"
          overflowY="scroll"
          borderRadius="8px"
          __css={{
            overflow: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            overflowY: "scroll",
          }}
        >
          <Flex direction="column" gap="10px">
            {discussionDetail?.messages?.map((message, index, array) => {
              // Check if the current message is sent by the same sender as the previous one
              const sameSenderAsPrevious =
                index > 0 && message.senderId === array[index - 1].senderId;
              // Check if the current message is sent by the user (the sender is the same as the user)
              const isUserSender = message.senderId === userInfor?.id;

              return (
                <Flex
                  gap="10px"
                  key={message.id}
                  // justifyContent={isUserSender ? "flex-end" : "flex-start"}
                  direction={isUserSender ? "row-reverse" : "row"}
                >
                  {/* Render the avatar only in the first message of the same sender */}
                  {!sameSenderAsPrevious ? (
                    <Avatar
                      size="sm"
                      name={message.sender?.fullName}
                      src={message.sender?.avatar}
                      // Align the avatar to the right if the sender is the user
                      __css={{
                        alignSelf: isUserSender ? "flex-end" : "flex-start",
                      }}
                    />
                  ) : (
                    <Box h="32px" w="32px" />
                  )}
                  <Box>
                    {/* Render the sender's name only in the first message of the same sender */}
                    {!sameSenderAsPrevious && (
                      <Heading
                        size="xs"
                        textAlign={isUserSender ? "right" : "left"}
                      >
                        {message.sender?.fullName}
                      </Heading>
                    )}
                    <Flex
                      gap="10px"
                      align="center"
                      direction={isUserSender ? "row-reverse" : "row"}
                    >
                      <Box
                        borderRadius="5px"
                        bg="gray.100"
                        p="5px 10px"
                        maxW="65%"
                      >
                        {message.content}
                      </Box>
                      <Box fontSize="xs">
                        {formatDateToAMPM(message.createdAt)}
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </VStack>
    </ModalBox>
  );
}

export default DiscussionModal;
