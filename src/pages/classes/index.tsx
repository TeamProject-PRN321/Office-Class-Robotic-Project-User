// ** MUI Imports
import Grid from '@mui/material/Grid'

import { Button, Typography } from '@mui/material'

import * as React from 'react'

import { Plus } from 'mdi-material-ui'
import LiveClassItems from 'src/layouts/components/LiveClasses/LiveClassesItem'

import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import HistoryClasses from 'src/layouts/components/LiveClasses/HistoryClasses'
import HistoryClassesReport from 'src/layouts/components/LiveClasses/HistoryClassesReport'

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
          <Tab sx={{ fontWeight: 'bold' }} value='1' label='Live Class' />
          <Tab sx={{ fontWeight: 'bold' }} value='2' label='Class History' />
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
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}> Live Classes</Typography>
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
                  Add Class
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
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Class History</Typography>
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
                  Add Class
                </Button>
              </Grid>
              <Grid item>
                <HistoryClasses></HistoryClasses>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
              <Grid item>
                <HistoryClasses></HistoryClasses>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
              <Grid item>
                <HistoryClasses></HistoryClasses>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}
