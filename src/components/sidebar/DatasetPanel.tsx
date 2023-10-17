import React, { useState } from "react";
import { usePointCloud } from "../../providers/PointCloudProvider";

export const DatasetPanel = () => {
  const { fetchPointCloud } = usePointCloud();
  const [uid, setUid] = useState<string>("a14bfdca48344226884b93d6315d57c2");

  return (
    <div>
      <div className="flex flex-col">
        <input
          id="message"
          className="w-100 mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Objaverse UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />

        <button
          type="button"
          className="self-end text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-hr focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => fetchPointCloud(uid)}
        >
          Get by UID
        </button>
      </div>
    </div>
  );
};
