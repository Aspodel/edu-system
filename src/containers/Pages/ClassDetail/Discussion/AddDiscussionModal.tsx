import * as React from "react";
import { ModalBox } from "components";
import { Button, Heading, Input } from "@chakra-ui/react";
import { IDiscussion } from "interfaces";
import { useParams } from "react-router-dom";
import { DiscussionService } from "services";
import { useAuth } from "contexts";
import { DiscussionType } from "utils/enum";
import { useToast } from "hooks";

interface IAddDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDiscussionModal({ isOpen, onClose }: IAddDiscussionModalProps) {
  const { id } = useParams<{ id: string }>();
  const { userInfor } = useAuth();
  const [newDiscussion, setNewDiscussion] = React.useState<IDiscussion>(
    {} as IDiscussion
  );
  const toast = useToast();

  const handleAdd = async () => {
    let newItem = newDiscussion;
    newItem.classId = Number(id);
    newItem.creatorId = userInfor?.id;
    newItem.type = DiscussionType.Question;
    const res = await DiscussionService().createDiscussion(newItem);

    if (res) {
      toast({
        content: "Add discussion successfully",
        type: "Success",
      });
    } else {
      toast({
        content: "Add discussion failed",
        type: "Error",
      });
    }
    onClose();
  };

  return (
    <ModalBox
      title="Add Discussion"
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={[<Button onClick={handleAdd}>Add</Button>]}
    >
      <Heading size="sm" mb="5px">
        Title
      </Heading>
      <Input
        value={newDiscussion.title}
        onChange={(e) =>
          setNewDiscussion({ ...newDiscussion, title: e.target.value })
        }
      />

      <Heading size="sm" mb="5px" mt="25px">
        Description
      </Heading>
      <Input
        value={newDiscussion.description}
        onChange={(e) =>
          setNewDiscussion({ ...newDiscussion, description: e.target.value })
        }
      />
    </ModalBox>
  );
}

export default AddDiscussionModal;
