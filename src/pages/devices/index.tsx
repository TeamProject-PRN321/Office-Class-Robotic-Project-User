import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Card, CardContent, Grid, Tab, Typography } from '@mui/material'
import { Plus } from 'mdi-material-ui'
import * as React from 'react'
import LiveClassItems from 'src/layouts/components/LiveClasses/LiveClassesItem'

import { SyntheticEvent, useState } from 'react'
import DeviceItems from 'src/layouts/components/Devices/DeviceItem'

export default function App() {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab sx={{ fontWeight: 'bold' }} value='1' label='Device' />
          <Tab sx={{ fontWeight: 'bold' }} value='2' label='Smart device' />
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
                <DeviceItems></DeviceItems>
              </Grid>
              <Grid item>
                <DeviceItems></DeviceItems>
              </Grid>
              <Grid item>
                <DeviceItems></DeviceItems>
              </Grid>
              <Grid item>
                <DeviceItems></DeviceItems>
              </Grid>
              <Grid item>
                <DeviceItems></DeviceItems>
              </Grid>
              <Grid item>
                <DeviceItems></DeviceItems>
              </Grid>
              <Grid item>
                <DeviceItems></DeviceItems>
              </Grid>
            </Grid>
          </TabPanel>

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
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Smart device</Typography>
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
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}
