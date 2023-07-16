import * as React from "react";
import {
  Button,
  Checkbox,
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
import { IClass, IGradeColumn } from "interfaces";
import { DeleteIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { ClassService, GradeColumnService } from "services";
import { useToast } from "hooks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { set } from "react-hook-form";

interface IColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ColumnModal({ isOpen, onClose }: IColumnModalProps) {
  const { id } = useParams();
  const [classDetail, setClassDetail] = React.useState<IClass>();
  const [gradeColumns, setGradeColumns] = React.useState<IGradeColumn[]>([]);
  const [originalColumns, setOriginalColumns] = React.useState<IGradeColumn[]>(
    []
  );
  const [reload, setReload] = React.useState<boolean>(false);
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      // const response = await GradeColumnService().getByClass(Number(id));
      const classDetail = await ClassService().getDetails(Number(id));
      setClassDetail(classDetail);
      setOriginalColumns(classDetail.gradeColumns!);
      setGradeColumns(classDetail.gradeColumns!);
      setReload(false);
    };
    fetchData();
  }, [reload]);

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

  const handleSave = async () => {
    const orderedColumns = gradeColumns.map((column, index) => ({
      ...column,
      order: index,
    }));

    let newColumns = orderedColumns.filter(
      (column) => !originalColumns.some((c) => c.id === column.id)
    );
    // console.log("New columns:", newColumns);
    const deletedColumns = originalColumns.filter(
      (column) => !gradeColumns.some((c) => c.id === column.id)
    );
    // console.log("Deleted columns:", deletedColumns);
    const deletedColumnsIds = deletedColumns.map((column) => column.id);

    const updatedColumns = orderedColumns.filter((column) => {
      const originalColumn = originalColumns.find((c) => c.id === column.id);

      if (originalColumn) {
        // Column exists in the originalColumns list, check for changes
        return (
          column.name !== originalColumn.name ||
          column.percentage !== originalColumn.percentage ||
          column.isPublished !== originalColumn.isPublished ||
          column.order !== originalColumn.order
        );
      }
      // Column does not exist in the originalColumns list
      // Check if it is a new column or an updated column incorrectly marked as new
      return !newColumns.some((c) => c.id === column.id);
    });
    // console.log(updatedColumns);

    if (newColumns.length > 0) {
      newColumns = newColumns.map((column) => {
        const { id, ...newColumn } = column;
        return newColumn;
      });
      await GradeColumnService().createRange(newColumns);
    }

    if (deletedColumnsIds.length > 0) {
      const filteredDeletedColumnsIds = deletedColumnsIds.filter(
        (id): id is number => id !== undefined
      );
      await GradeColumnService().removeRange(filteredDeletedColumnsIds);
    }

    if (updatedColumns.length > 0) {
      for (const column of updatedColumns) {
        await GradeColumnService().update(column);
      }
    }

    // const updatedGradeColumns = gradeColumns.map((column, index) => {
    //   if (newColumns.some((c) => c.id === column.id)) {
    //     const { id, ...updatedColumn } = column;
    //     updatedColumn.order = index;
    //     return updatedColumn;
    //   }
    //   return column;
    // });

    // for(const column of updatedGradeColumns){
    //   await GradeColumnService().update(column);
    // }

    toast({
      content: "Save successful",
      type: "Success",
    });

    setReload(!reload);
    // onClose();
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedColumns = Array.from(gradeColumns);
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);

    setGradeColumns(reorderedColumns);
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="gradeColumns">
              {(provided) => (
                <Tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {gradeColumns.map((column, index) => (
                    <Draggable
                      key={column.id!.toString()}
                      draggableId={column.id!.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={column.id}
                        >
                          <Td>
                            <Input
                              w="150px"
                              name="name"
                              defaultValue={column.name}
                              placeholder="Column name"
                              variant="outline"
                              onChange={(e) =>
                                handleChange(
                                  column.id!,
                                  e.target.value,
                                  e.target.name
                                )
                              }
                            />
                          </Td>
                          <Td>
                            <Input
                              w="60px"
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
                                handleChange(
                                  column.id!,
                                  e.target.checked,
                                  e.target.name
                                )
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Tbody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </ModalBox>
  );
}

export default ColumnModal;
