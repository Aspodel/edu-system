import * as React from "react";
import { ModalBox } from "components";
import {
  ICreateToDoItemModel,
  IGroup,
  IStudentClass,
  IStudentTask,
  IToDoItem,
} from "interfaces";
import { GroupService, ToDoItemService } from "services";
import {
  Avatar,
  Button,
  CheckboxGroup,
  Flex,
  Heading,
  Input,
  Checkbox,
  Stack,
  Text,
  Box,
  Icon,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface ITaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: number;
  taskListId?: number;
  groupId?: number;
}

function TaskModal({
  isOpen,
  onClose,
  taskId,
  taskListId,
  groupId,
}: ITaskModalProps) {
  const [task, setTask] = React.useState<IToDoItem>({
    title: "",
    description: "",
    deadline: undefined,
    isCompleted: false,
    toDoListId: taskListId,
  } as IToDoItem);
  const [groupDetails, setGroupDetails] = React.useState<IGroup>();
  const [assign, setAssign] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (taskId) {
      const fetchData = async () => {
        const response = await ToDoItemService().getDetails(taskId);
        setTask(response);
        setAssign(response.students.map((item) => item.studentId));
        console.log(response);
      };
      fetchData();
    } else {
      setTask({
        title: "",
        description: "",
        deadline: undefined,
        isCompleted: false,
        toDoListId: taskListId,
      } as IToDoItem); 
    }
  }, [taskId, isOpen, taskListId]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GroupService().getDetails(groupId!);
      setGroupDetails(response);
      // console.log(response);
    };

    fetchData();
  }, [groupId]);

  const isAssigned = (studentId: string) => {
    return assign.some((item) => item === studentId);
  };

  const handleCheckboxChange = (studentId: string) => {
    if (isAssigned(studentId)) {
      setAssign(assign.filter((item) => item !== studentId));
    } else {
      setAssign([...assign, studentId]);
    }
  };

  const handleSubmit = async () => {
    const newItem: ICreateToDoItemModel = {
      id: taskId,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      deadline: task.deadline,
      toDoListId: task.toDoListId,
      students: assign,
    };

    // console.log(newItem, "newItem");

    if (taskId) {
      let updatedTask: IToDoItem = task;
      updatedTask.students = assign.map((studentId) => ({
        studentId: studentId,
        toDoItemId: taskId,
      }));

      await ToDoItemService().update(updatedTask);
    } else {
      await ToDoItemService().createTask(newItem);
    }
    onClose();
  };

  // console.log(task, "task");

  return (
    <ModalBox
      title={taskId ? "Edit task" : "Create task"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex direction="column">
        <Heading size="sm" mb="5px">
          Title
        </Heading>
        <Input
          value={task?.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <Heading size="sm" mb="5px" mt="15px">
          Description
        </Heading>
        <Input
          value={task?.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <Heading size="sm" mb="5px" mt="15px">
          Assign
        </Heading>

        <Stack direction="row">
          {groupDetails?.students?.map((student) => (
            <React.Fragment key={student.studentId}>
              <Checkbox
                value={student.studentId}
                id={student.studentId}
                display="none"
                isChecked={isAssigned(student.studentId)}
                onChange={() => handleCheckboxChange(student.studentId)}
              />
              <label htmlFor={student.studentId}>
                <Flex align="center" direction="column">
                  <Box position="relative">
                    <Avatar
                      size="md"
                      name={student?.student?.fullName}
                      src={student.student?.avatar}
                      border={
                        isAssigned(student.studentId)
                          ? "3px solid #2E87FF"
                          : "none"
                      }
                      borderRadius="50%"
                    />
                    {isAssigned(student.studentId) && (
                      <IconButton
                        size="2xs"
                        p="2px"
                        colorScheme="blue"
                        aria-label="check"
                        icon={<CheckIcon h="12px" w="12px" />}
                        borderRadius="50%"
                        position="absolute"
                        bottom="-1px"
                        right="-2px"
                      />
                    )}
                  </Box>

                  <Text>{student?.student?.firstName}</Text>
                </Flex>
              </label>
            </React.Fragment>
          ))}
        </Stack>

        <Heading size="sm" mb="5px" mt="15px">
          Deadline
        </Heading>
        <Input
          type="date"
          placeholder="Deadline"
          value={
            task?.deadline
              ? new Date(task.deadline).toLocaleDateString("en-CA")
              : ""
          }
          onChange={(e) => {
            const selectedDate = e.target.value;
            const deadline = selectedDate ? new Date(selectedDate) : undefined;
            setTask((prevTask) => ({ ...prevTask, deadline }));
          }}
        />
      </Flex>
      <Divider mt="20px" mb="20px" />
      <Flex>
        <Button ml="auto" mb="-20px" onClick={handleSubmit}>
          {taskId ? "Save" : "Create"}
        </Button>
      </Flex>
    </ModalBox>
  );
}

export default TaskModal;
