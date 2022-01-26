import React, { useMemo } from "react";

import { Table as ITable } from "../pages/api/tables";

// [key, retrieved value]
export type CellData = [string, string];
export type CellValues = CellData[][];

// th, td
export type Cell = React.ReactNode;
export type Rows = Cell[][];

const CELL_CLASSNAME = "border border-solid border-black";
const TH_CLASSNAME = `${CELL_CLASSNAME} bg-slate-200`;
const TD_CLASNAME = `${CELL_CLASSNAME} text-center`;

const prependZero = (v: number) => (v < 10 ? `0${v}` : v);

const getCellKey = (row: number, col: number) =>
  `(${prependZero(row)}, ${prependZero(col)})`;

export type Props = {
  table: ITable;
  thClassName?: string;
  tdClassName?: string;
};

export const useTable = ({
  table,
  thClassName = TH_CLASSNAME,
  tdClassName = TD_CLASNAME,
}: Props) =>
  useMemo(() => {
    const hasTwoHeaders: boolean = !!table.row_captions;
    const rowTextSearch: string[] = [];

    const cells: CellValues = [];
    for (let row = 0; row < table.n_rows; row++) {
      cells[row] = [];

      for (let col = 0; col < table.n_columns; col++) {
        const key = getCellKey(row, col);

        if (row === 0) {
          cells[row][col] = [key, table.column_captions[key] || ""];
        } else {
          cells[row][col] = [
            key,
            table.row_captions[key] || table.values[key] || "",
          ];
        }
      }

      // Pre-format text search.
      rowTextSearch[row] = cells[row].reduce(
        (str, [_, value]) => str + value.toUpperCase(),
        ""
      );
    }

    // https://www.w3.org/WAI/tutorials/tables/
    const rows: Rows = [];
    for (let row = 0; row < table.n_rows; row++) {
      rows[row] = [];

      for (let col = 0; col < table.n_columns; col++) {
        const [key, value] = cells[row][col];

        if (row === 0) {
          if (col === 0 && hasTwoHeaders) {
            rows[row][col] = (
              <td key={key} data-cell={key} className={tdClassName}></td>
            );
          } else {
            rows[row][col] = (
              <th scope="col" key={key} data-key={key} className={thClassName}>
                {value}
              </th>
            );
          }
        } else {
          if (col === 0 && hasTwoHeaders) {
            rows[row][col] = (
              <th key={key} data-key={key} scope="row" className={thClassName}>
                {value}
              </th>
            );
          } else {
            rows[row][col] = (
              <td key={key} data-key={key} className={tdClassName}>
                {value}
              </td>
            );
          }
        }
      }
    }

    const getFilteredRows = (search: string) => {
      if (!search) return rows;

      const s = search.toUpperCase();

      return rows.filter((_, rowIndex) =>
        rowIndex === 0
          ? // Always display column captions.
            true
          : // Simple search.
            rowTextSearch[rowIndex].includes(s)
      );
    };

    return { cells, rows, getFilteredRows };
  }, [table, tdClassName, thClassName]);
