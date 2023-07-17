import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { PageLayout } from "containers";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { LecturerService } from "services";
import { ILecturer } from "interfaces";

const data = [
  {
    title: "Cybersecurity: Safeguarding the Future of Digital Societies",
    imgSrc: "https://i.imgur.com/Kpi9ncO.jpg",
    star: 4.8,
    view: 87,
  },
  {
    title:
      "Blockchain Simplified: Understanding the technology behind Cryptocurrencies",
    imgSrc: "https://i.imgur.com/Kpi9ncO.jpg",
    star: 4.8,
    view: 87,
  },
  {
    title:
      "The Power of IOT: Transforming Business with the Internet of Things",
    imgSrc: "https://i.imgur.com/Kpi9ncO.jpg",
    star: null,
    view: null,
  },
];

function LecturerInforPage() {
  const { lecturerId } = useParams();
  const [lecturerDetail, setLecturerDetail] = React.useState<ILecturer>();

  React.useEffect(() => {
    const fetchData = async () => {
      const lecturer = await LecturerService().getDetails(lecturerId!);
      setLecturerDetail(lecturer);
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      <Flex direction="column" align="center">
        <Image
          w="100%"
          mt="-40px"
          src="https://ui8-core.herokuapp.com/img/content/bg-shop.jpg"
          alt="bg-shop"
        />

        <Flex
          w="92%"
          direction="column"
          mt="-80px"
          bgColor="white"
          borderRadius="10px"
          p="24px"
        >
          <Flex justify="space-between">
            <Flex gap="10px" align="center">
              <Avatar
                size="xl"
                name={lecturerDetail?.fullName}
                src={lecturerDetail?.avatar}
              />
              <Box>
                <Heading size="xl">{lecturerDetail?.fullName}</Heading>
                <Box fontWeight="700" fontSize="lg">
                  Dream big. Think different. Do great!
                </Box>
              </Box>
            </Flex>

            <Flex gap="25px" align="start">
              <Icon as={AiOutlineMail} boxSize={6} mt="10px" />
              <Icon as={AiOutlinePhone} boxSize={6} mt="10px" />
              <Button>Follow</Button>
            </Flex>
          </Flex>

          <Divider m="40px 0" />

          <Tabs variant="solid-rounded">
            <TabList mb="44px">
              <Tab>Papers</Tab>
              <Tab>Detail</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p="0">
                <Flex wrap="wrap" justify="space-between">
                  {data.map((item, index) => (
                    <Box
                      key={index}
                      w="30%"
                      mb="40px"
                      borderRadius="10px"
                      overflow="hidden"
                    >
                      <Image
                        w="100%"
                        src={item.imgSrc}
                        alt="bg-shop"
                        borderRadius="10px"
                      />
                      <Box p="20px 10px">
                        <Heading size="md" mb="10px">
                          {item.title}
                        </Heading>
                        <Flex justify="space-between" align="center">
                          <Flex align="center">
                            {item.star ? (
                              <Icon
                                as={BsStarFill}
                                boxSize={6}
                                color="yellow.300"
                                mr="10px"
                              />
                            ) : (
                              <Icon as={BsStar} boxSize={6} mr="10px" />
                            )}
                            <Box fontSize="sm">
                              {item.star ? item.star : "No rating"}
                              {item.view && ` (${item.view} views)`}
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>
                  ))}
                </Flex>
              </TabPanel>
              <TabPanel p="0"></TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </PageLayout>
  );
}

export default LecturerInforPage;
