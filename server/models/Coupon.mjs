import mongoose from "mongoose";
import { storeDB } from "../config/dbStore.mjs";

const allowedFrequencySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['fixed', 'hourly', 'daily', 'weekly', 'monthly'], // Enum for frequency types
        required: true,
    },
    interval: {
        type: Number,
        required: function () {
            return this.type !== 'fixed'; // Required if type is not 'fixed'
        },
    },
    limit: {
        type: Number,
        required: true,
    },
});

const couponConditionsSchema = new mongoose.Schema({
    minCartAmount: {
        type: Number,
        required: true,
    },
    offerType: {
        type: String,
        enum: ['discount', 'removeCharge'], // Enum for offer types
        required: true,
    },
    discount: {
        type: {
            type: String,
            enum: ['percent', 'amount'],
            required: function () {
                return this.offerType === 'discount'; // Required if offerType is 'discount'
            },
        },
        value: {
            type: Number,
            required: function () {
                return this.offerType === 'discount';
            },
        },
        maxDiscountAmount: {
            type: Number,
            required: function () {
                return this.offerType === 'discount';
            },
        },
    },
    removeCharge: {
        ChargeId: {
            type: mongoose.Types.ObjectId,
            required: function () {
                return this.offerType === 'removeCharge'; // Required if offerType is 'removeCharge'
            },
        },
    },
});

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        maxlength: 12, // Max length of 12 characters
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false, // Optional field for banner image URL or path
    },
    startAt: {
        type: Date,
        required: true,
    },
    endAt: {
        type: Date,
        required: true,
    },
    allowedFrequency: {
        type: allowedFrequencySchema,
        required: true,
    },
    couponConditions: {
        type: couponConditionsSchema,
        required: true,
    },
});

// Compile and export the Coupon model
const Coupon = storeDB.model("Coupon", couponSchema);
export default Coupon;