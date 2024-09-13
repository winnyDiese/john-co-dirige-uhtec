'use client'
import React, { useState, useEffect } from 'react'
import Header from '../components/header'

const Page = () => {
  const [clients, setClients] = useState([]);
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fonction pour récupérer les clients depuis l'API
  const fetchClients = async () => {
    try {
      const res = await fetch('/api/client');
      if (res.ok) {
        const data = await res.json();
        setClients(data.agents); // Ajustez si la structure des données est différente
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

  // Fonction pour gérer l'ajout de client
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const newClient = { nom, telephone };

    try {
      const res = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (res.ok) {
        const savedClient = await res.json();
        setClients((prevClients) => [...prevClients, savedClient]);
        setSuccess('Client ajouté avec succès');

        // Reload the current page
        window.location.reload();


        // Réinitialiser le formulaire
        setNom('');
        setTelephone('');
      } else {
        throw new Error('Erreur lors de l\'ajout du client');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />

      <div className='px-32 py-20 pt-5'>

        <div className="px-32">
          <h2 className="text-2xl font-bold mb-4">Clients</h2>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-slate-400">
            <h3 className="text-xl font-semibold mb-4">Ajouter un client</h3>
            
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Ajouter le client
              </button>
            </form>
          </div>
        </div>

        <div className='mt-10'>
          <h3 className="text-xl font-semibold mb-2">Liste des clients</h3>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                    <tr key={client._id}> {/* Utilisez `_id` comme clé unique */}
                        <td className="px-6 py-4 whitespace-nowrap">{client.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{client.telephone}</td>
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
