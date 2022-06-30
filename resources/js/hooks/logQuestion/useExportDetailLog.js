import { useDispatch, useSelector } from "react-redux";
import { exportDetailQuestionCSVLogAction } from "../../redux/actions/exportCsvAction.js";

const useExportDetailLog = () => {
  const { csvDetailLog } = useSelector((state) => state.logQuestionState);
  const dispatch = useDispatch();

  const exportDetailLog = (payload) => {
    dispatch(exportDetailQuestionCSVLogAction(payload));
  };
  return {
    csvDetailLog,
    exportDetailLog,
  };
};

export default useExportDetailLog;
