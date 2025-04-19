import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {getCharges} from "../../services/chargesService";

const CouponForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    code: initialData.code || "",
    description: initialData.description || "",
    startAt: initialData.startAt ? new Date(initialData.startAt) : null,
    endAt: initialData.endAt ? new Date(initialData.endAt) : null,
    allowedFrequency: initialData.allowedFrequency || "",
    couponConditions: initialData.couponConditions || {},
    file: initialData.file || null,
  });

  const [charges, setCharges] = useState([]);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await getCharges();
        setCharges(response);
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    };
    fetchCharges();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("code", formData.code);
    updatedData.append("description", formData.description);
    updatedData.append(
      "startAt",
      formData.startAt ? formData.startAt.toISOString() : ""
    );
    updatedData.append(
      "endAt",
      formData.endAt ? formData.endAt.toISOString() : ""
    );
    updatedData.append("allowedFrequency", JSON.stringify(formData.allowedFrequency));
    updatedData.append(
      "couponConditions",
      JSON.stringify(formData.couponConditions)
    );
    if (formData.file) {
      updatedData.append("file", formData.file);
    }
    onSubmit(updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg lg:max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Code</label>
        
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Start At</label>
        <DatePicker
          selected={formData.startAt}
          onChange={(date) => setFormData({ ...formData, startAt: date })}
          dateFormat="yyyy-MM-dd"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">End At</label>
        <DatePicker
          selected={formData.endAt}
          onChange={(date) => setFormData({ ...formData, endAt: date })}
          dateFormat="yyyy-MM-dd"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Allowed Frequency
        </label>
        <div className="flex items-center justify-between mb-2">
          <select
            name="allowedFrequencyType"
            value={formData.allowedFrequency.type || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                allowedFrequency: {
                  ...formData.allowedFrequency,
                  type: e.target.value,
                },
              })
            }
            className="border rounded px-3 py-2 mr-2"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="fixed">Fixed</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {formData.allowedFrequency?.type !== "fixed" && (
            <input
              type="number"
              name="allowedFrequency.interval"
              value={formData.allowedFrequency.interval || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allowedFrequency: {
                    ...formData.allowedFrequency,
                    interval: parseInt(e.target.value, 10),
                  },
                })
              }
              className="border rounded px-3 py-2 mr-2"
              placeholder="Interval"
              min="1"
              required
            />
          )}
          <input
            type="number"
            name="allowedFrequency.limit"
            value={formData.allowedFrequency.limit || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                allowedFrequency: {
                  ...formData.allowedFrequency,
                  limit: parseInt(e.target.value, 10),
                },
              })
            }
            className="border rounded px-3 py-2"
            placeholder="Limit"
            min="1"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Coupon Conditions
        </label>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-gray-700 font-bold mb-2">
            Minimum Cart Amount
          </label>
          <input
            type="number"
            name="minCartAmount"
            value={formData.couponConditions.minCartAmount || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                couponConditions: {
                  ...formData.couponConditions,
                  minCartAmount: parseInt(e.target.value),
                },
              })
            }
            className="border rounded px-3 py-2 mr-2 w-1/2"
            placeholder="Minimum Amount"
            min="0"
            required
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-gray-700 font-bold mb-2">
            Offer Type
          </label>
          <select
            name="offerType"
            value={formData.couponConditions.offerType || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                couponConditions: {
                  ...formData.couponConditions,
                  offerType: e.target.value,
                },
              })
            }
            className="border rounded px-3 py-2 mr-2 w-1/2"
            required
          >
            <option value="" disabled>
              Select Offer Type
            </option>
            <option value="discount">Discount</option>
            <option value="removeCharge">Remove Charge</option>
          </select>
        </div>
        {
          formData.couponConditions?.offerType === "discount" && (
            <>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Discount Type
              </label>
              <select
                name="discountType"
                value={formData.couponConditions?.discount?.type || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couponConditions: {
                      ...formData.couponConditions,
                      discount: {
                        ...formData.couponConditions.discount,
                        type: e.target.value,
                      },
                    },
                  })
                }
                className="border rounded px-3 py-2 mr-2 w-1/2"
                required>
                <option value="" disabled>
                  Select Discount Type
                </option>
                <option value="percent">Percentage</option>
                <option value="amount">Fixed Amount</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Discount Value
              </label>
              <input
                type="number"
                name="discountValue"
                value={formData.couponConditions?.discount?.value || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couponConditions: {
                      ...formData.couponConditions,
                      discount: {
                        ...formData.couponConditions.discount,
                        value: parseInt(e.target.value),
                      },
                    },
                  })
                }
                className="border rounded px-3 py-2 mr-2 w-1/2"
                placeholder="Discount Value"
                min="0"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Maximum Discount Amount
              </label>
              <input
                type="number"
                name="maxDiscountAmount"
                value={formData.couponConditions?.discount?.maxDiscountAmount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couponConditions: {
                      ...formData.couponConditions,
                      discount: {
                        ...formData.couponConditions.discount,
                        maxDiscountAmount: parseInt(e.target.value),
                      },
                    },
                  })
                }
                className="border rounded px-3 py-2 mr-2 w-1/2"
                placeholder="Max Discount Amount"
                min="0"
                required
              />
            </div>
            </>
          )}
        {formData.couponConditions?.offerType === "removeCharge" && (
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-700 font-bold mb-2">
              Remove Charge
            </label>
            <select
              name="removeCharge"
              value={formData.couponConditions?.removeCharge?.ChargeId || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  couponConditions: {
                    ...formData.couponConditions,
                    removeCharge: {
                      ChargeId: e.target.value,
                    },
                  },
                })
              }
              className="border rounded px-3 py-2 mr-2 w-1/2"
              required
            >
              <option value="" disabled>
                Select Charge
              </option>
              {charges.map((charge) => (
                <option key={charge._id} value={charge._id}>
                  {charge.chargeName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
      >
        Save
      </button>
    </form>
  );
};

export default CouponForm;
