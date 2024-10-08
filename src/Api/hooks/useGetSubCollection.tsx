import graphqlClient from "../interceptor";

const fetchCollectionAndSubcollections = async (handle:any) => {
  const query = `
    query {
      collectionByHandle(handle: "${handle}") {
        title
        description
        collections(first: 10) {
          edges {
            node {
              title
              description
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphqlClient.post('', { query });
    return response.data.data.collectionByHandle;
  } catch (error) {
    console.error('Error fetching collection and subcollections:', error);
    throw error;
  }
};

export default fetchCollectionAndSubcollections