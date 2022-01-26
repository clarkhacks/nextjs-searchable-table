import type { NextApiRequest, NextApiResponse } from "next";

import tables from "./tables.json";

export type TablesResponse = {
  tables: Table[];
};

export type Table = {
  page_number: number;
  index_on_page: number;
  n_rows: number;
  n_columns: number;
  title: string;
  subtitle: string;
  type: string;
  geo_bounds: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  row_captions: {
    [key: string]: string;
  };
  column_captions: {
    [key: string]: string;
  };
  values: {
    [key: string]: string;
  };
  generated_by: string;
  validated: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TablesResponse>
) {
  res.status(200).json(tables as TablesResponse);
}
