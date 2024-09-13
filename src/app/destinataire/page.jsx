'use client'
import React, { useState, useEffect } from 'react'
import Header from '../components/header'

const Page = () => {
  const [clients, setClients] = useState([]);
  

  // Fonction pour récupérer les clients depuis l'API
  const fetchClients = async () => {
    try {
      const res = await fetch('/api/transaction');
      if (res.ok) {
        const data = await res.json();
        setClients(data.transactions); // Ajustez si la structure des données est différente
      } else {
        throw new Error('Erreur lors de la récupération des clients');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Appel de fetchClients lorsque le composant est monté
  useEffect(() => {
    fetchClients();
  }, []);

  
  const formatDateTime = (date) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Utilisez true pour le format 12 heures
    };
    return new Date(date).toLocaleString(undefined, options);
};


  return (
    <div>

      <div className='px-64 py-20 pt-5'>

        <div className='mt-'>
          <h3 className="text-xl font-semibold mb-2">Liste des beneficiaires</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-400">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {clients.map((client) => (
                    <tr key={client._id}> {/* Utilisez `_id` comme clé unique */}
                        <td className="px-6 py-2 whitespace-nowrap">{client.nomBeneficiaire}</td>
                        <td className="px-6 py-2 whitespace-nowrap">{client.telBeneficiaire}</td>
                        <td className="px-6 py-2 whitespace-nowrap">{formatDateTime(client.createdAt)}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;
