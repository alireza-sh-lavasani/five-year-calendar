import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Create a get request to microsoft graph api to get user info
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
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', { headers })
    res.status(200).json({ message: 'User info fetched successfully', data: response.data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching user info' })
  }
}
