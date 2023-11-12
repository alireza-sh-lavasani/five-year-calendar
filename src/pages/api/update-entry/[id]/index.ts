import { NextApiResponse, NextApiRequest } from 'next'
import { ObjectId } from 'mongodb'
import { mongodbClient } from '@/lib/mongodb'

interface IInputParams {
  params: { id: string }
}

export interface IDataObject {
  html?: string
  image?: string
  audio?: string
  video?: string
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query as IInputParams['params']
    const { html, image, audio, video } = await req.body

    // Connect to MongoDB
    await mongodbClient.connect()
    console.log('*** MONGODB CONNECTED ***')

    const db = mongodbClient.db(process.env.DATABASE_NAME)

    // Define the filter and update objects
    const filter = { _id: new ObjectId(id) }

    const data: IDataObject = {}

    if (html) data.html = html
    if (image) data.image = image
    if (audio) data.audio = audio
    if (video) data.video = video

    const update = {
      $set: { data },
    }

    await db.collection('days').updateOne(filter, update)

    console.log(`Entry updated successfully. ✅`)

    res.status(200).json({ message: `Entry updated successfully. ✅` })
  } catch (error) {
    console.error(error)
  }
}
