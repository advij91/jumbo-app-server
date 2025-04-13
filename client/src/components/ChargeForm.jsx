import React, { useState, useEffect } from "react";

const ChargeForm = ({ initialData = {}, onSubmit }) => {
    const [formData, setFormData] = useState({
        chargeName: initialData.chargeName || "",
        applyOn: initialData.applyOn || "item",
        chargeValue: (initialData.chargeValue || "").replace(/^[PR]/, ''),
    });
    
    const [chargeInPercent, setChargeInPercent] = useState(initialData.chargeValue &&  initialData.chargeValue.startsWith("P") ? true : false ||false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({... formData, chargeValue: (chargeInPercent ? "P" : "R") + formData.chargeValue})
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg lg:max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          htmlFor="chargeName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Charge Name:
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="chargeName"
          name="chargeName"
          value={formData.chargeName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="applyOn"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Apply On:
        </label>
        <select
          id="applyOn"
          name="applyOn"
          value={formData.applyOn}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="cart">Cart</option>
          <option value="item">Item</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="chargeValue"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {`Charge Value: ${chargeInPercent ? "(in Percent)" : "(in Rupees)"}`}
        </label>
        <div className="flex items-center justify-between mb-2">
          <input
            id="chargeValue"
            name="chargeValue"
            value= {formData.chargeValue}
            type="number"
            onChange={handleChange}
            className="w-11/12 border rounded px-3 py-2"
          />
          <button
            type="button"
            className="w-1/12 ml-1 px-3 py-2 rounded bg-primary text-white  hover:bg-secondary transition"
            onClick={() =>
                setChargeInPercent((prev) => !prev)
            }
          >
            {chargeInPercent? '₹' : '%'}
          </button>
        </div>
        <div></div>
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ChargeForm;
