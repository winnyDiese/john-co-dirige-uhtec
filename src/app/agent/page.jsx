'use client'
import React, { useState, useEffect } from 'react'
import Header from '../components/header'

const Page = () => {
  const [agents, setAgents] = useState([]);
  const [nouvelAgent, setNouvelAgent] = useState({
    nom: '',
    telephone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch the list of agents from the API when the component loads
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agent');
        const data = await response.json();
        setAgents(data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setError('Error fetching agents.');
      }
    };

    fetchAgents();
  }, []);

  // Handle form submission to add a new agent
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouvelAgent),
      });

      if (response.ok) {
        const newAgent = await response.json();
        // Update the list of agents with the newly added one
        setAgents([...agents, newAgent]);
        // Reset the form fields
        setNouvelAgent({ nom: '', email: '' });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error adding agent');
      }
    } catch (error) {
      console.error('Error adding agent:', error);
      setError('Error adding agent.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNouvelAgent({ ...nouvelAgent, [id]: value });
  };

  return (
    <div>
      <Header />

      <div className="px-32 py-20 pt-5">
        <h2 className="text-2xl font-bold mb-4">Agents</h2>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Add Agent Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Ajouter un agent</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                value={nouvelAgent.nom}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                value={nouvelAgent.telephone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Adding...' : 'Ajouter l\'agent'}
            </button>
          </form>
        </div>

        {/* Agent List */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Liste des agents</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{agent.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{agent.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
