import {
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import { MenuLeftOutline, MenuRightOutline } from 'mdi-material-ui'
import moment from 'moment'
import { Fragment, useEffect, useState } from 'react'
import ListIcon from '@mui/icons-material/List'

export interface Subject {
  className: string
  classroomName: string
  dayStudy: string
  startTime: string
  endTime: string
  timeDetail: string
  totalStudentInClass: number
}

const subjects: Subject[] = [
  {
    className: 'Math',
    classroomName: 'A101',
    dayStudy: 'Monday',
    startTime: '08:00',
    endTime: '10:00',
    timeDetail: '2 hours',
    totalStudentInClass: 30
  },
  {
    className: 'History',
    classroomName: 'B201',
    dayStudy: 'Wednesday',
    startTime: '09:00',
    endTime: '11:00',
    timeDetail: '2 hours',
    totalStudentInClass: 25
  },
  {
    className: 'English',
    classroomName: 'C301',
    dayStudy: 'Friday',
    startTime: '08:00',
    endTime: '10:00',
    timeDetail: '2 hours',
    totalStudentInClass: 35
  },
  {
    className: 'Physics',
    classroomName: 'D401',
    dayStudy: 'Tuesday',
    startTime: '13:00',
    endTime: '15:00',
    timeDetail: '2 hours',
    totalStudentInClass: 28
  },
  {
    className: 'Chemistry',
    classroomName: 'E501',
    dayStudy: 'Thursday',
    startTime: '14:00',
    endTime: '16:00',
    timeDetail: '2 hours',
    totalStudentInClass: 32
  },
  {
    className: 'Biology',
    classroomName: 'F601',
    dayStudy: 'Monday',
    startTime: '15:00',
    endTime: '17:00',
    timeDetail: '2 hours',
    totalStudentInClass: 29
  },
  {
    className: 'Geography',
    classroomName: 'G701',
    dayStudy: 'Wednesday',
    startTime: '16:00',
    endTime: '18:00',
    timeDetail: '2 hours',
    totalStudentInClass: 27
  },
  {
    className: 'Literature',
    classroomName: 'H801',
    dayStudy: 'Friday',
    startTime: '17:00',
    endTime: '19:00',
    timeDetail: '2 hours',
    totalStudentInClass: 31
  },
  {
    className: 'Music',
    classroomName: 'I901',
    dayStudy: 'Tuesday',
    startTime: '18:00',
    endTime: '20:00',
    timeDetail: '2 hours',
    totalStudentInClass: 26
  },
  {
    className: 'Art',
    classroomName: 'J1001',
    dayStudy: 'Monday;Thursday',
    startTime: '19:00',
    endTime: '21:00',
    timeDetail: '2 hours',
    totalStudentInClass: 33
  }
]

//export interface IWareHouseTableProps {}

const range = (start: number, end: number, step: number) => {
  return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step)
}

const list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const timeLst = range(7, 22, 1)
const heightOfASlot = 50
const widthOfASlot = 150

const Slot = ({ data }: { data: Subject }) => {
  return (
    <Tooltip title={data.timeDetail}>
      <Card
        sx={{
          padding: '5px',
          position: 'absolute',

          // top: heightOfASlot * 1 + 1 * 1 - 1 + 2 + 'px',
          // left: widthOfASlot * 1 + 3 * 1 - 70 + 'px',
          top: widthOfASlot * 0.5 + 0.5 + 'px',
          left: '0.5px',
          backgroundColor: '#b39bde',
          zIndex: 999999,
          width: widthOfASlot + 5,
          height: heightOfASlot * 2 - 2,
          borderRadius: 0,
          ':hover': {
            cursor: 'pointer'
          }
        }}
      >
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography fontWeight={600} color={'white'}>
              {data.className}
            </Typography>
          </Box>
          <Typography color={'white'} textAlign={'right'}>
            {data.startTime} - {data.endTime}
          </Typography>
        </Box>
      </Card>
    </Tooltip>
  )
}

