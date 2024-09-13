import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header class="bg-blue-500 text-white p-4">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Gestion des Transactions</h1>
            {/* <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Déconnexion
            </button> */}
        </div>
        <nav class="mt-4" v-if="isAuthenticated text-sm">
            <Link href="/agent" class="mr-4 hover:underline">Agents</Link>
            <Link href="/client" class="mr-4 hover:underline">Clients</Link>
            <Link href="/destinataire" class="mr-4 hover:underline">Destinataires</Link>
            <Link href="/transaction" class="hover:underline">Transactions</Link>
        </nav>
  </header>
  )
}

export default Header
