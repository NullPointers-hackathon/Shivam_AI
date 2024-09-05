import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CodeEditor from "../CodeEditor";
import Header from "../../../common/header/Header";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../../redux/slices/titleSlice";
const SolutionPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Code Editor")); //use the title u need
  }, [dispatch]);
  return (
    <>
      <Header />
      <Box minH="100vh" bg="#131314" color="gray">
        <CodeEditor />
      </Box>
    </>
  );
};

export default SolutionPage;
