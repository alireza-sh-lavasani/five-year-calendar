import Head from 'next/head'
import { useSession, signIn } from 'next-auth/react'
import axios from 'axios'
import { ISession } from '@/common/interfaces'
import NoteComponent from '@/components/noteComponent'
import Header from '@/components/header'
import { Box, Button, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import GoogleIcon from '@mui/icons-material/Google'

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: '2rem',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    padding: '1rem',
  },
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  marginBottom: '2rem',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    padding: '1rem',
  },
}))

const SignInButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  padding: '1rem 2rem',
  margin: '2rem auto',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: '0.5rem 1rem',
  },
}))

const GoogleIconWrapper = styled(GoogleIcon)(({ theme }) => ({
  marginRight: '1rem',
}))

export default function Home() {
  const { data } = useSession()
  const session = data as ISession

  /**
   * Create a new document
   */
  const createDocument = async () => {
    const response = await axios.post('/api/create-doc', {}, { headers: { token: session?.accessToken } })
    console.log(response.data)
  }

  /**
   * If session is available, display user info and photo
   */
  if (session)
    return (
      <>
        <Head>
          <title>Five Year Calendar</title>
          <meta name='description' content='A five year calendar to track your goals' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main>
          <Header session={session} />
          <NoteComponent />
        </main>
      </>
    )

  /**
   * If session is not available, display sign in button
   */
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Head>
        <title>Five Year Calendar</title>
        <meta name='description' content='A five year calendar to track your goals' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container maxWidth='sm'>
        <Title variant='h1'>Five Year Calendar</Title>
        <Subtitle variant='h2'>Track your goals for the next five years</Subtitle>
        <SignInButton variant='contained' onClick={() => signIn('google')}>
          <GoogleIconWrapper />
          Sign In with Google
        </SignInButton>
      </Container>
    </Box>
  )
}
