import * as React from "react";
import { ModalBox } from "components";
import { Button, Heading, Input } from "@chakra-ui/react";
import { useToast } from "hooks";
import { IToDoList } from "interfaces";
import { ToDoListService } from "services";

interface ITaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
}

function TaskListModal({ isOpen, onClose, groupId }: ITaskListModalProps) {
  const [newTaskList, setNewTaskList] = React.useState<IToDoList>({
    title: "",
    groupId: groupId,
  });
  const toast = useToast();

  React.useEffect(() => {
    setNewTaskList({
      title: "",
      groupId: groupId,
    });
  }, [isOpen, groupId]);

  const handleCreate = async () => {
    const response = await ToDoListService().create(newTaskList);

    if (response) {
      toast({
        content: "Create task list successfully",
        type: "Success",
      });
      onClose();
    } else {
      toast({
        content: "Create task list failed",
        type: "Error",
      });
    }
  };

  return (
    <ModalBox
      title="Task List"
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={[<Button onClick={handleCreate}>Create</Button>]}
    >
      <Heading size="sm" mb="5px">
        Name
      </Heading>
      <Input
        value={newTaskList.title}
        onChange={(e) =>
          setNewTaskList({ ...newTaskList, title: e.target.value })
        }
      />
    </ModalBox>
  );
}

export default TaskListModal;
