import dbConnect from '../../../../utils/dbConnect';
import Agent from '../../../../models/agent.model'; // Replace with the correct path to your Agent model
import { NextResponse } from 'next/server';

await dbConnect();

export async function GET() {
    try {
        // Fetch all agents from the database
        const agents = await Agent.find().sort({ createdAt: 'desc' });
        return NextResponse.json({ agents }, { status: 200 });
    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json({ message: 'Error fetching agents' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        // Extract data from the request body
        const { nom, telephone } = await req.json();

        // Create a new agent with the received data
        const newAgent = await Agent.create({ nom, telephone });

        // Respond with a success message and the newly created agent
        return NextResponse.json({ message: 'Agent added successfully!', agent: newAgent }, { status: 201 });
    } catch (error) {
        console.error('Error adding agent:', error);
        return NextResponse.json({ message: "Error adding agent" }, { status: 500 });
    }
}
