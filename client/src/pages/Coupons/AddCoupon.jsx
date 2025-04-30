import React from "react";
import {useNavigate} from "react-router-dom";

import { createCoupon } from "../../../services/couponsService";
import Header from "../../components/Header";
import CouponForm from "../../components/CouponForm";

const AddCoupon = () => {
    const navigate = useNavigate();

    const handleSubmit = async (couponData) => {
        try {
            await createCoupon(couponData);
            navigate("/coupons"); // Redirect to the coupons page after successful creation
        } catch (err) {
            console.error(err);
            alert("Error creating coupon. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-primary mb-6">Add Coupon</h1>
                <CouponForm onSubmit={handleSubmit} />
            </main>
        </>
    );
}   

export default AddCoupon;