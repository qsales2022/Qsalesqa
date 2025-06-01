/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import {useEffect, useState} from 'react';
import graphqlClient from '../interceptor';
import {useDispatch, useSelector} from 'react-redux';
import {updateCount} from '../../redux/reducers/CartReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';
import {RootState} from '../../redux/store';

const useGetCart = () => {
  const {language = 'EN'} = useSelector(
    (state: RootState) => state.AuthReducer,
  );
  const [cartDetails, setcartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getCartData = async () => {
    dispatch(toggleLoader(true));
    try {
      const value = await AsyncStorage.getItem('checkoutId');
      console.log(value, 'this is the checkoutId');

      if (value !== null) {
        const response = await graphqlClient.post('', {
          query: `
            query GetCartDetails($id: ID!) {
              cart(id: $id) {
                id
                lines(first: 100) {
                  edges {
                    node {
                      id
                      quantity
                       discountAllocations {
                              discountedAmount {
                                amount
                                currencyCode
                              }
                            }
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          
                          price {
                            amount
                            currencyCode
                          }
                          product {
                            id
                            handle
                            title
                            onlineStoreUrl
                            variants(first: 100) {
                              edges {
                                node {
                                  id
                                  title
                                  sku
                                  quantityAvailable
                                  selectedOptions {
                                    name
                                    value
                                  }
                                  image {
                                    url
                                  }
                                  price {
                                    amount
                                    currencyCode
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                    
                }
              }
            }
          `,
          variables: {
            id: value,
          },
        });

        const {data} = response;
            
        // Check if data is valid before updating the state
          console.log(data?.cart,'data?.cart?.lines');
          
        if (data?.cart?.lines?.edges?.length) {
          
          setcartDetails(data);
        } else {
          setcartDetails(null);
        }
        dispatch(updateCount(data?.cart?.lines?.edges?.length));

        dispatch(toggleLoader(false));
      } else {
        dispatch(toggleLoader(false));
      }
    } catch (e: any) {
      console.error(e); // Log the error for debugging purposes
      setError(e.message || 'An error occurred');
      dispatch(toggleLoader(false));
    } finally {
      setLoading(false);
    }
  };

  return {cartDetails, getCartData, loading, error};
};

export default useGetCart;
