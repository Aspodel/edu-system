import * as React from "react";
import {
  Button,
  Checkbox,
  CloseButton,
  Icon,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ModalBox } from "components";
import { IGradeColumn } from "interfaces";
import { AiOutlineDelete } from "react-icons/ai";
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { GradeColumnService } from "services";
import { useToast } from "hooks";

interface IColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ColumnModal({ isOpen, onClose }: IColumnModalProps) {
  const { id } = useParams();
  const [gradeColumns, setGradeColumns] = React.useState<IGradeColumn[]>([]);
  const [originalColumns, setOriginalColumns] = React.useState<IGradeColumn[]>(
    []
  );
  const toast = useToast();

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await GradeColumnService().getByClass(Number(id));
  //     setOriginalColumns(response);
  //     setGradeColumns(response);
  //   };
  //   fetchData();
  // }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GradeColumnService().getByClass(Number(id));
      setOriginalColumns(response);
      setGradeColumns(response);
    };
    fetchData();
  }, []);

  const handleAddField = () => {
    const values = [...gradeColumns];
    values.push({
      id: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
      name: "",
      percentage: 0,
      isPublished: false,
      classId: Number(id),
    });
    setGradeColumns(values);
  };

  const handleRemoveField = (id: number) => {
    let fields = [...gradeColumns];
    fields = fields.filter((field) => field.id !== id);
    setGradeColumns(fields);
  };

  const handleChange = (
    id: number,
    value: string | number | boolean,
    field: string
  ) => {
    const updatedColumns = gradeColumns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          [field]: value,
        };
      }
      return column;
    });
    setGradeColumns(updatedColumns);
  };

  const handleSave = () => {
    const newColumns = gradeColumns.filter(
      (column) => !originalColumns.some((c) => c.id === column.id)
    );

    const deletedColumns = originalColumns.filter(
      (column) => !gradeColumns.some((c) => c.id === column.id)
    );

    const updatedColumns = gradeColumns.filter((column) => {
      const originalColumn = originalColumns.find((c) => c.id === column.id);

      if (originalColumn) {
        // Column exists in the originalColumns list, check for changes
        return (
          column.name !== originalColumn.name ||
          column.percentage !== originalColumn.percentage ||
          column.isPublished !== originalColumn.isPublished
        );
      }
      // Column does not exist in the originalColumns list
      // Check if it is a new column or an updated column incorrectly marked as new
      return !newColumns.some((c) => c.id === column.id);
    });

    console.log("Updated columns:", updatedColumns);
    console.log("New columns:", newColumns);
    console.log("Deleted columns:", deletedColumns);

    for (const column of newColumns) {
      GradeColumnService().create(column);
    }

    for (const column of deletedColumns) {
      GradeColumnService().remove(column.id!);
    }

    for (const column of updatedColumns) {
      GradeColumnService().update(column);
    }

    setOriginalColumns(gradeColumns);

    toast({
      content: "Columns updated successfully",
      type: "Success",
    });
  };

  return (
    <ModalBox
      title="Edit Columns"
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      footerButtons={[
        <Button
          variant="ghost"
          mr="3"
          colorScheme="gray"
          onClick={handleAddField}
        >
          Add
        </Button>,
        <Button onClick={handleSave}>Save</Button>,
      ]}
    >
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th w="60%">Column</Th>
              <Th>Percen.</Th>
              <Th>Published</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {gradeColumns.map((column, index) => (
              <Tr key={column.id}>
                <Td>
                  <Input
                    name="name"
                    defaultValue={column.name}
                    placeholder="Column name"
                    variant="outline"
                    onChange={(e) =>
                      handleChange(column.id!, e.target.value, e.target.name)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    name="percentage"
                    defaultValue={column.percentage}
                    placeholder="Percentage"
                    type="number"
                    variant="outline"
                    onChange={(e) =>
                      handleChange(
                        column.id!,
                        Number(e.target.value),
                        e.target.name
                      )
                    }
                  />
                </Td>
                <Td textAlign="center">
                  <Checkbox
                    name="isPublished"
                    defaultChecked={column.isPublished}
                    onChange={(e) =>
                      handleChange(column.id!, e.target.checked, e.target.name)
                    }
                  />
                </Td>
                <Td>
                  <IconButton
                    colorScheme="gray"
                    variant="ghost"
                    aria-label="close"
                    icon={<DeleteIcon color="gray.500" />}
                    onClick={() => handleRemoveField(column.id!)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ModalBox>
  );
}

export default ColumnModal;
