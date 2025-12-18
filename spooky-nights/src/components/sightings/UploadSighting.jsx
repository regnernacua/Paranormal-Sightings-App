import { Link } from 'react-router-dom';
import { TopHeader } from "../header/TopHeader"
import { SiteHeader } from "../header/SiteHeader"
import { Footer } from "../footer/Footer"
import './UploadSighting.css'

export function UploadSighting() {
  return (
    <>
      <TopHeader />
      <SiteHeader variant="site-title-page" />
      <main className="form-container" aria-labelledby="form-title">
        <h1 className="form-title" id="form-title">Add Sighting</h1>

        <form id="eventForm">
          <label htmlFor="title" className="lab-title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="A ghostly encounter"
            className="input-title"
          />

          <label htmlFor="details" className="lab-details">Details:</label>
          <textarea
            id="details"
            name="details"
            rows="5"
            placeholder="I was trying to get to sleep when..."
            className="input-details"
          />

          <label htmlFor="datetime" className="lab-date-time">Time/Date:</label>
          <input
            type="datetime-local"
            id="datetime"
            name="datetime"
            className="input-date-time"
          />

          <label htmlFor="location" className="lab-location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="London, UK"
            className="input-location"
          />

          <button type="submit" className="submit-btn">Submit</button>

          <div className="form-message">
            <p className="form-message-text">
              All sightings will be published on our <Link to="/sightings">sightings</Link> page.
            </p>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
