'use client'
import React, { useState } from 'react'
import Header from '../components/header'

const Page = () => {
  const [agents, setagents] = useState([
    { id: 1, nom: 'Alice Dupont', telephone: '0123456789' },
    { id: 2, nom: 'Bob Martin', telephone: '0987654321' },
  ])

    return (
        <div>
            <Header />

            <div className='px-32 py-20 pt-5'>
                <h2 class="text-2xl font-bold mb-4">Transactions</h2>
                <div class="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h3 class="text-xl font-semibold mb-4">Ajouter une transaction</h3>
                    <form class="space-y-4">
                    <div>
                        <label for="montant" class="block text-sm font-medium text-gray-700">Montant</label>
                        <input type="number" id="montant" v-model="nouvelleTransaction.montant" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="expediteur" class="block text-sm font-medium text-gray-700">Expéditeur</label>
                        <input type="text" id="expediteur" v-model="nouvelleTransaction.expediteur" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="destinataire" class="block text-sm font-medium text-gray-700">Destinataire</label>
                        <input type="text" id="destinataire" v-model="nouvelleTransaction.destinataire" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Ajouter la transaction
                    </button>
                    </form>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-2">Liste des transactions</h3>
                    <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expéditeur</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinataire</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        
                        <tr v-for="transaction in transactions" >
                            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.date }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.montant }} €</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.expediteur }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.destinataire }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                            <span className="{'bg-green-100 text-green-800': transaction.statut === 'Complété', 'bg-yellow-100 text-yellow-800': transaction.statut === 'En cours', 'bg-red-100 text-red-800': transaction.statut === 'Annulé'}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                {{ transaction.statut }}
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>          
        )
}

export default Page
