import { TopHeader } from "../header/TopHeader"
import { SiteHeader } from "../header/SiteHeader"
import { Footer } from "../footer/Footer"
import { SightingCard } from "./SightingCard"
import { useState, useEffect } from "react"
import './SightingsPage.css'

export function SightingsPage() {

  const [sightings, setSightings] = useState([])

  useEffect(() => {
    fetch("/api/sightings")
      .then(res => res.json())
      .then(data => setSightings(data))
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <TopHeader />
      <SiteHeader variant="page" />
      <main className="sightings">
        <h1 className="page-title">Sightings</h1>
        <div className="cards-container">
          {sightings.map(sighting => (
            <SightingCard 
              key={sighting.uuid}
              sighting={sighting}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}