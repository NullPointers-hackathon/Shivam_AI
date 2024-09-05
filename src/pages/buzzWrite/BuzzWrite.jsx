import React, { useEffect } from 'react';
import ExampleSection from '../../components/common/examplesection/ExampleSection';
import PromptBar from '../../components/common/promptbar/PromptBar';
import "./BuzzWrite.css"
import Header from '../../components/common/header/Header';
import { setTitle } from '../../redux/slices/titleSlice';
import { useDispatch } from 'react-redux';

const BuzzWrite = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setTitle("BuzzWriter")); //use the title u need
    }, [dispatch]);
  return (
    <div className='buzzwrite-main-container'>
        <Header />
        <ExampleSection/>
        <PromptBar/>
    </div>
  )
}

export default BuzzWrite