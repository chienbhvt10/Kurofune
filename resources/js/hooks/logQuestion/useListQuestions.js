import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListLogActions } from "../../redux/actions/logQuestionAction";

const useListQuestions = () => {
  const { listQuestions } = useSelector((state) => state.logQuestionState);
  const dispatch = useDispatch();

  const getListQuestions = () => {
    dispatch(getListLogActions());
  };

  React.useEffect(() => {
    if (listQuestions.length === 0) {
      getListQuestions();
    }
  }, [listQuestions]);

  return {
    getListQuestions,
    listQuestions,
  };
};

export default useListQuestions;
