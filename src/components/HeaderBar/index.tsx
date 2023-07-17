import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "contexts";
import { IUser } from "interfaces";
import * as React from "react";
// import { AiOutlineBell, AiOutlineMessage } from "react-icons/ai";
import { CiBellOn, CiChat2 } from "react-icons/ci";
import { StudentService } from "services";

function HeaderBar() {
  const { userInfor } = useAuth();
  const [userDetail, setUserDetail] = React.useState<IUser>();
  const color = useColorModeValue("white", "gray.800");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await StudentService().getDetails(userInfor?.idCard!);
      setUserDetail(response);
    };
    fetchData();
  }, [userInfor?.id]);

  return (
    <Flex
      justify="flex-end"
      align="center"
      p="24px 40px"
      gap="30px"
      boxShadow={useColorModeValue(
        "inset 1px 0px 0px #F4F4F4, inset 0 -1px 0px #EFEFEF",
        "inset 1px 0px 0px #111315, inset 0 -1px 0px #111315"
      )}
    >
      <Icon as={CiChat2} boxSize={7} />
      <Icon as={CiBellOn} boxSize={7} />
      <Avatar name={userDetail?.fullName} src={userDetail?.avatar} />
    </Flex>
  );
}

export default HeaderBar;
