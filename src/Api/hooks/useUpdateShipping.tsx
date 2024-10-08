/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from 'react';
import graphqlClient from '../interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../redux/reducers/GlobalReducer';

const useUpdateShipping = () => {
  const [shippingUpdateData, setShippingUpdateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const updateShppingMethod = async (handle: any) => {
    dispatch(toggleLoader(true));
    try {

      const value = await AsyncStorage.getItem("checkoutId");
      if (value !== null) {
        const response = await graphqlClient.post('', {
          query: `mutation {
            checkoutShippingLineUpdate(
              checkoutId: "${value}"
              shippingRateHandle: "${handle}"
            ) {
              checkout {
                id
                webUrl
              }
              checkoutUserErrors {
                code
                field
                message
              }
            }
          }
          
          `,
          // variables: {
          //   id: id,
          // },
        });
        const { data } = response;
        setShippingUpdateData(data);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { shippingUpdateData, updateShppingMethod };
};

export default useUpdateShipping;
