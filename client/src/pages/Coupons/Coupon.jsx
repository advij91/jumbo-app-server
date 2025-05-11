import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCoupons, deleteCoupon } from "../../../services/couponsService";
import Header from "../../components/Header";

const Coupon = () => {
  const [liveCoupons, setLiveCoupons] = useState([]);
  const [upcomingCoupons, setUpcomingCoupons] = useState([]);
  const [expiredCoupons, setExpiredCoupons] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCoupons();
        const now = new Date();
        console.log("now: ", now);
        console.log("data: ", data);        
        setLiveCoupons(data.filter(coupon => new Date(coupon.startAt) <= now && new Date(coupon.endAt) >= now));
        setUpcomingCoupons(data.filter(coupon => new Date(coupon.startAt) > now));
        setExpiredCoupons(data.filter(coupon => new Date(coupon.endAt) < now));
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);

  const handleAddCoupon = () => {
    navigate("/coupons/add"); // Navigate to the "Add New Coupon" page
  };

  const handleEditCoupon = (id) => {
    navigate(`/coupons/${id}`); // Navigate to the "Edit Coupon" page
  };

  const handleDeleteCoupon = async (id, status) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );
    if (confirmed) {
      try {
        await deleteCoupon(id); // Call the delete API
        if (status === "live") {
          setLiveCoupons(liveCoupons.filter((coupon) => coupon._id !== id)); // Remove the deleted coupon from the state
        }
        if (status === "upcoming") {
          setUpcomingCoupons(upcomingCoupons.filter((coupon) => coupon._id !== id)); // Remove the deleted coupon from the state
        }
        if (status === "expired") {
          setExpiredCoupons(expiredCoupons.filter((coupon) => coupon._id !== id)); // Remove the deleted coupon from the state
        }
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    }
  };
  const renderCoupons = (coupons, category) => (
    <div>
      <h2 className="text-2xl font-bold mb-4">{category} Coupons</h2>
      {coupons.length > 0 ? (
        <div className="grid gap-4">
          {coupons.map(coupon => (
            <div key={coupon._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div
                className="relative h-32 bg-cover bg-center rounded"
                style={{ backgroundImage: `url(${coupon.imageUrl})` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white bg-secondary px-2 py-1 rounded-full border-2 border-primary text-xl">{coupon.code}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{coupon.description}</p>
              <div className="mt-2 flex justify-between">
                <p className="text-gray-600">Start At: {new Date(coupon.startAt).toLocaleDateString()}</p>
                <p className="text-gray-600">End At: {new Date(coupon.endAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditCoupon(coupon._id)}
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCoupon(coupon._id, category)}
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No {category.toLowerCase()} coupons available.</p>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Coupons</h1>
          <button
            onClick={handleAddCoupon}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            Add New Coupon
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {renderCoupons(liveCoupons, "Live")}
          {renderCoupons(upcomingCoupons, "Upcoming")}
          {renderCoupons(expiredCoupons, "Expired")}
        </div>
      </div>
    </>
  );
};

export default Coupon;
