'use client'
import { Skeleton, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { Background, Main, StackStyled } from './noteComponent.style'
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

  console.log({ entryData })

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
