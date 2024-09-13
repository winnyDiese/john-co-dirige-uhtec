// pages/api/client.js

import dbConnect from '../../../utils/dbConnect';
import Client from '../../../models/client.model';

export default async function handler(req, res) {
  await dbConnect(); // Connexion à la base de données

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const client = new Client(req.body);
        const savedClient = await client.save();
        res.status(201).json({ success: true, data: savedClient });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    
    case 'GET':
      try {
        const clients = await Client.find({});
        res.status(200).json({ success: true, data: clients });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
