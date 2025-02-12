import { IAirlines } from "@/types/airlines";
import Image from "next/image";
import React from "react";

interface UserTableProps {
  airlines: IAirlines[] | null;
  loading: boolean;
  onEdit: (selectUser: IAirlines) => void;
  // onDelete?: (id: number) => void;
}

const AirlinesTable: React.FC<UserTableProps> = ({
  airlines,
  loading,
  onEdit,
}) => {
  return (
    <div className="overflow-x-auto card">
      <table className="min-w-full shadow-md rounded-lg text-center">
        <thead className="border-b border-[var(--text)]">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Logo</th>
            <th className="py-2 px-4">Maskapai</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {airlines &&
            airlines.map((airline) => (
              <tr key={airline.id}>
                <td className="py-2 px-4">{airline.name}</td>
                <td
                  className="py-2 px-4"
                  style={{ maxWidth: "30px", maxHeight: "30px" }}
                >
                  <Image
                    src={`/img-airlines/${airline.logo}`}
                    alt={airline.name}
                    width={1}
                    height={1}
                    layout="responsive"
                    className="block m-auto"
                  />
                </td>
                <td className="py-2 px-4">{airline.user.name}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onEdit(airline)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {}}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && <div className="text-center">Loading...</div>}
    </div>
  );
};

export default AirlinesTable;
