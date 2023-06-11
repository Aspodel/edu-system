import * as React from "react";
import {
  Grid,
  GridItem,
  Checkbox,
  Tabs,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Input,
  TabList,
  HStack,
} from "@chakra-ui/react";
import { WEEKDAYS, PERIODS } from "utils/constants";
import { DayOfWeek } from "utils/enum";
import { IConstraint, ITimeSlot } from "interfaces";

interface IConstraintAdditionProps {
  onAddConstraint: (constraint: IConstraint) => void;
}

function ConstraintAddition({ onAddConstraint }: IConstraintAdditionProps) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [timeSlots, setTimeSlots] = React.useState<ITimeSlot[]>([]);
  const [maxClassPerDay, setMaxClassPerDay] = React.useState<number>();

  const handleCheckboxSelect = (e: any, id: any) => {
    let updatedList = [...selectedItems];
    if (e.target.checked) {
      updatedList.push(id);
    } else {
      updatedList = updatedList.filter((item) => item !== id);
    }
    setSelectedItems(updatedList);

    groupSelectedItems(updatedList);
  };

  React.useEffect(() => {
    onAddConstraint({ maxClassPerDay, timeSlots });
  }, []);

  const groupSelectedItems = (selectedList: string[]) => {
    selectedList.sort(sortId);

    const groupedItems: ITimeSlot[] = [];
    let currentItem: ITimeSlot | null = null;
    for (const item of selectedList) {
      const [dayString, num] = item.split(/(\d+)/);
      const day = WEEKDAYS.indexOf(dayString) + 1;
      const numValue = parseInt(num, 10);

      if (
        !currentItem ||
        currentItem.day !== day ||
        currentItem.endTime !== numValue - 1
      ) {
        // Create a new group if:
        // - No current group exists
        // - Current day is different
        // - Current item is not next to the previous item
        currentItem = {
          startTime: numValue,
          endTime: numValue,
          day,
        };
        groupedItems.push(currentItem);
      } else {
        // Extend the current group
        currentItem.endTime = numValue;
      }
    }
    setTimeSlots(groupedItems);
    onAddConstraint({ timeSlots: groupedItems });
  };

  const sortId = (a: string, b: string) => {
    const [dayA, numA] = a.split(/(\d+)/);
    const [dayB, numB] = b.split(/(\d+)/);

    const dayIndexA = WEEKDAYS.indexOf(dayA);
    const dayIndexB = WEEKDAYS.indexOf(dayB);

    if (dayIndexA !== dayIndexB) {
      return dayIndexA - dayIndexB; // Sort by day index
    }

    return parseInt(numA, 10) - parseInt(numB, 10); // Sort by numerical value
  };

  return (
    <Tabs>
      <TabList mb="20px">
        <Tab>Time Conflicts</Tab>
        <Tab>More</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Grid templateColumns="repeat(7, 1fr)" gap={1} m="0 40px">
            {/* Header row */}
            <GridItem textAlign="center" bg="gray.200" p={2} />
            {WEEKDAYS.map((day) => (
              <GridItem key={day} textAlign="center" bg="gray.200" p={2}>
                {day}
              </GridItem>
            ))}

            {/* Time table */}
            {PERIODS.map((period) => (
              <React.Fragment key={period}>
                <GridItem key={period} textAlign="center" bg="gray.200" p={2}>
                  {period}
                </GridItem>

                {WEEKDAYS.map((day) => {
                  let id = day + period;

                  return (
                    <GridItem
                      key={id}
                      textAlign="center"
                      border="1px solid"
                      borderColor="gray.100"
                      bg={selectedItems.includes(id) ? "blue.300" : "white"}
                    >
                      <Checkbox
                        id={id}
                        isChecked={selectedItems.includes(id)}
                        onChange={(e) => handleCheckboxSelect(e, id)}
                        display={"none"}
                      ></Checkbox>
                      <label
                        htmlFor={id}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                        }}
                      ></label>
                    </GridItem>
                  );
                })}
              </React.Fragment>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel>
          <HStack spacing="20px">
            <Text>Max class per day:</Text>
            <Input
              width="120px"
              type="number"
              value={maxClassPerDay}
              onChange={(e) => {
                let value = parseInt(e.target.value);
                setMaxClassPerDay(value);
                onAddConstraint({ maxClassPerDay: value });
              }}
            />
          </HStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ConstraintAddition;
