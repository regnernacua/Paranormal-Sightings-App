import { useState } from "react"
import "./SightingCard.css"

export function SightingCard({ sighting, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  // Inline editing
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(sighting.title)
  const [editedText, setEditedText] = useState(sighting.text)

  // Inline delete confirm
  const [confirmDelete, setConfirmDelete] = useState(false)

  function startEditing() {
    setEditedTitle(sighting.title)
    setEditedText(sighting.text)
    setIsEditing(true)
  }

  async function handleSave() {
    if (!editedTitle.trim() || !editedText.trim()) return

    await onUpdate(sighting._id, {
      title: editedTitle,
      text: editedText,
      location: sighting.location,
      timeStamp: sighting.timeStamp
    })

    setIsEditing(false)
  }

  function handleCancel() {
    setEditedTitle(sighting.title)
    setEditedText(sighting.text)
    setIsEditing(false)
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  }

  return (
    <article className={`sighting-card ${expanded ? "expanded" : ""}`}>

      <p className="card-details">
        {formatDate(sighting.timeStamp)}, {sighting.location}
      </p>

      {isEditing ? (
        <input
          className="edit-input title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <h3>{sighting.title}</h3>
      )}

      {isEditing ? (
        <textarea
          className="edit-textarea"
          rows={5}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <div className="sighting-text-wrapper">
          <p className="sighting-text">{sighting.text}</p>
        </div>
      )}

      {!isEditing && (
        <button
          className="read-more-btn"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Read in full"}
        </button>
      )}

      <div className="card-actions">

        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={startEditing}>
              Edit
            </button>

            {/* delete confirm UI */}
            {!confirmDelete && (
              <button
                className="delete-btn"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </button>
            )}

            {confirmDelete && (
              <div className="confirm-box">
                <p>Delete this story permanently?</p>

                <button
                  className="save-btn"
                  onClick={async () => {
                    await onDelete(sighting._id)
                    setConfirmDelete(false)
                  }}
                >
                  Yes, delete
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </article>
  )
}
