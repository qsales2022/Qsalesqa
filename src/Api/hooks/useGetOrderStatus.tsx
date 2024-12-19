import axios from 'axios';
import {useState} from 'react';

export const useGetOrderStatus = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const findOrderStatus = async (orderNo: any) => {
    try {
      setLoading(true);
      const response = await axios.get('https://qsales.qa/ordres');
      setData(response.data);
    } catch (error: any) {
      console.error(error.message, 'this is message');
    } finally {
      setLoading(false);
    }
  };

  return {data, findOrderStatus, loading};
};
