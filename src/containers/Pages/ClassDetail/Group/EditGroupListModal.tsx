import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { ModalBox } from "components";
import { useParams } from "react-router-dom";
import { ICreateGroupModel, IGroup, IStudent } from "interfaces";
import { GroupService, StudentService } from "services";
import { CheckIcon } from "@chakra-ui/icons";
import { useToast } from "hooks";

interface IEditGroupListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditGroupListModal({ isOpen, onClose }: IEditGroupListModalProps) {
  let { id } = useParams<{ id: string }>();
  const [ungroupStudents, setUngroupStudents] = React.useState<IStudent[]>([]);
  const [newGroup, setNewGroup] = React.useState<ICreateGroupModel>({
    name: "",
    projectName: "",
    students: [],
  });
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      const students = await StudentService().getUngroup(Number(id));
      setUngroupStudents(students);
    };
    fetchData();
  }, [id]);

  const isChecked = (id: string) => {
    return newGroup.students.some((student) => student === id);
  };

  const handleCheckboxChange = (studentId: string) => {
    if (isChecked(studentId)) {
      setNewGroup({
        ...newGroup,
        students: newGroup.students.filter((student) => student !== studentId),
      });
    } else {
      setNewGroup({
        ...newGroup,
        students: [...newGroup.students, studentId],
      });
    }
  };

  const handleCreate = async () => {
    const response = await GroupService().createByClass(Number(id), newGroup);
    if (response) {
      toast({
        content: "Create group successfully",
        type: "Success",
      });
      onClose();
    } else {
      toast({
        content: "Create group failed",
        type: "Error",
      });
    }
  };

  return (
    <ModalBox
      title="Add Group"
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={[<Button onClick={handleCreate}>Create</Button>]}
    >
      <Heading size="sm" mb="5px">
        Name
      </Heading>
      <Input
        value={newGroup.name}
        onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
      />
      <Heading size="sm" mb="5px" mt="15px">
        Project
      </Heading>
      <Input
        value={newGroup.projectName}
        onChange={(e) =>
          setNewGroup({ ...newGroup, projectName: e.target.value })
        }
      />
      <Heading size="sm" mb="5px" mt="15px">
        Members
      </Heading>

      <Flex gap="20px">
        {ungroupStudents.map((student) => (
          <React.Fragment key={student.id}>
            <Checkbox
              value={student.id}
              id={student.id}
              display="none"
              isChecked={isChecked(student.id!)}
              onChange={() => handleCheckboxChange(student.id!)}
            />
            <label htmlFor={student.id!}>
              <Flex align="center" direction="column">
                <Box position="relative">
                  <Avatar
                    size="md"
                    name={student?.fullName}
                    src={student.avatar}
                    border={
                      isChecked(student.id!) ? "3px solid #2E87FF" : "none"
                    }
                    borderRadius="50%"
                  />
                  {isChecked(student.id!) && (
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

                <Text>{student?.firstName}</Text>
              </Flex>
            </label>
          </React.Fragment>
        ))}
      </Flex>
    </ModalBox>
  );
}

export default EditGroupListModal;
