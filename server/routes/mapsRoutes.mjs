import express from 'express';

import {geocodeAddress} from '../controllers/mapsController.mjs';
const router = express.Router();

router.get('/geocode-address', geocodeAddress);

export default router;