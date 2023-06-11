import * as React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { PageLayout } from "containers";
import { IDepartment } from "interfaces";
import { DepartmentService } from "services";
import { useParams } from "react-router-dom";
import StudentList from "./StudentList";
import LecturerList from "./LecturerList";
import CourseList from "./CourseList";

function DepartmentDetailPage() {
  let { id } = useParams();
  const [deparmentDetail, setDepartmentDetail] = React.useState<IDepartment>();
  React.useEffect(() => {
    const fetchData = async () => {
      const department = await DepartmentService().getDetails(Number(id));
      setDepartmentDetail(department);
    };
    fetchData();
  }, []);

  return (
    <PageLayout
      title={deparmentDetail?.name + " - " + deparmentDetail?.shortName}
    >
      <Tabs variant="solid-rounded">
        <TabList mb="44px">
          <Tab>Course</Tab>
          <Tab>Lecturer</Tab>
          <Tab>Student</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <CourseList />
          </TabPanel>
          <TabPanel p="0">
            <LecturerList />
          </TabPanel>
          <TabPanel p="0">
            <StudentList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageLayout>
  );
}

export default DepartmentDetailPage;
