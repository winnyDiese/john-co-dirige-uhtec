

import dbConnect from '../../../utils/dbConnect';
import Client from '../../../models/client.model';

await dbConnect()

export async function GET() {
    const agents = await Client.find().sort({createdAt:'desc'})
    return NextResponse.json( {agences} , { status: 200 })
}