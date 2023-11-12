'use client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { CardContent, Typography, Button, Divider, Stack, CircularProgress } from '@mui/material'
import { CardMediaStyled, CardStyled, EditButton, EditorWrapper } from './noteCard.style'
import { Edit } from '@mui/icons-material'
import { updateOneEntry } from '@/lib/updateOneEntry'
import { toast } from 'react-toastify'
import { INoteCardParams } from '@/common/interfaces'

const NoteCard = ({ eachYearNote: { data, year, _id }, fetchData }: INoteCardParams) => {
  // States
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editorData, setEditorData] = useState(data?.html)

  // Effects
  useEffect(() => {
    setEditorData(data?.html || '')
  }, [data])

  // Update an entry
  const submitUpdate = async () => {
    try {
      setLoading(true)
      const { message } = await updateOneEntry({ id: _id, body: { html: editorData } })
      toast.success(message)
      setEditMode(false)
      setLoading(false)
      fetchData()
    } catch (error) {
      toast.error(`Failed to update entry with id: ${_id}`)
      console.error(error)
    }
  }

  // Render
  return (
    <CardStyled>
      <CardContent sx={{ width: '100%' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h5' component='div' sx={{ marginBottom: '1em' }}>
            {year}
          </Typography>

          <EditButton onClick={() => setEditMode(prevState => !prevState)}>
            <Edit color='info' />
          </EditButton>
        </Stack>

        {editMode ? (
          <>
            <Divider sx={{ margin: '1em 0' }} />

            <Button variant='outlined' onClick={() => setEditMode(false)} sx={{ marginRight: '1em' }}>
              Cancel
            </Button>

            <Button disabled={loading} variant='contained' onClick={submitUpdate}>
              {loading ? <CircularProgress sx={{ color: 'white' }} size={23} /> : 'Submit'}
            </Button>
          </>
        ) : (
          <Typography variant='body2' color='text.secondary' dangerouslySetInnerHTML={{ __html: data?.html || '' }} />
        )}
      </CardContent>

      {data?.image ? <CardMediaStyled image={data.image} /> : <></>}
    </CardStyled>
  )
}

export default NoteCard
