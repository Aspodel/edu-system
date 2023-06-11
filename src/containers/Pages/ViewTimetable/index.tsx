import * as React from "react";
import { TimeTable } from "components";
import { ContainerLayout, PageLayout } from "containers";
import { useAuth } from "contexts";
import { StudentService } from "services/StudentService";
import { IClass } from "interfaces";
import { ClassService } from "services";

function ViewTimetablePage() {
  const { userInfor } = useAuth();
  const [timetable, setTimetable] = React.useState<IClass[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const studentInfor = await StudentService().getDetails(
        userInfor?.idCard!
      );
      const classes = await ClassService().get();
      const registeredClasses = classes.filter((classItem) => {
        return studentInfor.registeredClasses?.includes(classItem.id!);
      });
      setTimetable(registeredClasses);
    };
    fetchData();
  }, []);

  return (
    <PageLayout title="Time Table">
      <ContainerLayout>
        <TimeTable data={timetable} />
      </ContainerLayout>
    </PageLayout>
  );
}

export default ViewTimetablePage;
