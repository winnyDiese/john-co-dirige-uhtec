

import dbConnect from '../../../../utils/dbConnect';
import Client from '../../../../models/client.model';
import { NextResponse } from 'next/server';

await dbConnect()

export async function GET() {
    const agents = await Client.find().sort({createdAt:'desc'})
    return NextResponse.json( {agents} , { status: 200 })
}

export async function POST(req) {
    try {
      // Extraction des données du body de la requête
      const { nom, telephone } = await req.json();
  
      // Création d'un nouveau client avec les données reçues
      await Client.create({ nom, telephone });
  
      // Réponse avec un message de succès
      return NextResponse.json({ message: 'Client ajouté avec succès !' }, { status: 201 });
    } catch (error) {
      // En cas d'erreur, log l'erreur et renvoie une réponse avec le statut 500
      console.log('Erreur lors de l\'ajout du client : ' + error);
      return NextResponse.json({ message: "Erreur lors de l'enregistrement du client !" }, { status: 500 });
    }
}
