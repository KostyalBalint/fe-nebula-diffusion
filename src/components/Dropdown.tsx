import React, { useState } from "react";

type DropDownProps = {
  options: string[];
  selected: number;
  onChange: (i: number) => void;
};

const DropItem = (props: {
  id: number;
  text: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    className={`${
      props.selected ? ' bg-gray-100 text-gray-900" ' : " text-gray-700 "
    } block px-4 py-2 text-sm hover:bg-gray-50 hover:text-gray-900 cursor-pointer`}
    role="menuitem"
    id={`menu-item-${props.id}`}
    onClick={props.onClick}
  >
    {props.text}
  </div>
);

export const Dropdown = (props: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (index: number) => {
    props.onChange(index);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {props.options[props.selected]}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {props.options.map((option, index) => (
              <DropItem
                key={index}
                id={index}
                text={option}
                selected={index === props.selected}
                onClick={() => handleOptionClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
