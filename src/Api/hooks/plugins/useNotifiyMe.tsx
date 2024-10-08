/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../redux/reducers/GlobalReducer";
import axios from "axios";

const useNotifiyMe = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const notify = async (email: any, phone_number: any,product_no: any,customer_utc_offset: any,product_title: any,product_handle: any,variant_no: any,variant_title: any,sku: any) => {
    dispatch(toggleLoader(true));
    try {
      const response = await axios
        .create({
          baseURL:
            `https://xsy6rdr4zb.execute-api.us-west-1.amazonaws.com/prod/api?shop=qsales-online-shopping.myshopify.com&notification[product_no]=${product_no}&notification[quantity_required]=1&notification[accepts_marketing]=false&notification[customer_utc_offset]=-${customer_utc_offset}&notification[product_title]=${product_title}&notification[product_vendor]=Qsales%20Online%20Shopping&notification[product_handle]=${product_handle}&notification[email]=${email}&notification[phone_number]=${phone_number}&variant[variant_no]=${variant_no}&variant[variant_title]=${variant_title}&variant[sku]=${sku}`,
        })
        .get("");

      setResponse(response.data);

      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };


  return { response, notify };
};

export default useNotifiyMe;
