/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../redux/reducers/GlobalReducer";
import axios from "axios";

const useDealBlock = () => {
  // const [deals, setDeals] = useState(null);
  const [deals, setDeals] = useState<any | null>(null);
  const [dealLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getDeals = async (productId: any) => {
    dispatch(toggleLoader(true));
    try {
      const response = await axios
        .create({
          baseURL: `https://kachingappz-bundles.herokuapp.com/storefront_api/deal_blocks?shop=qsales-online-shopping.myshopify.com`,
        })
        .get("");
        interface Block {
          selectedProductIds: number[];
          // Add other properties if needed
      }
      console.log(productId,'here product idr')
      console.log(productId, typeof productId, 'here product idr');

      const data: Block[] = response.data.deal_blocks;
      // const targetProductId: number = productId;
      const matchingArrays: Block[] = [];
      // console.log(productId,targetProductId,'here product idr')
      // data.forEach((block: Block) => {
      //     if (block.selectedProductIds.includes(targetProductId)) {
      //         matchingArrays.push(block);
      //     }
      // });
      const targetProductId: number = parseInt(productId, 10); // Convert string to number

if (!isNaN(targetProductId)) { // Check if conversion was successful
    data.forEach((block: Block) => {
        if (block.selectedProductIds.includes(targetProductId)) {
            matchingArrays.push(block);
        }
    });
} else {
    console.error('Invalid productId:', productId);
}
      
      console.log('Deals: test match ',matchingArrays);

      console.log(
        "Deals: test new ",productId,response.data.deal_blocks[0].selectedProductIds,
        response.data?.deal_blocks.filter((item: any) =>
          item.selectedProductIds.includes(productId)  
        )
      );
      let productDeal = response.data?.deal_blocks.filter((item: any) =>
        item.selectedProductIds.includes(productId)
        
      );
      // setDeals(productDeal.length > 0 ? productDeal[0] : null);
      setDeals(matchingArrays.length > 0 ? matchingArrays[0] : null);
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { dealLoading, deals, getDeals, setDeals };
};

export default useDealBlock;
