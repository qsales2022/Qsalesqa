/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { RootState } from "../../redux/store";

const useGetHomeSectionsThree = () => {
  const { language = "EN" } = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const [sectionListThree, setSectionList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getSectionData = async () => {
      dispatch(toggleLoader(true));
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
            id: "gid://shopify/Metaobject/44402147617",
          },
        });

        const { data } = response;
        if (data?.metaobject?.fields && data?.metaobject?.fields.length > 0) {
          let listData = JSON.parse(data?.metaobject?.fields[0].value);
          setSectionList(
            listData[language?.toLowerCase()]
              ? listData[language.toLowerCase()]
              : []
          );
        }
        setLoading(false);
        dispatch(toggleLoader(false));
      } catch (error: any) {
        setError(error);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    };

    getSectionData();
  }, []);

  return { sectionListThree, loading, error };
};

export default useGetHomeSectionsThree;
