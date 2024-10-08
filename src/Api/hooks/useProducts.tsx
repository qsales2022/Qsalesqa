// /* eslint-disable no-catch-shadow */
// // useGetBestSelling.js
// import { useEffect, useState } from "react";
// import graphqlClient from "../interceptor";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleLoader } from "../../redux/reducers/GlobalReducer";
// import { RootState } from "../../redux/store";

// const useGetProducts = () => {
  
//   const { language = "EN" } = useSelector(
//     (state: RootState) => state.AuthReducer
//   );
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const getProducts = async (handle: any, count: any, search: any) => {
//   useEffect(() => {
//     (function(){

//     })()
//       dispatch(toggleLoader(true));
//       try {
//         const response = await graphqlClient.post("", {
//           query:
//             `
//             query GetProductsInCollection($handle: String!, $count: Int!)
// @inContext(language: ` +
//             language.toUpperCase() +
//             `) {
//   collection(handle: $handle) {
//     id
//     title
//     products(first: $count) {
//       edges {
//         node {
//           id
//           title
//           handle
//           vendor
//           availableForSale
//           images(first: 1) {
//             edges {
//               node {
//                 id
//                 url
//                 width
//                 height
//                 altText
//               }
//             }
//           }
//           priceRange {
//             minVariantPrice {
//               amount
//               currencyCode
//             }
//             maxVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }
//   }
// }
//           `,
//           variables: {
//             handle: handle,
//             count: count,
//           },
//         });
//         // console.log(response, "RESPONSE======");
//         const { data } = response;
//         setProducts(data?.collection?.products?.edges);
//         setLoading(false);
//         dispatch(toggleLoader(false));
//       } catch (error: any) {
//         setError(error);
//         setLoading(false);
//         dispatch(toggleLoader(false));
//       }
//     },[handle, count]);
//   } ;

//   return { products, loading, error };
// };

// export default useGetProducts;
