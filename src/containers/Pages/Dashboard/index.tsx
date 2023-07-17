import * as React from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  ListIcon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { PageLayout } from "containers";
import { useAuth } from "contexts";
import { ClassService, StudentService } from "services";
import { IClass } from "interfaces";
import { AiFillSetting } from "react-icons/ai";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const data = {
  labels: ["Failed", "Passed", "In progress", "Not yet"],
  datasets: [
    {
      label: "# of Votes",
      data: [1, 4, 2, 20],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(222, 222, 222, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(232, 232, 232, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};
const labels = ["Sep, 2022", "Jan, 2023", "Jul, 2023"];

const data2 = {
  labels: labels,
  datasets: [
    {
      label: "Score",
      data: labels.map(() => Math.floor(Math.random() * (100 - 65 + 1) + 65)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function DashboardPage() {
  const { userInfor } = useAuth();
  const [classes, setClasses] = React.useState<IClass[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const studentDetail = await StudentService().getDetails(
        userInfor?.idCard!
      );
      const classes = await ClassService().get();
      const filteredClasses = classes.filter((x) =>
        studentDetail?.registeredClasses?.includes(x.id!)
      );
      setClasses(filteredClasses);
    };
    fetchData();
  }, []);

  return (
    <PageLayout title="Dashboard">
      <Flex gap="30px" flexWrap="nowrap">
        <Box
          borderRadius="10px"
          p="24px"
          bg="white"
          w="fit-content"
          minW="400px"
        >
          <Flex mb="20px" align="center">
            <Box
              height="32px"
              width="16px"
              bgColor="blue.200"
              borderRadius="4px"
              mr="16px"
            />
            <Heading size="md">Degree Process (12%)</Heading>
          </Flex>
          <Doughnut data={data} />
        </Box>
        <Box
          borderRadius="10px"
          p="24px"
          bg="white"
          w="fit-content"
          minW="400px"
        >
          <Flex mb="20px" align="center">
            <Box
              height="32px"
              width="16px"
              bgColor="blue.200"
              borderRadius="4px"
              mr="16px"
            />
            <Heading size="md">GPA Process</Heading>
          </Flex>
          <Bar options={options} data={data2} />
          <Flex gap="10px" justify="center" mt="50px" align="center">
            <Box>GPA Ave: </Box>
            <Heading size="xl">3.5</Heading>
          </Flex>
        </Box>
        <Box
          borderRadius="10px"
          p="24px"
          bg="white"
          w="fit-content"
          minW="250px"
          h="fit-content"
        >
          <Flex mb="20px" align="center">
            <Box
              height="32px"
              width="16px"
              bgColor="blue.200"
              borderRadius="4px"
              mr="16px"
            />
            <Heading size="md">Your classes</Heading>
          </Flex>
          <UnorderedList fontSize="lg" p="0 15px">
            {classes.map((classItem) => (
              <ListItem
                key={classItem.id}
                display="flex"
                alignItems="center"
                mb="10px"
              >
                <ListIcon as={AiFillSetting} color="blue.200" />
                <Link
                  href={`http://localhost:3000/class/${classItem.id}`}
                  color="blue.500"
                >
                  {classItem.course?.name +
                    " (Class " +
                    classItem.classCode +
                    ")"}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Flex>
    </PageLayout>
  );
}

export default DashboardPage;
