/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import graphqlClient from '../interceptor';
import {useDispatch} from 'react-redux';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';

const useAddToCart = () => {
  const [addCartData, setAddCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const addToCart = async (variantId: any, cartId: any, quantity: any) => {
    console.log(cartId, 'this variantId');

    dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post('', {
        query: `
          mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                id
                lines(first: 100) {
                  edges {
                    node {
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                        }
                      }
                      quantity
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity,
            },
          ],
        },
      });

      const {data} = response;
      if (data?.cartLinesAdd?.userErrors?.length) {
        console.error('User Errors:', data.cartLinesAdd.userErrors);
      }

      setAddCartData(data?.cartLinesAdd?.cart);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error);
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const addToCartFrequentlyBought = async (
    checkoutId: string,
    lineItems: {variantId: string; quantity: number}[] | any,
    ymqOptions: any,
  ) => {
    // Ensure lineItems is an array
    console.log(lineItems, 'line items');
    //   const lines = [lineItems]
    //   console.log(lines[0],'lines is ff');

    // const validLineItems = [
    //   { variantId: 'gid://shopify/ProductVariant/48533704540449', quantity: 1 },
    //   { variantId: 'gid://shopify/ProductVariant/44622216593697', quantity: 2 },
    //   { variantId: 'gid://shopify/ProductVariant/47143115227425', quantity: 3 },
    // ];

    // if (!Array.isArray(lineItems)) {
    //   console.warn(
    //     'Warning: lineItems is not an array, converting to array',
    //     lineItems,
    //   );
    //   lineItems = [lineItems]; // Wrap it into an array if it's not already an array
    // }

    // Ensure that lineItems has valid data
    // const validLineItems = lineItems.filter(
    //   (item: any) => item.variantId && item.quantity,
    // );

    try {
      const response = await graphqlClient.post('', {
        query: `
          mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                id
                lines(first: 100) {
                  edges {
                    node {
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                        }
                      }
                      quantity
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          cartId: checkoutId,
          lines: lineItems
            .filter((item: any) => item.merchandiseId && item.quantity)
            .map((item: any) => ({
              merchandiseId: item.merchandiseId,
              quantity: item.quantity,
            })),
        },
      });

      // Debug response
      console.log(
        JSON.stringify(response.data.cartLinesAdd, null, 2),
        'Response',
      );
      console.log(
        JSON.stringify(response.data.cartLinesAdd.userErrors, null, 2),
        'User Errors',
      );

      const {data} = response;

      if (!data || !data.cartLinesAdd) {
        console.error('No cart data returned or invalid response structure.');
        return;
      }

      // console.log(
      //   'addToCartFrequentlyBought - Response Data:',
      //   JSON.stringify(data, null, 2),
      // );

      setAddCartData(data);
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      console.error('Error in addToCartFrequentlyBought:', error);
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return {addCartData, addToCart, addToCartFrequentlyBought};
};

export default useAddToCart;
