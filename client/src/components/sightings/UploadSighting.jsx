import { Link } from 'react-router-dom';
import { TopHeader } from "../header/TopHeader"
import { SiteHeader } from "../header/SiteHeader"
import { Footer } from "../footer/Footer"
import { useState } from "react"
import './UploadSighting.css'

export function UploadSighting() {

  const [form, setForm] = useState({
    title: "",
    details: "",
    datetime: "",
    location: ""
  })

  const [message, setMessage] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { title, details, datetime, location } = form

    if (!title || !details || !datetime || !location) {
      setMessage("Please complete all fields")
      return
    }

    const date = new Date(datetime)

    const formData = {
      title,
      text: details,
      timeStamp: date,
      location
    }

    try {
      setMessage(null)

      const res = await fetch("/api/sightings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setMessage(
          <>
            Your sighting was uploaded. View it{" "}
            <Link to="/sightings">here</Link>
          </>
        )
        setForm({ 
          title: "", 
          details: "", 
          datetime: "", 
          location: "" 
        })
      } else {
        setMessage("The server ghosted you. Please try again")
      }
    } catch (error) {
      console.log(error)
      setMessage("Something went wrong. Try again")
    }
  }

  return (
    <>
      <TopHeader />
      <SiteHeader variant="page" />
      <main className="form-container" aria-labelledby="form-title">
        <h1 className="form-title" id="form-title">Add Sighting</h1>

        <form id="eventForm" onSubmit={handleSubmit}>
          <label htmlFor="title" className="lab-title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="input-title"
            placeholder="A ghostly encounter"
            value={form.title}
            onChange={handleChange}
          />

          <label htmlFor="details" className="lab-details">Details:</label>
          <textarea
            id="details"
            name="details"
            rows="5"
            placeholder="I was trying to get to sleep when..."
            className="input-details"
            value={form.details}
            onChange={handleChange}
          />

          <label htmlFor="datetime" className="lab-date-time">Time/Date:</label>
          <input
            type="datetime-local"
            id="datetime"
            name="datetime"
            className="input-date-time"
            value={form.datetime}
            onChange={handleChange}
          />

          <label htmlFor="location" className="lab-location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="London, UK"
            className="input-location"
            value={form.location}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">Submit</button>

          <div className="form-message">
            <p className="form-message-text">
              {message || <>All sightings will be published on our <Link to="/sightings">sightings</Link> page.</>}
            </p>
          </div>
        </form>
      </main>
      <Footer showNews={false} />
    </>
  );
}
