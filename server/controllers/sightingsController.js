import { getDBConnection } from '../db/db.js'

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
  const { uuid, location, timeStamp, title, text } = req.body;
  const db = await getAllSightingsDBConnection()

  try {
    await db.run(
      `INSERT INTO sightings (uuid, location, timeStamp, title, text)
      VALUES (?, ?, ?, ?, ?)`,
      [uuid, location, timeStamp, title, text]
    );
    res.status(201).json({ message: 'Sighting created'});
  } catch (error) {
    console.error('Error creating sighting:', error.message)
    res.status(500).json({ error: 'Failed to create sighting. Please try again' })
  }
}