/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useGetProductImages = (productHandle: string) => {
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProductImages = async () => {
      dispatch(toggleLoader(true));
      try {
        const response = await graphqlClient.post("", {
          query: `query GetProductByHandle($handle: String!) {
            productByHandle(handle: $handle) {
              id
              media(first: 50) {
                edges {
                  node {
                    mediaContentType
                    alt
                    ...mediaFieldsByType
                  }
                }
              }
            }
          }
          
          fragment mediaFieldsByType on Media {
            ...on ExternalVideo {
              id
              host
              originUrl
            }
            ...on MediaImage {
              image {
                url
              }
            }
          }`,
          variables: {
            handle: productHandle,
          },
        });
        const { data } = response;

        setProductImages(data?.productByHandle?.media?.edges);
        setLoading(false);
        dispatch(toggleLoader(false));
      } catch (error: any) {
        setError(error);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    };

    getProductImages();
  }, [productHandle]);

  return { productImages, loading, error };
};

export default useGetProductImages;
