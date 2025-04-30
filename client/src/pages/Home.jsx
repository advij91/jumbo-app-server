import React from "react";
import Header from "../components/Header";
import MultiSelectDropdown from "../components/common/MultiSelectDropdown";

const Home = () => {
  // const options = [
  //   { value: "Option 1", label: "Option 1" },
  //   { value: "Option 2", label: "Option 2" },
  //   { value: "Option 3", label: "Option 3" },
  // ];

  // const handleSelect = (selectedValues) => {
  //   console.log("Selected values:", selectedValues);
  // };

  return (
    <>
      <Header />
      {/* <div className="container mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4">Home Page</h1>
        <MultiSelectDropdown options={options} onSelect={handleSelect} />
        <p className="mt-4">Select options from the dropdown above.</p>
      </div> */}
    </>
  );
};

export default Home;
