import { useState } from 'react';
import graphqlClient from '../interceptor';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../redux/reducers/GlobalReducer';

const useChekoutUrl = () => {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const createChekout = async (cartId: string): Promise<string | null> => {
    dispatch(toggleLoader(true));
    setLoading(true);

    try {
      const response = await graphqlClient.post('', {
        query: `
          query checkoutURL($cartId: ID!) {
            cart(id: $cartId) {
              checkoutUrl
            }
          }
        `,
        variables: { cartId },
      });

      const { data } = response
      console.log(data,'this is response');
      
      if (data?.cart?.checkoutUrl) {
        setCheckoutUrl(data.cart.checkoutUrl);
        return data.cart.checkoutUrl; // Return the checkout URL
      } else {
        throw new Error('No checkout URL found.');
      }
    } catch (err: any) {
      console.error('Error fetching checkout URL:', err);
      setError(err.message || 'An unknown error occurred.');
      return null;
    } finally {
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { checkoutUrl, createChekout, loading, error };
};

export default useChekoutUrl;
