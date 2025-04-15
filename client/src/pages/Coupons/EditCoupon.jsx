import { useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

import { getCouponById, updateCoupon } from "../../../services/couponsService";
import CouponForm from "../../components/CouponForm";
import Header from "../../components/Header";

const EditCoupon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [coupon, setCoupon] = useState(null);

    useEffect(() => {
        async function fetchCoupon() {
            if (id) {
                const data = await getCouponById(id);
                setCoupon(data);
            }
        }
        fetchCoupon();
    }, [id]);

    const handleSubmit = async (couponData) => {
        await updateCoupon(id, couponData);
        navigate("/coupons");
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-primary mb-6">Edit Coupon</h1>
                {coupon ? (
                    <CouponForm onSubmit={handleSubmit} initialData={coupon} />
                ) : (
                    <p className="text-gray-600">Loading...</p>
                )}
            </main>
        </>
    );
}

export default EditCoupon