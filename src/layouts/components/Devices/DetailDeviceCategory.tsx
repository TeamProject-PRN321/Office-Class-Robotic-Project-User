import {
  Box,
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

import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import useAxios from 'src/@core/hooks/useAxios'
import { DeviceCategoryModel } from './DeviceItem'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

function Row(props: { row: DeviceCategoryModel }) {
  const { row } = props
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.deviceCategoryName}
        </TableCell>
        <TableCell align='right'>{row.deviceCategoryId}</TableCell>
        <TableCell align='right'>{row.quantityOfDeviceInStorageInTotal}</TableCell>
        <TableCell align='right'>{row.quantityOfDeviceInStorageCanBorrow}</TableCell>
        <TableCell align='right'>{row.devicePictureURL}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                List Device Can Choose
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Status String</TableCell>
                    <TableCell align='right'>Acquisition</TableCell>
                    <TableCell align='right'>LastRepair</TableCell>
                    <TableCell align='right'>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.listDevicesOfDeviceCategory.map(item => (
                    <TableRow key={item.deviceId}>
                      <TableCell component='th' scope='row'>
                        {item.deviceSerialNumber}
                      </TableCell>
                      <TableCell>{item.deviceStatusString}</TableCell>
                      <TableCell align='right'>{item.dateOfAcquisition}</TableCell>
                      <TableCell align='right'>{item.dateOfLastRepair}</TableCell>
                      <TableCell align='right'>{item.deviceStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default function DetailDeviceCategory() {
  const router = useRouter()
  const { deviceCategoryId } = router.query
  const axiosClient = useAxios()
  const [detailDeviceData, setDetailDeviceData] = useState<DeviceCategoryModel | null>(null)

  useEffect(() => {
    const fetchDetailDevice = async () => {
      try {
        const response = await axiosClient.call('get', `/api/v1/device/${deviceCategoryId}`)
        setDetailDeviceData(response as DeviceCategoryModel)
      } catch (error) {
        console.log(error)
      }
    }

    if (deviceCategoryId) {
      fetchDetailDevice()
    }
  }, [deviceCategoryId, axiosClient])

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Device Name</TableCell>
            <TableCell align='right'>Device Id</TableCell>
            <TableCell align='right'>Tổng số lượng</TableCell>
            <TableCell align='right'>Số lượng còn lại</TableCell>
            <TableCell align='right'>Hình ảnh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detailDeviceData && <Row key={detailDeviceData.deviceCategoryName} row={detailDeviceData} />}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
