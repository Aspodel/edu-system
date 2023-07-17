import * as React from "react";
import { HeaderBar, Sidebar } from "components";
import { Navigate, Outlet } from "react-router-dom";
import { Flex, VStack } from "@chakra-ui/react";
import { useAuth } from "contexts";

function AppLayout() {
  const { userInfor } = useAuth();

  if (!userInfor) return <Navigate to="/login" />;

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />

      <Flex
        flexDir="column"
        w="full"
        // h="100%"
        overflowX="hidden"
      >
        <HeaderBar />
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default AppLayout;
