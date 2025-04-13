import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCharges, deleteCharge } from "../../../services/chargesService";

const Charges = () => {
  const navigate = useNavigate();
  const [charges, setCharges] = useState([]);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await getCharges();
        setCharges(response); // Assuming response.data contains the charges array
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    };

    fetchCharges();
  }, []);

  const handleEdit = (id) => {
    navigate(`/charges/${id}`); // Navigate to the edit page with the charge ID
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this charge?")) {
      return;
    }
    try {
      await deleteCharge(id); // Call the delete function from the service
      setCharges(charges.filter((charge) => charge._id !== id)); // Update the state to remove the deleted charge
    } catch (error) {
      console.error("Error deleting charge:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Charges</h1>
        <button
          className="bg-primary text-light py-2 px-4 rounded hover:bg-secondary"
          onClick={() => navigate("/charges/add")}
        >
          Add Charge
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Charge Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Charge Applied On
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Charge Value
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {charges &&
              charges.map((charge) => (
                <tr
                  key={charge._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {charge.chargeName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {charge.applyOn}
                  </td>
                  <td className="px-4 py-2 text-sm  text-gray-700">
                    {charge.chargeValue.replace(/^[PR]/, "")}
                    <span>
                      {charge.chargeValue.startsWith("P") ? " %" : " ₹"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 mr-2"
                      onClick={() => handleEdit(charge._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
                      onClick={() => handleDelete(charge._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Charges;
