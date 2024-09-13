'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/header';

const Page = () => {
    const [trans, setTrans] = useState([]);
    
    const [nouvelleTransaction, setNouvelleTransaction] = useState({
        montant: '',
        nomBeneficiaire: '',
        telBeneficiaire: '',
        nomClient: '',
        telClient: '',
    });

    useEffect(() => {
        // Fonction pour récupérer les transactions depuis l'API
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/transaction'); // Remplacez par le bon chemin vers votre API
                const data = await response.json();
                setTrans(data.transactions); // Assurez-vous que `data.transactions` contient bien la liste des transactions
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNouvelleTransaction({ ...nouvelleTransaction, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Envoyer la nouvelle transaction à l'API
        try {
            const response = await fetch('/api/transaction', { // Remplacez par le bon chemin vers votre API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nouvelleTransaction),
            });
            const result = await response.json();
            if (response.ok) {
                // Ajouter la nouvelle transaction à la liste
                // setTrans([...trans, { ...nouvelleTransaction, id: trans.length + 1, date: new Date().toISOString().split('T')[0], statut: 'En cours' }]);
                setNouvelleTransaction({
                    montant: '',
                    nomBeneficiaire: '',
                    telBeneficiaire: '',
                    nomClient: '',
                    telClient: '',
                });

                // Reload the current page
                window.location.reload();

            } else {
                console.error('Error adding transaction:', result.message);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

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
            <Header />

            <div className='px-10 py-20 pt-5'>
                <div className="px-64">
                    <h2 className="text-3xl font-bold mb-4">TRANSACTIONS</h2>
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4">Ajouter une transaction</h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="montant" className="block text-sm font-medium text-gray-700">Montant</label>
                                <input
                                    type="number"
                                    id="montant"
                                    value={nouvelleTransaction.montant}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="nomBeneficiaire" className="block text-sm font-medium text-gray-700">Nom bénéficiaire</label>
                                <input
                                    type="text"
                                    id="nomBeneficiaire"
                                    value={nouvelleTransaction.nomBeneficiaire}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="telBeneficiaire" className="block text-sm font-medium text-gray-700">Téléphone bénéficiaire</label>
                                <input
                                    type="tel"
                                    id="telBeneficiaire"
                                    value={nouvelleTransaction.telBeneficiaire}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="nomClient" className="block text-sm font-medium text-gray-700">Nom client</label>
                                <input
                                    type="text"
                                    id="nomClient"
                                    value={nouvelleTransaction.nomClient}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="telClient" className="block text-sm font-medium text-gray-700">Téléphone client</label>
                                <input
                                    type="tel"
                                    id="telClient"
                                    value={nouvelleTransaction.telClient}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Ajouter la transaction
                            </button>
                        </form>
                    </div>
                </div>

                <div>
                    <h3 className="text-4xl font-semibold mb-2">Liste des transactions</h3>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom bénéficiaire</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone bénéficiaire</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone client</th>
                                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                {trans.map((tran) => (
                                    <tr key={tran._id}> {/* Utiliser `_id` si c'est la clé primaire MongoDB */}
                                        <td className="px-6 py-2 whitespace-nowrap">{formatDateTime(tran.createdAt)}</td>
                                        <td className="px-6 py-2 whitespace-nowrap">{tran.montant} €</td>
                                        <td className="px-6 py-2 whitespace-nowrap">{tran.nomBeneficiaire}</td>
                                        <td className="px-6 py-2 whitespace-nowrap">{tran.telBeneficiaire}</td>
                                        <td className="px-6 py-2 whitespace-nowrap">{tran.nomClient}</td>
                                        <td className="px-6 py-2 whitespace-nowrap">{tran.telClient}</td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <span
                                                className={
                                                    (tran.statut === 'Complété'
                                                        ? 'bg-green-100 text-green-800'
                                                        : tran.statut === 'En cours'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800') +
                                                    " px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                }
                                            >
                                                {tran.statut}
                                            </span>
                                        </td>
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
