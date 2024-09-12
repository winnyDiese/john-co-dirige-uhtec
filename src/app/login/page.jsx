import React from 'react'
import Header from "../components/header"

const page = () => {

  const [client, setClient] = useState([
    { id: 1, nom: 'Alice Dupont', telephone: '0123456789' },
    { id: 2, nom: 'Bob Martin', telephone: '0987654321' },
  ])

  return (
    <div>
      <Header />

      <div>
          <h2 class="text-2xl font-bold mb-4">Clients</h2>
          <div class="bg-white shadow-md rounded-lg p-6 mb-8">
            <h3 class="text-xl font-semibold mb-4">Ajouter un client</h3>
            <form class="space-y-4">
              <div>
                <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
                <input type="text" id="nom" v-model="nouveauClient.nom" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" v-model="nouveauClient.email" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label for="telephone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel" id="telephone" v-model="nouveauClient.telephone" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Ajouter le client
              </button>
            </form>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Liste des clients</h3>
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="client in clients">
                    <td class="px-6 py-4 whitespace-nowrap">{ client.nom }</td>
                    <td class="px-6 py-4 whitespace-nowrap">{ client.email }</td>
                    <td class="px-6 py-4 whitespace-nowrap">{ client.telephone }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default page
