"use client"
import React,{useState} from 'react'
import Header from "../components/header"

const page = () => {

  const [client, setClient] = useState([
    { id: 1, nom: 'Alice Dupont', telephone: '0123456789' },
    { id: 2, nom: 'Bob Martin', telephone: '0987654321' },
  ])

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">
              Gestion des transactions
          </h1>
          <p className="text-lg text-gray-700">Un système simple et efficace pour suivre vos transactions.</p>
      </div>
  </div>
  )
}

export default page
