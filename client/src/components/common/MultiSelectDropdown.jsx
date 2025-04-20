import React, { useState, useEffect, useRef } from "react";

const MultiSelectDropdown = ({
  label,
  options,
  onSelect,
  selectedValues: initialSelectedValues = [],
}) => {
  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    const newSelectedValues = selectedValues.includes(option.value)
      ? selectedValues.filter((val) => val !== option.value)
      : [...selectedValues, option.value];
    setSelectedValues(newSelectedValues);
    onSelect(newSelectedValues.join(", ")); // Pass comma-separated values
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValues(initialSelectedValues); // Sync state with prop changes
  }, [initialSelectedValues]);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <div
        className="relative inline-block text-left w-full"
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()} // Prevent event propagation
      >
        <button
          type="button"
          className="inline-flex justify-between w-full border rounded-lg shadow-md px-3 py-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            setIsOpen(!isOpen);
          }}
        >
          {selectedValues.length > 0
            ? options
                .filter((option) => selectedValues.includes(option.value))
                .map((option) => option.label)
                .join(", ")
            : "Select options"}
          <span>▼</span>
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg">
            {options.map((option) => (
              <label
                key={option.value}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleOption(option)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
