import * as React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { ContainerLayout, PageLayout } from "containers";
import { useParams } from "react-router-dom";
import GradeList from "./GradeList";
import MemberList from "./MemberList";
import GroupList from "./GroupList";
import DiscussionBoard from "./DiscussionBoard";
import { ClassService, StudentService } from "services";
import { IClass, IStudent } from "interfaces";

function ClassDetailPage() {
  let { id } = useParams();
  const [classDetail, setClassDetail] = React.useState<IClass>();
  const [students, setStudents] = React.useState<IStudent[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const cla = await ClassService().getDetails(Number(id));
      const students = await StudentService().get();
      setClassDetail(cla);
      setStudents(
        students.filter((student) =>
          cla.students.some(
            (studentClass) => studentClass.studentId === student.id
          )
        )
      );
    };

    fetchData();
  }, []);

  return (
    <PageLayout title={"Class " + classDetail?.classCode}>
      <Tabs variant="solid-rounded">
        <TabList mb="44px">
          <Tab>Members</Tab>
          <Tab>Grades</Tab>
          <Tab>Groups</Tab>
          <Tab>Discussions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <MemberList students={students} />
          </TabPanel>
          <TabPanel p="0">
            <GradeList students={students} />
          </TabPanel>
          <TabPanel p="0">
            <GroupList />
          </TabPanel>
          <TabPanel p="0">
            <DiscussionBoard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageLayout>
  );
}

export default ClassDetailPage;