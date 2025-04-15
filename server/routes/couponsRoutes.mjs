import express from 'express';
import {
    createCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
} from '../controllers/couponsController.mjs';

const router = express.Router();

router.post('/coupons', createCoupon);
router.get('/coupons', getCoupons);
router.get('/coupons/:id', getCouponById);
router.put('/coupons/:id', updateCoupon);
router.delete('/coupons/:id', deleteCoupon);

export default router;