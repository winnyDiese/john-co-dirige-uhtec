import React from 'react'

const Header = () => {
  return (
    <header class="bg-blue-600 text-white p-4">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Gestion des Transactions</h1>
            <button v-if="isAuthenticated" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Déconnexion
            </button>
        </div>
        <nav class="mt-4" v-if="isAuthenticated">
            <router-link to="/clients" class="mr-4 hover:underline">Clients</router-link>
            <router-link to="/agents" class="mr-4 hover:underline">Agents</router-link>
            <router-link to="/destinataires" class="mr-4 hover:underline">Destinataires</router-link>
            <router-link to="/transactions" class="hover:underline">Transactions</router-link>
        </nav>
  </header>
  )
}

export default Header
