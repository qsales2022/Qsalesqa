/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import {useEffect, useState} from 'react';
import graphqlClient from '../interceptor';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';
import {RootState} from '../../redux/store';

const useGetProductDetails = (productHandle: string) => {
  const {language = 'EN'} = useSelector(
    (state: RootState) => state.AuthReducer,
  );

  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductDetails = async () => {
      dispatch(toggleLoader(true));
      try {
        const response = await graphqlClient.post('', {
          query:
            `query getProductByHandle @inContext(language: ` +
            language.toUpperCase() +
            `) {
            product(handle: "${productHandle}") {
              id
              title
              metafields (identifiers: [
                {
                    namespace: "ymq_option",
                    key: "ymq_product_options"
                }
            ]) {
                id
                value
                }
              description
              descriptionHtml
              onlineStoreUrl
              variants(first: 100) {
                edges {
                  cursor
                  node {
                    id
                    title
                    sku
                    quantityAvailable
                    selectedOptions{
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
                       compareAtPrice {  
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }`,
          variables: {
            handle: productHandle,
            language: language.toUpperCase(),
          },
        });

        const {data} = response;

        setProductDetails(data?.product);
        setTimeout(() => {
          setLoading(false);
        }, 100);
        dispatch(toggleLoader(false));
      } catch (error: any) {
        setError(error);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    };
    getProductDetails();
  }, [productHandle]);

  return {productDetails, loading, error};
};

export default useGetProductDetails;
