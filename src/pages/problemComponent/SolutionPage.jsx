import { Box } from '@chakra-ui/react';
import React from 'react'
import CodeEditor from '../../components/specific/codeEditor/CodeEditor';

const SolutionPage = () => {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray">
        <CodeEditor />
    </Box>
  )
}

export default SolutionPage;