/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { RootState } from "../../redux/store";

const useGetHomeSection = () => {
  const { language = "EN" } = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const [sectionList, setSectionList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getSectionData = async (id:any) => {
    dispatch(toggleLoader(true));

    const response = await graphqlClient.post("", {
      query: `query getMetaObject($id: ID!) {
                  metaobject(id: $id) {
                      fields {
                      value
                      }
                  }
                  }`,
      variables: {
        id: `gid://shopify/Metaobject/${id}`,
      },
    });

    const { data } = response;
    if (data?.metaobject?.fields && data?.metaobject?.fields.length > 0) {
      let listData = JSON.parse(data?.metaobject?.fields[0].value);
      // console.log(listData,'listDatalistData');
      return listData[language?.toLowerCase()]
        ? listData[language.toLowerCase()]
        : [];
    }
  };
   
    
  return getSectionData;
};

export default useGetHomeSection;
