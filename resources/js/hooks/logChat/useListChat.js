import { useDispatch, useSelector } from "react-redux";
import { getListChatAction } from "../../redux/actions/logChatAction";

const useListChat = () => {
  const logChatState = useSelector((state) => state.logChatState);
  const dispatch = useDispatch();

  const getListChat = () => {
    dispatch(getListChatAction());
  };

  return {
    listChat: logChatState.listChat,
    getListChat,
  };
};

export default useListChat;
