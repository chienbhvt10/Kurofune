import { useDispatch, useSelector } from "react-redux";
import { exportAllQuestionCSVLogAction } from "../../redux/actions/exportCsvAction.js";

const useExportAllLog = () => {
  const {csvAllLog} = useSelector((state) => state.logQuestionState);
  const dispatch = useDispatch();

  const exportAllLog = () => {
    dispatch(exportAllQuestionCSVLogAction());
  };
  return {
    csvAllLog,
    exportAllLog,
  };
};

export default useExportAllLog;
