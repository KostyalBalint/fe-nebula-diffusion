import React, { useState } from "react";
import { usePointCloud } from "../../providers/PointCloudProvider";
import { SearchResult } from "../../types/searchResult";

function TextSearchInput(props: {
  title: string;
  textPlaceholder: string;
  buttonText: string;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col">
      <p className="text-blue-600 my-1">{props.title}</p>
      <input
        id="message"
        className="w-100 mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={props.textPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={() => props.onSubmit(value)}
      />

      <button
        type="button"
        className="self-end text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-hr focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={() => props.onSubmit(value)}
      >
        {props.buttonText}
      </button>
    </div>
  );
}

export const DatasetPanel = () => {
  const { fetchPointCloud, searchObject } = usePointCloud();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState("");

  return (
    <div>
      <TextSearchInput
        title="Text Search"
        textPlaceholder="Search for anything"
        buttonText="Search"
        onSubmit={async (value) => {
          const results = await searchObject(value);
          console.log(results);
          setSearchResults(results);
        }}
      />
      {/*
      <TextSearchInput
        title="Search UID"
        textPlaceholder="Enter UID"
        buttonText="Search"
        onSubmit={(value) => {
          fetchPointCloud(value);
        }}
      />
      {annotation.data && (
        <>
          <p className="text-blue-600 my-1 text-2xl ">Name</p>
          <p className="text-gray-800 ml-2 mb-3">{annotation.data.name}</p>
          <p className="text-blue-600 my-1 text-2xl ">Description</p>
          <p className="text-gray-800 ml-2 mb-3">
            {annotation.data.description}
          </p>
          <p className="text-blue-600 my-1 text-2xl">Image</p>
          <img
            alt={annotation.data.name}
            className="rounded-lg shadow-lg"
            src={annotation.data.thumbnails.images[0].url ?? ""}
          />
        </>
      )}
      */}
      {searchResults.length > 0 && (
        <div className="h-full overflow-scroll">
          <p className="text-blue-600 my-1 text-2xl ">Search Results</p>
          {searchResults.map((result) => (
            <div
              key={result.uid}
              className={`rounded-lg shadow-lg p-3 m-3 cursor-pointer border-b-2 hover:border-blue-600 ${
                selected === result.uid ? "border-blue-600" : ""
              }`}
              onClick={() => {
                setSelected(result.uid);
                fetchPointCloud(result.uid);
              }}
            >
              <p className="text-blue-600 ml-2 mb-3">{result.name}</p>
              <p className="text-gray-800 ml-2 mb-3">{result.custom_label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
