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
  DiscussionService,
  sendMessage,
  startConnection,
  stopConnection,
} from "services";
import { useAuth } from "contexts";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import AddDiscussionModal from "./AddDiscussionModal";
import { IDiscussion } from "interfaces";
import { useParams } from "react-router-dom";

function DiscussionBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();
  const { id } = useParams<{ id: string }>();
  const { userInfor } = useAuth();
  const [discussions, setDiscussions] = React.useState<IDiscussion[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] =
    React.useState<IDiscussion | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await DiscussionService().getByClass(Number(id));
      const filter = response.filter((item) => item.type === 0);
      setDiscussions(filter);
    };
    fetchData();
  }, [id, isOpenAddModal]);

  return (
    <ContainerLayout
      title="Discussion Board"
      btnList={[
        <Button key={Math.random()} onClick={onOpenAddModal}>
          Add
        </Button>,
      ]}
    >
      <DiscussionModal
        isOpen={isOpen}
        onClose={onClose}
        discussionId={selectedDiscussion}
      />
      <AddDiscussionModal isOpen={isOpenAddModal} onClose={onCloseAddModal} />

      {discussions.map((discussion) => (
        <VStack
          spacing="8px"
          key={discussion.id}
          p="16px"
          align="stretch"
          bgColor="gray.100"
          mb="18px"
          borderRadius="10px"
          cursor="pointer"
          onClick={() => {
            setSelectedDiscussion(discussion);
            onOpen();
          }}
        >
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
              New
            </Tag>
          </HStack>
          <Heading size="md">
            <HStack spacing="10px">
              <Text>{discussion.title}</Text>
              {/* <Tag
                fontWeight="semibold"
                variant="solid"
                colorScheme="blue"
                size="lg"
              >
                New
              </Tag> */}
            </HStack>
          </Heading>
          <Text color="GrayText" fontSize="sm">
            {discussion.createdAt
              ? new Date(discussion.createdAt).toLocaleDateString("en-CA")
              : ""}{" "}
            by {discussion.creator?.fullName}
          </Text>
        </VStack>
      ))}
    </ContainerLayout>
  );
}

export default DiscussionBoard;
