import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, } from '@apollo/client'; 


const url = "https://countries.trevorblades.com/";

const useFunction = () => {
    let client = new ApolloClient({
        uri : url,
        cache : new InMemoryCache
      })
    
      client.query({
        query: gql`
        query {
          countries {
            name
          }
        }
        `
    
      }
        ).then((res) => {console.log(res)})
};

export default useFunction;