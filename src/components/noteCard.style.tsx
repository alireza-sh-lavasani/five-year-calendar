import { styled, Card, CardMedia } from '@mui/material'

export const EditorWrapper = styled('div')`
  width: 100%;

  @media (width > 600px) {
    width: 30vw;
  }
`

export const EditButton = styled('div')`
  cursor: pointer;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CardStyled = styled(Card)`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;

  @media (width <= 600px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`

export const CardMediaStyled = styled(CardMedia)`
  width: 20vh;
  min-height: 15vh;
  object-fit: cover;

  @media (width <= 600px) {
    width: 100%;
    height: 20vh;
  }
`
