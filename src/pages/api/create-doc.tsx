import type { NextApiRequest, NextApiResponse } from 'next'
import { drive_v3, google } from 'googleapis'

/**
 * Create a post request to google apis to create a new document
 * The token is passed in the header
 * Use googleapis npm package to create the request instead of manually creating the request
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // fetch the token from req headers
  const token: string = req.headers.token as string

  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: token })

  const docs = google.docs({ version: 'v1', auth: oauth2Client })
  const drive: drive_v3.Drive = google.drive({ version: 'v3', auth: oauth2Client })

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const response = await docs.documents.create({
      requestBody: {
        title: `Five Year Calendar ${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getFullYear()} | ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
    })

    res.status(200).json({ message: 'Document created successfully', data: response.data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating document' })
  }
}
