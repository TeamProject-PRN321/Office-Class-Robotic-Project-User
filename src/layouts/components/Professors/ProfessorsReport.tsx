import { Box, Button, Card, Typography } from '@mui/material'
import { BookmarkCheckOutline, SchoolOutline } from 'mdi-material-ui'
import * as React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function ProfessorReport() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '350px', height: '200px' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Trần Duy Thanh</Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#43E45B'
        }}
      >
        Added at: January 1, 2024
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SchoolOutline sx={{ marginRight: '3px' }}></SchoolOutline>
        <Typography sx={{ marginRight: '15px' }}>3: Class</Typography>
        <BookmarkCheckOutline sx={{ marginRight: '3px' }}></BookmarkCheckOutline>
        <Typography>1: Course</Typography>
      </Box>

      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => handleClickOpen()}
      >
        Report
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id='alert-dialog-title'>
          {'Sorry. Functions are not yet developed.'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Please leave a report about teacher</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: '#5972F3',
              color: 'white',
              ':hover': { backgroundColor: '#008BC5', color: 'white' }
            }}
            onClick={handleClose}
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
