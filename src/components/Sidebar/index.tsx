import * as React from "react";
import { Flex, VStack, Image, Text, Box, HStack, Icon } from "@chakra-ui/react";
import { ColorModeSwitcher } from "ColorModeSwitcher";
import { sidebarConfigs } from "configs";
import NavItem from "./NavItem";
import { useAuth } from "contexts";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex w="340px" p="24px" flexDir="column" gap="50px">
      <Image
        boxSize="48px"
        objectFit="cover"
        src="https://ui8-core.herokuapp.com/img/logo-dark.png"
        alt="logo"
      />
      <VStack alignItems="center">
        {sidebarConfigs.map((item) => (
          <React.Fragment key={item.path}>
            <NavItem {...item} />
          </React.Fragment>
        ))}

        <Box onClick={handleLogout} w="100%" p="12px 10px" cursor="pointer">
          <HStack align="center" spacing="12px">
            <Icon as={CiLogout} color="#6F767E" boxSize={7} />
            <Text fontSize="16px" fontWeight="600" color="#6F767E">
              Log out
            </Text>
          </HStack>
        </Box>
      </VStack>
      <ColorModeSwitcher marginTop="auto" h="40px" w="40px" />
    </Flex>
  );
}

export default Sidebar;
