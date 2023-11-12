import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

/**
 * Create a get request to google apis to fetch user info
 * The token is passed in the header
 * Use googleapis npm package to fetch user info instead of manually creating the request
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // fetch the token from req headers
  const token: string = req.headers.token as string

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    // use googleapis npm package to fetch user info
    const oauth2 = google.oauth2('v2')
    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({ access_token: token })
    const userInfo = await oauth2.userinfo.get({ auth: oauth2Client })

    res.status(200).json({ message: 'User info fetched successfully', data: userInfo.data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching user info' })
  }
}
