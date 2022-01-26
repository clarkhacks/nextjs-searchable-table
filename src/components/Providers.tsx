import React from "react";
import { ApolloProvider } from "@apollo/client";

import { client } from "../apollo";

export const Providers: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
