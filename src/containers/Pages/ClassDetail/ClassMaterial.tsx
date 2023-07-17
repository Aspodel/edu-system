import { Box, Button, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { ContainerLayout } from "containers";
import * as React from "react";
import { FcFile } from "react-icons/fc";

function ClassMaterial() {
  return (
    <ContainerLayout title="Materials" btnList={[<Button>Add</Button>]}>
      <Flex gap="10px">
        <Heading size="md" mb={5}>
          Lesson 1: Introduction
        </Heading>

        <Flex align="start" key={Math.random()}>
          <Box>{"("}</Box>
          <Icon as={FcFile} boxSize={5} />
          <Link href="" isExternal color="blue.500">
            Lesson1.pdf
          </Link>
          <Box>{")"}</Box>
        </Flex>
      </Flex>
      <Flex gap="10px">
        <Heading size="md" mb={5}>
          Lesson 2: Computer
        </Heading>

        <Flex align="start" key={Math.random()}>
          <Box>{"("}</Box>
          <Icon as={FcFile} boxSize={5} />
          <Link href="" isExternal color="blue.500">
            Lesson2.pdf
          </Link>
          <Box>{")"}</Box>
        </Flex>
      </Flex>
      <Flex gap="10px">
        <Heading size="md" mb={5}>
          Lesson 3: Software
        </Heading>

        <Flex align="start" key={Math.random()}>
          <Box>{"("}</Box>
          <Icon as={FcFile} boxSize={5} />
          <Link href="" isExternal color="blue.500">
            Lesson3.pdf
          </Link>
          <Box>{")"}</Box>
        </Flex>
      </Flex>
    </ContainerLayout>
  );
}

export default ClassMaterial;
