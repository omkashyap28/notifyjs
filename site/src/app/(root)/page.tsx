"use client"

import { usePings } from "react-pings"

export default function App() {
  const ping = usePings()
  return <div><button onClick={() => ping("jsakhvbd")}>Make a toast</button></div>
}
