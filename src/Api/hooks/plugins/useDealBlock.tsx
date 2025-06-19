// /* eslint-disable no-catch-shadow */
// import {useEffect, useState} from 'react';
// import {useDispatch} from 'react-redux';
// import {toggleLoader} from '../../../redux/reducers/GlobalReducer';
// import axios from 'axios';

// const useDealBlock = () => {
//   const [deals, setDeals] = useState<any | null>(null);
//   const [dealLoading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   const getDeals = async (productId: any) => {
//     console.log('Checking deals...');
//     dispatch(toggleLoader(true));

//     try {
//       // const response = await axios
//       //   .create({
//       //     baseURL: `https://kachingappz-bundles.herokuapp.com/storefront_api/deal_blocks?shop=qsales-online-shopping.myshopify.com`,
//       //   })
//       //   .get('');
//       // console.log(response, 'done deal >>>>>');
//       const response = await axios.post(
//         'https://qsales-online-shopping.myshopify.com/api/2025-04/graphql.json?operation_name=FetchDealBlocks',
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Shopify-Storefront-Access-Token':
//               'c8359c68f8402abb41d906daf4ef5e95',
//           },
//         },
//       );

//       interface Block {
//         selectedProductIds: number[];
//       }

//       const data: Block[] = response.data.deal_blocks;
//       const matchingArrays: Block[] = [];

//       const targetProductId: number = parseInt(productId, 10);
//       if (!isNaN(targetProductId)) {
//         data.forEach((block: Block) => {
//           if (block.selectedProductIds.includes(targetProductId)) {
//             matchingArrays.push(block);
//           }
//         });
//       } else {
//         console.error('Invalid productId', productId);
//       }

//       console.log('Deals: match found', matchingArrays);

//       setDeals(matchingArrays.length > 0 ? matchingArrays[0] : null);
//       setLoading(false);
//       dispatch(toggleLoader(false));
//     } catch (error: any) {
//       console.error('Error fetching deals:', error);
//       setError(error);
//       setLoading(false);
//       dispatch(toggleLoader(false));
//     }
//   };

//   return {dealLoading, deals, getDeals, setDeals};
// };

// export default useDealBlock;

// const fetchDealBlocks = async () => {
//   const query = `
//     query {
//       shop {
//         metafield(namespace: "app--2935586817--kaching_bundles", key: "deal_blocks") {
//           value
//         }
//       }
//     }
//   `;

//   const response = await fetch('https://your-shop-name.myshopify.com/api/2023-10/graphql.json', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Shopify-Storefront-Access-Token': 'your-storefront-token',
//     },
//     body: JSON.stringify({ query }),
//   });

//   const json = await response.json();
//   const dealBlocks = JSON.parse(json.data.shop.metafield.value);
//   return dealBlocks;
// };

/* eslint-disable no-catch-shadow */
//wroking bundle

// import {useState} from 'react';
// import {useDispatch} from 'react-redux';
// import {toggleLoader} from '../../../redux/reducers/GlobalReducer';
// import graphqlClient from '../../interceptor';

// const useDealBlock = () => {
//   const [deals, setDeals] = useState<any | null>(null);
//   const [dealLoading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   const getDeals = async (productId: string) => {
//     console.log(productId, 'Checking deals...productId');
//     dispatch(toggleLoader(true));

//     try {
//       const query = `
//         query {
//           shop {
//             metafield(namespace: "app--2935586817--kaching_bundles", key: "deal_blocks") {
//               value
//             }
//           }
//         }
//       `;

//       const response = await graphqlClient.post('', {query});
//       // console.log(response?.data?.shop, 'respo>>>>><<><><');

//       const rawValue = response?.data?.shop?.metafield?.value;

//       const data = JSON.parse(rawValue);
//        console.log(data,'))))))');

//       const targetProductId: number = parseInt(productId, 10);

//       const matchingBlocks = data.filter((block: any) => {
//         // console.log(
//         //   'starting her--->>,',
//         //   block.selectedProductIds,
//         //   'enindg bro',
//         //   targetProductId,
//         // );
//          console.log( block.dealType,'=+++++');

//         const match = block.selectedProductIds?.includes(targetProductId);

//         return match;
//       });
//       // console.log(matchingBlocks, '_____>>>>>>');

//       setDeals(matchingBlocks.length > 0 ? matchingBlocks[0] : null);
//       setLoading(false);
//       dispatch(toggleLoader(false));
//     } catch (err: any) {
//       console.error('Error fetching deals:', err);
//       setError(err);
//       setLoading(false);
//       dispatch(toggleLoader(false));
//     }
//   };

//   return {dealLoading, deals, getDeals, setDeals};
// };

// export default useDealBlock;

import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {toggleLoader} from '../../../redux/reducers/GlobalReducer';
import graphqlClient from '../../interceptor';

const useDealBlock = () => {
  const [deals, setDeals] = useState<any | null>(null);
  const [dealLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getDeals = async (productId: string) => {
    console.log(productId, 'Checking deals...productId');
    dispatch(toggleLoader(true));

    try {
      const query = `
        query {
          shop {
            metafield(namespace: "app--2935586817--kaching_bundles", key: "deal_blocks") {
              value
            }
          }
        }
      `;

      const response = await graphqlClient.post('', {query});

      const rawValue = response?.data?.shop?.metafield?.value;

      const data = JSON.parse(rawValue);
      // console.log(data, 'All deal blocks data');

      const targetProductId: number = parseInt(productId, 10);

      const matchingBlocks = data.filter((block: any) => {
        // Check if productId is selected in this block
        const productMatch =
          block.selectedProductIds?.includes(targetProductId);
        console.log(productMatch, 'this is the matching id');

        // Check if this block has any buy one get one deal
        const hasBogoDeal = block.dealBars?.some(
          (dealBar: any) => dealBar.dealBarType === 'bxgy' && productMatch,
        );

        // console.log(
        //   'Block dealType or dealBars:',
        //   block.dealType,
        //   block.dealBars,
        // );
        // console.log('productMatch:', productMatch, 'hasBogoDeal', hasBogoDeal);

        // Return true if either condition matches
        return productMatch || hasBogoDeal;
      });

      setDeals(matchingBlocks.length > 0 ? matchingBlocks[0] : null);
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (err: any) {
      console.error('Error fetching deals:', err);
      setError(err);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return {dealLoading, deals, getDeals, setDeals};
};

export default useDealBlock;
