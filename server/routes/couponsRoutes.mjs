import express from 'express';
import {
    createCoupon,
    getCoupons,
    getCouponById,
    getLiveCoupons,
    updateCoupon,
    deleteCoupon,
    getCouponApplicability,
} from '../controllers/couponsController.mjs';

const router = express.Router();

router.post('/coupons', createCoupon);
router.get('/coupons', getCoupons);
router.get('/coupons/live', getLiveCoupons); // Get live coupons //This needs to be befor getCouponById
// This is to get the live coupons first before getting the coupon by ID
router.get('/coupons/:id', getCouponById);
router.put('/coupons/:id', updateCoupon);
router.delete('/coupons/:id', deleteCoupon);
router.post('/coupons/check-applicability', getCouponApplicability);

export default router;