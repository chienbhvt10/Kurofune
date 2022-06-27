import { userApis } from "../../services/user-apis";

const useUserRegistrationClient = () => {
  
  const UserRegistrationClient = (userProfile) => {
    userApis.userRegistration(userProfile)
    .then((data)=>{
      console.log('data',data);
    }).catch((err) => {
      console.log('error');
    })
  }

  return {
    UserRegistrationClient
  };
};

export default useUserRegistrationClient;
