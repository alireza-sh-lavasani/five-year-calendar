import { mongodbClient } from '@/lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { month, day } = req.query

  try {
    // Connect to MongoDB
    await mongodbClient.connect()
    console.log('*** MONGODB CONNECTED ***')

    const db = mongodbClient.db(process.env.DATABASE_NAME)
    const dayData = await db
      .collection('days')
      .find({ index: `${month}_${day}` })
      .toArray()

    res.json(dayData)
  } catch (error) {
    console.error(error)
  }
}
