import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { executeCode } from "../../../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setIsError(!!result.stderr); // Set isError to true if result.stderr exists
      // Ensure result.output is an array before splitting it
      const outputLines = Array.isArray(result.output)
        ? result.output
        : [result.output];
      setOutput(outputLines.map((line) => line.split("\n")).flat()); // Flatten array of arrays
    } catch (error) {
      console.error(error);
      toast({
        title: "An Error Occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%" mr={4}>
      <Text mb={2} mt={25} fontSize="lg" color="gray.300">
        Output
      </Text>
      <Button
        variant="solid"
        colorScheme="teal"
        bg="#7D1BA2"
        color="white"
        borderRadius="md"
        m="10px"
        minH="40px"
        minW="8vw"
        _hover={{ bg: "#4a4a4a" }} // Hover effect for the button
        mb={10}
        onClick={runCode}
        isLoading={isLoading}
      >
        Run Code
      </Button>
      <Box
        height="100vh"
        pl={20}
        color={isError ? "#7D1BA2" : "#01CED7"} // Error and normal colors
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "#7D1BA2" : "#01CED7"}
        overflow="auto"
        bg="#1a1a1a" // Background color for dark theme
      >
        {output.length
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : "Click 'Run Code' to see the output here"}
      </Box>
    </Box>
  );
};

export default Output;
