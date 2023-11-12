import { IUserInfo } from '@/common/interfaces'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ISession } from '../common/interfaces'
import { signOut } from 'next-auth/react'
import { styled } from '@mui/material/styles'
import { Avatar, Button, Grid, Typography } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}))

const AvatarImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
}))

const Header = ({ session }: { session: ISession }) => {
  // Create states to store user info and date
  const [userInfo, setUserInfo] = useState<IUserInfo>()
  const [date, setDate] = useState<string>()
  const [open, setOpen] = useState(false)

  /**
   * Fetch user info and photo when session is available
   * Set the states
   * Pass the token in the header
   */
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get('/api/me/profile', { headers: { token: session?.accessToken } })
      setUserInfo(response.data.data)
    }

    // Set the date state to the current date in the desired format
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.toLocaleString('default', { month: 'short' })
    const year = currentDate.getFullYear()
    const suffix =
      day === 1 || day === 21 || day === 31
        ? 'st'
        : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
        ? 'rd'
        : 'th'
    setDate(`${day}${suffix} ${month} ${year}`)

    if (session) {
      getUserInfo()
    }
  }, [session])

  /**
   * Render sign out button, user info, photo and date
   */
  return (
    <Root>
      <Grid container spacing={2} alignItems='center'>
        <Grid item>
          {/* display user photo from userInfo.picture if the state was not null */}
          {userInfo?.picture && <AvatarImage alt='profile photo' src={userInfo.picture} />}
        </Grid>
        <Grid item>
          {/* display user info from userinfo.data if the state was not null */}
          <Typography variant='h6'>Hi {userInfo?.given_name}</Typography>
          {/* display date */}
          <Typography variant='subtitle1'>{date}</Typography>
        </Grid>
        <Grid item xs />
        <Grid item>
          <Button
            variant='contained'
            style={{ backgroundColor: '#ff0000', color: '#ffffff' }}
            onClick={() => setOpen(true)}
          >
            Sign Out
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Are you sure you want to sign out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => signOut()} style={{ backgroundColor: '#ff0000', color: '#ffffff' }}>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  )
}

export default Header
