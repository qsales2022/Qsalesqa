/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import {useEffect, useState} from 'react';
import graphqlClient from '../interceptor';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../redux/reducers/GlobalReducer';

const useGetHomeBannersFiles = () => {
  const [bannerFiles, setBannerFiles] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getBannerFiles = async () => {
      dispatch(toggleLoader(true));
      try {
        const response = await graphqlClient.post('', {
          query: `query getMetaObject($id: ID!) {
            metaobject(id: $id) {
              fields {
                value
              }
            }
          }`,
          variables: {
            id : "gid://shopify/Metaobject/15024980257"
          },
        });

        const {data} = response;
        if (data?.metaobject?.fields && data?.metaobject?.fields.length > 0) {
          setBannerFiles(JSON.parse(data?.metaobject?.fields[0].value));
        }
        setLoading(false);
        dispatch(toggleLoader(false));
      } catch (error: any) {
        setError(error);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    };

    getBannerFiles();
  }, []);

  return {bannerFiles, loading, error};
};

export default useGetHomeBannersFiles;
