import * as React from "react";
import { ModalBox } from "components";
import { IGroup } from "interfaces";
import { GroupService } from "services";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import GroupInfor from "./GroupInfor";
import GroupTask from "./GroupTask";
import GroupGrade from "./GroupGrade";
import GroupSubmission from "./GroupSubmission/GroupSubmission";
import GroupChat from "./GroupChat";

interface IGroupDetailModalProps {
  groupId?: number;
  isOpen: boolean;
  onClose: () => void;
}

function GroupDetailModal({
  groupId,
  isOpen,
  onClose,
}: IGroupDetailModalProps) {
  const [groupDetail, setGroupDetail] = React.useState<IGroup>();

  React.useEffect(() => {
    if (groupId) {
      const fetchData = async () => {
        const response = await GroupService().getDetails(groupId);
        setGroupDetail(response);
        // console.log(response);
      };
      fetchData();
    }
  }, [groupId]);

  return (
    <ModalBox
      title={"Group: " + (groupDetail?.name ?? groupId)}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <Tabs variant="enclosed">
        <TabList mb="44px">
          <Tab>Information</Tab>
          <Tab>Task</Tab>
          <Tab>Chat</Tab>
          <Tab>Submission</Tab>
          <Tab>Grade</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <GroupInfor
              projectName={groupDetail?.projectName}
              members={groupDetail?.students}
            />
          </TabPanel>
          <TabPanel p="0">
            <GroupTask groupId={groupId!} />
          </TabPanel>
          <TabPanel p="0">
            <GroupChat groupId={groupId!} />
          </TabPanel>
          <TabPanel p="0">
            <GroupSubmission groupId={groupId!} />
          </TabPanel>
          <TabPanel p="0">
            <GroupGrade groupId={groupId!} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ModalBox>
  );
}

export default GroupDetailModal;
