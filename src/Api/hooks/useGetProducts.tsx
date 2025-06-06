/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { RootState } from "../../redux/store";

const useGetProducts = (handle: any, count: any, search: any) => {
  const { language = "EN" } = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      dispatch(toggleLoader(true));
      try {
        const response = await graphqlClient.post("", {
          query: `
            query GetProductsInCollection($handle: String!, $count: Int!)
            @inContext(language: ${language.toUpperCase()}) {
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
                      tags
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
          variables: {
            handle: handle,
            count: count,
          },
        });
  
        const { data } = response;
        setProducts(data?.collection?.products?.edges);
        if(handle=="kitchen-improvement"){
          console.log(data?.collection?.products?.edges,'kitchen-improvement09');

        }
        
        setLoading(false);
        dispatch(toggleLoader(false));
      } catch (error: any) {
        setError(error);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    };
  
    getProducts();
  }, [handle, count]);
  // console.log(products,'fffff');

  return { products, loading, error };
};

export default useGetProducts;
