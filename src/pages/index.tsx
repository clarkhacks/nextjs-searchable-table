import type { NextPage } from "next";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";

import { Table } from "../components/Table";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";

import { TablesResponse } from "./api/tables";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next.js Parsel Project</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Next.js Parsel Project" />
      </Head>

      <Tables />
    </div>
  );
};

const Tables = () => {
  const { error, loading, data, refetch } = useQuery<{
    tables: TablesResponse;
  }>(GET_TABLES);

  if (error)
    return (
      <Error
        error={error.message || "Could not load table data."}
        onRetry={refetch}
      />
    );

  if (loading) return <Loading />;

  return (
    <div>
      {data?.tables.tables.map((table, i) => (
        <Table key={i} table={table} className={i === 0 ? "" : "mt-12"} />
      ))}
    </div>
  );
};

const GET_TABLES = gql`
  query Tables {
    tables @rest(type: "Tables", path: "tables") {
      tables {
        page_number
        index_on_page
        n_rows
        n_columns
        title
        subtitle
        type
        geo_bounds {
          left
          top
          right
          bottom
        }
        row_captions
        column_captions
        values
        generated_by
        validated
      }
    }
  }
`;

export default HomePage;
