//import { cssBundleHref } from "@remix-run/css-bundle"

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react"

import styles from "~/styles/main.css"
import MainNavigation from "./components/MainNavigation"

export const links = () => [
  ...(styles ? [{ rel: "stylesheet", href: styles }] : []),
]

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

//rendred when there is an error anywhere in the app
export function ErrorBoundary() {
  const routeError = useRouteError()

  let statusText = "An error occured!"
  let errorMessage = "Something went wrong! Please try again later."

  // This is for CatchBoundary
  if (isRouteErrorResponse(routeError)) {
    statusText = routeError.statusText
    errorMessage = routeError.data?.message
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>{routeError.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{statusText}</h1>
          <p>{errorMessage}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
