import React from "react";

type Column<T> = {
  key: keyof T;
  label: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

export default function AdminTable<T>({ data, columns }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 bg-white shadow-sm rounded">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="p-2 border-b text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="p-2 border-b">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
