import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { RootState } from "../../redux/store";

const useGetCollections = (count: number) => {
  const { language = "EN" } = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCollections = async () => {
      dispatch(toggleLoader(true));
      try {
        const response = await graphqlClient.post("", {
          query:
            `query getCollections($first: Int!) @inContext(language: ` +
            language.toUpperCase() +
            `) {
  collections(first: $first) {
    edges {
      cursor
      node {
        id
        handle
        title
        image {
          originalSrc
        }
        products(first: 1) {
          edges {
            node {
              id
              title
              description
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
          `,
          variables: {
            first: count,
          },
        });
        // console.log(response, "COLLOCTION_RES");
        const { data } = response;
        if (data && data.collections && data.collections.edges) {
          // console.log( data.collections.edges,'this is log catogries');
          
          setCollections(data.collections.edges);
        }
        setLoading(false);
        dispatch(toggleLoader(false));
      } catch (error: any) {
        setError(error);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    };

    getCollections();
  }, [count]);

  return { collections, loading, error };
};

export default useGetCollections;
// import { useEffect, useState } from "react";
// import graphqlClient from "../interceptor";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleLoader } from "../../redux/reducers/GlobalReducer";
// import { RootState } from "../../redux/store";

// const useGetSpecificCollections = (collectionHandles: string[], count: number = 10) => {
//   const { language = "EN" } = useSelector(
//     (state: RootState) => state.AuthReducer
//   );
//   const [collections, setCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getSpecificCollections = async () => {
//       dispatch(toggleLoader(true));
//       try {
//         const response = await graphqlClient.post("", {
//           query: `
//             query getSpecificCollections($handles: [String!]!, $first: Int!) @inContext(language: ${language.toUpperCase()}) {
//               collections(first: $first, query: "handle:[${collectionHandles.join(' OR ')}]") {
//                 edges {
//                   cursor
//                   node {
//                     id
//                     handle
//                     title
//                     image {
//                       originalSrc
//                     }
//                     products(first: 1) {
//                       edges {
//                         node {
//                           id
//                           title
//                           description
//                         }
//                       }
//                     }
//                   }
//                 }
//                 pageInfo {
//                   hasNextPage
//                   hasPreviousPage
//                 }
//               }
//             }
//           `,
//           variables: {
//             handles: collectionHandles,
//             first: count,
//           },
//         });

//         const { data } = response;
//         if (data && data.collections && data.collections.edges) {
//           setCollections(data.collections.edges);
//         }
//         setLoading(false);
//         dispatch(toggleLoader(false));
//       } catch (error: any) {
//         setError(error);
//         setLoading(false);
//         dispatch(toggleLoader(false));
//       }
//     };

//     getSpecificCollections();
//   }, [collectionHandles, count, language]);

//   return { collections, loading, error };
// };

// export default useGetSpecificCollections;


