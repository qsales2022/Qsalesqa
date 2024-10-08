/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient, { DOMAIN } from "../../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../redux/reducers/GlobalReducer";
import axios from "axios";

const useFetchFrequenltyBroughtItem = () => {
  const [frequentlyBroughtItem, setFrequentlyBroughtItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getFrequentlyBroughtItem = async (product_no: any, path: any) => {
    dispatch(toggleLoader(true));
    try {
      const response = await axios
        .create({
          baseURL:
            `https://www.codeblackbelt.com/json/preferences/frequently-bought-together.json?productId=${product_no}&shop=qsales-online-shopping.myshopify.com&marketCountry=QA&marketCurrency=QAR&path=${path}&version=202308120431
            `, headers: { 'Origin': DOMAIN }
        })
        .get("");

      setFrequentlyBroughtItem(response.data);
      setLoading(false);
      dispatch(toggleLoader(false));
      console.log('FREQ: ',JSON.stringify(response.data));
      
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };


  return { frequentlyBroughtItem, getFrequentlyBroughtItem };
};

export default useFetchFrequenltyBroughtItem;
