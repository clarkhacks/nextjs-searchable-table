import React, { useEffect, useState } from "react";

import { Table as ITable } from "../pages/api/tables";

import { Rows, useTable } from "../hooks/useTable";

export type TableProps = { className?: string; table: ITable };

export const Table = ({ className, table }: TableProps) => {
  const { rows, getFilteredRows } = useTable({ table });
  const [filteredRows, setFilteredRows] = useState<Rows>(rows);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredRows = getFilteredRows(search);
    setFilteredRows(filteredRows);

    if (!search) {
      // Perhaps scroll to align the first row to the viewport.
    }
  }, [search, getFilteredRows]);

  return (
    <article className={className}>
      <h1 className="text-center text-2xl">{table.title}</h1>

      <input
        className="mt-4"
        placeholder="Type to search rows.."
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
      ></input>

      <table className="mt-4 w-full table-fixed">
        <tbody>
          {filteredRows.map((row, i) => (
            <tr key={i} data-row={i + 1}>
              {row.map((cell) => cell)}
            </tr>
          ))}
        </tbody>
      </table>

      {filteredRows.length < 2 && (
        <div className="mt-4 text-center">
          {search
            ? `No matching rows for query "${search}".`
            : "Nothing to display."}
        </div>
      )}
    </article>
  );
};
