import { sanitizeInput } from '../utils/sanitizeInput.js';
import { getDBConnection } from '../db/db.js'
import { randomUUID } from 'node:crypto'

export async function getAllSightings(req, res) {

    try {
    const db = await getDBConnection()
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


  try {
    const db = await getDBConnection()
    const uuid = randomUUID()

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

export async function updateSighting(req, res) {
  const { uuid } = req.params
  const sanitized = sanitizeInput(req.body)

  const { title, text  } = sanitized

  if (!title || !text) {
    return res.status(400).json({message: 'Title and text are required'})
  }

  try {
    const db = await getDBConnection()

    const existing = await db.get(
      'SELECT * FROM sightings WHERE uuid = ?',
      [uuid]
    )

    if(!existing) {
      return res.status(400).json({ message: 'Sighting not found'})
    }

    await db.run(
      `UPDATE sightings
       SET title = ?, text = ?
       WHERE uuid = ?`,
      [title, text, uuid]
    )

    const updated = await db.get(
      'SELECT * FROM sightings WHERE uuid = ?',
      [uuid]
    )

    res.json(updated)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update sighting'})
  } finally {
    await db.close()
  }
}

export async function deleteSighting(req, res) {
  const { uuid } = req.params

  try {
    const db = await getDBConnection()

    const existing = await db.get(
      'SELECT uuid FROM sightings WHERE uuid = ?', 
      [uuid]
    )

    if (!existing) {
      return res.status(404).json({error: 'Sighting not found'})
    }

    await db.run('DELETE FROM sightings WHERE uuid = ?', [uuid])
    res.status(204).send()

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete sighting' })
  }
}