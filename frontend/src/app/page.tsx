'use client'
import React, { useEffect, useState } from 'react'
import { IIncident } from '../../../common'
import { RetrieveIncidents } from '../services'

export default function Home() {
  const [incidents, setIncidents] = useState<IIncident[]>([]);

  const retrieveIncidents = async () => {
    const response = await RetrieveIncidents();
    console.log(response);
    if (response) setIncidents(response);
  };

  useEffect(() => {
    retrieveIncidents();
  }, [])

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-6">Incidents Timeline</h1>
      {incidents.map((incident) => (
        <div key={incident.id} className="bg-white rounded-lg shadow-md mb-4 p-4">
          <h2 className="font-semibold text-xl">{incident.title}</h2>
          <p className="text-gray-800 text-sm mt-2">{incident.content}</p>
          <div className="text-gray-600 text-xs my-1">
            <span>Location: {incident.location.city}, {incident.location.state}</span>
          </div>
          <div className="flex items-center justify-between my-2">
            <div>
              <button className="text-green-500 hover:bg-green-100 p-1 rounded mr-2">
                👍 {incident.upvotes}
              </button>
              <button className="text-red-500 hover:bg-red-100 p-1 rounded">
                👎 {incident.downvotes}
              </button>
            </div>
            <span className="text-gray-500 text-xs">
              Posted by {incident.originalPoster.username}
            </span>
          </div>
          <div className="text-gray-500 text-xs">
            <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
