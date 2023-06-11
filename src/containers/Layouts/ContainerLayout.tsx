import * as React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

interface IContainerLayoutProps {
  title?: string;
  children?: React.ReactNode;
  btnList?: React.ReactNode[];
  minHeight?: string;
}

function ContainerLayout({
  title,
  children,
  btnList,
  minHeight,
}: IContainerLayoutProps) {
  return (
    <Box w="100%" p="24px" borderRadius="12px" bg="white" minH={minHeight}>
      {title && (
        <Flex alignItems="center" mb="44px">
          <Box
            height="32px"
            width="16px"
            bgColor="blue.200"
            borderRadius="4px"
            mr="16px"
          />
          <Heading size="md">{title}</Heading>

          <Flex ml="auto" alignItems="center" gap="20px">
            {btnList?.map((btn) => (
              <React.Fragment key={Math.random()}>{btn}</React.Fragment>
            ))}
          </Flex>
        </Flex>
      )}
      <React.Fragment key={title}>{children}</React.Fragment>
    </Box>
  );
}

export default ContainerLayout;
