import dbConnect from '../../../../utils/dbConnect';
import Destinataire from '../../../../models/destinataire.model'; // Replace with the correct path to your Destinataire model
import { NextResponse } from 'next/server';

await dbConnect();

export async function GET() {
    try {
        // Fetch all destinataires from the database
        const destinataires = await Destinataire.find().sort({ createdAt: 'desc' });
        return NextResponse.json({ destinataires }, { status: 200 });
    } catch (error) {
        console.error('Error fetching destinataires:', error);
        return NextResponse.json({ message: 'Error fetching destinataires' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        // Extract data from the request body
        const { nom, adresse, telephone } = await req.json();

        // Create a new destinataire with the received data
        const newDestinataire = await Destinataire.create({ nom, adresse, telephone });

        // Respond with a success message and the newly created destinataire
        return NextResponse.json({ message: 'Destinataire added successfully!', destinataire: newDestinataire }, { status: 201 });
    } catch (error) {
        console.error('Error adding destinataire:', error);
        return NextResponse.json({ message: "Error adding destinataire" }, { status: 500 });
    }
}
