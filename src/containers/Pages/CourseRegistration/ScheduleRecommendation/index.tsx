import * as React from "react";
import {
  Box,
  Button,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { ModalBox } from "components";
import CourseSelection from "./CourseSelection";
import ConstraintAddition from "./ConstraintAddition";
import { DayOfWeek } from "utils/enum";
import { IClass, IConstraint } from "interfaces";
import Recommendation from "./Recommendation";
import { useToast } from "hooks";

interface IRecommendingScheduleMProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { title: "First", description: "Select courses" },
  { title: "Second", description: "Add constraints" },
  { title: "Third", description: "Recommendation" },
];

function ScheduleRecommendation({
  isOpen,
  onClose,
}: IRecommendingScheduleMProps) {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [selectedCourses, setSelectedCourses] = React.useState<number[]>([]);
  const [constraint, setConstraint] = React.useState<IConstraint>({});
  const [currentSchedule, setCurrentSchedule] = React.useState<IClass[]>([]);
  const toast = useToast();

  const onCourseSelect = (selectedList: number[]) => {
    setSelectedCourses(selectedList);
  };

  const onAddConstraint = (constraint: IConstraint) => {
    setConstraint(constraint);
  };

  const onGetCurrentSchedule = (current: IClass[]) => {
    setCurrentSchedule(current);
  };

  const handleSave = () => {
    console.log(currentSchedule);
    const data = currentSchedule.map((item) => item.id);
    console.log(data);
    localStorage.setItem("saved", JSON.stringify(data));

    toast({
      content: "Saved successfully",
      type: "Success",
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <CourseSelection onCourseSelect={onCourseSelect} />;
      case 1:
        return <ConstraintAddition onAddConstraint={onAddConstraint} />;
      case 2:
        return (
          <Recommendation
            courses={selectedCourses}
            constraint={constraint}
            onGetCurrentSchedule={onGetCurrentSchedule}
          />
        );
    }
  };
  return (
    <ModalBox
      title="Schedule Recommendation"
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      footerButtons={[
        <React.Fragment>
          {activeStep !== 0 ? (
            <Button
              colorScheme="gray"
              mr="auto"
              variant="ghost"
              onClick={goToPrevious}
            >
              Back
            </Button>
          ) : (
            ""
          )}
        </React.Fragment>,
        <React.Fragment>
          {activeStep === 1 ? (
            <Button
              // variant="outline"
              colorScheme="gray"
              mr="3"
              onClick={goToNext}
            >
              Skip
            </Button>
          ) : (
            ""
          )}
        </React.Fragment>,
        <React.Fragment>
          {activeStep === 2 ? (
            <Button colorScheme="gray" mr="3" onClick={handleSave}>
              Save
            </Button>
          ) : null}
        </React.Fragment>,
        <Button onClick={activeStep === 2 ? onClose : goToNext}>
          {activeStep === 2 ? "Done" : "Next"}
        </Button>,
      ]}
    >
      <Stepper w="100%" p="0 120px" mb="40px" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {renderStepContent()}
    </ModalBox>
  );
}

export default ScheduleRecommendation;
