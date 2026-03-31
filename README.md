# React-Pings

A open source modern toast notification library for reactjs apps. Built with reactjs, tailwindcss & motion in less than 5kb size 😎.

## Getting Started

> Before starting make sure your project must have tailwindcss & motion installed.

Follow steps to start 👇🏻

### Installation

Install with pnpm

```terminal
pnpm add react-pings
```

Install with npm

```terminal
npm i react-pings
```

### Provide

```typescript
// main.ts/js/tsx/jsx

import { createRoot } from 'react-dom/client'
import '../node_modules/react-pings//dist/index.css' // import css before your main css file if needed
import './index.css'
import App from './App.jsx'
import { PingsToastsProvider } from 'react-pings'

createRoot(document.getElementById('root')!).render(
// wrap just one level above to your app component
  <PingsToastsProvider>
    <App />
  </PingsToastsProvider>
)
```

### Create Toasts

```typescript
// component file 

import { usePings } from 'react-pings'

const App = () => {

  const toast = usePings()

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex items-center gap-3">
        <button className="px-3 py-1.5 border border-neutral-500/20" onClick={() => toast.success("Success Toast")}>Success</button>
        <button className="px-3 py-1.5 border border-neutral-500/20" onClick={() => toast.error("Error Toast")}>Error</button>
        <button className="px-3 py-1.5 border border-neutral-500/20" onClick={() => toast.info("Info Toast")}>Info</button>
        <button className="px-3 py-1.5 border border-neutral-500/20" onClick={() => toast.warning("Warning Toast")}>Warning</button>
        <button className="px-3 py-1.5 border border-neutral-500/20" onClick={() => toast.blank("Blank Toast")}>Blank</button>
        <button
          className="px-3 py-1.5 border border-neutral-500/20"
          onClick={() => toast.promise(() => {
            new Promise((rej, res) => {
              setTimeout(Math.random() > 0.5 res : rej, 1000)
            })
          })}
        >
          Promise
        </button>


      </div>
    </div>
  )
}
```

## Contributions

Anyone can contribute/use to this open source project to make it perfect.
