import * as React from "react";
import {
  Checkbox,
  Grid,
  GridItem,
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PERIODS, WEEKDAYS } from "utils/constants";
import { IClass, ICourse } from "interfaces";
import { CourseService } from "services";

interface ITimetableProps {
  data: IClass[];
}

function TimeTable({ data }: ITimetableProps) {
  const [courses, setCourses] = React.useState<ICourse[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await CourseService().get();
      setCourses(response);
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={1}>
      {/* Header row */}
      <GridItem textAlign="center" bg="gray.200" p={2} />
      {WEEKDAYS.map((day) => (
        <GridItem key={day} textAlign="center" bg="gray.200" p={2}>
          {day}
        </GridItem>
      ))}

      {/* Render time table */}
      {PERIODS.map((period, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <GridItem textAlign="center" bg="gray.200" p={2}>
            {period}
          </GridItem>

          {WEEKDAYS.map((day, columnIndex) => {
            let id = day + period;
            const render = [];
            const classes = data.filter(
              (item) => item.day == WEEKDAYS.indexOf(day) + 1
            );
            if (classes.length > 0) {
              var isInInterval = false;

              for (var i = 0; i < classes.length; i++) {
                const startRow = classes[i].startTime - 1;
                const endRow = classes[i].endTime - 1;

                if (startRow <= rowIndex && rowIndex <= endRow) {
                  isInInterval = true;

                  if (startRow === rowIndex) {
                    render.push(
                      <GridItem
                        bg="yellow.50"
                        p={2}
                        rowSpan={classes[i].endTime - classes[i].startTime + 1}
                      >
                        <div>
                          <span>
                            {
                              courses.find(
                                (course) => course.id == classes[i].courseId
                              )?.name
                            }
                          </span>
                          <br />
                          <span>{"Room: " + "a1.409".toUpperCase()}</span>
                        </div>
                      </GridItem>
                    );
                  }
                }
              }

              if (isInInterval === false) {
                render.push(
                  <GridItem
                    textAlign="center"
                    border="1px solid"
                    borderColor="gray.100"
                  ></GridItem>
                );
              }
            } else {
              render.push(
                <GridItem
                  textAlign="center"
                  border="1px solid"
                  borderColor="gray.100"
                ></GridItem>
              );
            }
            return <React.Fragment key={id}>{render}</React.Fragment>;
          })}
        </React.Fragment>
      ))}
    </Grid>
  );
}

export default TimeTable;
