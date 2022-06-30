import { userApis } from "../../services/user-apis";
import { useDispatch, useSelector } from "react-redux";
import { showProfileAction } from "../../redux/actions/authAction";
const useUserRegistrationClient = () => {
  const dispatch = useDispatch();
  const UserRegistrationClient = (userProfile, onSuccess, onFailure) => {
    //call update status active
    userApis
      .userRegistration(userProfile)
      .then((data) => {
        //get user profile
        dispatch(showProfileAction());
        onSuccess();
      })
      .catch((err) => {
        // error
        // console.log('error',err);
      });
  };

  // call api couter click
  const availableCounterClient = () => {
    userApis
      .availableCounter()
      .then((data) => {
        // console.log('data',data);
      })
      .catch((err) => {
        //error message
        // console.log('error');
      });
  };

  return {
    UserRegistrationClient,
    availableCounterClient,
  };
};

export default useUserRegistrationClient;
