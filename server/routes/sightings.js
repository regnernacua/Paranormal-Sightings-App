import express from 'express';
import { 
  getAllSightings, 
  createSighting, 
  updateSighting, 
  deleteSighting 
} from '../controllers/sightingsController.js';

export const sightingsRouter = express.Router()

sightingsRouter.get('/', getAllSightings)
sightingsRouter.post('/', createSighting)
sightingsRouter.put('/:uuid', updateSighting)
sightingsRouter.delete('/:uuid', deleteSighting)
