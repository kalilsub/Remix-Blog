import { redirect, json } from "@remix-run/node"
import NewNote, { links as newNoteLinks } from "../components/NewNote"
import { getStoredNotes, storeNotes } from "../data/notes"
import NoteList, { links as noteListLinks } from "../components/NoteList"
import {
  useLoaderData,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react"

function NotesPage() {
  const notes = useLoaderData()

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}

export default NotesPage

export async function loader() {
  const notes = await getStoredNotes()

  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes" },
      { status: 404, statusText: "Not Found" }
    )
  }
  return notes
}

export async function action({ request }) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)
  // same as saying
  // {title: formData.get("title")
  // content: formData.get("content")}

  if (noteData.title.trim().length < 5) {
    return { message: "Title must be at least 5 characters long" }
  }

  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)
  //await new Promise(resolve => setTimeout(resolve, 2000))
  return redirect("/notes")
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()]
}

export function ErrorBoundary() {
  const routeError = useRouteError()
  const message = routeError.message || "Oops! Something went wrong."

//TODO: DOES NOT WORK!!
  if (isRouteErrorResponse(routeError)) {
    return (
      <main className="info-message">
        <h1>Oops</h1>
        <p>Status: {routeError.status}</p>
        <p>{routeError.data?.message}</p>
      </main>
    )
  }

  // Error Message
  return (
    <main className="error">
      <h1>An error related to your notes occurred!</h1>
      <p>{message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  )
}
