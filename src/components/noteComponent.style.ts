import { Stack, styled } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

export const Main = styled('main')`
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

export const StackStyled = styled(Stack)`
  @media (width <= 600px) {
    margin-top: 2em;
  }
`

interface BackgroundProps {
  date: Dayjs | null
}

export const Background = styled('div')<BackgroundProps>`
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
