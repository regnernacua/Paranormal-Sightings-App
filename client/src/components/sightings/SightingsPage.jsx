import { TopHeader } from "../header/TopHeader"
import { SiteHeader } from "../header/SiteHeader"
import { Footer } from "../footer/Footer"
import { SightingCard } from "./SightingCard"
import { getSightings, updateSighting, deleteSighting } from "../../services/api"
import { useState, useEffect } from "react"
import './SightingsPage.css'

export function SightingsPage() {

  const [sightings, setSightings] = useState([])

  useEffect(() => {
    getSightings()
      .then(setSightings)
      .catch(console.error);
  }, []);

  async function handleDelete(id) {
    try {
      await deleteSighting(id);
      setSightings(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      console.error("Failed to delete sighting", error)
    }
  }

  async function handleUpdate(id, updates) {
    try {
      const updated = await updateSighting(id, updates);
      setSightings(prev => 
        prev.map(s => (s._id === id ? updated : s))
      )
    } catch (error) {
      console.error("Failed to update sighting", error)
    }
  }


  return (
    <div className="page">
      <TopHeader />
      <SiteHeader variant="page" />
      <main className="sightings">
        <h1 className="page-title">Sightings</h1>
        <div className="cards-container">
          {sightings.map(sighting => (
            <SightingCard 
              key={sighting._id}
              sighting={sighting}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}