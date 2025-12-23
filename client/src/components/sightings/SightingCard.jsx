import { useState } from "react"
import './SightingCard.css'

export function SightingCard({ sighting }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className={`sighting-card ${expanded ? "expanded" : ""}`}>
      <p className="card-details">
        {sighting.timeStamp}, {sighting.location}
      </p>
      <h3>{sighting.title}</h3>

      <div className="sighting-text-wrapper">
        <p className="sighting-text">{sighting.text}</p>
      </div>

      <button 
        className="read-more-btn"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show less" : "Read in full"}
      </button>
    </article>
  )
}