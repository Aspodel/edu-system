import * as React from "react";
import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useAuth } from "contexts";
import { useSignalR } from "hooks";
import {
  ICreateDiscussionModel,
  IDiscussion,
  IGroup,
  IMessage,
} from "interfaces";
import { useParams } from "react-router-dom";
import {
  DiscussionService,
  GroupService,
  MessageService,
  sendMessage,
  startConnection,
  stopConnection,
} from "services";
import { BASE_URL } from "utils/constants";
import { formatDateToAMPM } from "utils/helper";

interface IGroupChatProps {
  groupId: number;
  isOpen: boolean;
  onClose: () => void;
}

function GroupChat({ groupId, isOpen, onClose }: IGroupChatProps) {
  const { id } = useParams<{ id: string }>();
  const [discussionDetail, setDiscussionDetail] = React.useState<IDiscussion>();
  const [groupDetail, setGroupDetail] = React.useState<IGroup>();
  const [message, setMessage] = React.useState<string>("");
  const { userInfor } = useAuth();
  const [reload, setReload] = React.useState<boolean>(false);
  const {
    connection,
    setConnection,
    messages,
    sendMessage,
    hasNewMessages,
    setHasNewMessages,
  } = useSignalR(2);

  React.useEffect(() => {
    const fetchData = async () => {
      const groupResponse = await GroupService().getDetails(groupId);
      setGroupDetail(groupResponse);
      //   console.log(groupResponse, "groupDetail");

      const discussionResponse = await DiscussionService().getByGroup(groupId);
      setDiscussionDetail(discussionResponse);
      //   console.log(discussionResponse, "discussionDetail");

      if (!discussionResponse?.id) {
        let newItem: ICreateDiscussionModel = {
          title: "Group chat of " + groupResponse?.name,
          type: 1,
          groupId: groupId,
          classId: Number(id),
        };

        const response = await DiscussionService().createDiscussion(newItem);
        setDiscussionDetail(response);
        // console.log(response, "discussionDetail");
      }
    };
    fetchData();
  }, [groupId]);

  React.useEffect(() => {
    const fetchData = async () => {
      const discussion = await DiscussionService().getDetails(
        discussionDetail?.id!
      );
      setDiscussionDetail(discussion);
      console.log(discussion, "discussionDetail");
      // setReload(false);
    };

    if (hasNewMessages) {
      fetchData();
      setHasNewMessages(false); // Reset the hasNewMessages state after reloading
    }
  }, [hasNewMessages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let newMessage: IMessage = {
      content: message,
      discussionId: discussionDetail?.id!,
      senderId: userInfor?.id!,
    };
    const response = await MessageService().create(newMessage);
    console.log(response, "newMessage");
    console.log(userInfor?.id!, "userInfor?.id!");

    // sendMessage(message);
    // setMessage("");

    if (response) {
      //   setReload(true);
      setMessage("");
    }
  };

  React.useEffect(() => {
    if (isOpen) {
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
    } else {
      // If the modal is closed, stop the SignalR connection and clean up
      if (connection && connection.state !== "Disconnected") {
        connection.invoke("LeaveDiscussionGroup", 2);
        connection
          .stop()
          .then(() => {
            console.log("SignalR connection stopped.");
            // Set the connection to null to clean up
            setConnection(null);
          })
          .catch((error) =>
            console.error("Error stopping SignalR connection: ", error)
          );
      }
    }
  }, [connection, isOpen]);

  const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [discussionDetail]);

  return (
    <Box>
      <Box>
        <Heading size="md">{discussionDetail?.title}</Heading>
        <Box>{groupDetail?.students.length} members</Box>
      </Box>

      {/* <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.userId}: </strong>
            {message.content}
          </div>
        ))}
      </div> */}

      <Box position="relative" padding="8">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Conversation started
        </AbsoluteCenter>
      </Box>

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

      <Flex mt="20px">
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            // onSubmit={handleSubmit}
          />
          {/* <Button onSubmit={handleSubmit}>Send</Button> */}
        </form>
      </Flex>
    </Box>
  );
}

export default GroupChat;
