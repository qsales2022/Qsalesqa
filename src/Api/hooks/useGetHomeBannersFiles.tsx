
import { useEffect, useState, useRef, useCallback } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useGetHomeBannersFiles = () => {
  const [bannerFiles, setBannerFiles] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef<any>(null); // Store cached data
  const dispatch = useDispatch();

  const getBannerFiles = useCallback(async () => {
    if (cacheRef.current) {
      // Use cached data if available
      setBannerFiles(cacheRef.current);
      setLoading(false);
      return;
    }

    dispatch(toggleLoader(true));
    setLoading(true);

    try {
      const response = await graphqlClient.post("", {
        query: `query getMetaObject($id: ID!) {
          metaobject(id: $id) {
            fields {
              value
            }
          }
        }`,
        variables: {
          id: "gid://shopify/Metaobject/15024980257",
        },
      });

      const { data } = response;
      if (data?.metaobject?.fields && data?.metaobject?.fields.length > 0) {
        const parsedData = JSON.parse(data.metaobject.fields[0].value);
        setBannerFiles(parsedData);
        cacheRef.current = parsedData; // Cache the data
      }
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    } finally {
      dispatch(toggleLoader(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getBannerFiles();
  }, [getBannerFiles]);

  return { bannerFiles, loading, error };
};

export default useGetHomeBannersFiles;

