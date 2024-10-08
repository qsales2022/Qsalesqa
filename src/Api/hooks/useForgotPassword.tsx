/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useForgotPassword = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const recoverPassword = async (emailId: any) => {
    dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post("", {
        query: `mutation customerRecover($email: String!) {
          customerRecover(email: $email) {
            customerUserErrors {
                code
                field
                message
            }
          }
        }`,
        variables: {
          email: emailId,
        },
      });

      const { data } = response;
      setData(data);
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {}, []);

  return { data, recoverPassword };
};

export default useForgotPassword;
