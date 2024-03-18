import * as React from 'react'

import { Box, Button, Card, Dialog, DialogContent, DialogTitle, Slide, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import { ClassModel } from './AddNewClass/NewClassFormLiveClass'
import { TransitionProps } from '@mui/material/transitions'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

interface HistoryClassesReportProps {
  data: ClassModel
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function HistoryClassesReport({ data }: HistoryClassesReportProps) {
  //const route = useRouter()
  // const ViewDetailLiveClass = () => {
  //   route.push('/classes')
  // }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>{data.className}</Typography>
      {/* <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        Teacher: Ngô Thị Hương
      </Typography> */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ClockOutline></ClockOutline>
        <Typography sx={{ marginRight: '15px' }}>{data.startTime}</Typography>
        <Calendar></Calendar>
        <Typography>{data.dayStudy}</Typography>
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
        Attendance Report
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <DialogTitle
            id='alert-dialog-slide-description'
            sx={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: '65px',
              textAlign: 'center'
            }}
          >
            Attendance Report Submitted Successfully
          </DialogTitle>

          <DialogContent>
            <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column' }}>
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '16px' }}>
                How to Make an Array and it's Type in C#
              </Typography>
              <Typography
                sx={{
                  border: '1px solid #B0AAAE',
                  borderRadius: '10px',
                  width: 'fit-content',
                  padding: '5px',
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}
              >
                Teacher: Trần Duy Thanh
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <ClockOutline></ClockOutline>
                <Typography sx={{ marginRight: '13px' }}>12:40 P:M</Typography>
                <Calendar></Calendar>
                <Typography>05/08/2001</Typography>
              </Box>
              <Typography
                sx={{
                  border: '1px solid #CECFD7',
                  borderRadius: '10px',
                  width: 'fit-content',
                  padding: '5px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: '#4B4453',
                  color: '#D8E4EA'
                }}
              >
                Status: Completed
              </Typography>
              <Typography
                sx={{
                  width: 'fit-content',
                  padding: '5px',
                  fontSize: '17px',
                  fontWeight: 'bold'
                }}
              >
                Total students: 29
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                <Typography
                  sx={{
                    width: 'fit-content',
                    padding: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#27EA45'
                  }}
                >
                  Present: 17
                </Typography>
                <Typography
                  sx={{
                    width: 'fit-content',
                    padding: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'red'
                  }}
                >
                  Absent: 12
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: '#9155fd',
                  color: 'white',
                  ':hover': { backgroundColor: '#008BC5', color: 'white' }
                }}
                onClick={() => {
                  handleClose()
                }}
              >
                Continue
              </Button>
            </Card>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
