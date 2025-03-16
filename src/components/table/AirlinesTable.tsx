// import { IAirlines } from "@/types/airlines";
import Image from "next/image";
import React from "react";
// import TempLoader from "../TempLoader";

const AirlinesTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200 text-sm leading-normal text-gray-600 uppercase">
            <th className="px-6 py-3 text-left">No</th>
            <th className="px-6 py-3 text-left">Logo</th>
            <th className="px-6 py-3 text-left">Nama</th>
            <th className="px-6 py-3 text-left">Pemilik</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          <tr
            className="border-b border-gray-200 hover:bg-gray-100"
            // key={index}
          >
            <td className="px-6 py-3 text-left whitespace-nowrap">
              {/* {index + 1} */}1
            </td>
            <td className="px-6 py-3 text-left">Air Asia</td>
            <td className="px-6 py-3 text-left">
              <Image
                src={`/img-airlines/airasia.png`}
                alt="airasia.png"
                width={50}
                height={50}
              />
            </td>
            <td className="px-6 py-3 text-left">airasia@gmail.com</td>
            <td className="px-6 py-3 text-center">
              <button className="rounded bg-blue-500 px-4 mx-2 py-1 text-white">
                Edit
              </button>
              <button className="rounded bg-red-500 mx-2 px-4 py-1 text-white">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* {loading && <TempLoader />} */}
    </div>
  );
};

export default AirlinesTable;
