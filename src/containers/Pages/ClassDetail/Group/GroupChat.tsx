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
import {
  ICreateDiscussionModel,
  IDiscussion,
  IGroup,
  IMessage,
} from "interfaces";
import * as React from "react";
import { useParams } from "react-router-dom";
import { DiscussionService, GroupService, MessageService } from "services";
import { BASE_URL } from "utils/constants";
import { formatDateToAMPM } from "utils/helper";

interface IGroupChatProps {
  groupId: number;
}

function GroupChat({ groupId }: IGroupChatProps) {
  const { id } = useParams<{ id: string }>();
  const [discussionDetail, setDiscussionDetail] = React.useState<IDiscussion>();
  const [groupDetail, setGroupDetail] = React.useState<IGroup>();
  const [message, setMessage] = React.useState<string>("");
  const { userInfor } = useAuth();
  const [reload, setReload] = React.useState<boolean>(false);
  const [hubConnection, setHubConnection] =
    React.useState<HubConnection | null>(null);

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
    if (reload) {
      const fetchData = async () => {
        const discussion = await DiscussionService().getDetails(
          discussionDetail?.id!
        );
        setDiscussionDetail(discussion);
        console.log(discussion, "discussionDetail");
        setReload(false);
      };
      fetchData();
    }
  }, [reload]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let newMessage: IMessage = {
      content: message,
      discussionId: discussionDetail?.id!,
      senderId: userInfor?.id!,
    };
    // const response = await MessageService().create(newMessage);
    // console.log(response, "newMessage");
    // console.log(userInfor?.id!, "userInfor?.id!");
    sendMessage(newMessage);
    setMessage("");

    // if (response) {
    //   setReload(true);
    //   setMessage("");
    // }
  };

  // Initialize the hub connection
  React.useEffect(() => {
    // Wrap the createHubConnection inside a useEffect with an empty dependency array
    const createHubConnection = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7264/hub")
        .configureLogging(LogLevel.Information)
        .build();

      // ... (previous event listeners and configurations)

      try {
        console.log("Starting hub connection...");
        await connection.start();
        console.log("Hub connection started.");

        joinDiscussion(discussionDetail?.id!);

        // Set the hubConnection state
        setHubConnection(connection);
      } catch (error) {
        console.error("Error starting hub connection:", error);
      }
    };

    createHubConnection();

    // Clean up the connection on component unmount
    return () => {
      if (hubConnection && hubConnection.state === "Connected") {
        console.log("Leaving discussion and stopping hub connection...");
        leaveDiscussion(discussionDetail?.id!);
        hubConnection
          .stop()
          .then(() => {
            console.log("Hub connection stopped.");
          })
          .catch((error) => {
            console.error("Error stopping hub connection:", error);
          });
      }
    };
  }, []);

  const sendMessage = async (message: IMessage) => {
    console.log("sendMessage", message);
    try {
      console.log("hubConnection state:", hubConnection?.state);
      if (hubConnection && hubConnection.state === "Connected") {
        console.log("Before running");
        await hubConnection.invoke("SendMessage", message);
        console.log("Message sent successfully.");
      } else {
        console.log(
          "Hub connection is not in 'Connected' state. Waiting for connection..."
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const joinDiscussion = async (discussionId: number) => {
    try {
      if (hubConnection && hubConnection.state === "Connected") {
        await hubConnection.invoke("JoinDiscussion", discussionId);
      }
    } catch (error) {
      console.error("Error joining discussion:", error);
    }
  };

  const leaveDiscussion = async (discussionId: number) => {
    try {
      if (hubConnection && hubConnection.state === "Connected") {
        await hubConnection.invoke("LeaveDiscussion", discussionId);
      }
    } catch (error) {
      console.error("Error leaving discussion:", error);
    }
  };

  // Join the discussion group when the connection is established
  React.useEffect(() => {
    if (hubConnection && hubConnection.state === "Connected") {
      // Add event listeners for receiving messages
      hubConnection.on("ReceiveMessage", (message: IMessage) => {
        // Handle the received message
        console.log("Received message:", message);
        // Update your messages state with the new message
        // For example, you can use setMessageState((prevMessages) => [...prevMessages, message]);
      });

      // Start the connection
      hubConnection
        .start()
        .then(() => {
          console.log("Hub connection started.");
          // Join the discussion group when the connection is established
          joinDiscussion(discussionDetail?.id!);
        })
        .catch((error) => {
          console.error("Error starting hub connection:", error);
        });

      // Clean up the connection on component unmount
      return () => {
        if (hubConnection && hubConnection.state === "Connected") {
          leaveDiscussion(discussionDetail?.id!);
          hubConnection.stop();
        }
      };
    }
  }, [hubConnection, discussionDetail]);

  return (
    <Box>
      <Box>
        <Heading size="md">{discussionDetail?.title}</Heading>
        <Box>{groupDetail?.students.length} members</Box>
      </Box>

      <Box position="relative" padding="8">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Conversation started
        </AbsoluteCenter>
      </Box>

      <Box
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
        {/* <Flex direction="column" gap="10px">
          {discussionDetail?.messages?.map((message) => (
            <Flex gap="10px" key={message.id}>
              <Avatar
                size="sm"
                name={message.sender?.fullName}
                src={message.sender?.avatar}
              />
              <Box>
                <Heading size="xs">{message.sender?.fullName}</Heading>
                <Flex gap="10px" align="center">
                  <Box borderRadius="5px" bg="gray.100" p="5px 10px">
                    {message.content}
                  </Box>
                  <Box fontSize="xs">{formatDateToAMPM(message.createdAt)}</Box>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Flex> */}
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
