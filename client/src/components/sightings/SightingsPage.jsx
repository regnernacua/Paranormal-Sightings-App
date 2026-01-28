import { TopHeader } from "../header/TopHeader"
import { SiteHeader } from "../header/SiteHeader"
import { Footer } from "../footer/Footer"
import { SightingCard } from "./SightingCard"
import { useState, useEffect } from "react"
import Parse from "../../parseConfig"
import './SightingsPage.css'

export function SightingsPage() {
  const [sightings, setSightings] = useState([])

  useEffect(() => {
    async function loadSightings() {
      const Sighting = Parse.Object.extend("Sighting");
      const query = new Parse.Query(Sighting);

      try {
        const results = await query.find();
        const parsed = results.map(r => ({
          _id: r.id,
          title: r.get("title"),
          text: r.get("text"),
          location: r.get("location"),
          timeStamp: r.get("timeStamp")
        }));
        setSightings(parsed);
      } catch (error) {
        console.error("Failed to fetch sightings:", error)
      }
    }
    loadSightings();
  }, []);

  async function handleDelete(id) {
    const Sighting = Parse.Object.extend("Sighting");
    const query = new Parse.Query(Sighting)
    try {
      const object = await query.get(id);
      await object.destroy();
      setSightings(prev => 
        prev.filter(s => s._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete sighting:", error)
    }
  }

  async function handleUpdate(id, updates) {
    const Sighting = Parse.Object.extend("Sighting");
    const query = new Parse.Query(Sighting)

    try {
      const object = await query.get(id)
      object.set("title", updates.title);
      object.set("text", updates.text);
      object.set("location", updates.location);
      object.set("timeStamp", new Date(updates.timeStamp));

      const updated = await object.save();
      setSightings(prev => 
        prev.map(s => (s._id === id ? {
          _id: updated.id,
          title: updated.get("title"),
          text: updated.get("text"),
          location: updated.get("location"),
          timeStamp: updated.get("timeStamp")
        } : s))
      );
    } catch (error) {
      console.error("Failed to update sighting:", error)
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