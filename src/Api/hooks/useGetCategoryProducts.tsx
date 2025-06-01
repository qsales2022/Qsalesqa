// useGetCategoryProducts.js
import {useState, useCallback} from 'react';
import graphqlClient from '../interceptor';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';
import {RootState} from '../../redux/store';

const useGetCategoryProducts = () => {
  const {language = 'EN'} = useSelector(
    (state: RootState) => state.AuthReducer,
  );
  const dispatch = useDispatch();

  const getProducts = useCallback(
    async (handle: any, count: any) => {
      dispatch(toggleLoader(true));
      try {
        const response = await graphqlClient.post('', {
          query: `
          query GetProductsInCollection($handle: String!, $count: Int!) @inContext(language: ${language.toUpperCase()}) {
            collection(handle: $handle) {
              id
              title
              products(first: $count) {
                edges {
                  node {
                    id
                    title
                    handle
                    vendor
                    availableForSale
                    images(first: 1) {
                      edges {
                        node {
                          id
                          url
                          width
                          height
                          altText
                        }
                      }
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                        
                    }
                      variants(first: 1) {
                        edges {
                          node {
                            compareAtPrice {
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
        `,
          variables: {handle, count},
        });

        const {data} = response;
        dispatch(toggleLoader(false));

        return data?.collection?.products?.edges || [];
      } catch (error) {
        dispatch(toggleLoader(false));
        throw error;
      }
    },
    [dispatch, language],
  );

  return {getProducts};
};

export default useGetCategoryProducts;