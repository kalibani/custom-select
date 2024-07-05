import { useState, useEffect, useRef, FC, ReactNode, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import { ChevronDown, CircleX, Search } from "lucide-react";

export type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  options: Option[];
  multiple?: boolean;
  onChange: (selected: Option | Option[]) => void;
  portal?: boolean;
  renderOption?: (option: Option, isSelected: boolean) => ReactNode;
  withSearch?: boolean;
  zIndex?: number;
  outlined?: boolean;
}

const Select: FC<SelectProps> = ({
  options,
  multiple = true,
  onChange,
  portal = false,
  renderOption,
  withSearch = true,
  zIndex = 50,
  outlined = false,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the dropdown is open
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search input
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]); // State to track selected options

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container
  const dropdownMenuRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu

  // Function to handle the selection and deselection of options
  const handleOptionClick = (option: Option) => {
    if (multiple) {
      const isSelected = selectedOptions.some(
        (selected) => selected.value === option.value
      );
      const newSelectedOptions = isSelected
        ? selectedOptions.filter((selected) => selected.value !== option.value)
        : [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    } else {
      setSelectedOptions([option]);
      onChange(option);
      setIsOpen(false); // Close the dropdown if single select
    }
  };

  // Function to handle the removal of selected options
  const handleRemoveOption = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (selected) => selected.value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  // Default function to render an option with search term highlighting
  const renderDefaultOption = (option: Option, isSelected: boolean) => {
    const parts = option.label.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <div
        key={option.value}
        className={classNames(
          "cursor-pointer px-4 py-2 hover:bg-teal-50 text-gray-500",
          {
            "bg-teal-50": isSelected,
            "bg-white": !isSelected,
          }
        )}
        onClick={() => handleOptionClick(option)}
      >
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="bg-teal-400">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </div>
    );
  };

  // Function to handle changes in the search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle search removal
  const handleRemoveSearch = () => {
    setSearchTerm("");
  };

  // Function to toggle the dropdown open or closed
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the dropdown when clicking outside of it
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      dropdownMenuRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      !dropdownMenuRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Adding event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // To reset selected option whenever single/multiple switched
  useEffect(() => {
    setSelectedOptions([]);
    onChange([]);
  }, [onChange, multiple]);

  // Dropdown menu element, rendered either directly or via a portal
  const dropdownMenu = (
    <div
      className={classNames(
        "absolute w-full bg-white border border-gray-300 rounded-sm shadow-lg mt-1.5",
        {
          "z-50": zIndex === 50,
          "z-100": zIndex === 100,
        }
      )}
      style={{
        zIndex,
        width: dropdownRef.current?.offsetWidth, // Set the width dynamically
        left: portal ? dropdownRef.current?.offsetLeft : 0, // Set left dynamically
      }}
      ref={dropdownMenuRef}
    >
      {withSearch && (
        <>
          <Search className="absolute h-4 w-4 top-3 left-4 text-gray-400" />
          <input
            type="text"
            className="w-full px-12 py-2 border-b border-gray-300 outline-none text-gray-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <CircleX
              className="absolute h-4 w-4 top-3 right-4 text-gray-500 cursor-pointer"
              onClick={handleRemoveSearch}
            />
          )}
        </>
      )}
      <div className="max-h-60 overflow-y-auto">
        {options.map((option) =>
          renderOption
            ? renderOption(
                option,
                selectedOptions.some(
                  (selected) => selected.value === option.value
                )
              )
            : renderDefaultOption(
                option,
                selectedOptions.some(
                  (selected) => selected.value === option.value
                )
              )
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center max-h-max">
      <label className="mr-4 lg:mr-20 text-gray-700">Label</label>
      <div className="relative w-full" ref={dropdownRef}>
        <div
          className={classNames(
            "relative border border-gray-300 rounded p-2 cursor-pointer h-10",
            {
              "bg-gray-300": outlined,
            }
          )}
          onClick={handleToggle}
        >
          <div className="flex gap-1 max-w-[300px] md:max-w-[980px] overflow-auto no-scrollbar">
            {selectedOptions.length === 0
              ? ""
              : selectedOptions.map((opt) => (
                  <span
                    key={opt.value}
                    className="flex bg-gray-100 rounded-full p-2 text-xs font-semibold text-gray-500 cursor-pointer gap-1 items-center h-6"
                    onClick={() => handleRemoveOption(opt)}
                  >
                    <span className="w-max">{opt.label}</span>

                    <CircleX className="w-4 h-4 text-gray-500" />
                  </span>
                ))}
          </div>
          <ChevronDown className="h-4 w-4 absolute right-2 top-3 text-gray-500" />
        </div>
        {isOpen &&
          (portal ? createPortal(dropdownMenu, document.body) : dropdownMenu)}
      </div>
    </div>
  );
};

export default Select;
