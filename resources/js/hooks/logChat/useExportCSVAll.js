import { useDispatch, useSelector } from "react-redux";
import { exportCsvAllAction } from "../../redux/actions/exportCsvAction";

const useExportCsvAll = () => {
  const logChatState = useSelector((state) => state.logChatState);
  const dispatch = useDispatch();

  const exportCsvAll = (payload) => {
    dispatch(exportCsvAllAction(payload));
  };

  return {
    csvAllUser: logChatState.csvAllUser,
    exportCsvAll,
  };
};

export default useExportCsvAll;
