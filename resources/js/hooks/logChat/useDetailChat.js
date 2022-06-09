import { useDispatch, useSelector } from "react-redux";
import { getDetailChatAction } from "../../redux/actions/logChatAction";

const useDetailChat = () => {
  const logChatState = useSelector((state) => state.logChatState);
  const dispatch = useDispatch();

  const getDetailChat = (payload) => {
    dispatch(getDetailChatAction(payload));
  };
  return {
    detailChat: logChatState.detailChat,
    getDetailChat,
  };
};

export default useDetailChat;
