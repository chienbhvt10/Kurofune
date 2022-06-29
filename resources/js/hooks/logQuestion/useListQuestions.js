import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListLogActions } from "../../redux/actions/logQuestionAction";

const useListQuestions = () => {
  const { listQuestions } = useSelector((state) => state.logQuestionState);
  const dispatch = useDispatch();

  const getListQuestions = () => {
    dispatch(getListLogActions());
  };

  return {
    getListQuestions,
    listQuestions,
  };
};

export default useListQuestions;
