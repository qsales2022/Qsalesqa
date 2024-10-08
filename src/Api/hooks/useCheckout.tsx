/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import {useEffect, useState} from 'react';
import graphqlClient from '../interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';
import {RootState} from '../../redux/store';

const useCheckout = () => {
  const {language = 'EN'} = useSelector(
    (state: RootState) => state.AuthReducer,
  );
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      const value = await AsyncStorage.getItem('checkoutId');
      if (value !== null) {
        //         const response = await graphqlClient.post("", {
        //           query:
        //             `mutation @inContext(language: ` +
        //             language.toUpperCase() +
        //             `) {
        //   checkoutShippingAddressUpdateV2(
        //     shippingAddress: {
        //       address1: "${buildingNumber},${place}"
        //       city: "${city}"
        //       country: "Qatar"
        //       firstName: "${firstName}"
        //       lastName: "${lastName}"
        //       phone: "${phone}"
        //       province: "Updated Shipping Province"
        //       zip: "00000"
        //     }
        //     checkoutId: "${value}"
        //   ) {
        //     checkout {
        //       id
        //       webUrl
        //     }
        //     checkoutUserErrors {
        //       code
        //       field
        //       message
        //     }
        //   }
        // }
        //           `,
        //           // variables: {
        //           //   id: id,
        //           // },
        //         });
        const mutation = `
    mutation updateShippingAddress($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
    checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
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
`;


        const variables = {
          checkoutId: value,
          shippingAddress: {
            address1: `${buildingNumber},${place}`,
            city: city,
            country: 'Qatar',
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            province: 'Updated Shipping Province',
            zip: '00000',
          },
        };
        // const variables = {
        //   checkoutId: value,
        //   shippingAddress: {
        //     address1: `16/11/2000`,
        //     city: city,
        //     country: 'Qatar',
        //     firstName: "naseeb",
        //     lastName: "nasi",
        //     phone: "9037562939",
        //     province: 'Updated Shipping Province',
        //     zip: '00000',
        //   },
        // };
        const response = await graphqlClient.post('', {
          query: mutation,
          variables,
        });

        console.log(response, 'Responce========');
        const {data} = response;
        setCheckout(data);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return {checkout, checkoutWithShipping};
};

export default useCheckout;
