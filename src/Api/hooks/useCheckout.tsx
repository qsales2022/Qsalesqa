/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import {useEffect, useState} from 'react';
import graphqlClient from '../interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';
import {RootState} from '../../redux/store';
import {getLogin} from '../../AsyncStorage/StorageUtil';

const useCheckout = () => {
  const {language = 'EN'} = useSelector(
    (state: RootState) => state.AuthReducer,
  );
  const [checkout, setCheckout] = useState(null);
  const [loadingChekout, setloadingChekout] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const checkoutWithShipping = async (
    phone: any,
    firstName: any,
    lastName: any,
    buildingNumber: any,
    place: any,
    city: any,
  ) => {
    dispatch(toggleLoader(true));
    try {
      const token = await getLogin();

      const value = await AsyncStorage.getItem('checkoutId');
      if (value !== null) {
        const mutation = `
  mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

        const variables = {
          cartId: value,
          buyerIdentity: {
            // email: 'customer@example.com',
            // phone: '1234567890',
            customerAccessToken: token,

            // deliveryAddressPreferences: [
            //   {
            //     deliveryAddress: {
            //       address1: "123 Main St",
            //       address2: "Apt 4",
            //       city: "CityName",
            //       company: "CompanyName",
            //       country: "Qatar",
            //       firstName: "John",
            //       lastName: "Doe",
            //       phone: "1234567890",
            //       province: "ProvinceName",
            //       zip: "00000"
            //     },

            //   }
            // ]
          },
        };

        const response = await graphqlClient.post('', {
          query: mutation,
          variables,
        });

        const {data} = response;
        setCheckout(data);
        setloadingChekout(false);
        dispatch(toggleLoader(false));
      }
    } catch (error: any) {
      setError(error);
      setloadingChekout(false);
      dispatch(toggleLoader(false));
    }
  };
  
  return {checkout, checkoutWithShipping};
};

export default useCheckout;
