import * as React from "react";
import { Pagination, TimeTable } from "components";
import { CourseService } from "services";
import { IClass, IConstraint } from "interfaces";
import { Box } from "@chakra-ui/react";
import { usePagination } from "hooks";

interface IRecommendationProps {
  courses: number[];
  constraint: IConstraint;
  onGetCurrentSchedule: (current: IClass[]) => void;
}

function Recommendation({
  courses,
  constraint,
  onGetCurrentSchedule,
}: IRecommendationProps) {
  const [schedules, setSchedules] = React.useState<IClass[][]>([]);
  const { createScheduleRecommendation } = CourseService();
  const { page, itemsPerPage, handlePageChange } = usePagination(0, 1);

  React.useEffect(() => {
    const fetchSchedules = async () => {
      // console.log(courses);
      const data = await createScheduleRecommendation(courses, constraint);
      // console.log(data);
      setSchedules(data);
    };
    fetchSchedules();
    onGetCurrentSchedule(schedules[page]);
  }, []);

  React.useEffect(() => {
    onGetCurrentSchedule(schedules[page]);
  }, [page]);

  return (
    <Box p={"0 40px"}>
      <TimeTable data={schedules[page] ?? []} />

      <Pagination
        onPageChange={handlePageChange}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        totalItems={schedules.length ?? 1}
      />
    </Box>
  );
}

export default Recommendation;
