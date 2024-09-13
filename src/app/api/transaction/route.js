import dbConnect from '../../../../utils/dbConnect';
import Transaction from '../../../../models/transaction.model'; // Replace with the correct path to your Transaction model
import { NextResponse } from 'next/server';

await dbConnect();

export async function GET() {
    try {
        // Fetch all transactions from the database
        const transactions = await Transaction.find().sort({ createdAt: 'desc' });
        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        // Extract data from the request body
        const { montant, date, description } = await req.json();

        // Create a new transaction with the received data
        const newTransaction = await Transaction.create({ montant, date, description });

        // Respond with a success message and the newly created transaction
        return NextResponse.json({ message: 'Transaction added successfully!', transaction: newTransaction }, { status: 201 });
    } catch (error) {
        console.error('Error adding transaction:', error);
        return NextResponse.json({ message: "Error adding transaction" }, { status: 500 });
    }
}
    