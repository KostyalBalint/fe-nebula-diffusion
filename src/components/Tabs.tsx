import React from "react";

type TabProps = {
  size: "small" | "medium";
  hover?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

const Tab = (props: React.PropsWithChildren<TabProps>) => {
  const padding = props.size === "small" ? "p-2" : "p-4";
  return (
    <li className="flex-grow " role="presentation">
      <button
        onClick={props.onClick}
        className={`w-full inline-block ${padding} border-b-2 rounded-t-lg ${
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
  size?: "small" | "medium";
};

export const Tabs = ({ size = "medium", ...props }: TabsProps<string>) => {
  return (
    <>
      <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex">
        {props.options.map((option, i) => {
          return (
            <Tab
              size={size}
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
