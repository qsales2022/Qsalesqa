/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import {useEffect, useState} from 'react';
import graphqlClient from '../interceptor';
import {useDispatch} from 'react-redux';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';

const useCreateCart = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const createCart = async () => {
    dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post('', {
        query: `mutation cartCreate($input: CartInput) {
  cartCreate(input: $input) {
    cart {
      id
    }
    userErrors {
      message
    }
  }
}
`,
        // variables: {
        //   id: '95def434132b42fb7ce069d0e88091dd',
        // },
      });

      const {data} = response;
      console.log(data, 'cf34a353f450b8af7aa7c5fbaf17005d');

      setCart(data);

      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return {cart, createCart};
};

export default useCreateCart;
