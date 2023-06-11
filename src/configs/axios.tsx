import axios from "axios";
import { createStandaloneToast, useToast } from "@chakra-ui/react";
import { Toast } from "components";
import { ICurrentUser } from "interfaces";
import { BASE_URL, CREDENTIAL_LOCALSTORAGE_KEY } from "../utils/constants";

// function AuthHeader() {
//   // return authorization header with jwt token
//   const { userInfor: currentUser } = AuthService();
//   if (currentUser && currentUser.accessToken) {
//     return {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${currentUser.accessToken}`,
//     };
//   } else {
//     return {
//       "Content-type": "application/json",
//     };
//   }
// }

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

apiClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => errorHandler(error)
);

const errorHandler = (error: any) => {
  const { toast } = createStandaloneToast();
  // console.log(error);

  //   if (!error.status) {
  //     toast({
  //       position: "top-right",
  //       duration: 2000,
  //       render: () => (
  //         <Toast type="Error" content="Our server is feeling a little down" />
  //       ),
  //     });
  //   } else {
  //     toast({
  //       position: "top-right",
  //       duration: 2000,
  //       render: () => (
  //         <Toast type="Error" content={error.response.data.message} />
  //       ),
  //     });
  //   }

  if (!error.response) {
    console.log("1");

    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <Toast type="Error" content="Network error. Please try again." />
      ),
    });
  } else {
    // console.log("check");
    const status = error.response.status;
    let errorMessage = "An error occurred.";

    if (status === 401) {
      errorMessage = "Unauthorized";
    } else if (status === 403) {
      errorMessage = "Forbidden";
    } else if (status === 404) {
      errorMessage = "Not Found";
    } else if (status === 500) {
      errorMessage = "Internal Server Error";
    } else if (status === 503) {
      errorMessage = "Service Unavailable";
    } else if (error.response.data && error.response.data.message) {
      console.log("runnign");
      errorMessage = error.response.data.message;
    }

    toast({
      position: "top-right",
      duration: 2000,
      render: () => <Toast type="Error" content={errorMessage} />,
    });
  }

  return Promise.reject(error);
};
