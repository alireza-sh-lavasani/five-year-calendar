import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * create a post request to the microsoft graph api to create a doc
 * the token is passed in the header
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // fetch the token from req headers
  const token = req.headers.token

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.post(
      'https://graph.microsoft.com/v1.0/drive/root/children',
      {
        name: 'New Document.docx',
        file: {},
      },
      { headers }
    )

    res.status(200).json({ message: 'Document created successfully', data: response.data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating document' })
  }
}
