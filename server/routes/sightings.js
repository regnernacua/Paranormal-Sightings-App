import express from 'express';
import { getAllSightings, createSighting } from '../controllers/sightingsController.js';

export const sightingsRouter = express.Router()

sightingsRouter.get('/', getAllSightings)
sightingsRouter.post('/', createSighting)
