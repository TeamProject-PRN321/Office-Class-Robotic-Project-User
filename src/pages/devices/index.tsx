import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Card, CardContent, Grid, Tab, Typography } from '@mui/material'
import { Plus } from 'mdi-material-ui'
import * as React from 'react'

import { SyntheticEvent, useState } from 'react'
import DeviceItems from 'src/layouts/components/Devices/DeviceItem'
import useAuth from 'src/@core/hooks/useAuth'
import DialogFormAddDevice from 'src/layouts/components/Devices/AddNewDevice/DialogFormAddDevice'
import TeacherViewHistoryBorrowDevice from 'src/layouts/components/Devices/TeacherViewHistoryBorrow/TeacherViewHistoryBorrowDevice'
import { CartProvider } from 'src/@core/context/CartProvider'
import AdminManageBorrowDevice from 'src/layouts/components/Devices/AdminManageDevice/AdminManageBorrowDevice'

export default function App() {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const authen = useAuth()
  console.log(authen)
  const role = authen.role
  console.log(role)

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab sx={{ fontWeight: 'bold' }} value='1' label='Device' />
          {role === 'Teacher' && <Tab sx={{ fontWeight: 'bold' }} value='2' label='Rental history' />}
          {role === 'Admin' && <Tab sx={{ fontWeight: 'bold' }} value='2' label='Manage Rental Device' />}
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Grid container direction={'row'} spacing={4}>
              <Grid
                item
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'space-between'}
                width={'100%'}
                alignItems={'center'}
              >
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Device</Typography>
                {/* <Button
                  sx={{
                    backgroundColor: '#C4FCEF',
                    color: '#50bf62',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    textDecoration: 'underline',
                    ':hover': {
                      color: 'white',
                      backgroundColor: '#0081CF'
                    }
                  }}
                >
                  <Plus sx={{ marginRight: '2px', fontSize: '16px' }}></Plus>
                  Add Device
                </Button> */}
                {role === 'Admin' && <DialogFormAddDevice></DialogFormAddDevice>}
              </Grid>
              <CartProvider>
                <Grid item>
                  <DeviceItems></DeviceItems>
                </Grid>
              </CartProvider>
            </Grid>
          </TabPanel>

          {role === 'Teacher' && (
            <TabPanel value='2' sx={{ p: 0 }}>
              <Grid container direction={'row'} spacing={4}>
                <Grid
                  item
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
                    History Device Items
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: '#C4FCEF',
                      color: '#50bf62',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      textDecoration: 'underline',
                      ':hover': {
                        color: 'white',
                        backgroundColor: '#0081CF'
                      }
                    }}
                  >
                    <Plus sx={{ marginRight: '2px', fontSize: '16px' }}></Plus>
                    Add Device
                  </Button>
                </Grid>

                <Grid item>
                  <TeacherViewHistoryBorrowDevice></TeacherViewHistoryBorrowDevice>
                </Grid>
              </Grid>
            </TabPanel>
          )}

          {role === 'Admin' && (
            <TabPanel value='2' sx={{ p: 0 }}>
              <Grid container direction={'row'} spacing={4}>
                <Grid
                  item
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
                    History Device Items
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: '#C4FCEF',
                      color: '#50bf62',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      textDecoration: 'underline',
                      ':hover': {
                        color: 'white',
                        backgroundColor: '#0081CF'
                      }
                    }}
                  >
                    <Plus sx={{ marginRight: '2px', fontSize: '16px' }}></Plus>
                    Add Device
                  </Button>
                </Grid>

                <Grid item>
                  <AdminManageBorrowDevice></AdminManageBorrowDevice>
                </Grid>
              </Grid>
            </TabPanel>
          )}
        </CardContent>
      </TabContext>
    </Card>
  )
}