export default function WareHouseTable() {
  const [next, setNext] = useState<number>(0)

  useEffect(() => {
    const parent = document.getElementById('slot_time_14')
    if (parent)
      parent.innerHTML =
        '<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-tckmah-MuiPaper-root-MuiCard-root"><div class="MuiBox-root css-1129bf7"></div><div class="MuiBox-root css-j7qwjs"><p class="MuiTypography-root MuiTypography-body1 css-1tpsv8u-MuiTypography-root">Tên Môn</p><span class="MuiTypography-root MuiTypography-caption css-1gtrqkn-MuiTypography-root">SL HS bfsbug</span></div><p class="MuiTypography-root MuiTypography-body1 css-2rtyd8-MuiTypography-root">Thời gian</p></div>'
  }, [])

  return (
    <Fragment>
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '5px',
          mt: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Button>
            <ListIcon />
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <Button
              size={'small'}
              variant='outlined'
              onClick={() => {
                setNext(next - 1)
              }}
            >
              <MenuLeftOutline />
            </Button>
            <Typography>
              {moment().add('weeks', next).startOf('week').format('DD/MM/YYYY')} -{' '}
              {moment().add('weeks', next).endOf('week').format('DD/MM/YYYY')}
            </Typography>
            <Button
              size={'small'}
              variant='outlined'
              onClick={() => {
                setNext(next + 1)
              }}
            >
              <MenuRightOutline />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Button size={'small'} variant='contained'>
            Weekly
          </Button>
          <Button size={'small'}>Monthly</Button>
        </Box>
      </Card>
      <Box
        sx={{
          mt: 1,
          padding: '10px'
        }}
      >
        <TableContainer
          sx={{
            border: '0.2px solid #CCCCCC'
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ height: heightOfASlot, zIndex: 1000, borderBottom: '1px solid grey' }}>
                <TableCell
                  sx={{ border: '0.2px solid #CCCCCC', width: '80px', height: heightOfASlot, zIndex: 101 }}
                ></TableCell>
                {list.map((item, i) => {
                  return (
                    <TableCell
                      key={item}
                      sx={{
                        border: '0.2px solid #CCCCCC',
                        width: '150px !important',
                        height: heightOfASlot,
                        textAlign: 'center'
                      }}
                    >
                      <Typography
                        fontWeight={700}
                        sx={{
                          color: theme => theme.palette.primary[theme.palette.mode]
                        }}
                      >
                        {item}
                      </Typography>
                      <Typography
                        fontWeight={700}
                        sx={{
                          color: theme => theme.palette.primary[theme.palette.mode]
                        }}
                      >
                        {moment().startOf('week').add('day', i).format('DD/MM')}
                      </Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                position: 'relative'
              }}
            >
              {timeLst.map(time => {
                return (
                  <TableRow key={time}>
                    <TableCell
                      sx={{
                        border: '0.2px solid #CCCCCC',
                        width: '80px',
                        height: heightOfASlot,
                        position: 'sticky',
                        left: 0,
                        zIndex: 100,
                        backgroundColor: 'white'
                      }}
                    >
                      <Chip
                        size='small'
                        color='primary'
                        sx={{
                          position: 'absolute',
                          top: -10,
                          left: 10,
                          zIndex: 999999
                        }}
                        label={
                          <Typography variant='caption' fontWeight={600} color={'white'}>
                            {' '}
                            {time} giờ
                          </Typography>
                        }
                      />
                    </TableCell>
                    {list.map(day => {
                      return (
                        <TableCell
                          key={day}
                          sx={{
                            border: '0.2px solid #CCCCCC',
                            width: '150px !important',
                            minWidth: '150px !important',
                            maxWidth: '150px !important',
                            height: heightOfASlot,
                            position: 'relative'
                          }}
                          id={'slot_time_' + time + day}

                          // onClick={e => {
                          //   console.log(e)

                          //   const parent = document.getElementById(e.currentTarget.id)
                          //   if (parent)
                          //     parent.innerHTML =
                          //       '<div class="slot MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-tckmah-MuiPaper-root-MuiCard-root" style="position:absolute !important;top: 0.5px;left:0.8px"><div class="MuiBox-root css-1129bf7" ></div><div class="MuiBox-root css-j7qwjs"><p class="MuiTypography-root MuiTypography-body1 css-1tpsv8u-MuiTypography-root">Tên Môn</p><span class="MuiTypography-root MuiTypography-caption css-1gtrqkn-MuiTypography-root">SL HS bfsbug</span></div><p class="MuiTypography-root MuiTypography-body1 css-2rtyd8-MuiTypography-root">Thời gian</p></div>'
                          // }}
                        >
                          {subjects.map((subject, index) => {
                            if (!subject.dayStudy.includes(day)) return

                            if (moment(subject.startTime, 'HH:mm').get('hour') !== time) return

                            return <Slot key={index} data={subject} />
                          })}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}

              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment>
  )
}
