import React, { useState } from "react";

type TabProps = { hover?: boolean; selected?: boolean; onClick?: () => void };

const Tab = (props: React.PropsWithChildren<TabProps>) => {
  return (
    <li className="flex-grow " role="presentation">
      <button
        onClick={props.onClick}
        className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${
          props.selected ? "border-blue-600 bg-blue-50" : "border-transparent"
        } hover:text-gray-600 hover:border-blue-600`}
        id="profile-tab"
        data-tabs-target="#profile"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
      >
        {props.children}
      </button>
    </li>
  );
};

type TabsProps<Key extends string> = {
  options: string[];
  defaultSelected?: Key;
  selected?: number;
  onChange?: (key: number) => void;
};

export const Tabs = (props: TabsProps<string>) => {
  return (
    <>
      <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex">
        {props.options.map((option, i) => {
          return (
            <Tab
              key={i + option}
              selected={props.selected === i}
              onClick={() => props.onChange && props.onChange(i)}
            >
              {option}
            </Tab>
          );
        })}
      </ul>
    </>
  );
};
