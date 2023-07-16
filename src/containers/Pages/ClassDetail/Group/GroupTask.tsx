import * as React from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IToDoList } from "interfaces";
import { ToDoListService } from "services";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import TaskModal from "./Task/TaskModal";
import TaskListModal from "./Task/TaskListModal";
import { formatLongDate } from "utils/helper";

interface IGroupTaskProps {
  groupId: number;
}

function GroupTask({ groupId }: IGroupTaskProps) {
  const [tasks, setTasks] = React.useState<IToDoList[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTaskList,
    onOpen: onOpenTaskList,
    onClose: onCloseTaskList,
  } = useDisclosure();
  const [selectedTask, setSelectedTask] = React.useState<number>();
  const [selectedTaskList, setSelectedTaskList] = React.useState<number>();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await ToDoListService().getByGroup(groupId);
      setTasks(response);
      // console.log(response);
    };
    fetchData();
  }, [groupId, isOpen, isOpenTaskList]);

  return (
    <Flex direction="column" gap="20px">
      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        taskId={selectedTask}
        taskListId={selectedTaskList}
        groupId={groupId}
      />
      {tasks.map((task) => (
        <Flex
          direction="column"
          key={Math.random()}
          // w="min(300px, 50%)"
          gap="10px"
        >
          <Flex align="center" justify="space-between">
            <Heading size="md" display="flex" alignItems="center" gap="8px">
              {task.title}
              <Flex
                borderRadius="50%"
                w="25px"
                h="25px"
                fontSize="sm"
                backgroundColor="gray.100"
                align="center"
                justify="center"
              >
                {task.items?.length}
              </Flex>
            </Heading>

            <Flex>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                fontSize={10}
                icon={<AddIcon />}
                onClick={() => {
                  setSelectedTask(undefined);
                  setSelectedTaskList(task.id);
                  onOpen();
                }}
              />
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDots />}
              />
            </Flex>
          </Flex>
          {/* <Text color="gray.500">{task.description}</Text> */}

          <Flex gap="20px" flexWrap="wrap" p="0 45px">
            {task.items &&
              task.items.map((item) => (
                <Flex
                  key={Math.random()}
                  direction="column"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
                  p="0.5rem"
                  borderRadius="5px"
                  minW="300px"
                >
                  <Flex align="center" justify="space-between">
                    <Heading size="sm">{item.title}</Heading>
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={<BsThreeDotsVertical />}
                      onClick={() => {
                        setSelectedTask(item.id);
                        onOpen();
                      }}
                    />
                  </Flex>
                  <Text color="gray.500">{item.description}</Text>

                  <Divider mb="10px" p="12px 0" mt="auto" />

                  <Flex align="center" justify="space-between" minH="32px">
                    <Text color="gray.500" fontSize="sm">
                      {item.deadline
                        ? "Due at: " + formatLongDate(item.deadline)
                        : ""}
                    </Text>

                    <AvatarGroup spacing="1rem">
                      {item.students &&
                        item.students.map((student) => (
                          <Avatar
                            key={Math.random()}
                            name={student.student?.fullName}
                            src={student.student?.avatar}
                            size="sm"
                            icon={<AiOutlineUser />}
                          />
                        ))}
                    </AvatarGroup>
                  </Flex>
                </Flex>
              ))}
          </Flex>
        </Flex>
      ))}

      <Flex>
        <Button ml="auto" onClick={onOpenTaskList}>
          Add
        </Button>
      </Flex>
      <TaskListModal
        isOpen={isOpenTaskList}
        onClose={onCloseTaskList}
        groupId={groupId}
      />
    </Flex>
  );
}

export default GroupTask;
