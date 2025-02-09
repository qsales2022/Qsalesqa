import axios from 'axios';

// Create an instance of axios
const graphqlClient = axios.create({
  baseURL:
    'https://qsales-online-shopping.myshopify.com/api/2025-01/graphql.json',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': 'c8359c68f8402abb41d906daf4ef5e95',
  },
});

export const DOMAIN = 'https://qsales.qa'
// Add an interceptor to handle the GraphQL request and response
graphqlClient.interceptors.request.use(config => {
  // Modify the request config if needed
  // For example, you can add headers or authentication tokens here
  return config;
});

graphqlClient.interceptors.response.use(
  response => {
    // Handle the response data here
    return response.data;
  },
  error => {
    // Handle any errors that occur during the request
    throw error;
  },
);

export default graphqlClient;
