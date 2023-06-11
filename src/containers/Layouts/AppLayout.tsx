import * as React from "react";
import { HeaderBar, Sidebar } from "components";
import { Outlet } from "react-router-dom";
import { Flex, VStack } from "@chakra-ui/react";

function AppLayout() {
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
