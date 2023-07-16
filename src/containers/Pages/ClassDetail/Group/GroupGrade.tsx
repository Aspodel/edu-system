import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IGrade, IGradeColumn, IGradeRow, IGroup } from "interfaces";
import * as React from "react";
import { useParams } from "react-router-dom";
import { GradeColumnService, GradeService, GroupService } from "services";

interface IGroupGradeProps {
  groupId: number;
}

function GroupGrade({ groupId }: IGroupGradeProps) {
  let { id } = useParams<{ id: string }>();
  const [groupDetail, setGroupDetail] = React.useState<IGroup>();
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [gradeColumns, setGradeColumns] = React.useState<IGradeColumn[]>([]);
  const [selectedColumn, setSelectedColumn] = React.useState<number>(
    parseInt(localStorage.getItem("selectedColumn") || "0")
  );
  const [newGrade, setNewGrade] = React.useState<IGrade[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const group = await GroupService().getDetails(groupId);
      setGroupDetail(group);
      const columns = await GradeColumnService().getByClass(Number(id));
      setGradeColumns(columns);
    };
    fetchData();
  }, [groupId, id]);

  React.useEffect(() => {
    if (selectedColumn) {
      const column = gradeColumns.find(
        (column) => column.id === selectedColumn
      );
      if (column) {
        const newGrades: IGrade[] =
          groupDetail?.students.map((student) => {
            const existingGrade = column.grades?.find(
              (grade) => grade.studentId === student.studentId
            );
            return {
              id: existingGrade?.id || 0,
              value: existingGrade?.value,
              gradeColumnId: column.id,
              studentId: student.studentId,
            } as IGrade;
          }) || [];
        setNewGrade(newGrades);
      }
    }
  }, [selectedColumn, gradeColumns, groupDetail]);

  // Save selected column value in local storage
  React.useEffect(() => {
    localStorage.setItem("selectedColumn", selectedColumn.toString());
  }, [selectedColumn]);

  const handleGradeChange = (index: number, value: number) => {
    setNewGrade((prevGrades) =>
      prevGrades.map((grade, i) => (i === index ? { ...grade, value } : grade))
    );
  };

  const handleSave = async () => {
    for (const grade of newGrade) {
      if (grade.id) {
        await GradeService().update(grade);
      } else {
        await GradeService().create(grade);
      }
    }
    setEditMode(false);
  };

  return (
    <Flex direction="column">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Full Name</Th>
              <Th>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groupDetail?.students.map((student, index) => {
              const grade =
                newGrade.find((g) => g.studentId === student.studentId)
                  ?.value || 0;
              return (
                <Tr key={student.student?.idCard}>
                  <Td>{student.student?.idCard}</Td>
                  <Td>{student.student?.fullName}</Td>
                  <Td>
                    {editMode ? (
                      <Input
                        type="number"
                        value={grade.toString()}
                        onChange={(e) =>
                          handleGradeChange(index, parseInt(e.target.value))
                        }
                      />
                    ) : (
                      <React.Fragment>{grade}</React.Fragment>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <Divider m="20px 0" /> */}
      <Flex mt="25px" mb="-15px" gap="20px" align="center">
        <Heading ml="auto" size="sm">
          Grade column:
        </Heading>
        <Select
          placeholder="Select"
          maxW="150px"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(Number(e.target.value))}
        >
          {gradeColumns.map((column) => (
            <option
              key={column.id}
              value={column.id}
            >
              {column.name}
            </option>
          ))}
        </Select>
        <Button
          onClick={() => (editMode ? handleSave() : setEditMode(!editMode))}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
      </Flex>
    </Flex>
  );
}

export default GroupGrade;
