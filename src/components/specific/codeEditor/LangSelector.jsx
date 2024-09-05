import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { LANGUAGE_VERSIONS } from "../../../Constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const activeColor = "#01CED7"; // Highlight color
const buttonBg = "#7D1BA2"; // Button background color
const menuBg = "#110c1b"; // Menu background color
const hoverBg = "#3E3B6E"; // Hover background color

const LangSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={2}>
      <Text mb={2} fontSize="lg" px={6} mt={25} color="gray.300">
        Language:
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          px={8}
          bg={buttonBg}
          color="white"
          borderRadius="md"
          m="10px"
          minH="40px"
          minW="8vw"
          _hover={{ bg: "#4a4a4a" }} // Darker hover effect for the button
        >
          {language}
        </MenuButton>
        <MenuList
          zIndex={1}
          borderRadius="md"
          border="2px solid #454545"
          bg={menuBg}
          minH="100px"
          minW="10vw"
          m="5px"
          padding="5px"
          boxShadow="md" // Adding shadow for a lifted effect
        >
          {languages.map(([lang, version], index) => (
            <React.Fragment key={lang}>
              <MenuItem
                color={lang === language ? activeColor : "white"}
                bg={lang === language ? "#3A3A4B" : "transparent"}
                onClick={() => onSelect(lang)}
                _hover={{ color: activeColor, bg: hoverBg }} // Hover effect
                _notLast={{ borderBottom: "1px solid #454545" }} // Separation line
                px={4} // Padding
                py={2} // Padding
              >
                {lang}
                <Text as="span" color="gray.400" fontSize="sm" ml={2}>
                  {version}
                </Text>
              </MenuItem>
              {index !== languages.length - 1 && (
                <Box height="1px" bg="#454545" />
              )}{" "}
              {/* Separation line */}
            </React.Fragment>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LangSelector;
