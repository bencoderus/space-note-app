import React from 'react'

export const Maintenance = () => {
  return (
    <div className="flex justify-center min-h-screen items-center m-4 lg:container lg:mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold">Service unavailable</h1>
        <h1 className="text-xl font-bold my-2">Maintenance Mode Activated.</h1>
        <p className="text-lg my-4">
          Hey there! We are currently undergoing a maintenance we would be back online soon.
        </p>
      </div>
    </div>
  )
}
