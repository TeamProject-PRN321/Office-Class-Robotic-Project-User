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

function Row(props: { row: BorrowDeviceCategoryModel; onAccept: () => void; onReject: () => void }) {
  const { row, onAccept, onReject } = props
  const [open, setOpen] = React.useState(false)

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
                textDecoration: 'underline',
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
                textDecoration: 'underline',
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
                textDecoration: 'underline',
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
          <Button onClick={onAccept} variant='contained' sx={{ bgcolor: '#4caf50', color: '#fff' }}>
            Accept
          </Button>
        </TableCell>
        <TableCell align='center'>
          <Button onClick={onReject} variant='contained' sx={{ bgcolor: '#f44336', color: '#fff' }}>
            Reject
          </Button>
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

export default function AdminManageBorrowDevice() {
  const axiosClient = useAxios()
  const [allBorrowDeviceOfTeacherData, setAllBorrowDeviceOfTeacherData] = React.useState<BorrowDeviceCategoryModel[]>()
  const authen = useAuth()
  const appUserId = authen.Id

  const handleAccept = async (borrowDeviceId: string) => {
    try {
      await axiosClient.call('post', `/api/v1/borrowdevice/admin-accept-request/${borrowDeviceId}`)

      //fetchAllBorrowDeviceOfTeacherData();
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = async (borrowDeviceId: string) => {
    try {
      await axiosClient.call('post', `/api/v1/borrowdevice/admin-reject-request/${borrowDeviceId}`)

      //fetchAllBorrowDeviceOfTeacherData();
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const fetchAllBorrowDeviceOfTeacherData = async () => {
      try {
        const response = await axiosClient.call(
          'get',
          `/api/v1/borrowdevice/get-all-request-borrow-device-does-not-process-before`
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
            <TableCell align='center'>Accept</TableCell>
            <TableCell align='center'>Reject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allBorrowDeviceOfTeacherData &&
            allBorrowDeviceOfTeacherData.map(item => (
              <Row
                key={item.borrowDeviceId}
                row={item}
                onAccept={() => handleAccept(item.borrowDeviceId)}
                onReject={() => handleReject(item.borrowDeviceId)}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
