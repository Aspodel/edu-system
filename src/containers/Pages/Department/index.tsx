import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  Button,
} from "@chakra-ui/react";
import { UploadButton } from "components";
import { ContainerLayout, PageLayout } from "containers";
import { useToast } from "hooks";
import { IDepartment } from "interfaces";
import * as React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { DepartmentService } from "services";
import { WEEKDAYS } from "utils/constants";

function DepartmentPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = React.useState<IDepartment[]>([]);
  const toast = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      const departments = await DepartmentService().get();
      setDepartments(departments);
    };
    fetchData();
  }, []);

  const handleClick = (deparmentId: number) => {
    navigate(`${deparmentId}`);
  };

  const handleUpload = async (file: File) => {
    const newDepartments = await DepartmentService().createFromExcel(file);
    if (newDepartments.length > 0) {
      toast({
        content: "Upload successfully",
        type: "Success",
      });
    }
    let updateDepartments = [...departments];
    updateDepartments.push(...newDepartments);
    setDepartments(updateDepartments);
  };

  return (
    <PageLayout title="Department">
      <ContainerLayout
        title="Department List"
        btnList={[
          <Button colorScheme="gray" variant="outline">
            Add
          </Button>,
          <UploadButton onUpload={handleUpload} />,
        ]}
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Short name</Th>
                <Th>Description</Th>
                <Th>Faculty Room</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {departments.map((deparment) => (
                <Tr
                  key={deparment.shortName}
                  _hover={{ bg: "gray.100" }}
                  cursor="pointer"
                  role="group"
                  onClick={() => handleClick(deparment.id!)}
                >
                  <Td>{deparment.name}</Td>
                  <Td>{deparment.shortName}</Td>
                  <Td>{deparment.description}</Td>
                  <Td>{deparment.facultyOfficeId}</Td>
                  <Td isNumeric>
                    <Icon
                      as={BsChevronRight}
                      boxSize={5}
                      visibility="hidden"
                      _groupHover={{ visibility: "visible" }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ContainerLayout>
    </PageLayout>
  );
}

export default DepartmentPage;
