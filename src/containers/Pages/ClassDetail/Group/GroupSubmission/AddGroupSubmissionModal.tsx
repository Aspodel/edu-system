import * as React from "react";
import { ModalBox, UploadButton } from "components";
import {
  IAssignment,
  ICreateFileSubmissionModel,
  IFileSubmission,
  IGroup,
} from "interfaces";
import { Button, Heading, Input, Select } from "@chakra-ui/react";
import { GroupService, SubmissionService } from "services";
import { useToast } from "hooks";
import { useAuth } from "contexts";

interface IAddGroupSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  groupAssignment: IAssignment[];
}

function AddGroupSubmissionModal({
  isOpen,
  onClose,
  groupId,
  groupAssignment,
}: IAddGroupSubmissionModalProps) {
  const [newSubmission, setNewSubmission] = React.useState<IFileSubmission>(
    {} as IFileSubmission
  );
  const [groupDetail, setGroupDetail] = React.useState<IGroup>();
  const { userInfor } = useAuth();
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GroupService().getDetails(groupId);
      setGroupDetail(response);
      // console.log(response);
    };
    fetchData();
  }, [groupId]);

  const handleUpload = async (file: File) => {
    const newItem = newSubmission;
    const selectedAssignment = groupAssignment.find(
      (item) => item.id === newSubmission.assignmentId
    );
    newItem.fileName = `${selectedAssignment?.title}_${groupDetail?.name}`;
    newItem.studentId = userInfor?.id!;
    newItem.groupId = groupId;

    const response = await SubmissionService().createFileSubmission(
      newItem,
      file
    );

    if (response) {
      toast({
        content: "Upload successfully",
        type: "Success",
      });
      onClose();
    } else {
      toast({
        content: "Upload failed",
        type: "Error",
      });
    }
  };

  return (
    <ModalBox
      title="Add Group Submission"
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={[<UploadButton onUpload={handleUpload} />]}
    >
      <Heading size="sm" mb="5px">
        Description
      </Heading>
      <Input
        value={newSubmission.description}
        onChange={(e) =>
          setNewSubmission({ ...newSubmission, description: e.target.value })
        }
      />

      <Heading size="sm" mb="5px" mt="25px">
        Submission for
      </Heading>
      <Select
        placeholder="Select"
        value={newSubmission.assignmentId}
        onChange={(e) =>
          setNewSubmission({
            ...newSubmission,
            assignmentId: Number(e.target.value),
          })
        }
      >
        {groupAssignment.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </Select>
    </ModalBox>
  );
}

export default AddGroupSubmissionModal;
