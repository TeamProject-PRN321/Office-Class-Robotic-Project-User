import { Box, Button, Card, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import moment from 'moment'
import { useRouter } from 'next/router'
import * as React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { ClassModel } from './AddNewClass/NewClassFormLiveClass'

interface LiveClassItemsProps {
  data: ClassModel
}

export default function LiveClassItems({ data }: LiveClassItemsProps) {
  const route = useRouter()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpGradeStudent = () => {
    route.push('/students/' + data.className)
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>{data.className}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <ClockOutline></ClockOutline>
          <Typography sx={{ marginRight: '15px' }}>
            {moment(data.startTime, 'HH:mm:ss').format('HH:mm')} - {moment(data.endTime, 'HH:mm:ss').format('HH:mm')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Calendar></Calendar>
          <Typography>{data.dayStudy}</Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          border: '1px solid #CECFD7',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: theme =>
            data.classWasCheckedAttendant ? '#C4FCEF' : hexToRGBA(theme.palette.info.light, 0.2),
          color: theme => (data.classWasCheckedAttendant ? '#00C9A7' : theme.palette.info.light)
        }}
      >
        Status: {data.classWasCheckedAttendant ? 'Completed' : 'Waiting'}
      </Typography>
      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          handleClickOpen()
        }}
      >
        John now
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
          <DialogContentText id='alert-dialog-description'>
            Link google meeting: https://meet.google.com/toi-suxg-cax
          </DialogContentText>
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

      <Button
        sx={{ backgroundColor: '#5972F3', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          handleUpGradeStudent()
        }}
      >
        Students in class
      </Button>
    </Card>
  )
}
