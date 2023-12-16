import { Link, useLoaderData } from "@remix-run/react"

import styles from "~/styles/note-details.css"
import { getStoredNotes } from "../data/notes"

export const loader = async ({ params }) => {
  const notes = await getStoredNotes()
  return notes.find((note) => note.id === params.noteId)
}

function NoteDetailsPage() {
  const note = useLoaderData()

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  )
}

export const links = () => [{ rel: "stylesheet", href: styles }]

export default NoteDetailsPage
