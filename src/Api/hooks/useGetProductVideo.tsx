/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useGetProductVideo = (productID: string) => {
  const [productVideo, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProductVideo = async () => {
      dispatch(toggleLoader(true));
      try {
        const response = await graphqlClient.post("", {
          query: `query getProductById($id: ID!, $identifiers: [HasMetafieldsIdentifier!]!) {
                    product(id: $id) {
                        title
                        metafields (identifiers: $identifiers) {
                            value
                        }
                    }
                }`,
          variables: {
            id: productID,
            identifiers: [
              {
                namespace: "ymq_option",
                key: "ymq_product_options",
              },
              {
                namespace: "custom",
                key: "youtube_url",
              },
            ],
          },
        });

        const { data } = response;
        if (data) {
          const resultArray = data?.product?.metafields
            .filter(
              (item: any) =>
                item !== null && typeof item === "object" && "value" in item
            )
            .map((item: any) => ({ value: item.value }));
          setProductImages(resultArray[0]);
        }
        setLoading(false);
        dispatch(toggleLoader(false));
      } catch (error: any) {
        setError(error);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    };

    getProductVideo();
  }, [productID]);

  return { productVideo, loading, error };
};

export default useGetProductVideo;
