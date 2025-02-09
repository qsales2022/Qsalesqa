import axios from 'axios';
import {useState} from 'react';

export const useGetOrderStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const findOrderStatus = async (orderNo: any) => {
    console.log('called here data');
    let response: any;
    try {
      setLoading(true);
      response = await axios
        .create({
          baseURL: 'https://qdelivery.online/user/',
          // baseURL: 'http://192.168.8.123:4000/user/',
          headers: {
            'Content-Type': 'application/json',
            // Origin: 'http://localhost:8081',
          },
        })
        .get(`order?searchText=${encodeURIComponent(orderNo)}`);

      // const response = await axios.get('http://192.168.8.123:4000/user/order?sreachText=cheking77')
      console.log(response, 'kkkkjijj');

      return response?.data;
    } catch (error: any) {
      const errorCode = error?.response?.status;
      return errorCode;
    } finally {
      setLoading(false);
    }
  };

  return {findOrderStatus, loading};
};
