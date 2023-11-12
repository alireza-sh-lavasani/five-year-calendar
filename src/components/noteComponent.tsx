'use client'
import { Skeleton, Stack, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import NoteCard from './noteCard'
import dayjs, { Dayjs } from 'dayjs'
import { getEntryData } from '@/lib/getEntryData'
import { IEntryData } from '@/common/interfaces'

const NoteComponent = () => {
  const [entryData, setEntryData] = useState<IEntryData[]>([])
  const [date, setDate] = useState<Dayjs | null>(dayjs())
  const [loading, setLoading] = useState(false)

  async function fetchData() {
    setLoading(true)

    const month = (date?.get('M') as number) + 1
    const day = date?.get('D') as number

    setEntryData(await getEntryData({ month, day }))

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [date])

  return (
    <>
      <Background date={date}>
        <Main>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={date}
              onChange={newDate => setDate(newDate)}
              views={['month', 'day']}
              sx={{
                padding: '1em',
                borderRadius: '5px',
                background: '#ffffff',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
              }}
            />
          </LocalizationProvider>

          <StackStyled gap={3}>
            {loading
              ? [1, 2, 3, 4, 5].map(index => <Skeleton key={index} variant='rounded' width='100%' height={100} />)
              : entryData?.map((eachYearNote: IEntryData) => (
                  <NoteCard key={eachYearNote._id} eachYearNote={eachYearNote} fetchData={fetchData} />
                ))}
          </StackStyled>
        </Main>
      </Background>
    </>
  )
}

export default NoteComponent

/**
 * Styled Components
 */
const Main = styled('main')`
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: '100vh';
  align-items: 'flex-start';
  justify-content: 'center';
  padding: '1em';
  margin: auto;
  max-width: 60vw;
  grid-gap: 5em;

  @media (width<= 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    align-items: 'center';
    justify-content: 'flex-start';
    grid-gap: 0;
    max-width: 100%;
  }
`

const StackStyled = styled(Stack)`
  @media (width <= 600px) {
    margin-top: 2em;
  }
`

interface BackgroundProps {
  date: Dayjs | null
}

const Background = styled('div')<BackgroundProps>`
  padding: 2em 1em;
  min-height: 100vh;
  /* Changing background color based on seasons */
  ${({ date }) =>
    [2, 3, 4].includes(dayjs(date).month())
      ? `background-image: linear-gradient( 135deg, #3dc921 10%, #58CFFB 100%);`
      : [5, 6, 7].includes(dayjs(date).month())
      ? `background-color: #52ACFF;
       background-image: linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%);
      `
      : [8, 9, 10].includes(dayjs(date).month())
      ? `background-image: linear-gradient( 330deg, #FD6E6A 10%, #FFC600 100%);`
      : `background-image: linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%);`}
`
