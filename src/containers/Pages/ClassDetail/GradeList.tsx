import * as React from "react";
import { ContainerLayout } from "containers";
import {
  Button,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import ColumnModal from "./ColumnModal";
import { IGradeColumn, IGradeRow, IStudent } from "interfaces";
import { GradeColumnService, GradeService } from "services";
import { useParams } from "react-router-dom";
import { BASE_URL } from "utils/constants";
import { UploadButton } from "components";
import { useToast } from "hooks";

interface IGradeListProps {}

function GradeList({}: IGradeListProps) {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gradeColumns, setGradeColumns] = React.useState<IGradeColumn[]>([]);
  const [gradeTable, setGradeTable] = React.useState<IGradeRow[]>([]);
  const [isReload, setIsReload] = React.useState<boolean>(false);
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GradeColumnService().getByClass(Number(id));
      setGradeColumns(response);
      const gradeTable = await GradeService().getByClass(Number(id));
      setGradeTable(gradeTable);
      setIsReload(false);
    };
    fetchData();
  }, [isOpen, isReload]);

  const calculateAverageGrade = (row: IGradeRow): string => {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const column of gradeColumns) {
      const grade = row.grades[column.name] as number | undefined;
      if (grade === null || grade === undefined) {
        return "-";
      }
      const percentage = column.percentage || 0;
      weightedSum += grade * (percentage / 100);
      totalWeight += percentage;
    }

    const averageGrade =
      totalWeight !== 0 ? ((weightedSum / totalWeight) * 100).toFixed(2) : "-";

    return averageGrade;
  };

  const handleUpload = async (file: File) => {
    // try {
      const newGrades = await GradeService().createFromExcel(Number(id), file);
      setIsReload(!isReload);
      toast({
        content: "Upload successfully",
        type: "Success",
      });
    // } catch (err: any) {
    //   toast({
    //     content: err.message,
    //     type: "Error",
    //   });
    // }
  };

  return (
    <ContainerLayout
      title="Grade List"
      btnList={[
        <Button key={Math.random()} colorScheme="gray">
          <a
            href={`${BASE_URL}grade/export/class/${Number(id)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Export
          </a>
        </Button>,
        <Button variant="solid" colorScheme="gray" onClick={onOpen}>
          Edit column
        </Button>,
        <UploadButton onUpload={handleUpload} />,
      ]}
    >
      <ColumnModal isOpen={isOpen} onClose={onClose} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Student</Th>
              {gradeColumns.map((column) => (
                <Th isNumeric key={Math.random()}>
                  {column.name} ({column.percentage}%)
                </Th>
              ))}
              <Th isNumeric>Ave.</Th>
            </Tr>
          </Thead>

          <Tbody>
            {gradeTable.map((row) => {
              return (
                <Tr key={Math.random()}>
                  <Td>{row.id}</Td>
                  <Td>{row.student}</Td>
                  {gradeColumns.map((column) => {
                    // console.log(column.name, row);
                    return (
                      <Td isNumeric key={Math.random()}>
                        {row.grades[column.name] !== undefined &&
                        column.isPublished
                          ? row.grades[column.name]
                          : "-"}
                      </Td>
                    );
                  })}
                  <Td isNumeric>{calculateAverageGrade(row)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </ContainerLayout>
  );
}

export default GradeList;
