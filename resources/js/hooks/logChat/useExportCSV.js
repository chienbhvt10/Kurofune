import { useDispatch, useSelector } from "react-redux";
import { exportCsvUserAction } from "../../redux/actions/exportCsvAction";

const useExportCsv = () => {
  const logChatState = useSelector((state) => state.logChatState);
  const dispatch = useDispatch();

  const exportCsvUser = (payload) => {
    dispatch(exportCsvUserAction(payload));
  };
  return {
    csvUser: logChatState.csvUser,
    exportCsvUser,
  };
};

export default useExportCsv;
