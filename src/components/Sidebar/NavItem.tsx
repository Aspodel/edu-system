import * as React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavLink, useMatch } from "react-router-dom";

interface INavItemProps {
  path: string;
  name: string;
  icon?: IconType;
}

function NavItem({ path, name, icon }: INavItemProps) {
  return (
    <NavLink
      end={path === "/" ? true : false}
      to={path}
      style={({ isActive }) => {
        return {
          width: "100%",
          backgroundColor: isActive ? "#E5F0FF" : "transparent",
          padding: "12px 10px",
          borderRadius: "8px",
          color: isActive ? "#4695FF" : "#6F767E",
        };
      }}
    >
      <HStack align="center" spacing="12px">
        <Icon as={icon} boxSize={7} />
        <Text fontSize="16px" fontWeight="600">
          {name}
        </Text>
      </HStack>
    </NavLink>
  );
}

export default NavItem;
