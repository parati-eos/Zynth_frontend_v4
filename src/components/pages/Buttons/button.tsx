import React from 'react'

export default function AnimatedButon({name}) {
  return (
    <button className="button-85 relative overflow-hidden bg-transparent text-white py-2 px-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full transition duration-300 ease-in-out transform hover:translate-y-1">
    {name}
    <span className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-fuchsia-500 blur opacity-0 transition duration-300 rounded-full"></span>
    <span className="absolute inset-0 border-2 border-yellow-500 rounded-full animate-pulse"></span>
</button>
  )
}
