import {
  Box,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

interface IPageLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

function PageLayout({ title, children }: IPageLayoutProps) {
  const bgColor = useColorModeValue("bg.100", "gray.700");
  return (
    <Box flexGrow="1" p="40px" bgColor={bgColor}>
      <Flex maxW="1300px" flexDir="column" m="0 auto" gap="40px">
        {title && <Heading size="xl">{title}</Heading>}
        {children}
      </Flex>
    </Box>
  );
}

export default PageLayout;
