import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import moment from 'moment'
import * as React from 'react'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import useAuth from 'src/@core/hooks/useAuth'
import useAxios from 'src/@core/hooks/useAxios'

export interface BorrowDeviceCategoryModel {
  borrowDeviceId: string
  borrowPurpose: string
  className: string
  dateTimeBorrow: string
  classRoomId: string
  classRoomName: string
  teacherId: string
  teacherName: string
  borrowStatus: number
  borrowStatusString: string
  listDeviceDetail: [
    {
      deviceCategoryId: string
      quantityTeacherWantToBorrow: number
      listDevice: [
        {
          serialNumber: string
          deviceId: string
        }
      ]
      deviceCategoryName: string
    }
  ]
}

function Row(props: { row: BorrowDeviceCategoryModel; fetchData: () => void }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const axiosClient = useAxios()
  const auth = useAuth()
  const appUSerId = auth.Id

  const handleTra = async () => {
    try {
      if (window.confirm('Bạn có muốn trả hay không?')) {
        await axiosClient.call('get', '/api/v1/borrowdevice/teacher-give-back-/' + row.borrowDeviceId + '/' + appUSerId)
        props.fetchData()
        toast.success('Trả thành công.')
      }
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.className}
        </TableCell>
        <TableCell>{moment(row.dateTimeBorrow).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{row.classRoomName}</TableCell>
        <TableCell>{row.teacherName}</TableCell>
        <TableCell align='center'>
          {row.borrowStatus === 0 && (
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: '#ff9800',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'inline-block'
              }}
            >
              Chờ duyệt
            </Typography>
          )}
          {row.borrowStatus === 1 && (
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: '#4caf50',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'inline-block'
              }}
            >
              Đã mượn
            </Typography>
          )}
          {row.borrowStatus === 2 && (
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: '#2196f3',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'inline-block'
              }}
            >
              Đã trả
            </Typography>
          )}
          {row.borrowStatus === 3 && (
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '13px',
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'inline-block'
              }}
            >
              Từ chối
            </Typography>
          )}
        </TableCell>
        <TableCell align='center'>{row.borrowPurpose}</TableCell>
        <TableCell align='center'>
          <QRCode value={String(row.borrowDeviceId)} size={60} />
        </TableCell>
        <TableCell align='center'>
          {row.borrowStatus === 1 && (
            <Button variant='contained' color='info' onClick={handleTra}>
              Trả
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h5' gutterBottom component='div'>
                List Device Borrow
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>DeviceCategory Id</TableCell>
                    <TableCell>DeviceCategory Name</TableCell>
                    <TableCell align='right'>Total Borrow</TableCell>
                    <TableCell align='center'>List Detail Device Borrow</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.listDeviceDetail.map(item => (
                    <TableRow key={item.deviceCategoryId}>
                      <TableCell component='th' scope='row'>
                        <QRCode value={String(item.deviceCategoryId)} size={50} />
                      </TableCell>
                      <TableCell>{item.deviceCategoryName}</TableCell>
                      <TableCell align='right'>{item.quantityTeacherWantToBorrow}</TableCell>
                      <TableCell>
                        {item.listDevice.map(item1 => (
                          <TableRow key={item1.serialNumber}>
                            <TableCell>{item1.serialNumber}</TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function TeacherViewHistoryBorrowDevice() {
  const axiosClient = useAxios()
  const [allBorrowDeviceOfTeacherData, setAllBorrowDeviceOfTeacherData] = React.useState<BorrowDeviceCategoryModel[]>()
  const authen = useAuth()
  const appUserId = authen.Id

  React.useEffect(() => {
    const fetchAllBorrowDeviceOfTeacherData = async () => {
      try {
        const response = await axiosClient.call(
          'get',
          `/api/v1/borrowdevice/teacher-view-all-request-borrow-device/${appUserId}`,
          null,
          true
        )
        setAllBorrowDeviceOfTeacherData(response as BorrowDeviceCategoryModel[])
      } catch (error) {
        console.log(error)
      }
    }

    if (appUserId) {
      fetchAllBorrowDeviceOfTeacherData()
    }
  }, [appUserId, axiosClient])

  const fetchData = async () => {
    try {
      const response = await axiosClient.call(
        'get',
        `/api/v1/borrowdevice/teacher-view-all-request-borrow-device/${appUserId}`
      )
      setAllBorrowDeviceOfTeacherData(response as BorrowDeviceCategoryModel[])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Class Name</TableCell>
            <TableCell>Date Borrow</TableCell>
            <TableCell>ClassRoom</TableCell>
            <TableCell>Teacher Name</TableCell>
            <TableCell align='right'>Borrow Status</TableCell>
            <TableCell align='center'>Purpose</TableCell>
            <TableCell align='center'>Code</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allBorrowDeviceOfTeacherData &&
            allBorrowDeviceOfTeacherData.map(item => (
              <Row key={item.borrowDeviceId} row={item} fetchData={fetchData} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
