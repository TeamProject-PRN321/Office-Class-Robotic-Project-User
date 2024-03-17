import { Box, Button, Dialog, Grid, IconButton, InputAdornment, TextField, Typography, styled } from '@mui/material'
import { Book, CloudUpload, Plus } from 'mdi-material-ui'
import * as React from 'react'

import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close'
import ScheduleDashboard from '../Dashboard/DashboardSchedule'
import { NumbersOutlined, SchoolOutlined } from '@mui/icons-material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function SubjectItems() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container direction={'row'} justifyContent={'space-between'} spacing={2}>
      <Grid
        marginBottom={'20px'}
        item
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}
      >
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Subject</Typography>
        <React.Fragment>
          <Button
            sx={{
              backgroundColor: '#5681f1',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '13px',
              ':hover': {
                backgroundColor: '#816EA5',
                color: 'white'
              }
            }}
            onClick={() => {
              handleClickOpen()
            }}
          >
            <Plus sx={{ margin: '2px', fontSize: '16px' }}></Plus>
            Add Schedule
          </Button>

          {/* Dialog */}
          <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
            <DialogTitle
              sx={{ m: 0, p: 2, color: 'black', fontWeight: 'bold', fontSize: '50px', textAlign: 'center' }}
              id='customized-dialog-title'
            >
              Add new Subject
            </DialogTitle>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2' }}>
              <TextField
                label='Subject Name'
                id='outlined-start-adornment'
                placeholder='Please enter subject name'
                sx={{ m: 2, width: '65ch', fontSize: '15px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SchoolOutlined></SchoolOutlined>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label='Total slot'
                type='number'
                id='outlined-start-adornment'
                placeholder='Total slot'
                sx={{ m: 2, width: '65ch', fontSize: '15px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <NumbersOutlined></NumbersOutlined>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label='Curriculum Name'
                id='outlined-start-adornment'
                placeholder='curriculum Name'
                sx={{ m: 2, width: '65ch', fontSize: '15px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Book></Book>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label='Description'
                multiline
                id='outlined-start-adornment'
                placeholder='Description detail ...'
                sx={{ m: 2, width: '65ch', fontSize: '15px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Book></Book>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                component='label'
                role={undefined}
                variant='contained'
                tabIndex={-1}
                startIcon={<CloudUpload />}
                sx={{
                  backgroundColor: '#B9C6BB',
                  m: 2,
                  width: '600px',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: '15px'
                }}
              >
                Upload file PDF
                <VisuallyHiddenInput type='file' />
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
              <DialogActions>
                <Button
                  sx={{
                    backgroundColor: '#9155fd',
                    color: 'white',
                    ':hover': { backgroundColor: '#008BC5', color: 'white' },
                    justifyContent: 'center'
                  }}
                  autoFocus
                  onClick={handleClose}
                >
                  Save changes
                </Button>
              </DialogActions>
            </Box>
          </BootstrapDialog>
        </React.Fragment>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>
    </Grid>
  )
}
