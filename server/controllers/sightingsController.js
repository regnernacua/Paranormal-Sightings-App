import { sanitizeInput } from '../utils/santizeInput.js';
import { getDBConnection } from '../db/db.js'
import { randomUUID } from 'node:crypto'

export async function getAllSightings(req, res) {

  const db = await getDBConnection()
  try {
    const sightings = await db.all('SELECT * FROM sightings');
    res.json(sightings)
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch sightings', details: error.message})
  }
}

export async function createSighting(req, res) {
  const sanitized = sanitizeInput(req.body)

  const { location, timeStamp, title, text } = sanitized;

  if (!location || !timeStamp || !title || !text) {
    return res.status(400).json({message: 'All fields are required'})
  }


  const db = await getDBConnection()
  const uuid = randomUUID()

  try {
    await db.run(
      `INSERT INTO sightings (uuid, location, timeStamp, title, text)
      VALUES (?, ?, ?, ?, ?)`,
      [uuid, location, timeStamp, title, text]
    )

    await db.close()
    res.status(201).json({ message: 'Sighting created'});
  } catch (error) {
    console.error('Error creating sighting:', error.message)
    res.status(500).json({ error: 'Failed to create sighting. Please try again' })
  }
}