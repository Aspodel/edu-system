import * as React from "react";
import { ModalBox } from "components";
import { Button, Heading, Input } from "@chakra-ui/react";
import { ICreateAssignmentModel } from "interfaces";
import { useParams } from "react-router-dom";
import { AssignmentService } from "services";
import { AssignmentType } from "utils/enum";
import { useToast } from "hooks";

interface IAddGroupAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddGroupAssignment({ isOpen, onClose }: IAddGroupAssignmentProps) {
  const { id } = useParams<{ id: string }>();
  const [newAssignment, setNewAssignment] =
    React.useState<ICreateAssignmentModel>({} as ICreateAssignmentModel);
  const toast = useToast();

  const handleAdd = async () => {
    const newItem = newAssignment;
    newItem.classId = Number(id);
    newItem.assignmentType = AssignmentType.File;
    const response = await AssignmentService().createAssignment(newItem);

    if (response) {
      toast({
        content: "Add assignment successfully",
        type: "Success",
      });
      onClose();
    } else {
      toast({
        content: "Add assignment failed",
        type: "Error",
      });
    }
  };

  return (
    <ModalBox
      title="Add"
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={[<Button onClick={handleAdd}>Add</Button>]}
    >
      <Heading size="sm" mb="5px">
        Title
      </Heading>
      <Input
        value={newAssignment.title}
        onChange={(e) =>
          setNewAssignment({ ...newAssignment, title: e.target.value })
        }
      />
      <Heading size="sm" mb="5px" mt="15px">
        Description
      </Heading>
      <Input
        value={newAssignment.description}
        onChange={(e) =>
          setNewAssignment({ ...newAssignment, description: e.target.value })
        }
      />
      <Heading size="sm" mb="5px" mt="15px">
        Due date
      </Heading>
      <Input
        type="date"
        placeholder="Duedate"
        value={
          newAssignment?.dueDate
            ? new Date(newAssignment.dueDate).toLocaleDateString("en-CA")
            : ""
        }
        onChange={(e) => {
          setNewAssignment({
            ...newAssignment,
            dueDate: new Date(e.target.value),
          });
        }}
      />
      <Heading size="sm" mb="5px" mt="15px">
        Publish date
      </Heading>
      <Input
        type="date"
        placeholder="Publish"
        value={
          newAssignment?.publishDate
            ? new Date(newAssignment.publishDate).toLocaleDateString("en-CA")
            : ""
        }
        onChange={(e) => {
          setNewAssignment({
            ...newAssignment,
            publishDate: new Date(e.target.value),
          });
        }}
      />
    </ModalBox>
  );
}

export default AddGroupAssignment;
